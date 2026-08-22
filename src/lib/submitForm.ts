// The one way a form on this site sends data.
//
// Every form used to build its own URL and call the Apps Script directly, and
// three of the five never looked at the reply:
//
//     await fetch(`${GOOGLE_SCRIPT_URL}?${params}`);
//     setFormState('success');            // ← said thank you regardless
//
// `fetch` only rejects on a network failure, so a 500 — or a script replying
// "ERROR: Unknown sheet name" with a 200 — counted as success. Devotees were
// thanked while their details were discarded.
//
// This throws whenever the row did not reach the sheet. Callers should let the
// error reach their catch block and show the failure state.

/** Keys of the forms defined in api/_forms.ts. */
export type FormKey = 'seva' | 'donation' | 'prasadam' | 'weekly' | 'yearly';

export async function submitForm(
  form: FormKey,
  data: Record<string, string>
): Promise<void> {
  let response: Response;

  try {
    response = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ form, data }),
    });
  } catch {
    throw new Error('No internet connection. Please check your network and try again.');
  }

  // A crashed function can return an HTML error page rather than JSON, so never
  // assume the body parses.
  const payload = (await response
    .json()
    .catch(() => null)) as { ok?: boolean; error?: string } | null;

  if (!response.ok || !payload?.ok) {
    throw new Error(payload?.error ?? `Submission failed (HTTP ${response.status})`);
  }
}
