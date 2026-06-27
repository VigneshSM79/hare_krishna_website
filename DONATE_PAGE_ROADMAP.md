# Donate Page — Roadmap & Ideas (parked for later)

Captured from a comparison against ISKCON Bangalore's Annadana donation page
(https://donations.iskconbangalore.org/annadana/). This is a backlog, not a commitment.

---

## Where our donate page is today

A **manual UPI flow** (no payment gateway):
1. Hero: "Support the Temple" heading + intro paragraph.
2. QR section: "Scan to Donate via UPI" + a QR image *(note: `/upi-qr.png` is still
   missing — shows a broken image until the real QR is added)*.
3. Form: pick one of 4 categories (Temple Maintenance, Annadanam, Festival Sponsorship,
   Deity Decoration) → Name, Phone, Amount (free text), Transaction/Reference ID, Notes.
4. On submit, the record is written to a Google Sheet ("Donations") via the Apps Script
   URL in `VITE_SEVA_SCRIPT_URL`.
5. Success message.

So: donor pays via their own UPI app, then comes back and records the transaction ID.
No online payment, no automatic receipt.

---

## What the ISKCON Annadana page has

- Banner imagery (desktop + mobile), Krishna-themed visuals, decorative cards.
- Cause description: what Annadana is, daily timing (free lunch prasadam 11:30am–2:00pm),
  scriptural significance.
- **Preset donation tiers tied to outcomes** — 400 / 300 / 200 / 100 *meals*, plus a
  "special day" (birthday/occasion) option, plus a custom amount.
- A **second campaign** on the same page — hall construction sold by square footage
  (1/2/3/4 sq.ft. + custom).
- **Impact numbers** — "feed hundreds daily", goal of "6000 pilgrims daily",
  monthly consumption stats.
- **80G tax-exemption flow** — PAN field, "request 80G certificate" checkbox, full address
  (door, street, area, state dropdown, city, pincode), Finance Act 2021 reference.
- Fuller donor form — Name, **Email**, Mobile, **Date of Birth** (optional → triggers a
  Sankalpa/Archana in the donor's name).
- **Maha Prasadam delivery** — checkbox to receive prasadam, same/different address.
- **Newsletter opt-in.**
- **Terms of Use + Privacy Policy** acceptance (required).
- Repeated clear CTA: "Donate Now".

---

## Gaps on our page (the backlog)

### Cheap, high-value (fit our current manual flow, no backend)
- [ ] **Preset amount buttons** (e.g. ₹500 / ₹1100 / ₹2100 / custom) instead of only a
      free-text field.
- [ ] **Outcome framing** — "₹X sponsors N meals" / what each category funds.
- [ ] **Email field** (for receipts / future certificate).
- [ ] **Special-occasion** option (birthday/anniversary donation in someone's name).
- [ ] **Cause description** + a couple of real **impact numbers**.
- [ ] **Banner / cause imagery** instead of just an icon + heading.
- [ ] **Terms/Privacy acceptance** checkbox on the form.
- [ ] **Newsletter opt-in** checkbox.
- [ ] Fix the missing **`/upi-qr.png`** (add the real UPI QR image).
- [ ] Minor consistency cleanups: page wrapper is still `bg-white` (→ `paper`); error box
      still uses `rounded-xl` (→ `rounded-md`).

### Bigger investments (need backend / eligibility)
- [ ] **80G tax-exemption** — requires the temple to be a registered 80G entity + PAN /
      address capture + certificate generation. Worth it if eligible; non-trivial.
- [ ] **Integrated payment gateway** (Razorpay / PayU / Cashfree) to replace the manual
      "pay then record" flow — biggest jump; needs a backend and automatic confirmation.
- [ ] **Maha Prasadam delivery** option with address capture.

---

## Suggested order when we resume
1. Add the real UPI QR + the cheap form/content wins (preset amounts, outcome framing,
   email, occasion, cause copy, imagery, consent). All doable on the current stack.
2. Decide on 80G eligibility — if yes, add PAN/address + certificate handling.
3. Evaluate a payment gateway only if you want fully online, auto-confirmed donations.
