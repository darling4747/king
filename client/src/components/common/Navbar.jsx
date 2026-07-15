import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiLock } from 'react-icons/fi';
import useScroll from '../../hooks/useScroll';
import { NAV_LINKS } from '../../constants/navigation';
import Button from '../ui/Button';

export default function Navbar() {
  const scrolled = useScroll(20);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg shadow-lg shadow-slate-100/10 dark:shadow-slate-950/50 py-3 border-b border-slate-200/50 dark:border-slate-800/40' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          onClick={closeMenu}
          className="flex items-center gap-2 text-2xl font-extrabold text-slate-900 dark:text-white"
        >
          <span className="text-brand-500">JALA</span>
          <div className="w-7 h-5 flex items-center justify-center border-2 border-brand-500 rounded relative overflow-hidden">
            <span className="w-1 h-1 bg-brand-500 rounded-full absolute top-1 left-1"></span>
            <span className="w-2.5 h-[1.5px] bg-brand-500 rotate-[40deg]"></span>
          </div>
          <span className="font-semibold text-slate-600 dark:text-slate-300 text-lg">Connect</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-medium transition-colors hover:text-brand-500 text-base ${
                  isActive ? 'text-brand-500' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span 
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1.5 left-0 w-full h-[2px] bg-brand-500 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/admin">
            <Button variant="secondary" size="sm" className="gap-2 text-sm px-4">
              <FiLock className="w-3.5 h-3.5" />
              Admin Portal
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={toggleMenu}
          className="p-2 rounded-xl md:hidden text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800/80 px-6 py-6 absolute top-full left-0 overflow-hidden shadow-xl"
          >
            <nav className="flex flex-col gap-5 mb-6">
              {NAV_LINKS.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={closeMenu}
                    className={`font-semibold text-lg transition-colors py-1 ${
                      isActive ? 'text-brand-500 border-l-2 border-brand-500 pl-3' : 'text-slate-700 dark:text-slate-300 pl-1'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <div className="flex flex-col gap-3 pt-4 border-t border-slate-100 dark:border-slate-850">
              <Link to="/admin" onClick={closeMenu} className="w-full">
                <Button variant="secondary" size="md" className="w-full gap-2 justify-center">
                  <FiLock className="w-4 h-4" />
                  Admin Portal
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
