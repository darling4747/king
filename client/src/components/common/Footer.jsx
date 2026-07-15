import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiFacebook, FiTwitter, FiYoutube } from 'react-icons/fi';
import { NAV_LINKS, LEGAL_LINKS, COMPANY_INFO } from '../../constants/navigation';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialIcons = {
    facebook: <FiFacebook className="w-5 h-5" />,
    twitter: <FiTwitter className="w-5 h-5" />,
    linkedin: <FiLinkedin className="w-5 h-5" />,
    youtube: <FiYoutube className="w-5 h-5" />,
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Brand Information */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-2xl font-extrabold text-white">
            <span className="text-brand-500">JALA</span>
            <div className="w-7 h-5 flex items-center justify-center border-2 border-brand-500 rounded relative overflow-hidden">
              <span className="w-1 h-1 bg-brand-500 rounded-full absolute top-1 left-1"></span>
              <span className="w-2.5 h-[1.5px] bg-brand-500 rotate-[40deg]"></span>
            </div>
            <span className="font-semibold text-slate-300 text-lg">Connect</span>
          </div>
          <p className="text-slate-400 leading-relaxed text-sm">
            {COMPANY_INFO.tagline}
          </p>
          <div className="flex gap-4 mt-2">
            {Object.keys(COMPANY_INFO.socials).map((platform) => (
              <a
                key={platform}
                href={COMPANY_INFO.socials[platform]}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-brand-500 hover:text-white transition-all hover:border-brand-500"
                aria-label={`Visit our ${platform} page`}
              >
                {socialIcons[platform]}
              </a>
            ))}
          </div>
        </div>

        {/* Navigation Quick Links */}
        <div>
          <h4 className="text-white font-semibold text-base mb-6 tracking-wide uppercase">Quick Links</h4>
          <ul className="flex flex-col gap-3.5">
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <Link 
                  to={link.path}
                  className="hover:text-white transition-colors text-sm font-medium"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal Page Links */}
        <div>
          <h4 className="text-white font-semibold text-base mb-6 tracking-wide uppercase">Legal & Compliance</h4>
          <ul className="flex flex-col gap-3.5">
            {LEGAL_LINKS.map((link) => (
              <li key={link.path}>
                <Link 
                  to={link.path}
                  className="hover:text-white transition-colors text-sm font-medium"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link 
                to="/admin"
                className="hover:text-white transition-colors text-sm font-medium"
              >
                Admin Authorization
              </Link>
            </li>
          </ul>
        </div>

        {/* Direct Contact details */}
        <div>
          <h4 className="text-white font-semibold text-base mb-6 tracking-wide uppercase">Contact Us</h4>
          <ul className="flex flex-col gap-4 text-sm">
            <li className="flex gap-3 items-start">
              <FiMapPin className="text-brand-500 w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{COMPANY_INFO.address}</span>
            </li>
            <li className="flex gap-3 items-center">
              <FiPhone className="text-brand-500 w-5 h-5 flex-shrink-0" />
              <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-white transition-colors">{COMPANY_INFO.phone}</a>
            </li>
            <li className="flex gap-3 items-center">
              <FiMail className="text-brand-500 w-5 h-5 flex-shrink-0" />
              <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white transition-colors">{COMPANY_INFO.email}</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer copyright section */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <p>&copy; {currentYear} JALA Academy / JALA Connect. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Designed and Architected to SaaS Standards
        </p>
      </div>
    </footer>
  );
}
