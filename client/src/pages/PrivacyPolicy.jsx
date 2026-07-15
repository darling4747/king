import React from 'react';
import SEO from '../components/SEO';

export default function PrivacyPolicy() {
  return (
    <>
      <SEO 
        title="Privacy Policy" 
        description="JALA Connect privacy policy guidelines and compliance documentation." 
      />

      <section className="bg-slate-900 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
          <p className="text-slate-400 mt-2 text-sm font-mono">Last updated: July 15, 2026</p>
        </div>
      </section>

      <section className="py-16 px-6 max-w-4xl mx-auto prose prose-slate dark:prose-invert">
        <div className="space-y-8 text-slate-700 dark:text-slate-350 leading-relaxed text-sm md:text-base">
          <p>
            Welcome to **JALA Connect** (referred to as the "Portal", "Platform", or "Service"). We respect your privacy and are committed to safeguarding the personal credentials and lookup registers of our trainees, hiring entities, and background verification agencies.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 border-b border-slate-200 dark:border-slate-800 pb-2">
            1. Information Collection and Storage
          </h2>
          <p>
            We collect personal records, training progress data, and contact logs solely for educational and placement matchmaking services. This includes candidate names, email templates, cell numbers, joining dates, and employment statuses. Candidate status check values are available to search queries via mobile verification.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 border-b border-slate-200 dark:border-slate-800 pb-2">
            2. Registry Status Dissemination
          </h2>
          <p>
            By enrolling in JALA Academy or registering on JALA Connect, candidates explicitly authorize the platform to render their verification logs (such as current placement status and training timelines) to the public portal through phone lookup verification searches. This visibility accelerates BGV timelines for HR hiring coordinators.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 border-b border-slate-200 dark:border-slate-800 pb-2">
            3. Security Actions
          </h2>
          <p>
            We maintain industrial encryption protocols to restrict access to sensitive personal details (such as contact logs and email sheets). Admin dashboards and database operations require active password clearance and session certificates.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 border-b border-slate-200 dark:border-slate-800 pb-2">
            4. Cookie Disclosures
          </h2>
          <p>
            We utilize secure session indicators to preserve state settings, dark/light visual modes, and active route caches. No tracking or telemetry metrics are dispatched to external advertising entities.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 border-b border-slate-200 dark:border-slate-800 pb-2">
            5. Legal Contacts
          </h2>
          <p>
            For any enquiries or suggestions regarding placement records or data corrections, please submit a query via our [Contact Page](/contact) or write directly to our privacy officer at **privacy@jalaacademy.com**.
          </p>
        </div>
      </section>
    </>
  );
}
