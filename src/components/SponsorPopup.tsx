import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, UtensilsCrossed } from 'lucide-react';
import {
  POPUP_DELAY_MS,
  POPUP_SNOOZE_DAYS,
  POPUP_STORAGE_KEY,
  SHOW_SPONSOR_POPUP,
  SPONSOR_COPY,
  SPONSOR_ROUTE,
} from '../config/sponsorship';

type StoredDecision = { status: 'registered' | 'dismissed'; at: number };

/**
 * Reads the visitor's past decision and answers: should we open the popup?
 * - registered → never again
 * - dismissed  → stay quiet for POPUP_SNOOZE_DAYS
 */
function shouldOpen(): boolean {
  try {
    const raw = localStorage.getItem(POPUP_STORAGE_KEY);
    if (!raw) return true;

    const decision = JSON.parse(raw) as StoredDecision;
    if (decision.status === 'registered') return false;

    const snoozeMs = POPUP_SNOOZE_DAYS * 24 * 60 * 60 * 1000;
    return Date.now() - decision.at > snoozeMs;
  } catch {
    // Corrupt value or storage unavailable — showing it once is the safe default.
    return true;
  }
}

function remember(status: StoredDecision['status']) {
  try {
    localStorage.setItem(POPUP_STORAGE_KEY, JSON.stringify({ status, at: Date.now() }));
  } catch {
    // Private browsing — the popup simply reappears next visit.
  }
}

/**
 * A modal invitation to register for prasadam sponsorship.
 *
 * It opens by itself a couple of seconds after load and then WAITS. There is no
 * auto-dismiss timer: the visitor either goes to the registration page or
 * closes it and carries on browsing the site.
 */
const SponsorPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const dialogRef = useRef<HTMLDivElement>(null);

  // Never interrupt someone who is already on the registration page, or a
  // devotee marking their rounds on the private Virage Vidya page.
  const onSponsorPage =
    location.pathname === SPONSOR_ROUTE || location.pathname === '/virage-vidya';

  // `?popup=1` forces it open no matter what was stored before. Handy for
  // testing, and for showing the popup to someone who has already dismissed it.
  const forceOpen = new URLSearchParams(location.search).get('popup') === '1';

  useEffect(() => {
    if (!SHOW_SPONSOR_POPUP || onSponsorPage) return;
    if (!forceOpen && !shouldOpen()) return;

    const timer = setTimeout(() => setIsOpen(true), POPUP_DELAY_MS);
    return () => clearTimeout(timer);
  }, [onSponsorPage, forceOpen]);

  const close = () => {
    remember('dismissed');
    setIsOpen(false);
  };

  /**
   * Clicking through to the form is NOT the same as registering — plenty of
   * people land on the page and never submit. So we only snooze here. The
   * permanent "never show again" flag is set by the form on a successful
   * submit (see SponsorPrasadam.tsx → markSponsorRegistered).
   */
  const accept = () => {
    remember('dismissed');
    setIsOpen(false);
  };

  // While the dialog is up: lock background scrolling, allow Escape to close,
  // and move focus into the dialog for keyboard and screen-reader users.
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
    // `close` is stable enough here — it only calls setState.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={close}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-[2px]" aria-hidden="true" />

      {/* Card — stopPropagation so clicking inside doesn't close it */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sponsor-popup-heading"
        tabIndex={-1}
        onClick={event => event.stopPropagation()}
        className="relative w-full max-w-md bg-paper border border-line rounded-md shadow-xl outline-none"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute top-3 right-3 p-2 text-stone hover:text-ink transition-colors"
        >
          <X size={20} />
        </button>

        <div className="px-7 pt-9 pb-7 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-md bg-saffron/10 mb-5">
            <UtensilsCrossed className="text-saffron" size={24} />
          </div>

          <p className="eyebrow mb-3">{SPONSOR_COPY.eyebrow}</p>

          <h2
            id="sponsor-popup-heading"
            className="font-display font-medium text-2xl text-ink mb-3 leading-tight"
          >
            {SPONSOR_COPY.popupHeading}
          </h2>

          <p className="text-stone leading-relaxed mb-7">{SPONSOR_COPY.popupBody}</p>

          <div className="flex flex-col gap-3">
            <Link to={SPONSOR_ROUTE} onClick={accept} className="btn-primary w-full">
              {SPONSOR_COPY.primaryCta}
            </Link>
            <button
              type="button"
              onClick={close}
              className="font-sans font-medium text-stone hover:text-ink transition-colors py-1"
            >
              {SPONSOR_COPY.dismissCta}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorPopup;
