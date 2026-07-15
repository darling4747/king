import React from 'react';
import { motion } from 'framer-motion';

export default function Card({ 
  children, 
  hoverEffect = 'lift', // 'lift' | 'glow' | 'none'
  className = '', 
  ...props 
}) {
  const baseStyle = "bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/60 rounded-2xl p-6 shadow-sm";
  
  const hoverStyles = {
    lift: "transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-500/5 hover:border-brand-500/30",
    glow: "transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] hover:border-brand-500/40",
    none: ""
  };
  
  return (
    <div
      className={`${baseStyle} ${hoverStyles[hoverEffect]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
