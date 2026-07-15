import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';
import Card from './ui/Card';

export default function Testimonials({ items }) {
  const [current, setCurrent] = useState(0);

  const handlePrev = () => {
    setCurrent(prev => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent(prev => (prev === items.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="relative min-h-[320px] md:min-h-[280px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card hoverEffect="glow" className="p-8 md:p-10 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-brand-500/20 shadow-md">
                  <img 
                    src={items[current].image} 
                    alt={items[current].name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>
              
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-center md:justify-start gap-1 mb-3 text-amber-500">
                    {[...Array(items[current].rating)].map((_, i) => (
                      <FiStar key={i} className="fill-current w-5 h-5" />
                    ))}
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 text-lg md:text-xl italic font-medium leading-relaxed mb-6">
                    "{items[current].quote}"
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    {items[current].name}
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {items[current].role} at <span className="text-brand-500 font-semibold">{items[current].company}</span>
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Navigation Controls */}
      <div className="flex items-center justify-between mt-8 max-w-xs mx-auto">
        <button
          onClick={handlePrev}
          className="p-3 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-brand-500 hover:text-white transition-all text-slate-700 dark:text-slate-300"
          aria-label="Previous testimonial"
        >
          <FiChevronLeft className="w-5 h-5" />
        </button>
        
        <div className="flex gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === current 
                  ? 'bg-brand-500 w-6' 
                  : 'bg-slate-300 dark:bg-slate-700 hover:bg-brand-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="p-3 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-brand-500 hover:text-white transition-all text-slate-700 dark:text-slate-300"
          aria-label="Next testimonial"
        >
          <FiChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
