// Vercel Serverless Function: POST /api/submit
//
// The single door every form on the site knocks on. Replaces the Google Apps
// Script web app that used to receive form data as a GET query string.
//
// Two things it fixes that the old route could not:
//
//   1. It answers honestly. The old script replied "200 OK" with an HTML body
//      even when the write failed, so four of the five forms showed devotees a
//      thank-you screen while their details went nowhere. Here a failure is a
//      non-2xx with a reason, and `src/lib/submitForm.ts` throws on it.
//   2. Nothing personal travels in the URL. Phone numbers, home addresses and
//      PAN numbers now sit in a POST body rather than in Google's request logs
//      and the visitor's browser history.
//
// Request:   { "form": "prasadam", "data": { "name": "...", ... } }
// Success:   200 { "ok": true }
// Failure:   400/500 { "ok": false, "error": "..." }

// The .js extensions are deliberate and required. package.json sets
// "type": "module", so Vercel's Node runtime resolves these as real ESM and
// rejects an extensionless path — TypeScript maps ".js" back to the ".ts" file.
import { FORMS, indianTimestamp, normalizePhone } from './_forms.js';
import { appendRow, ensureTab, SheetsError } from './_sheets.js';

// Minimal structural types, so we don't need the @vercel/node dependency —
// matching api/imagekit-list.ts.
interface Req {
  method?: string;
  body: unknown;
}
interface Res {
  status: (code: number) => Res;
  json: (body: unknown) => void;
}

/** Keeps one runaway field from writing a novel into the sheet. */
const MAX_FIELD_LENGTH = 2000;

export default async function handler(req: Req, res: Res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  let payload: { form?: unknown; data?: unknown };
  try {
    payload = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body as never) ?? {};
  } catch {
    return res.status(400).json({ ok: false, error: 'Body is not valid JSON' });
  }

  const formKey = typeof payload.form === 'string' ? payload.form : '';
  const definition = FORMS[formKey];
  if (!definition) {
    // Loud on purpose. A typo in a form should be obvious, not silent — the
    // donate page spent months posting to a sheet name that did not exist.
    return res.status(400).json({ ok: false, error: `Unknown form: ${formKey || '(missing)'}` });
  }

  const data =
    payload.data && typeof payload.data === 'object'
      ? (payload.data as Record<string, unknown>)
      : {};

  // Everything lands in the sheet as text. Anything that isn't a string or a
  // number is treated as not supplied rather than stringified into "[object Object]".
  const value = (field: string): string => {
    const raw = data[field];
    if (typeof raw === 'string') return raw.trim();
    if (typeof raw === 'number') return String(raw);
    return '';
  };

  const row: string[] = [];

  for (const field of definition.fields) {
    // The server owns the clock. A wrong device clock used to become a wrong
    // row, and sorting the sheet by time is how the priest works through it.
    if (field === 'timestamp') {
      row.push(indianTimestamp());
      continue;
    }

    let cell = value(field);

    if (definition.required.includes(field) && !cell) {
      return res.status(400).json({ ok: false, error: `Missing required field: ${field}` });
    }

    if (cell.length > MAX_FIELD_LENGTH) {
      return res.status(400).json({ ok: false, error: `Field is too long: ${field}` });
    }

    if (definition.phoneFields?.includes(field) && cell) {
      const normalized = normalizePhone(cell);
      if (!normalized) {
        return res
          .status(400)
          .json({ ok: false, error: `Not a valid Indian mobile number: ${field}` });
      }
      cell = normalized;
    }

    row.push(cell);
  }

  try {
    await ensureTab(definition.tab, definition.headers);
    await appendRow(definition.tab, row);
    return res.status(200).json({ ok: true });
  } catch (error) {
    // The reason goes to the Vercel logs; the devotee gets something they can
    // act on, without the internals of our Google setup.
    console.error('[api/submit] failed', {
      form: formKey,
      tab: definition.tab,
      reason: error instanceof Error ? error.message : String(error),
    });

    const configProblem = error instanceof SheetsError && error.message.includes('is not set');
    return res.status(configProblem ? 500 : 502).json({
      ok: false,
      error: 'Could not save your details right now. Please try again in a moment.',
    });
  }
}
