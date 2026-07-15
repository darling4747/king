import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiAlertOctagon } from 'react-icons/fi';
import SEO from '../components/SEO';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <>
      <SEO 
        title="404 Page Not Found" 
        description="The page you are looking for does not exist on JALA Connect." 
      />

      <div className="min-h-[70vh] flex flex-col justify-center items-center px-6 py-20 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="max-w-md flex flex-col items-center gap-6"
        >
          {/* SVG Animated visual wrapper */}
          <div className="relative w-36 h-36 bg-brand-500/5 rounded-full flex items-center justify-center border border-brand-500/10">
            <FiAlertOctagon className="w-16 h-16 text-brand-500 animate-pulse" />
            <span className="absolute top-0 right-0 w-4 h-4 bg-brand-500 rounded-full animate-ping" />
          </div>

          <div className="space-y-2">
            <h1 className="text-6xl font-black text-slate-900 dark:text-white">404</h1>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Gateway Not Found</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
              We couldn't resolve the route you navigated to. The page may have shifted, or the path could be mistyped.
            </p>
          </div>

          <div className="flex gap-4 w-full pt-4">
            <Link to="/" className="flex-grow">
              <Button variant="primary" size="md" className="w-full gap-2 justify-center">
                <FiHome /> Back to Home
              </Button>
            </Link>
            <Link to="/contact" className="flex-grow">
              <Button variant="secondary" size="md" className="w-full justify-center">
                Report Issue
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}
