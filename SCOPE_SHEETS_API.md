# Scope — Replace Apps Script with the Google Sheets API

**Written:** 2026-08-22
**Feature:** move every form on the site off Google Apps Script and onto the
Google Sheets API, driven by our own code in this repo.
**Constraint:** Balarama Purnima festival is **28 Aug 2026**.
**Spreadsheet ID:** `166HNBGqNfuKVys-YEJ-jMYSJHDOj9KOEt6TuPjBhHFY`

---

## 1. What exists today

### The five forms

| # | Form | File | Sheet tab it writes to | Who uses it |
|---|---|---|---|---|
| 1 | Seva Registration | `src/components/OfferService.tsx` | `Seva Registrations` | public |
| 2 | Donate page | `src/components/Donation.tsx` | `Donations` | public |
| 3 | Sponsor Prasadam | `src/components/SponsorPrasadam.tsx` | `Prasadam Sponsors` | public (festival) |
| 4 | Weekly Donation | `src/components/admin/DonationForm.tsx` | `Weekly Donations` | priest / admin |
| 5 | Yearly Donation | `src/components/admin/DonationForm.tsx` | `Yearly Donations` | priest / admin |

### The columns each tab holds

Taken from the live Apps Script (`../code.gs`) and **verified against the real
spreadsheet on 2026-08-22** — all five tabs exist and every header row matches.
These are the source of truth and **will not change** in this project.

| Tab | Columns (row 1) |
|---|---|
| `Seva Registrations` | Timestamp, Name, Email, Phone, Address, Services |
| `Weekly Donations` | Timestamp, Period, Donor Name, Phone, Amount, Payment Mode, Notes |
| `Yearly Donations` | Timestamp, Period, Donor Name, Phone, Amount, Payment Mode, Notes |
| `Donations` | Timestamp, Name, Phone, Amount, Category, Transaction ID, Notes, 80G Receipt, PAN, Door/Flat, Building, Street, Area, State, City, Pincode |
| `Prasadam Sponsors` | Timestamp, Name, WhatsApp, Area, Sponsorship |

### How a submission travels today

```
Browser form
   │  GET https://script.google.com/macros/s/AKfycb…/exec
   │      ?sheet=Prasadam+Sponsors&name=…&whatsapp=…&area=…
   ▼
Apps Script  (code lives INSIDE Google, attached to the Sheet)
   │  doGet() → LockService → getOrCreateSheet() → appendRow()
   ▼
Google Sheet
```

**Where the code lives:** on Google's servers. This repo only holds a
paste-copy at `../code.gs` and `../COPY_THIS_INTO_APPS_SCRIPT.txt`. Git does not
deploy it. Vercel does not run it.

---

## 2. What is broken

Six things, worst first.

### B1 — Fake success. Data silently thrown away. **(critical)**

Three of the five forms fire the request and declare victory without ever
reading the answer:

```ts
// OfferService.tsx:64, Donation.tsx:131, admin/DonationForm.tsx:49
await fetch(`${GOOGLE_SCRIPT_URL}?${params.toString()}`);
setFormState('success');          // ← never checked what came back
```

- `fetch` only throws on a **network** failure. A `500`, or the script replying
  `ERROR: Unknown sheet name`, both count as "fine".
- The devotee sees **"Hare Krishna! Thank you!"** while the row goes nowhere.
- This is exactly how every donate-page submission was lost before the
  `Donations` tab was added to the script.
- Only `SponsorPrasadam.tsx` reads the reply (line 88, `reply.startsWith('OK')`).

### B2 — The live site points at a dead script URL. **(critical, live right now)**

| Where | Deployment ID |
|---|---|
| `.env` / `.env.local` (local dev) | `AKfycbyArxB…` ← working, tested 16 Aug |
| Vercel env var `VITE_SEVA_SCRIPT_URL` | `AKfycbx1IMG…` ← old, broken |

- Local works. **The public website's forms do not.**
- Fixable in 5 minutes without any of this project.

### B3 — Personal data travels inside the URL. **(privacy)**

Every form uses `GET` with a query string, so this goes into Google's request
logs, any proxy in between, and browser history:

- phone numbers and WhatsApp numbers
- home addresses
- **PAN numbers** (the 80G section of `Donation.tsx`)

URLs are also length-capped, and the `Donations` form has 16 fields.

### B4 — The Apps Script cannot be deployed from this repo. **(the thing you hate)**

- Shipping a change = open Google → paste code → "Deploy" → "New deployment" →
  copy a new ID → update `.env` → update Vercel → redeploy.
- Every step is manual and the deployment screen is where the last attempt died.
- No git history, no review, no rollback.

### B5 — The admin password is shipped to every visitor's browser. **(security)**

```
.env:  VITE_ADMIN_PASSWORD='<the real password is in .env - not repeated here>'
```

- The `VITE_` prefix means Vite **bakes it into the public JavaScript bundle**.
- Anyone can open dev-tools and read it, then reach the admin donation forms.
- Not caused by this project, but it sits in the same file we are touching.

### B6 — Nothing on the site can *read* the data.

- `src/components/admin/AdminDashboard.tsx` only has "Weekly Donation" and
  "Yearly Donation" **entry** tabs.
- The only way to see registrations is to open the Google Sheet.

### B7 — The Sheet is readable by anyone with the link. **(privacy, confirmed)**

On 2026-08-22 the entire spreadsheet was downloaded **with no login and no
credentials at all**, via:

```
https://docs.google.com/spreadsheets/d/{id}/export?format=csv
https://docs.google.com/spreadsheets/d/{id}/gviz/tq?sheet={tab}&tqx=out:csv
```

Link sharing is set to "anyone with the link can view". That exposes real
devotee records already in the Sheet:

- full names, email addresses, mobile numbers
- complete home addresses (`Seva Registrations`)
- and the `Donations` tab is built to hold **PAN numbers** for 80G receipts

Anyone who is ever forwarded that link — or who finds it in a WhatsApp
group, an email, or a browser history — has the lot.

**Fix (2 minutes, do it now):** Sheet → **Share** → **General access** →
change *"Anyone with the link"* to **"Restricted"**. The robot account added in
section 6 is given Editor access individually, so this change does not affect
the new code at all.

### Live-data findings from that read

| Tab | Real rows | Note |
|---|---|---|
| `Seva Registrations` | ~12 | 2 genuine devotees; the rest are old tests. Phone formats are inconsistent (`9710327735`, `919710327735`, `1`). |
| `Weekly Donations` | 5 | all test entries |
| `Yearly Donations` | 7 | 1 genuine (`shyam Murari Das`); 3 rows have blank Period/Name from early testing |
| `Donations` | **0** | only the `DELETE-ME` test row — **every real donate-page submission before 16 Aug was lost.** This is B1's damage, confirmed. |
| `Prasadam Sponsors` | **0** | only the `DELETE-ME` test row — **no festival registrations have been captured yet**, because the live site still points at the dead script (B2). |

The three `DELETE-ME` rows are still sitting in `Seva Registrations`,
`Donations` and `Prasadam Sponsors`.

---

## 3. What we are building

```
Browser form
   │  POST /api/submit          ← same origin, no CORS, JSON body
   ▼
api/submit.ts                   ← OUR file, in git, deployed by Vercel
   │  1. look up the form in src/config/sheets.ts
   │  2. validate the fields
   │  3. get an access token  (service-account JWT, cached in memory)
   │  4. does the tab exist?  no → batchUpdate/addSheet + write headers
   │  5. values.append the row
   ▼
Google Sheet  (unchanged — same file, same tabs, same columns)
```

**Result:** Apps Script is deleted. Every line of logic lives in this repo.

---

## 4. File-by-file change list

### New files

| File | What it does |
|---|---|
| `api/submit.ts` | The one endpoint every form posts to. Validates, authenticates, creates the tab if missing, appends the row, returns a real success/failure. |
| `api/_sheets.ts` | Small helper: JWT → access token (cached ~55 min), `listTabs()`, `addTab()`, `appendRow()`. Plain `fetch`, matching the style of `api/imagekit-list.ts`. |
| `api/_forms.ts` | The single list of forms → tab name + column order + required fields. **Moved server-side** (was planned as `src/config/sheets.ts`) so the column layout never ships to the browser. |
| `src/lib/submitForm.ts` | One shared browser-side function: `POST /api/submit`, read the JSON reply, throw on failure. Replaces four copy-pasted `fetch` blocks. |

### Changed files

| File | Change |
|---|---|
| `src/components/OfferService.tsx` | Swap the fire-and-forget `fetch` for `submitForm('seva', {...})`. **Fixes B1.** |
| `src/components/Donation.tsx` | Same swap. **Fixes B1 + B3** (PAN and address stop travelling in the URL). |
| `src/components/admin/DonationForm.tsx` | Same swap, for both weekly and yearly. **Fixes B1.** |
| `src/components/SponsorPrasadam.tsx` | Same swap. Already reads the reply, so this is a simplification, not a bug fix. |
| `src/config/sponsorship.ts` | `SPONSOR_SHEET_NAME` moves into `src/config/sheets.ts` so tab names live in one place. |
| `.env` / `.env.local` / `.env.example` | Remove `VITE_SEVA_SCRIPT_URL`. Add `GOOGLE_SHEETS_SPREADSHEET_ID` and `GOOGLE_SERVICE_ACCOUNT_JSON` (no `VITE_` prefix → **never** reaches the browser). |
| `package.json` | Drop `@supabase/supabase-js` (Supabase is dead here). **No new dependency needed** - see section 5. |

### Deleted

| File | Why |
|---|---|
| `../code.gs` | Apps Script gone. |
| `../COPY_THIS_INTO_APPS_SCRIPT.txt` | Same. |
| `../app_script_code.md`, `../app_script_code_v2.md` | Same. |

### Untouched

- The Google Sheet itself — same file, same tabs, same columns, same rows.
- The priest's workflow. He still opens the same Sheet on his phone.
- All page design and copy.

---

## 5. The Google API calls we will use

All verified against Google's own reference pages on 2026-08-22.

| Job | Call |
|---|---|
| Get an access token | Hand-signed RS256 JWT via node's built-in `node:crypto`, POSTed to `oauth2.googleapis.com/token`. **Zero dependencies** - `google-auth-library` turned out to be unnecessary, and this matches how `api/imagekit-list.ts` already works. Proven working 2026-08-22. |
| List existing tabs | `GET /v4/spreadsheets/{id}?fields=sheets.properties.title` |
| Create a missing tab | `POST /v4/spreadsheets/{id}:batchUpdate` with `AddSheetRequest` — *"Adds a new sheet."* |
| Write the header row | `PUT /v4/spreadsheets/{id}/values/{tab}!A1` |
| Append a submission | `POST /v4/spreadsheets/{id}/values/{tab}!A1:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS` |

### Quotas (Google's own limits page, updated 2026-07-31)

- 300 read + 300 write requests per minute per project
- 60 read + 60 write per minute per user
- **No daily limit**
- **Free.** (Google notes that *exceeding* quota "is planned to incur charges…
  later in 2026" — we will not be near it.)

### Capacity

- **10 million cells per spreadsheet** (Google Drive limits page).
- The five tabs together average ~8 columns → roughly **1.2 million rows**.

---

## 6. One-time setup — the only manual work

About 15 minutes, once, never repeated.

1. `console.cloud.google.com` → new project, name `hk-temple`
2. Search **Google Sheets API** → **Enable**
3. **Credentials → Create credentials → Service account**, name `temple-bot`
4. Open it → **Keys → Add key → JSON** → a file downloads
5. Inside is an email like `temple-bot@hk-temple.iam.gserviceaccount.com`
6. Open the Google Sheet → **Share** → paste that email → **Editor**
7. Hand the JSON file over → it goes into Vercel as `GOOGLE_SERVICE_ACCOUNT_JSON`

After this there is no Google screen to visit again. Deploying a change is
`git push`.

---

## 7. Inputs needed before coding starts

1. ~~The **Google Sheet URL**~~ — **received 2026-08-22.** Spreadsheet ID is
   `166HNBGqNfuKVys-YEJ-jMYSJHDOj9KOEt6TuPjBhHFY`. It goes into Vercel as
   `GOOGLE_SHEETS_SPREADSHEET_ID`.
2. [x] **Service-account JSON** - received 2026-08-22.
   Robot: `temple-bot@hidden-lyceum-461216-i4.iam.gserviceaccount.com`
   (project `hidden-lyceum-461216-i4`, not `hk-temple` - an existing project was
   reused, which is fine).
   Verified end to end on 2026-08-22: signed a JWT, got a token, listed all five
   tabs, created a throwaway tab, appended rows, read them back, deleted the tab.
   WARNING: the key file still sits in the Downloads folder. Move it to
   `hk_webiste/temple-bot-key.json`, outside the git repo.

---

## 8. Out of scope for this project

Named so they don't get forgotten.

- **B5, the exposed admin password.** Real, and worth a separate small project
  (move the check to `api/admin-login.ts`, drop the `VITE_` prefix).
- **B6, an admin screen that reads registrations.** A "Registrations" tab in the
  admin portal with search and CSV download. Nice, but the Sheet already covers it.
- Duplicate blocking (same WhatsApp number twice).
- A nightly backup copy of the Sheet.
- Adding new tabs/forms — the code will support it; we just aren't adding one now.

---

## 9. Order of work

**Phase 0 — DONE 2026-08-22**
- [x] Vercel `VITE_SEVA_SCRIPT_URL` now serves `AKfycbyArxB...`. Verified by reading
  the deployed bundle at `hare-krishna-website.vercel.app/assets/index-DpCO6DWr.js`.
  **B2 fixed - the live festival form saves again.**
- [x] Sheet link sharing set to Restricted. Verified: an unauthenticated CSV export
  now returns **HTTP 401**. **B7 fixed.**
- [ ] Still to do: delete the three `DELETE-ME` test rows from the Sheet.
- Commit the uncommitted festival work (`SponsorPopup.tsx`, `SponsorPrasadam.tsx`,
  `src/config/`, and the 8 modified components) — none of it is in git yet.

**Phase 1 — DONE 2026-08-22, built and switched OFF**
- [x] One-time Google setup (section 6). Robot verified end to end.
- [x] `api/_sheets.ts`, `api/_forms.ts`, `api/submit.ts`, `src/lib/submitForm.ts` written.
- [x] `GOOGLE_SHEETS_SPREADSHEET_ID` + `GOOGLE_SERVICE_ACCOUNT_JSON` added to
      `.env.local` (gitignored via `.env*.local`). Key file moved out of Downloads
      to `hk_webiste/temple-bot-key.json`, outside the repo.
- [x] `tsc --strict` clean on all four files.
- [x] Self-test run against a throwaway tab `__api_selftest__`, then deleted.
      8/8 cases passed. Verified in the real spreadsheet:
      - header row created automatically on first write
      - server-side IST timestamp (`22/8/2026, 3:12:45 pm`)
      - `09710327735`, `919710327735` and `97103 27735` all normalised to `+919710327735`
      - a name starting with `=` stored as text, not evaluated as a formula
      - all five real tabs untouched
- [x] The live forms still use Apps Script. Nothing user-facing changed.
- [ ] **Remaining before Phase 3:** add the same two `GOOGLE_*` env vars in
      Vercel → Settings → Environment Variables. Only Vignesh can do this.

**Phase 2 — 28 Aug, festival**
- No deploys. The proven path runs.

**Phase 3 — 29 Aug onward**
- Point the four form components at `submitForm()`.
- Test all five forms end to end on the real Sheet.
- Deploy. Delete the Apps Script files. Remove the Apps Script deployment in Google.

---

## 10. Risks

| Risk | Mitigation |
|---|---|
| Rewriting all five forms could break one that works today | Phase 3 tests each of the five, one at a time, against the real Sheet |
| Service-account key leaking | No `VITE_` prefix → server-only. Never in the bundle. Key is revocable from Google Cloud. |
| Doing this before 28 Aug | We don't. Phase 1 is written but dark; the switch is Phase 3. |
| `vercel.json` rewrites `/(.*)` → `/index.html` | Vercel checks functions before rewrites — `api/imagekit-list.ts` already proves `/api/*` works in production |
| Sheet columns drift from `src/config/sheets.ts` | Column list lives in exactly one file; the code writes headers from it when creating a tab |

---

## Sources

- Sheets API usage limits — https://developers.google.com/workspace/sheets/api/limits (updated 2026-07-31)
- `AddSheetRequest` — https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets/request#addsheetrequest
- `values.append` — https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets.values/append
- Drive file limits (10M cells) — https://support.google.com/drive/answer/37603
- Service accounts — https://developers.google.com/workspace/guides/create-credentials
- `google-auth-library` JWT — https://github.com/googleapis/google-auth-library-nodejs
