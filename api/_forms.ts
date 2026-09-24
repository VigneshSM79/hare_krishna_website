// Every form on the site, in one place.
//
// This is the file you edit to add a new form. Nothing else needs to change:
// `api/submit.ts` reads this list, and the tab is created on the first
// submission with `headers` as row 1.
//
// `headers` and `fields` must stay the same length and in the same order —
// `headers[n]` is the column title, `fields[n]` is the key the browser sends.
// The first column of every form is the Timestamp, which the server fills in;
// it is deliberately not something the browser gets to decide.
//
// These column lists were verified against the live spreadsheet on 2026-08-22
// and match the tabs the old Apps Script had been writing to.

export interface FormDefinition {
  /** Tab name inside the spreadsheet. */
  tab: string;
  /** Row 1 of the tab, written when the tab is first created. */
  headers: string[];
  /** Keys sent by the browser, aligned with `headers`. */
  fields: string[];
  /** Fields that must arrive non-empty, or the submission is rejected. */
  required: string[];
  /** Fields holding an Indian mobile number, normalised to +91XXXXXXXXXX. */
  phoneFields?: string[];
}

export const FORMS: Record<string, FormDefinition> = {
  seva: {
    tab: 'Seva Registrations',
    headers: ['Timestamp', 'Name', 'Email', 'Phone', 'Address', 'Services'],
    fields: ['timestamp', 'name', 'email', 'phone', 'address', 'services'],
    required: ['name', 'phone', 'services'],
    phoneFields: ['phone'],
  },

  donation: {
    tab: 'Donations',
    headers: [
      'Timestamp', 'Name', 'Phone', 'Amount', 'Category', 'Transaction ID', 'Notes',
      '80G Receipt', 'PAN', 'Door/Flat', 'Building', 'Street', 'Area', 'State', 'City', 'Pincode',
    ],
    fields: [
      'timestamp', 'name', 'phone', 'amount', 'category', 'transactionId', 'notes',
      'want80G', 'pan', 'addressDoor', 'addressBuilding', 'addressStreet', 'addressArea',
      'state', 'city', 'pincode',
    ],
    required: ['name', 'phone', 'amount', 'category'],
    phoneFields: ['phone'],
  },

  prasadam: {
    tab: 'Prasadam Sponsors',
    headers: ['Timestamp', 'Name', 'WhatsApp', 'Area', 'Sponsorship'],
    fields: ['timestamp', 'name', 'whatsapp', 'area', 'sponsorship'],
    required: ['name', 'whatsapp', 'area', 'sponsorship'],
    phoneFields: ['whatsapp'],
  },

  weekly: {
    tab: 'Weekly Donations',
    headers: ['Timestamp', 'Period', 'Donor Name', 'Phone', 'Amount', 'Payment Mode', 'Notes'],
    fields: ['timestamp', 'period', 'donorName', 'phone', 'amount', 'paymentMode', 'notes'],
    required: ['period', 'donorName', 'amount'],
    phoneFields: ['phone'],
  },

  yearly: {
    tab: 'Yearly Donations',
    headers: ['Timestamp', 'Period', 'Donor Name', 'Phone', 'Amount', 'Payment Mode', 'Notes'],
    fields: ['timestamp', 'period', 'donorName', 'phone', 'amount', 'paymentMode', 'notes'],
    required: ['period', 'donorName', 'amount'],
    phoneFields: ['phone'],
  },
};

export type FormKey = keyof typeof FORMS;

/**
 * Accepts the ways Indians actually type a mobile number and returns one
 * canonical form. Returns null when it clearly isn't a mobile number.
 *
 * The old forms wrote whatever was typed, which is why the sheet currently
 * holds `9710327735`, `919710327735` and `1` in the same column. The priest
 * messages this list on WhatsApp, so consistency is not cosmetic.
 *
 * Mirrors `normalizeWhatsApp` in src/config/sponsorship.ts — that one guards
 * the browser form so the devotee gets an instant error; this one guards the
 * sheet, because the browser can be bypassed.
 */
export function normalizePhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, '');
  const isMobile = (ten: string) => /^[6-9]\d{9}$/.test(ten);

  if (digits.length === 10 && isMobile(digits)) return `+91${digits}`;
  if (digits.length === 11 && digits.startsWith('0') && isMobile(digits.slice(1)))
    return `+91${digits.slice(1)}`;
  if (digits.length === 12 && digits.startsWith('91') && isMobile(digits.slice(2)))
    return `+91${digits.slice(2)}`;

  return null;
}

/** "22/08/2026, 03:45:12 pm" — what the priest already sees in the sheet. */
export function indianTimestamp(): string {
  return new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
}
