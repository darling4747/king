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
const NotFound = lazy(() => import('../pages/NotFound'));

const adminPage = (section) => (
  <AdminGuard>
    <AdminPortal section={section} />
  </AdminGuard>
);

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<AdminLogin />} />
        <Route path="admin" element={<Navigate to="/login" replace />} />
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
