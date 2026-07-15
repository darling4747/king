import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiAward, FiTrendingUp, FiTarget } from 'react-icons/fi';
import SEO from '../components/SEO';
import SectionTitle from '../components/common/SectionTitle';
import Card from '../components/ui/Card';
import { fadeIn, staggerContainer } from '../utils/animation';

export default function About() {
  const values = [
    {
      icon: <FiTarget className="w-6 h-6 text-brand-500" />,
      title: "Result-Driven Mentorship",
      description: "We don't focus on certificates. We focus on daily projects, production grade systems, and mock interview preparations."
    },
    {
      icon: <FiAward className="w-6 h-6 text-emerald-500" />,
      title: "Registry Transparency",
      description: "Our public lookup gateway verifies student progress directly to recruitment coordinators, ensuring reliable credentials."
    },
    {
      icon: <FiUsers className="w-6 h-6 text-indigo-500" />,
      title: "Placement Equality",
      description: "Bridging the gap for non-traditional candidates, freshers, or career-gap profiles by validating actual coding skills."
    }
  ];

  const milestones = [
    { year: "2023", title: "Launch of JALA Academy", desc: "Started with practical Java testing classes in Hyderabad, onboarding 50+ students." },
    { year: "2024", title: "JALA Connect Portal", desc: "Developed the public verification registry, simplifying candidate pre-screening for 100+ partner IT agencies." },
    { year: "2025", title: "Scale to Fullstack Dev & DevOps", desc: "Expanded syllabus to modern React, Hibernate, Spring, and CI/CD pipelines, increasing placement rate to 92%." },
    { year: "2026", title: "Enterprise Integrations", desc: "Automating matching workflows and candidate tracking dashboards, serving 350+ corporate entities." }
  ];

  return (
    <>
      <SEO 
        title="About Us" 
        description="Learn more about JALA Connect, our mission, vision, history, values, and our dedication to IT placement success." 
      />

      {/* Page Header Hero */}
      <section className="bg-slate-900 text-white py-20 relative overflow-hidden px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.05),transparent)] pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="text-brand-400 font-bold text-xs uppercase tracking-wider bg-brand-500/10 border border-brand-500/25 px-3.5 py-1 rounded-full">
            Our Journey & Vision
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-4 tracking-tight">About JALA Connect</h1>
          <p className="text-slate-400 mt-4 text-lg max-w-xl mx-auto leading-relaxed">
            Bridging the gap between learning academies and full-scale tech placements with transparency and rigor.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={fadeIn('right', 0.5)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Empowering IT Careers, Restructuring Hiring Chains
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              JALA Academy was born from a simple observation: traditional university programs and superficial online courses fail to prepare developers for actual work environments. Furthermore, companies waste thousands of hours checking credentials, running BGV processes, and administering basic coding tests.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              **JALA Connect** acts as the bridge. By hosting a secure public registry, our graduates' skills, courses, and placement statuses are verified in real time, bypassing recruiter gatekeeping and streamlining hiring workflows.
            </p>
          </motion.div>

          <motion.div
            variants={fadeIn('left', 0.5)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="bg-gradient-to-br from-brand-500 to-indigo-600 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-xl" />
            <h3 className="text-2xl font-bold mb-4">Our Commitment</h3>
            <blockquote className="text-lg italic border-l-4 border-white/50 pl-4 mb-6 leading-relaxed">
              "We believe talent is universal, but practical guidance is scarce. Our mission is to equip every dedicated developer with the tools, skills, and validated credentials to secure high-value placements without compromise."
            </blockquote>
            <p className="text-sm font-semibold tracking-wider text-brand-100 uppercase">
              - Someswara Rao, Founder & Principal Architect
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-slate-100/50 dark:bg-slate-900/20 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            subtitle="Core Values" 
            title="The Principles That Direct JALA" 
            description="Our academy curriculum and placement pipelines are driven by professional commitments."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, idx) => (
              <Card key={idx} hoverEffect="lift" className="p-8 flex flex-col gap-4 text-left">
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  {v.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">{v.title}</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{v.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            subtitle="Milestones" 
            title="Our Path of Growth" 
            description="How we evolved from a localized coding boot camp into a SaaS-enabled recruitment network."
          />

          <div className="max-w-3xl mx-auto relative border-l border-slate-200 dark:border-slate-850 pl-8 space-y-12">
            {milestones.map((m, index) => (
              <div key={index} className="relative">
                {/* Bullet */}
                <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full border-4 border-white dark:border-slate-950 bg-brand-500 shadow-sm" />
                
                <span className="text-brand-500 font-extrabold font-mono text-xl">{m.year}</span>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mt-1">{m.title}</h4>
                <p className="text-slate-600 dark:text-slate-400 mt-2 leading-relaxed text-sm md:text-base">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
