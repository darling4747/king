import React from 'react';
import { motion } from 'framer-motion';
import { buttonHover, buttonTap } from '../../utils/animation';

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) {
  const baseStyle = "inline-flex items-center justify-center font-semibold rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/25",
    secondary: "bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200/10",
    outline: "border-2 border-brand-500 text-brand-500 hover:bg-brand-500/10",
    jala: "bg-jala-accent hover:bg-[#b0eb20] text-jala-bg shadow-md shadow-jala-accent/20",
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3.5 text-lg",
  };
  
  return (
    <motion.button
      whileHover={buttonHover}
      whileTap={buttonTap}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
