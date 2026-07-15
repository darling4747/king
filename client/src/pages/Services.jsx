import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiCode, FiCheckSquare, FiUserPlus, FiMonitor, FiCpu, 
  FiSliders, FiArrowRight, FiPieChart, FiTrendingUp 
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import SectionTitle from '../components/common/SectionTitle';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { fadeIn } from '../utils/animation';

export default function Services() {
  const serviceList = [
    {
      icon: <FiCode className="w-6 h-6 text-brand-500" />,
      title: "Full Stack Java/React Boot Camp",
      description: "Comprehensive development path featuring Core Java, JDBC, Hibernate, Spring Boot microservices, and React.js frontend structures. Designed with actual coding tasks.",
      features: ["Microservice Architecture", "Rest API Design", "React hooks & performance", "Relational Database normalization"]
    },
    {
      icon: <FiCheckSquare className="w-6 h-6 text-emerald-500" />,
      title: "Automation QA Engineering",
      description: "Transform manual testers or freshers into test automation architects. Covers Core Java/JS, Selenium Webdriver, Playwright, Cypress, Page Object Model (POM), and Jenkins.",
      features: ["API Automation (RestAssured)", "UI Automation Frameworks", "CI/CD execution pipelines", "Git branch workflows"]
    },
    {
      icon: <FiUserPlus className="w-6 h-6 text-indigo-500" />,
      title: "Verified Placement Registry",
      description: "We list successful candidates on our public verification registry. Recruitment panels check skills, courses, and active statuses directly online, bypassing typical background verification friction.",
      features: ["BGV check verification", "Candidate profile sheets", "Placement status logs", "Enterprise list filters"]
    },
    {
      icon: <FiCpu className="w-6 h-6 text-rose-500" />,
      title: "Corporate Talent Sourcing",
      description: "Direct partnerships for IT agencies to source pre-vetted engineers. We provide candidates ready to deploy on billing projects, reducing onboarding periods and training costs.",
      features: ["Vetted developer pipelines", "Direct hiring matching", "Corporate panel coordination", "On-demand hackathons"]
    }
  ];

  return (
    <>
      <SEO 
        title="Our Services" 
        description="Explore the professional services, mentoring boot camps, candidate registry verification, and corporate talent sourcing offered by JALA Connect." 
      />

      {/* Hero Header */}
      <section className="bg-slate-900 text-white py-20 relative overflow-hidden px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.05),transparent)] pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="text-brand-400 font-bold text-xs uppercase tracking-wider bg-brand-500/10 border border-brand-500/25 px-3.5 py-1 rounded-full">
            Our Capability Suite
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-4 tracking-tight">Services & Programs</h1>
          <p className="text-slate-400 mt-4 text-lg max-w-xl mx-auto leading-relaxed">
            From technical mentoring to secure credential validation, we empower the complete IT career loop.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            subtitle="What We Offer" 
            title="Custom Solutions for Candidates and Corporates" 
            description="Our specialized programs are designed to meet modern IT staffing requirements."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {serviceList.map((service, index) => (
              <Card 
                key={index} 
                hoverEffect="glow" 
                className="p-8 border border-slate-200/50 dark:border-slate-800/80 bg-white dark:bg-slate-900/50 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-850 flex items-center justify-center mb-6">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base mb-6">
                    {service.description}
                  </p>
                  
                  {/* Feature bullet list */}
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex gap-2 items-center text-xs md:text-sm text-slate-700 dark:text-slate-300 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-850 flex justify-between items-center">
                  <span className="text-xs font-bold text-brand-500 uppercase tracking-wider">Professional Grade</span>
                  <Link to="/contact">
                    <Button variant="secondary" size="sm" className="gap-2 text-xs">
                      Enquire Program <FiArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recruitment Partnership CTA Section */}
      <section className="py-20 bg-slate-100/50 dark:bg-slate-900/20 px-6">
        <div className="max-w-5xl mx-auto rounded-3xl bg-slate-950 text-white p-8 md:p-12 relative overflow-hidden border border-slate-850">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-[100px]" />
          
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="max-w-xl space-y-4">
              <span className="text-jala-accent text-xs font-bold uppercase tracking-wider">Enterprise Collaboration</span>
              <h3 className="text-2xl md:text-3xl font-extrabold">Partner With Our Placements Wing</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Reduce BGV timelines, eliminate candidate search friction, and hire pre-screened developers matching your tech criteria. Integrate JALA Connect with your talent pipeline.
              </p>
            </div>
            
            <Link to="/contact" className="w-full md:w-auto">
              <Button variant="jala" size="lg" className="w-full md:w-auto px-8">
                Initiate Partnership
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
