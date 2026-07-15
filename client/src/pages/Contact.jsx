import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle } from 'react-icons/fi';
import SEO from '../components/SEO';
import SectionTitle from '../components/common/SectionTitle';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { COMPANY_INFO } from '../constants/navigation';
import { fadeIn } from '../utils/animation';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert("Please fill in all required fields.");
      return;
    }
    // Simulate API request submission
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setSubmitted(false);
    }, 4000);
  };

  return (
    <>
      <SEO 
        title="Contact Us" 
        description="Get in touch with the JALA Connect team. Send us your queries, placement requests, or hiring partnership proposals." 
      />

      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-20 relative overflow-hidden px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.05),transparent)] pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="text-brand-400 font-bold text-xs uppercase tracking-wider bg-brand-500/10 border border-brand-500/25 px-3.5 py-1 rounded-full">
            Connect With Us
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-4 tracking-tight">Contact Placements</h1>
          <p className="text-slate-400 mt-4 text-lg max-w-xl mx-auto leading-relaxed">
            Have questions about career matching, student profiles, or enterprise hiring partnerships? Let's talk.
          </p>
        </div>
      </section>

      {/* Contact Grid Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Sidebar: Info */}
          <motion.div 
            variants={fadeIn('right', 0.5)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mb-4">
                Office Headquarters
              </h2>
              <p className="text-slate-650 dark:text-slate-400 text-sm leading-relaxed">
                Reach out to our placement leads, student coordinators, or client relationship officers directly at the details below.
              </p>
            </div>

            <div className="space-y-6">
              <Card hoverEffect="glow" className="flex items-start gap-4 p-5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30">
                <div className="w-10 h-10 rounded-lg bg-brand-500/10 border border-brand-500/20 text-brand-500 flex items-center justify-center text-lg flex-shrink-0 mt-0.5">
                  <FiMapPin />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">Office Address</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mt-1">
                    {COMPANY_INFO.address}
                  </p>
                </div>
              </Card>

              <Card hoverEffect="glow" className="flex items-start gap-4 p-5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center text-lg flex-shrink-0 mt-0.5">
                  <FiPhone />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">Phone Contact</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mt-1">
                    <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-brand-500 transition-colors font-mono">{COMPANY_INFO.phone}</a>
                  </p>
                </div>
              </Card>

              <Card hoverEffect="glow" className="flex items-start gap-4 p-5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 flex items-center justify-center text-lg flex-shrink-0 mt-0.5">
                  <FiMail />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">Email Support</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mt-1">
                    <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-brand-500 transition-colors font-medium">{COMPANY_INFO.email}</a>
                  </p>
                </div>
              </Card>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div 
            variants={fadeIn('left', 0.5)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <Card hoverEffect="none" className="p-8 border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/50 shadow-lg">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-16 gap-4">
                  <FiCheckCircle className="w-16 h-16 text-emerald-500 animate-bounce" />
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Message Transmitted!</h3>
                  <p className="text-slate-550 dark:text-slate-400 text-sm max-w-sm">
                    Thank you, **{name}**. We have logged your request. One of our recruitment coordinators will follow up shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white">
                      Get In Touch
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm mt-1">
                      Complete this short form to dispatch a direct ticket to our queue.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john.doe@gmail.com"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 outline-none focus:border-brand-500 dark:focus:border-brand-500 transition-colors text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                      Subject Matter
                    </label>
                    <input 
                      type="text" 
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Partnership Request / Placement enquiry"
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 outline-none focus:border-brand-500 dark:focus:border-brand-500 transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
                      Message Content <span className="text-red-500">*</span>
                    </label>
                    <textarea 
                      rows="5" 
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please specify details of your request..."
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 outline-none focus:border-brand-500 dark:focus:border-brand-500 transition-colors text-sm resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="md" 
                    className="w-full py-3.5 gap-2 uppercase text-sm tracking-wider"
                  >
                    <FiSend /> Send Message
                  </Button>
                </form>
              )}
            </Card>
          </motion.div>

        </div>
      </section>
    </>
  );
}
