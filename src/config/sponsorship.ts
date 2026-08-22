// Single place to control the "Sponsor Prasadam" registration drive.
// The priest can ask for wording or timing changes — edit them here, not in
// three different components.

/** Route of the full registration page. */
export const SPONSOR_ROUTE = '/sponsor-prasadam';

/** Master switches. Set either to false to retire that surface. */
export const SHOW_SPONSOR_BANNER = true;
export const SHOW_SPONSOR_POPUP = true;

/** How long after page load the popup appears (ms). */
export const POPUP_DELAY_MS = 2000;

/**
 * If someone closes the popup without registering, don't show it again for
 * this many days. It never auto-closes — only the visitor closes it.
 */
export const POPUP_SNOOZE_DAYS = 7;

/** localStorage key holding the visitor's popup decision. */
export const POPUP_STORAGE_KEY = 'hkt_prasadam_popup_v1';

/** Copy used by the banner and the popup, so the two never drift apart. */
export const SPONSOR_COPY = {
  bannerShort: 'Register to sponsor prasadam',
  eyebrow: 'Prasadam Seva',
  popupHeading: 'Register to Sponsor Prasadam',
  popupBody:
    'Prasadam — the sanctified feast — is offered to every devotee who comes to the temple. Share your details so we can welcome you, and let us know if you would like to sponsor a feast.',
  primaryCta: 'Register Now',
  dismissCta: 'Maybe later',
};

/**
 * Neighbourhoods around the Avadi temple, in the order the priest asked for —
 * Annanur first. "Other" reveals a free-text box.
 */
export const AREAS = [
  'Annanur',
  'Avadi',
  'Ambattur',
  'Thirumullaivoyal',
  'Pattabiram',
  'Poonamallee',
  'Anna Nagar',
  'Villivakkam',
  'Other',
];

export type SponsorshipId = 'weekly' | 'monthly' | 'one-time' | 'not-now';

export const SPONSORSHIP_OPTIONS: {
  id: SponsorshipId;
  label: string;
  description: string;
}[] = [
  {
    id: 'weekly',
    label: 'Weekly',
    description: 'Sponsor the prasadam feast every week',
  },
  {
    id: 'monthly',
    label: 'Monthly',
    description: 'Sponsor the prasadam feast once a month',
  },
  {
    id: 'one-time',
    label: 'One-time',
    description: 'Sponsor a single feast on a day of your choosing',
  },
  {
    id: 'not-now',
    label: 'Not right now',
    description: "I'd simply like to attend and receive prasadam",
  },
];

/**
 * Accepts the ways Indians actually type a mobile number and returns it in a
 * single canonical form, or null when it clearly isn't a mobile number.
 * Keeping the sheet clean matters — the priest messages this list on WhatsApp.
 */
export function normalizeWhatsApp(raw: string): string | null {
  const digits = raw.replace(/\D/g, '');
  const isMobile = (ten: string) => /^[6-9]\d{9}$/.test(ten);

  if (digits.length === 10 && isMobile(digits)) return `+91${digits}`;
  if (digits.length === 11 && digits.startsWith('0') && isMobile(digits.slice(1)))
    return `+91${digits.slice(1)}`;
  if (digits.length === 12 && digits.startsWith('91') && isMobile(digits.slice(2)))
    return `+91${digits.slice(2)}`;

  return null;
}

/** Records that this visitor registered, so the popup never bothers them again. */
export function markSponsorRegistered() {
  try {
    localStorage.setItem(
      POPUP_STORAGE_KEY,
      JSON.stringify({ status: 'registered', at: Date.now() })
    );
  } catch {
    // Private browsing / storage disabled — nothing to do.
  }
}
