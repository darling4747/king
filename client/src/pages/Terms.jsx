import React from 'react';
import SEO from '../components/SEO';

export default function Terms() {
  return (
    <>
      <SEO 
        title="Terms & Conditions" 
        description="JALA Connect terms and conditions policy." 
      />

      <section className="bg-slate-900 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Terms & Conditions</h1>
          <p className="text-slate-400 mt-2 text-sm font-mono">Last updated: July 15, 2026</p>
        </div>
      </section>

      <section className="py-16 px-6 max-w-4xl mx-auto prose prose-slate dark:prose-invert">
        <div className="space-y-8 text-slate-700 dark:text-slate-350 leading-relaxed text-sm md:text-base">
          <p>
            By exploring or using the JALA Connect portal, you agree to comply with the terms, clauses, and guidelines described here. If you object to these terms, please stop accessing the portal.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 border-b border-slate-200 dark:border-slate-800 pb-2">
            1. Scope of Service & Authorization
          </h2>
          <p>
            JALA Connect is a public placement registry. HR managers and verification panels are granted license to run lookup queries strictly to confirm student status for active hires. Commercial extraction, web scraping, or automated polling of cell records is strictly prohibited and constitutes a violation of these terms.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 border-b border-slate-200 dark:border-slate-800 pb-2">
            2. Trainee Responsibility
          </h2>
          <p>
            Candidates are responsible for supplying accurate, verified email tags and cell coordinates. Dissemination of fake certifications or false project completion records will trigger immediate profile deactivation.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 border-b border-slate-200 dark:border-slate-800 pb-2">
            3. Disclaimer of Placement Guarantees
          </h2>
          <p>
            While JALA Academy coordinates training boot camps and manages placement matches, JALA Connect acts as a matching facilitator. Final hire results depend on independent corporate evaluations, panel assessments, and developer coding performances.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 border-b border-slate-200 dark:border-slate-800 pb-2">
            4. Service Outages
          </h2>
          <p>
            We aim to maintain 99.9% uptime for lookup verification widgets. However, maintenance updates or host provider issues may cause temporary portal access limits. JALA Connect is not liable for onboarding delays caused by temporary server downtime.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 border-b border-slate-200 dark:border-slate-800 pb-2">
            5. Governance Clauses
          </h2>
          <p>
            These terms are regulated by the laws of Hyderabad, India. Any legal disputes arising from portal operations will fall under the exclusive jurisdiction of the regional courts.
          </p>
        </div>
      </section>
    </>
  );
}
