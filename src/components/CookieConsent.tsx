import React, { useState, useEffect } from 'react';
import { X, Cookie, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Show banner after a short delay
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setShowBanner(false);
    // Clear any existing cookies/storage except consent
    // Note: In production, you would clear all non-essential cookies here
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
      <div className="bg-ink border-t-2 border-saffron">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Icon and Message */}
            <div className="flex items-start space-x-4 flex-1">
              <div className="flex-shrink-0">
                <Cookie className="text-saffron" size={40} />
              </div>
              <div className="text-paper">
                <h3 className="font-display font-medium text-lg mb-2 flex items-center">
                  <Shield size={20} className="mr-2 text-saffron" />
                  We Value Your Privacy
                </h3>
                <p className="text-sm text-paper/80 leading-relaxed">
                  We use cookies to enhance your browsing experience, serve personalized content, and analyze our
                  traffic. By clicking "Accept All", you consent to our use of cookies.
                  {' '}
                  <Link to="/privacy" className="text-saffron hover:text-saffron-ink underline">
                    Learn more
                  </Link>
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button
                onClick={handleDecline}
                className="px-6 py-3 rounded-sm font-medium border border-paper/30 text-paper hover:bg-paper/10 transition-colors duration-200 flex items-center justify-center"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="btn-primary"
              >
                Accept All
              </button>
            </div>

            {/* Close button (optional) */}
            <button
              onClick={handleDecline}
              className="absolute top-2 right-2 md:relative md:top-auto md:right-auto text-paper/60 hover:text-paper transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>

          {/* Additional Links */}
          <div className="mt-4 text-center md:text-left">
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
              <Link to="/privacy" className="text-paper/60 hover:text-saffron transition-colors">
                Privacy Policy
              </Link>
              <span className="text-paper/40">|</span>
              <Link to="/terms" className="text-paper/60 hover:text-saffron transition-colors">
                Terms of Service
              </Link>
              <span className="text-paper/40">|</span>
              <button
                onClick={() => {
                  localStorage.removeItem('cookieConsent');
                  localStorage.removeItem('cookieConsentDate');
                  setShowBanner(true);
                }}
                className="text-paper/60 hover:text-saffron transition-colors"
              >
                Cookie Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
