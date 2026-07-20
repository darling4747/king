import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import Loader from '../components/common/Loader';
import AdminPortal, { AdminGuard } from '../pages/AdminPortal';

const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Services = lazy(() => import('../pages/Services'));
const Careers = lazy(() => import('../pages/Careers'));
const Contact = lazy(() => import('../pages/Contact'));
const PrivacyPolicy = lazy(() => import('../pages/PrivacyPolicy'));
const Terms = lazy(() => import('../pages/Terms'));
const AdminLogin = lazy(() => import('../pages/AdminLogin'));
const CandidateAdmin = lazy(() => import('../pages/CandidateAdmin'));
const CandidateAdminLogin = lazy(() => import('../pages/CandidateAdmin').then((module) => ({ default: module.CandidateAdminLogin })));
const CandidateAdminGuard = lazy(() => import('../pages/CandidateAdmin').then((module) => ({ default: module.CandidateAdminGuard })));
const NotFound = lazy(() => import('../pages/NotFound'));

const adminPage = (section) => (
  <AdminGuard>
    <AdminPortal section={section} />
  </AdminGuard>
);

export default function AppRoutes() {
  const adminEntry = import.meta.env.VITE_ADMIN_ENTRY === 'true';

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route index element={adminEntry ? <Navigate to="/candidate-login" replace /> : <Home />} />
        <Route path="login" element={<AdminLogin />} />
        <Route path="admin" element={<AdminLogin />} />
        <Route path="candidate-login" element={<CandidateAdminLogin />} />
        <Route path="candidate-admin" element={<CandidateAdminGuard><CandidateAdmin /></CandidateAdminGuard>} />
        <Route path="dashboard" element={adminPage('dashboard')} />
        <Route path="employees" element={adminPage('employees')} />
        <Route path="departments" element={adminPage('departments')} />
        <Route path="designations" element={adminPage('designations')} />
        <Route path="skills" element={adminPage('skills')} />
        <Route path="countries" element={adminPage('countries')} />
        <Route path="states" element={adminPage('states')} />
        <Route path="cities" element={adminPage('cities')} />
        <Route path="profile" element={adminPage('profile')} />

        <Route element={<RootLayout />}>
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="careers" element={<Careers />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-and-conditions" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
