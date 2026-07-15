import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBriefcase, FiMapPin, FiClock, FiDollarSign, FiX, FiCheckCircle } from 'react-icons/fi';
import SEO from '../components/SEO';
import SectionTitle from '../components/common/SectionTitle';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { DEPARTMENTS, JOBS } from '../constants/careers';
import { fadeIn, staggerContainer } from '../utils/animation';

export default function Careers() {
  const [selectedDept, setSelectedDept] = useState('All');
  const [activeJobModal, setActiveJobModal] = useState(null);
  
  // Application Form State
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantPortfolio, setApplicantPortfolio] = useState('');
  const [applicantCover, setApplicantCover] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const filteredJobs = selectedDept === 'All' 
    ? JOBS 
    : JOBS.filter(job => job.department === selectedDept);

  const handleApplyClick = (job) => {
    setActiveJobModal(job);
    setFormSubmitted(false);
  };

  const handleCloseModal = () => {
    setActiveJobModal(null);
    clearForm();
  };

  const clearForm = () => {
    setApplicantName('');
    setApplicantEmail('');
    setApplicantPhone('');
    setApplicantPortfolio('');
    setApplicantCover('');
    setFormSubmitted(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!applicantName || !applicantEmail || !applicantPhone) {
      alert("Please fill in all required fields.");
      return;
    }
    // Simulate successful form submission
    setFormSubmitted(true);
    setTimeout(() => {
      handleCloseModal();
    }, 3000);
  };

  return (
    <>
      <SEO 
        title="Careers" 
        description="Join the JALA Connect family or match with our partner network. Find open positions in React Development, QA Automation, and more." 
      />

      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-20 relative overflow-hidden px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.05),transparent)] pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="text-brand-400 font-bold text-xs uppercase tracking-wider bg-brand-500/10 border border-brand-500/25 px-3.5 py-1 rounded-full">
            Grow With Us
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-4 tracking-tight">Open Job Openings</h1>
          <p className="text-slate-400 mt-4 text-lg max-w-xl mx-auto leading-relaxed">
            Build production-grade systems and matching pipelines. Explore openings at JALA and our partner ecosystem.
          </p>
        </div>
      </section>

      {/* Filter Tabs & Job Listings */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Department filter tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-12 border-b border-slate-200 dark:border-slate-800 pb-6">
            {DEPARTMENTS.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  selectedDept === dept
                    ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-brand-500/40 hover:text-brand-500'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Job count info */}
          <div className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-6">
            Showing {filteredJobs.length} position(s) in <span className="text-brand-500 font-bold">{selectedDept}</span>
          </div>

          {/* Listings Grid */}
          <div className="space-y-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <Card 
                  key={job.id} 
                  hoverEffect="lift" 
                  className="p-6 md:p-8 border border-slate-200/50 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                >
                  <div className="space-y-3 max-w-2xl">
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="px-2.5 py-1 bg-brand-500/10 text-brand-500 rounded-lg text-xs font-bold uppercase tracking-wide">
                        {job.department}
                      </span>
                      <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-lg text-xs font-semibold">
                        {job.type}
                      </span>
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                      {job.title}
                    </h3>
                    
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-2">
                      {job.summary}
                    </p>

                    {/* Metadata chips */}
                    <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium">
                      <span className="flex items-center gap-1.5"><FiMapPin /> {job.location}</span>
                      <span className="flex items-center gap-1.5"><FiClock /> {job.experience}</span>
                      <span className="flex items-center gap-1.5"><FiDollarSign /> {job.salary}</span>
                    </div>
                  </div>

                  <Button 
                    onClick={() => handleApplyClick(job)}
                    variant="primary" 
                    size="md" 
                    className="w-full md:w-auto"
                  >
                    Apply Now
                  </Button>
                </Card>
              ))
            ) : (
              <div className="text-center py-16 bg-white dark:bg-slate-900/20 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                <FiBriefcase className="w-12 h-12 text-slate-350 dark:text-slate-700 mx-auto mb-4" />
                <p className="text-slate-500 dark:text-slate-400 font-medium">No open roles found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Application Modal Popup */}
      <AnimatePresence>
        {activeJobModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative z-10 p-6 md:p-8"
            >
              {/* Close Button */}
              <button 
                onClick={handleCloseModal}
                className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-white transition-colors"
                aria-label="Close application form"
              >
                <FiX className="w-5 h-5" />
              </button>

              {formSubmitted ? (
                /* Success screen */
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center text-center py-12 gap-4"
                >
                  <FiCheckCircle className="w-16 h-16 text-emerald-500 animate-bounce" />
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Application Received!</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm">
                    Thank you for applying for the **{activeJobModal.title}** role. Our placement team will contact you at **{applicantEmail}** shortly.
                  </p>
                </motion.div>
              ) : (
                /* Form screen */
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-bold text-brand-500 uppercase tracking-wide">Applying For Role</span>
                    <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                      {activeJobModal.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-medium mt-1">
                      {activeJobModal.department} | {activeJobModal.location}
                    </p>
                  </div>

                  {/* Requirements summary */}
                  <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-850/60 text-xs md:text-sm">
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Core Requirements:</h4>
                    <ul className="list-disc pl-4 space-y-1 text-slate-650 dark:text-slate-400">
                      {activeJobModal.requirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Form Submission */}
                  <form onSubmit={handleFormSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        required
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 outline-none focus:border-brand-500 dark:focus:border-brand-500 transition-colors text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="email" 
                        required
                        value={applicantEmail}
                        onChange={(e) => setApplicantEmail(e.target.value)}
                        placeholder="johndoe@gmail.com"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 outline-none focus:border-brand-500 dark:focus:border-brand-500 transition-colors text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="tel" 
                        required
                        value={applicantPhone}
                        onChange={(e) => setApplicantPhone(e.target.value)}
                        placeholder="9876543210"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 outline-none focus:border-brand-500 dark:focus:border-brand-500 transition-colors text-sm"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                        Resume / Portfolio Link
                      </label>
                      <input 
                        type="url" 
                        value={applicantPortfolio}
                        onChange={(e) => setApplicantPortfolio(e.target.value)}
                        placeholder="https://github.com/johndoe"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 outline-none focus:border-brand-500 dark:focus:border-brand-500 transition-colors text-sm"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                        Cover Letter / Statement of Purpose
                      </label>
                      <textarea 
                        rows="3" 
                        value={applicantCover}
                        onChange={(e) => setApplicantCover(e.target.value)}
                        placeholder="Briefly tell us why you are a good fit for this role."
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 outline-none focus:border-brand-500 dark:focus:border-brand-500 transition-colors text-sm resize-none"
                      />
                    </div>

                    <div className="sm:col-span-2 flex gap-4 pt-4 border-t border-slate-100 dark:border-slate-850">
                      <Button 
                        type="submit" 
                        variant="primary" 
                        size="md" 
                        className="flex-grow py-3 text-sm tracking-wider uppercase"
                      >
                        Submit Application
                      </Button>
                      <button 
                        type="button" 
                        onClick={handleCloseModal}
                        className="px-5 border border-slate-250 dark:border-slate-750 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm font-semibold"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
