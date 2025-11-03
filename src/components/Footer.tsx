import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    { icon: Facebook, href: '#', color: 'hover:text-blue-600' },
    { icon: Instagram, href: '#', color: 'hover:text-pink-600' },
    { icon: Twitter, href: '#', color: 'hover:text-blue-400' },
    { icon: Youtube, href: 'https://www.youtube.com/@HareKrishnaTempleAvadi', color: 'hover:text-red-600' }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {/* Temple Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">🕉</span>
                </div>
                <div>
                  <h3 className="font-bold text-xl">Hare Krishna Temple Avadi</h3>
                  <p className="text-gray-400">Hare Krishna Temple</p>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed">
                Dedicated to spreading the Hare Krishna Maha Mantra and the teachings of Lord Sri Chaitanya Mahaprabhu to 
                serving the spiritual needs of the Avadi community.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3 text-gray-300">
                  <MapPin size={16} className="text-orange-500 mt-1 flex-shrink-0" />
                  <span className="text-sm">147, Chinnamman Koil St, Paruthippattu, Ambattur, Avadi, Chennai - 600054</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-bold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Programs */}
            <div>
              <h4 className="text-xl font-bold mb-6">Our Programs</h4>
              <ul className="space-y-3">
                {programs.map((program, index) => (
                  <li key={index}>
                    <a
                      href={program.href}
                      className="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-sm"
                    >
                      {program.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter & Social */}
            <div>
              <h4 className="text-xl font-bold mb-6">Stay Connected</h4>
              
              <p className="text-gray-300 text-sm mb-4">
                Subscribe to our newsletter for updates on events and spiritual programs.
              </p>
              
              <div className="space-y-4">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 rounded-l-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-orange-500"
                  />
                  <button className="bg-orange-500 px-4 py-2 rounded-r-lg hover:bg-orange-600 transition-colors duration-200">
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
                        className={`text-gray-400 ${social.color} transition-colors duration-200`}
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
          <div className="border-t border-gray-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm">
                © 2024 Hare Krishna Temple Avadi. All rights reserved.
              </div>
              
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <span>Made with</span>
                <Heart size={16} className="text-red-500" />
                <span>for spiritual community</span>
              </div>
              
              <div className="flex space-x-6 text-sm">
                <Link to="/privacy" className="text-gray-400 hover:text-orange-400 transition-colors duration-200">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-gray-400 hover:text-orange-400 transition-colors duration-200">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>

          {/* Temple Quote */}
          <div className="mt-8 text-center">
            <blockquote className="text-gray-300 italic text-lg">
              "Hare Krishna, Hare Krishna, Krishna Krishna, Hare Hare,<br />
              Hare Rama, Hare Rama, Rama Rama, Hare Hare"
            </blockquote>
            <p className="text-orange-400 text-sm mt-2">The Maha Mantra for Spiritual Enlightenment</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;