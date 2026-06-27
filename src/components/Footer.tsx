import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import LotusMark from './LotusMark';

const Footer = () => {
  const quickLinks = [
    { label: 'About Us', href: '#about' },
    { label: 'Programs', href: '#programs' },
    { label: 'Events', href: '#events' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' }
  ];

  const programs = [
    { label: 'Daily Arati', href: '#' },
    { label: 'Bhagavad Gita Classes', href: '#' },
    { label: 'Sunday Feast', href: '#' },
    { label: 'Youth Programs', href: '#' },
    { label: 'Kirtan Sessions', href: '#' }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#' },
    { icon: Instagram, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Youtube, href: 'https://www.youtube.com/@HareKrishnaTempleAvadi' }
  ];

  return (
    <footer className="bg-ink text-paper">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {/* Temple Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-md bg-paper/5 border border-paper/15 flex items-center justify-center">
                  <LotusMark size={26} />
                </div>
                <div>
                  <h3 className="font-display font-medium text-xl">Hare Krishna Temple Avadi</h3>
                  <p className="text-paper/60">Hare Krishna Temple</p>
                </div>
              </div>

              <p className="text-paper/80 leading-relaxed">
                Dedicated to spreading the Hare Krishna Maha Mantra and the teachings of Lord Sri Chaitanya Mahaprabhu to
                serving the spiritual needs of the Avadi community.
              </p>

              <div className="space-y-3">
                <div className="flex items-start space-x-3 text-paper/80">
                  <MapPin size={16} className="text-saffron mt-1 flex-shrink-0" />
                  <span className="text-sm">147, Chinnamman Koil St, Paruthippattu, Ambattur, Avadi, Chennai - 600054</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display font-medium text-xl mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-paper/80 hover:text-saffron transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Programs */}
            <div>
              <h4 className="font-display font-medium text-xl mb-6">Our Programs</h4>
              <ul className="space-y-3">
                {programs.map((program, index) => (
                  <li key={index}>
                    <a
                      href={program.href}
                      className="text-paper/80 hover:text-saffron transition-colors duration-200 text-sm"
                    >
                      {program.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter & Social */}
            <div>
              <h4 className="font-display font-medium text-xl mb-6">Stay Connected</h4>

              <p className="text-paper/80 text-sm mb-4">
                Subscribe to our newsletter for updates on events and spiritual programs.
              </p>

              <div className="space-y-4">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 rounded-l-sm bg-paper/5 border border-paper/15 text-paper text-sm focus:outline-none focus:border-saffron"
                  />
                  <button className="bg-saffron px-4 py-2 rounded-r-sm hover:bg-saffron-ink transition-colors duration-200">
                    <Mail size={16} />
                  </button>
                </div>

                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-paper/60 hover:text-saffron transition-colors duration-200"
                      >
                        <IconComponent size={20} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-paper/15 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-paper/60 text-sm">
                © 2024 Hare Krishna Temple Avadi. All rights reserved.
              </div>

              <div className="flex items-center space-x-2 text-paper/60 text-sm">
                <span>Made with</span>
                <Heart size={16} className="text-saffron" />
                <span>for spiritual community</span>
              </div>

              <div className="flex space-x-6 text-sm">
                <Link to="/privacy" className="text-paper/60 hover:text-saffron transition-colors duration-200">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-paper/60 hover:text-saffron transition-colors duration-200">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>

          {/* Temple Quote */}
          <div className="mt-8 text-center">
            <blockquote className="font-display text-paper/80 italic text-lg">
              "Hare Krishna, Hare Krishna, Krishna Krishna, Hare Hare,<br />
              Hare Rama, Hare Rama, Rama Rama, Hare Hare"
            </blockquote>
            <p className="text-saffron text-sm mt-2">The Maha Mantra for Spiritual Enlightenment</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
