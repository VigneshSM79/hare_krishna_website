// Google Sheets access for the temple's forms.
//
// Replaces the old Google Apps Script web app. Everything here runs server-side
// on Vercel — the service-account key never reaches the browser.
//
// Deliberately dependency-free. Node can sign the RS256 JWT that Google wants
// using its own `crypto` module, so there is no `googleapis` or
// `google-auth-library` to install, and no cold-start cost for a form that gets
// a few submissions a day. Same approach as `api/imagekit-list.ts`.
//
// Required env vars (Vercel → Settings → Environment Variables, and .env.local
// for local `vercel dev`). Note the missing VITE_ prefix — that is the point:
//   GOOGLE_SERVICE_ACCOUNT_JSON  the whole downloaded key file, as one line
//   GOOGLE_SHEETS_SPREADSHEET_ID 166HNBGqNfuKVys-YEJ-jMYSJHDOj9KOEt6TuPjBhHFY

import { createSign } from 'node:crypto';

const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const SHEETS_API = 'https://sheets.googleapis.com/v4/spreadsheets';
const SCOPE = 'https://www.googleapis.com/auth/spreadsheets';

/** Raised for anything the caller can't fix by retrying. */
export class SheetsError extends Error {}

interface ServiceAccount {
  client_email: string;
  private_key: string;
}

/**
 * The key reaches us in whichever shape the place we stored it allows, so try
 * each in turn rather than dictating one:
 *
 *  1. Plain JSON — what Vercel's dashboard stores when you paste the file.
 *  2. Base64 of that JSON — what .env.local uses, because dotenv rewrites the
 *     private key's `\n` escapes into real newlines, and a real newline inside
 *     a JSON string is a parse error.
 *  3. JSON whose newlines were already mangled that way — repaired by escaping
 *     them back. Only attempted after a straight parse has failed, so a
 *     legitimately pretty-printed key is never touched.
 */
function parseCredentials(raw: string): Partial<ServiceAccount> | null {
  let text = raw.trim();

  if (
    (text.startsWith('"') && text.endsWith('"')) ||
    (text.startsWith("'") && text.endsWith("'"))
  ) {
    text = text.slice(1, -1);
  }

  const attempt = (candidate: string): Partial<ServiceAccount> | null => {
    try {
      const value = JSON.parse(candidate);
      return value && typeof value === 'object' ? value : null;
    } catch {
      return null;
    }
  };

  const direct = attempt(text);
  if (direct) return direct;

  if (!text.startsWith('{')) {
    const decoded = attempt(Buffer.from(text, 'base64').toString('utf8'));
    if (decoded) return decoded;
  }

  return attempt(text.replace(/\r/g, '\\r').replace(/\n/g, '\\n'));
}

function readCredentials(): ServiceAccount {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) throw new SheetsError('GOOGLE_SERVICE_ACCOUNT_JSON is not set');

  const parsed = parseCredentials(raw);
  if (!parsed) throw new SheetsError('GOOGLE_SERVICE_ACCOUNT_JSON is not valid JSON');

  if (!parsed.client_email || !parsed.private_key) {
    throw new SheetsError('GOOGLE_SERVICE_ACCOUNT_JSON is missing client_email or private_key');
  }

  // Pasting the key into a dashboard usually turns real newlines into "\n".
  // Node's signer needs them back, and an untouched key is unaffected.
  return {
    client_email: parsed.client_email,
    private_key: parsed.private_key.replace(/\\n/g, '\n'),
  };
}

function spreadsheetId(): string {
  const id = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  if (!id) throw new SheetsError('GOOGLE_SHEETS_SPREADSHEET_ID is not set');
  return id;
}

const b64url = (value: unknown) =>
  Buffer.from(JSON.stringify(value)).toString('base64url');

// A Vercel instance handles many requests before it is recycled, so holding the
// token saves a round-trip to Google on all but the first submission.
let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) return cachedToken.value;

  const creds = readCredentials();
  const now = Math.floor(Date.now() / 1000);

  const unsigned =
    b64url({ alg: 'RS256', typ: 'JWT' }) +
    '.' +
    b64url({
      iss: creds.client_email,
      scope: SCOPE,
      aud: TOKEN_URL,
      iat: now,
      exp: now + 3600,
    });

  const signature = createSign('RSA-SHA256')
    .update(unsigned)
    .sign(creds.private_key, 'base64url');

  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${unsigned}.${signature}`,
    }),
  });

  const payload = (await response.json()) as { access_token?: string; expires_in?: number };
  if (!response.ok || !payload.access_token) {
    throw new SheetsError(`Google refused the service account (HTTP ${response.status})`);
  }

  // Expire ours five minutes early so a request never starts with a token that
  // dies mid-flight.
  cachedToken = {
    value: payload.access_token,
    expiresAt: Date.now() + ((payload.expires_in ?? 3600) - 300) * 1000,
  };
  return cachedToken.value;
}

async function callSheets(path: string, init: RequestInit = {}): Promise<unknown> {
  const token = await getAccessToken();
  const response = await fetch(`${SHEETS_API}/${spreadsheetId()}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(init.headers ?? {}),
    },
  });

  const body = (await response.json().catch(() => ({}))) as {
    error?: { message?: string };
  } & Record<string, unknown>;

  if (!response.ok) {
    throw new SheetsError(
      `Sheets API ${response.status}: ${body.error?.message ?? 'unknown error'}`
    );
  }
  return body;
}

/** Titles of every tab currently in the spreadsheet. */
async function listTabs(): Promise<string[]> {
  const body = (await callSheets('?fields=sheets.properties.title')) as {
    sheets?: { properties: { title: string } }[];
  };
  return (body.sheets ?? []).map(sheet => sheet.properties.title);
}

// Tab names change about once a year, so re-listing on every submission is
// wasted latency. Cleared whenever we learn the cache was wrong.
let knownTabs: Set<string> | null = null;

/**
 * Guarantees the tab exists with its header row in place, creating it if this
 * is the first ever submission for that form.
 */
export async function ensureTab(title: string, headers: string[]): Promise<void> {
  if (knownTabs?.has(title)) return;

  knownTabs = new Set(await listTabs());
  if (knownTabs.has(title)) return;

  try {
    await callSheets(':batchUpdate', {
      method: 'POST',
      body: JSON.stringify({ requests: [{ addSheet: { properties: { title } } }] }),
    });
  } catch (error) {
    // Two submissions can race to create the same tab. Losing that race is
    // fine — the tab we wanted now exists either way.
    const tabs = await listTabs();
    knownTabs = new Set(tabs);
    if (!tabs.includes(title)) throw error;
    return;
  }

  await callSheets(
    `/values/${encodeURIComponent(title)}!A1?valueInputOption=RAW`,
    { method: 'PUT', body: JSON.stringify({ values: [headers] }) }
  );

  knownTabs.add(title);
}

/**
 * A cell as we write it. Strings stay text under RAW; numbers arrive as real
 * numbers, so the sheet can SUM a column of chanting rounds.
 */
export type Cell = string | number;

/** Every row of a tab, header included, as the formatted text the sheet shows. */
export async function readRows(title: string): Promise<string[][]> {
  const body = (await callSheets(`/values/${encodeURIComponent(title)}`)) as {
    values?: string[][];
  };
  return body.values ?? [];
}

/** Overwrites one row in place. `rowNumber` is the sheet's own 1-based number. */
export async function updateRow(title: string, rowNumber: number, values: Cell[]): Promise<void> {
  await callSheets(
    `/values/${encodeURIComponent(`${title}!A${rowNumber}`)}?valueInputOption=RAW`,
    { method: 'PUT', body: JSON.stringify({ values: [values] }) }
  );
}

/** Appends one row underneath whatever is already in the tab. */
export async function appendRow(title: string, values: Cell[]): Promise<void> {
  // RAW, not USER_ENTERED: a name beginning with "=" must stay text, and a
  // phone number must not be quietly turned into a number and lose its zeros.
  await callSheets(
    `/values/${encodeURIComponent(title)}!A1:append` +
      '?valueInputOption=RAW&insertDataOption=INSERT_ROWS',
    { method: 'POST', body: JSON.stringify({ values: [values] }) }
  );
}
