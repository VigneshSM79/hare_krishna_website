import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import LotusMark from './LotusMark';

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

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const isActive = (href: string) => {
    if (href.startsWith('/#')) return location.pathname === '/';
    return location.pathname === href;
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-paper/95 backdrop-blur-sm border-b border-line">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-[68px]">

          {/* Wordmark */}
          <Link to="/" className="flex items-center gap-3">
            <LotusMark />
            <span className="leading-none">
              <span className="block font-display text-[1.35rem] font-medium text-ink">
                Hare Krishna Temple
              </span>
              <span className="block caption mt-0.5 text-[0.68rem]">Avadi · Chennai</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`relative font-sans text-[0.95rem] font-medium transition-colors duration-200 group ${
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
            <Link to="/donate" className="btn-primary px-5 py-2 text-[0.9rem]">
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

      {/* Mobile nav */}
      {isMenuOpen && (
        <div className="lg:hidden bg-paper border-t border-line">
          <nav className="container mx-auto px-4 py-2">
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
