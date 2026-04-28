import React from 'react';
import "./App.css";
import "./index.css";
import { Helmet } from 'react-helmet-async';
import { Routes, Route, useLocation } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';

import Navbar from "./components/common/Navbar";
import ParticlesBackground from "./components/ui/ParticlesBackground";
import AdminLayout from "./features/dashboard/layout/AdminLayout";

// Home / Website Pages
import Hero from './features/home/components/Hero';
import Ecosystem from "./features/home/components/Ecosystem";
// Pricing is now imported from features
import Dashboard from "./features/dashboard/components/Dashboard";
import Diet from "./features/dashboard/components/Diet";
import Testimonials from './components/Testimonials';
import Metrics from './features/home/components/Metrics';
import ContactUs from './features/home/components/ContactUs';
import Footer from './components/common/Footer';
import TermsAndConditions from './components/TermsAndConditions';
import ConsultationForm from './features/auth/components/ConsultationForm';
import Login from './features/auth/components/Login';

// Admin Pages
import UserDashboard from "./features/dashboard/components/pages/UserDashboard";
import MedicalRecords from "./features/dashboard/components/pages/MedicalRecords";
import Prescriptions from "./features/dashboard/components/pages/Prescriptions";
import Insurance from "./features/dashboard/components/pages/Insurance";
import Appointments from "./features/dashboard/components/pages/Appointments";
import Doctors from "./features/dashboard/components/pages/Doctors";
import Settings from "./features/dashboard/components/pages/Settings";
import AdminVendors from "./features/dashboard/components/pages/AdminVendors";

import Cart from "./features/shop/pages/Cart";

// ✅ Feature Imports
import Pricing from "./features/subscription/pages/PricingPage";
import Register from "./features/provider/pages/VendorRegister";

// Legacy Vendor Imports (to be migrated)
import VendorLogin from "./features/provider/legacy/Login";
import VendorDashboard from "./features/provider/legacy/VendorDashboard";
import AddProduct from "./features/provider/legacy/AddProduct";
// import MyStore from "./vendor/MyStore";

function App() {
  const location = useLocation();
  const BASE_URL = import.meta.env.VITE_API_URL;

  return (
    <div className="min-h-screen bg-white text-black">

      <ParticlesBackground />

      {/* ✅ Hide Navbar for Admin + Vendor Dashboard Pages */}
      {!location.pathname.startsWith("/admin") &&
       !location.pathname.startsWith("/vendor") && <Navbar />}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>

          {/* ================= ADMIN ROUTES ================= */}
          <Route path="/cart" element={<Cart />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<UserDashboard />} />
            <Route path="medical-records" element={<MedicalRecords />} />
            <Route path="prescriptions" element={<Prescriptions />} />
            <Route path="insurance" element={<Insurance />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="doctors" element={<Doctors />} />
            <Route path="settings" element={<Settings />} />
            <Route path="vendors" element={<AdminVendors />} />
          </Route>

          {/* ================= VENDOR ROUTES ================= */}
          
          <Route path="/vendor/register" element={
            <PageWrapper>
              <ResponsiveSection>
                <Register />
              </ResponsiveSection>
            </PageWrapper>
          } />

          <Route path="/vendor/login" element={
            <PageWrapper>
              <ResponsiveSection>
                <VendorLogin />
              </ResponsiveSection>
            </PageWrapper>
          } />

          {/* ✅ Dashboard (Overview only) */}
          <Route path="/vendor/dashboard" element={
            <PageWrapper>
              <VendorDashboard />
            </PageWrapper>
          } />

          {/* ✅ Add Product */}
          <Route path="/vendor/add-product" element={
            <PageWrapper>
              <AddProduct />
            </PageWrapper>
          } />

          {/* ✅ My Store (View Products) */}
          {/* <Route path="/vendor/my-store" element={ */}
            {/* <PageWrapper> */}
              {/* <MyStore /> */}
            {/* </PageWrapper> */}
          {/* } /> */}

          {/* ================= TERMS ================= */}
          <Route
            path="/terms-and-conditions"
            element={
              <PageWrapper>
                <TermsAndConditions />
                <Footer />
              </PageWrapper>
            }
          />

          {/* ================= HOME ================= */}
          <Route
            path="/"
            element={
              <PageWrapper>
                <Helmet>
                  <title>Wellwigen | AI Health System</title>
                </Helmet>

                <main>
                  <Hero />

                  <ResponsiveSection>
                    <Ecosystem />
                  </ResponsiveSection>

                  <ResponsiveSection>
                    <Pricing />
                  </ResponsiveSection>

                  <ResponsiveSection>
                    <Dashboard />
                  </ResponsiveSection>

                  <ResponsiveSection>
                    <Diet />
                  </ResponsiveSection>

                  <ResponsiveSection>
                    <Testimonials />
                  </ResponsiveSection>

                  <ResponsiveSection>
                    <Metrics />
                  </ResponsiveSection>

                  <ResponsiveSection>
                    <ContactUs />
                  </ResponsiveSection>
                </main>

                <Footer />
              </PageWrapper>
            }
          />

          {/* ================= OTHER ROUTES ================= */}
          <Route path="/ecosystem" element={<PageWrapper><Ecosystem /><Footer /></PageWrapper>} />
          <Route path="/pricing" element={<PageWrapper><Pricing /><Footer /></PageWrapper>} />
          <Route path="/dashboard" element={<PageWrapper><Dashboard /><Footer /></PageWrapper>} />
          <Route path="/testimonial" element={<PageWrapper><Testimonials /><Footer /></PageWrapper>} />
          <Route path="/contactus" element={<PageWrapper><ContactUs /><Footer /></PageWrapper>} />

          {/* ================= REGISTER ================= */}
          <Route path="/register" element={
            <PageWrapper>
              <ResponsiveSection>
                <ConsultationForm />
              </ResponsiveSection>
              <Footer />
            </PageWrapper>
          } />

          {/* ================= LOGIN ================= */}
          <Route path="/login" element={
            <PageWrapper>
              <ResponsiveSection>
                <Login />
              </ResponsiveSection>
              <Footer />
            </PageWrapper>
          } />

        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;

/* ================= PAGE WRAPPER ================= */
function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
}

/* ================= RESPONSIVE SECTION ================= */
function ResponsiveSection({ children }) {
  return (
    <div className="py-12 px-4 sm:px-6 md:px-12 lg:px-16 max-w-full md:max-w-7xl mx-auto">
      {children}
    </div>
  );
}