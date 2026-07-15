import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../utils/animation';

export default function SectionTitle({ 
  subtitle, 
  title, 
  description, 
  align = 'center',
  className = ''
}) {
  const alignmentClass = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  return (
    <motion.div 
      variants={fadeIn('up', 0.5, 0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-50px' }}
      className={`flex flex-col max-w-3xl mx-auto mb-12 ${alignmentClass[align]} ${className}`}
    >
      {subtitle && (
        <span className="text-brand-500 font-bold uppercase tracking-wider text-sm mb-3 px-3 py-1 bg-brand-500/5 rounded-full border border-brand-500/10">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
