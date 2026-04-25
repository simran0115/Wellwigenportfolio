import React from 'react';
import "./App.css";
import "./index.css";
import { Helmet } from 'react-helmet-async';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar from "./components/common/Navbar";
import ParticlesBackground from "./components/ui/ParticlesBackground";
import AdminLayout from "./components/layout/AdminLayout";

// Home / Website Pages
import Hero from './components/home/Hero';
import Ecosystem from "./components/home/Ecosystem";
import Pricing from "./components/subscription/Pricing";
import Dashboard from "./components/dashboard/Dashboard";
import Diet from "./components/dashboard/Diet";
import Testimonials from './components/Testimonials';
import Metrics from './components/home/Metrics';
import ContactUs from './components/home/ContactUs';
import Footer from './components/common/Footer';
import TermsAndConditions from './components/TermsAndConditions';
import ConsultationForm from './components/auth/ConsultationForm';
import Login from './components/auth/Login';

// Admin Pages
import UserDashboard from "./components/dashboard/pages/UserDashboard";
import MedicalRecords from "./components/dashboard/pages/MedicalRecords";
import Prescriptions from "./components/dashboard/pages/Prescriptions";
import Insurance from "./components/dashboard/pages/Insurance";
import Appointments from "./components/dashboard/pages/Appointments";
import Doctors from "./components/dashboard/pages/Doctors";
import Settings from "./components/dashboard/pages/Settings";
import AdminVendors from "./components/dashboard/pages/AdminVendors";

import Cart from "./pages/Cart";

// ✅ Vendor Imports
import Register from "./vendor/Register";
import VendorLogin from "./vendor/Login";
import VendorDashboard from "./vendor/VendorDashboard";
import AddProduct from "./vendor/AddProduct";
// import MyStore from "./vendor/MyStore";

function App() {
  const location = useLocation();

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