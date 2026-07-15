import React from 'react';

export default function Loader() {
  return (
    <div className="flex-grow min-h-[60vh] flex flex-col justify-center items-center gap-4 py-20">
      {/* Premium glowing double-ring loader */}
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-slate-200 dark:border-slate-800 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-t-brand-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      </div>
      <div className="text-slate-500 dark:text-slate-400 font-medium animate-pulse tracking-wide text-sm">
        Loading connect gateway...
      </div>
    </div>
  );
}
