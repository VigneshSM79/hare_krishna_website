// Vercel Serverless Function: POST /api/vairagya-vidya
//
// Everything behind the Vairagya Vidya page — the devotees' daily chanting log.
// One function with an `action` rather than one per action, because Vercel's
// free plan caps a project at 12 functions and this page will grow (prasadam
// and reading are next).
//
// The page is private. Every devotee shares one email + password, checked HERE
// on the server — unlike /admin, whose password is a VITE_ variable and so sits
// in the JavaScript that every visitor downloads. A correct login earns a
// signed token; every other action needs it in `Authorization: Bearer <token>`.
//
// Required env vars (no VITE_ prefix — they must never reach the browser):
//   VV_LOGIN_EMAIL      the shared email devotees type
//   VV_LOGIN_PASSWORD   the shared password
//   VV_SESSION_SECRET   any long random string; signs the login tokens
// Changing VV_LOGIN_PASSWORD signs every devotee out, because the password is
// part of the signing key.
//
// Request:  { "action": "login" | "me" | "register" | "chant", ...fields }
// Success:  200 { "ok": true, ... }
// Failure:  400/401/500/502 { "ok": false, "error": "..." }

// The .js extensions are required — see the note in api/submit.ts.
import { createHash, createHmac, timingSafeEqual } from 'node:crypto';
import { indianTimestamp, normalizePhone } from './_forms.js';
import { appendRow, ensureTab, readRows, SheetsError, updateRow } from './_sheets.js';

interface Req {
  method?: string;
  body: unknown;
  headers: Record<string, string | string[] | undefined>;
}
interface Res {
  status: (code: number) => Res;
  json: (body: unknown) => void;
}

const DEVOTEES = {
  tab: 'VV Devotees',
  headers: ['Joined', 'Name', 'Mobile', 'Date of Birth', 'Daily Round Target'],
};

// One row per devotee per day. A day with no row means "did not report", which
// the temple wants kept apart from a reported 0 — the same rule as their Excel
// tracker, where "Not Updated" never counted as zero rounds.
const CHANTING = {
  tab: 'VV Chanting',
  headers: ['Date', 'Mobile', 'Name', 'Rounds', 'Last Updated'],
};

const DEFAULT_ROUND_TARGET = 16;
const SESSION_DAYS = 30;
/** How far back a devotee may fill in a day they forgot to report. */
const BACKFILL_DAYS = 6;
/** Enough history for "this week" and "this month" on the page. */
const HISTORY_DAYS = 40;
const MAX_ROUNDS = 200;

/** Thrown for a request the devotee can fix — shown to them as-is. */
class UserError extends Error {}

// ─── Login tokens ─────────────────────────────────────────────────────────────

function loginConfig() {
  const email = process.env.VV_LOGIN_EMAIL;
  const password = process.env.VV_LOGIN_PASSWORD;
  const secret = process.env.VV_SESSION_SECRET;
  if (!email || !password || !secret) {
    throw new SheetsError('VV_LOGIN_EMAIL, VV_LOGIN_PASSWORD or VV_SESSION_SECRET is not set');
  }
  return { email, password, secret };
}

/** Constant-time string compare, so a wrong guess leaks nothing through timing. */
function sameText(a: string, b: string): boolean {
  const hash = (text: string) => createHash('sha256').update(text).digest();
  return timingSafeEqual(hash(a), hash(b));
}

function signature(payload: string): string {
  const { password, secret } = loginConfig();
  return createHmac('sha256', `${secret}:${password}`).update(payload).digest('base64url');
}

function issueToken(): string {
  const expires = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  const payload = Buffer.from(JSON.stringify({ exp: expires })).toString('base64url');
  return `${payload}.${signature(payload)}`;
}

function hasValidToken(req: Req): boolean {
  const header = req.headers.authorization;
  const value = Array.isArray(header) ? header[0] : header ?? '';
  const [payload, sig] = value.replace(/^Bearer\s+/i, '').split('.');
  if (!payload || !sig || !sameText(sig, signature(payload))) return false;

  try {
    const { exp } = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return typeof exp === 'number' && Date.now() < exp;
  } catch {
    return false;
  }
}

// ─── Dates (always the temple's clock, never the phone's) ────────────────────

/** "2026-09-24" in India, whatever time zone the server runs in. */
function todayInIndia(): string {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
}

function daysBetween(from: string, to: string): number {
  return Math.round((Date.parse(to) - Date.parse(from)) / 86_400_000);
}

const isIsoDate = (value: string) =>
  /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value));

// ─── Sheet access ─────────────────────────────────────────────────────────────

interface Devotee {
  name: string;
  mobile: string;
  dateOfBirth: string;
  roundTarget: number;
}

async function findDevotee(mobile: string): Promise<Devotee | null> {
  await ensureTab(DEVOTEES.tab, DEVOTEES.headers);
  const row = (await readRows(DEVOTEES.tab)).slice(1).find(r => r[2] === mobile);
  if (!row) return null;

  const target = Number(row[4]);
  return {
    name: row[1] ?? '',
    mobile,
    dateOfBirth: row[3] ?? '',
    roundTarget: Number.isFinite(target) && target > 0 ? target : DEFAULT_ROUND_TARGET,
  };
}

async function recentEntries(mobile: string) {
  await ensureTab(CHANTING.tab, CHANTING.headers);
  const today = todayInIndia();

  return (await readRows(CHANTING.tab))
    .slice(1)
    .filter(r => r[1] === mobile && isIsoDate(r[0] ?? '') && daysBetween(r[0], today) <= HISTORY_DAYS)
    .map(r => ({ date: r[0], rounds: Number(r[3]) || 0 }));
}

// ─── Actions ──────────────────────────────────────────────────────────────────

type Body = Record<string, unknown>;

const text = (body: Body, key: string): string => {
  const value = body[key];
  if (typeof value === 'string') return value.trim();
  if (typeof value === 'number') return String(value);
  return '';
};

function requireMobile(body: Body): string {
  const mobile = normalizePhone(text(body, 'mobile'));
  if (!mobile) throw new UserError('Please enter a valid 10-digit mobile number.');
  return mobile;
}

function login(body: Body) {
  const { email, password } = loginConfig();
  const emailOk = sameText(text(body, 'email').toLowerCase(), email.trim().toLowerCase());
  const passwordOk = sameText(text(body, 'password'), password);
  if (!emailOk || !passwordOk) throw new UserError('That email or password is not correct.');
  return { token: issueToken() };
}

async function me(body: Body) {
  const mobile = requireMobile(body);
  const devotee = await findDevotee(mobile);
  return {
    today: todayInIndia(),
    devotee,
    entries: devotee ? await recentEntries(mobile) : [],
  };
}

async function register(body: Body) {
  const mobile = requireMobile(body);
  const name = text(body, 'name');
  const dateOfBirth = text(body, 'dateOfBirth');

  if (!name || name.length > 100) throw new UserError('Please enter your name.');
  if (!isIsoDate(dateOfBirth) || dateOfBirth < '1900-01-01' || dateOfBirth > todayInIndia()) {
    throw new UserError('Please enter a valid date of birth.');
  }

  // Registering twice with one number would split a devotee's chanting across
  // two profiles, so an existing number just signs them in.
  const existing = await findDevotee(mobile);
  if (!existing) {
    await appendRow(DEVOTEES.tab, [indianTimestamp(), name, mobile, dateOfBirth, DEFAULT_ROUND_TARGET]);
  }
  return me({ mobile });
}

async function chant(body: Body) {
  const mobile = requireMobile(body);
  const date = text(body, 'date');
  const rounds = Number(text(body, 'rounds'));
  const today = todayInIndia();

  if (!isIsoDate(date)) throw new UserError('Please pick a day.');
  const age = daysBetween(date, today);
  if (age < 0) throw new UserError('You cannot mark rounds for a day that has not come yet.');
  if (age > BACKFILL_DAYS) {
    throw new UserError(`You can only mark rounds for the last ${BACKFILL_DAYS + 1} days.`);
  }
  if (!Number.isInteger(rounds) || rounds < 0 || rounds > MAX_ROUNDS) {
    throw new UserError(`Rounds must be a whole number from 0 to ${MAX_ROUNDS}.`);
  }

  const devotee = await findDevotee(mobile);
  if (!devotee) throw new UserError('Please create your profile first.');

  await ensureTab(CHANTING.tab, CHANTING.headers);
  const rows = await readRows(CHANTING.tab);
  const index = rows.findIndex((r, i) => i > 0 && r[0] === date && r[1] === mobile);
  const row = [date, mobile, devotee.name, rounds, indianTimestamp()];

  // Saving the same day again corrects it rather than adding a second row, so
  // a devotee who types 10 and then fixes it to 16 is counted once, as 16.
  if (index > 0) {
    await updateRow(CHANTING.tab, index + 1, row);
  } else {
    await appendRow(CHANTING.tab, row);
  }
  return me({ mobile });
}

// ─── Handler ──────────────────────────────────────────────────────────────────

export default async function handler(req: Req, res: Res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  let body: Body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body as Body) ?? {};
  } catch {
    return res.status(400).json({ ok: false, error: 'Body is not valid JSON' });
  }
  const action = text(body, 'action');

  try {
    if (action === 'login') return res.status(200).json({ ok: true, ...login(body) });

    if (!hasValidToken(req)) {
      return res.status(401).json({ ok: false, error: 'Please log in again.' });
    }

    const run = { me, register, chant }[action as 'me' | 'register' | 'chant'];
    if (!run) return res.status(400).json({ ok: false, error: `Unknown action: ${action || '(missing)'}` });

    return res.status(200).json({ ok: true, ...(await run(body)) });
  } catch (error) {
    if (error instanceof UserError) {
      return res.status(400).json({ ok: false, error: error.message });
    }

    console.error('[api/vairagya-vidya] failed', {
      action,
      reason: error instanceof Error ? error.message : String(error),
    });
    const configProblem = error instanceof SheetsError && error.message.includes('is not set');
    return res.status(configProblem ? 500 : 502).json({
      ok: false,
      error: 'Could not reach the temple records right now. Please try again in a moment.',
    });
  }
}
