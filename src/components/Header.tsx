import React, { useState, useEffect } from 'react';
import { Menu, X, UtensilsCrossed, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { SHOW_SPONSOR_BANNER, SPONSOR_COPY, SPONSOR_ROUTE } from '../config/sponsorship';

const navigationItems = [
  { href: '/#home', label: 'Home' },
  { href: '/#about', label: 'About' },
  { href: '/#programs', label: 'Programs' },
  { href: '/#events', label: 'Events' },
  { href: '/festivals', label: 'Festivals' },
  { href: '/#gallery', label: 'Gallery' },
  { href: '/offer-service', label: 'Offer Service' },
  { href: '/#contact', label: 'Contact' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // The strip is redundant once you're already on the registration page.
  const showBanner = SHOW_SPONSOR_BANNER && location.pathname !== SPONSOR_ROUTE;

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Tell the stylesheet how tall the fixed header currently is, so page
  // content offsets itself correctly with or without the strip.
  useEffect(() => {
    document.body.classList.toggle('has-banner', showBanner);
    return () => document.body.classList.remove('has-banner');
  }, [showBanner]);

  const isActive = (href: string) => {
    // On-page hash links (Home, About, …) aren't persistently highlighted —
    // they only turn saffron on hover. Real route pages stay highlighted.
    if (href.startsWith('/#')) return false;
    return location.pathname === href;
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-paper/95 backdrop-blur-sm border-b border-line">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-[68px]">

          {/* Wordmark */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/temple-emblem.png"
              alt="Hare Krishna Temple emblem"
              width={30}
              height={30}
              className="w-[30px] h-[30px] rounded-full object-cover shrink-0"
            />
            <span className="leading-none">
              <span className="block font-display text-[1.5rem] font-medium text-ink">
                Hare Krishna Temple
              </span>
              <span className="block caption mt-0.5 text-[0.75rem]">Avadi · Chennai</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`relative font-sans text-[1.05rem] font-bold transition-colors duration-200 group ${
                  isActive(item.href) ? 'text-saffron' : 'text-ink hover:text-saffron'
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-px bg-saffron transition-all duration-200 ${
                    isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
            <Link to="/donate" className="btn-primary px-5 py-2 text-[0.95rem]">
              Donate
            </Link>
          </nav>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link to="/donate" className="btn-primary px-4 py-2 text-[0.85rem]">
              Donate
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-ink hover:text-saffron transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Prasadam announcement strip — sits inside the fixed header so it stays
          visible on every page and at every scroll position. Fixed 40px tall;
          keep the copy to one short line so it never wraps on small phones. */}
      {showBanner && (
        <Link
          to={SPONSOR_ROUTE}
          className="flex h-10 items-center justify-center gap-2 bg-saffron text-paper hover:bg-saffron-ink transition-colors px-4"
        >
          <UtensilsCrossed size={15} className="shrink-0" />
          <span className="font-sans text-[0.8rem] sm:text-[0.9rem] font-medium truncate">
            {SPONSOR_COPY.bannerShort}
          </span>
          <span className="hidden sm:inline font-sans text-[0.9rem] font-semibold underline underline-offset-4 shrink-0">
            Register
          </span>
          <ChevronRight size={15} className="sm:hidden shrink-0" />
        </Link>
      )}

      {/* Mobile nav */}
      {isMenuOpen && (
        <div className="lg:hidden bg-paper border-t border-line">
          <nav className="container mx-auto px-4 py-2">
            <Link
              to={SPONSOR_ROUTE}
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2 py-3 font-sans font-semibold text-saffron border-b border-line"
            >
              <UtensilsCrossed size={17} />
              Sponsor Prasadam
            </Link>
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block py-3 font-sans font-medium border-b border-line last:border-0 transition-colors ${
                  isActive(item.href) ? 'text-saffron' : 'text-ink hover:text-saffron'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
