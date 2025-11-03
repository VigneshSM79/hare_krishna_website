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
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 border-t-4 border-orange-500 shadow-2xl">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Icon and Message */}
            <div className="flex items-start space-x-4 flex-1">
              <div className="flex-shrink-0">
                <Cookie className="text-orange-500" size={40} />
              </div>
              <div className="text-white">
                <h3 className="text-lg font-bold mb-2 flex items-center">
                  <Shield size={20} className="mr-2 text-orange-500" />
                  We Value Your Privacy
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  We use cookies to enhance your browsing experience, serve personalized content, and analyze our
                  traffic. By clicking "Accept All", you consent to our use of cookies.
                  {' '}
                  <Link to="/privacy" className="text-orange-400 hover:text-orange-300 underline">
                    Learn more
                  </Link>
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button
                onClick={handleDecline}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg flex items-center justify-center"
              >
                Accept All
              </button>
            </div>

            {/* Close button (optional) */}
            <button
              onClick={handleDecline}
              className="absolute top-2 right-2 md:relative md:top-auto md:right-auto text-gray-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>

          {/* Additional Links */}
          <div className="mt-4 text-center md:text-left">
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-orange-400 transition-colors">
                Privacy Policy
              </Link>
              <span className="text-gray-600">|</span>
              <Link to="/terms" className="text-gray-400 hover:text-orange-400 transition-colors">
                Terms of Service
              </Link>
              <span className="text-gray-600">|</span>
              <button
                onClick={() => {
                  localStorage.removeItem('cookieConsent');
                  localStorage.removeItem('cookieConsentDate');
                  setShowBanner(true);
                }}
                className="text-gray-400 hover:text-orange-400 transition-colors"
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
