import React from 'react';
import "./styles/App.css";
import "./styles/index.css";
import { Helmet } from 'react-helmet-async';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Navbar from "./components/common/Navbar";
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
import TrainerForm from './components/TrainerForm';

// Admin Pages
import UserDashboard from "./features/dashboard/pages/UserDashboard";
import AdminCategories from "./features/admin/pages/AdminCategories";
// ProductCatalog is now integrated into UserDashboard as 'Vendor Products'
import MedicalRecords from "./features/dashboard/pages/MedicalRecords";
import Prescriptions from "./features/dashboard/pages/Prescriptions";
import Appointments from "./features/dashboard/pages/Appointments";
import Doctors from "./features/dashboard/pages/Doctors";
import Settings from "./features/dashboard/pages/Settings";
import AdminVendors from "./features/admin/pages/AdminVendors";
import ProviderVerification from "./features/admin/pages/ProviderVerification";
import AdminDashboard from "./features/admin/pages/AdminDashboard";



import Cart from "./features/shop/pages/Cart";

// ✅ Feature Imports
import Pricing from "./features/subscription/pages/PricingPage";
import Register from "./features/provider/pages/onboarding/OnboardingWizard";
import OnboardingWizard from "./features/provider/pages/onboarding/OnboardingWizard";
import ProviderStatus from "./features/provider/pages/onboarding/ProviderStatus";
import UnifiedDashboard from "./features/provider/pages/dashboard/UnifiedDashboard";
import PharmacyDashboard from "./features/provider/pages/dashboard/PharmacyDashboard";
import TrainerDashboard from "./features/provider/pages/dashboard/TrainerDashboard";

// Legacy Vendor Imports (to be migrated)
import VendorLogin from "./features/provider/legacy/Login";
import AddProduct from "./features/provider/legacy/AddProduct";
// import MyStore from "./vendor/MyStore";

// Route guard to prevent wrong dashboard access and enforce approved status
function ProviderProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem("providerToken") || localStorage.getItem("vendorToken");
  const infoRaw = localStorage.getItem("providerInfo") || localStorage.getItem("vendorInfo");
  const status = localStorage.getItem("providerStatus") || localStorage.getItem("vendorStatus");
  
  if (!token || !infoRaw) {
    return <Navigate to="/vendor/login" replace />;
  }
  
  let info = {};
  try {
    info = JSON.parse(infoRaw);
  } catch (e) {
    console.error("Failed to parse providerInfo:", e);
    return <Navigate to="/vendor/login" replace />;
  }
  
  const type = (info.type || "").toUpperCase(); // e.g. "DOCTOR", "LAB", "PHARMACY", "TRAINER", "NUTRITION", "VENDOR"
  
  // Enforce Approved Status
  if (status !== "approved") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] p-8 border border-slate-100">
          <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 font-bold">⚠️</div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Access Restricted</h2>
          <p className="mt-2 text-sm text-slate-500 leading-relaxed">
            Your application is currently in status: <span className="font-bold uppercase text-amber-600 bg-amber-50 px-2 py-0.5 rounded">{status || "pending"}</span>.
          </p>
          <p className="mt-2 text-xs text-slate-400 leading-relaxed">
            Once administrators approve your application, you will receive an email with your credentials to access your secure portal.
          </p>
          <button 
            onClick={() => { localStorage.clear(); window.location.href = "/vendor/login"; }} 
            className="mt-8 w-full py-3.5 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-slate-200"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }
  
  // Enforce Role Alignment & Prevent Wrong Dashboard Access
  if (allowedRole && type !== allowedRole.toUpperCase()) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] p-8 border border-slate-100">
          <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 font-bold">🚫</div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Access Prohibited</h2>
          <p className="mt-2 text-sm text-slate-500 leading-relaxed">
            You are registered as a <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">{type}</span>.
          </p>
          <p className="mt-2 text-xs text-slate-400 leading-relaxed">
            You do not have authorization to view the <span className="font-bold text-rose-600 uppercase">{allowedRole}</span> dashboard.
          </p>
          <button 
            onClick={() => { window.location.href = `/${type.toLowerCase()}/dashboard`; }} 
            className="mt-8 w-full py-3.5 bg-[#009688] text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#00796B] transition-all shadow-xl shadow-emerald-200"
          >
            Go to My Dashboard
          </button>
        </div>
      </div>
    );
  }
  
  return children;
}

function App() {
  const location = useLocation();
  const BASE_URL = import.meta.env.VITE_API_URL;

  return (
    <div className="min-h-screen bg-white text-black">
      <Toaster position="top-right" reverseOrder={false} />

      {/* ✅ Hide Navbar for Admin, Vendor, and Provider Pages */}
      {!location.pathname.startsWith("/admin") &&
       !location.pathname.startsWith("/vendor") &&
       !location.pathname.startsWith("/provider") && 
       !location.pathname.startsWith("/lab") && 
       !location.pathname.startsWith("/pharmacy") && 
       !location.pathname.startsWith("/trainer") && 
       !location.pathname.startsWith("/dashboard") && <Navbar />}

        <Routes location={location} key={location.pathname}>

          {/* ================= ADMIN ROUTES ================= */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          
          <Route path="/admin/manage" element={<AdminLayout />}>
            <Route path="medical-records" element={<MedicalRecords />} />
            <Route path="prescriptions" element={<Prescriptions />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="doctors" element={<Doctors />} />
            <Route path="settings" element={<Settings />} />
            <Route path="vendors" element={<AdminVendors />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="verification" element={<ProviderVerification />} />
          </Route>



          {/* ✅ Flat Admin Route Aliases to prevent 404s from Sidebar links */}
          <Route path="/admin/appointments" element={<AdminLayout><Appointments /></AdminLayout>} />
          <Route path="/admin/medical-records" element={<AdminLayout><MedicalRecords /></AdminLayout>} />
          <Route path="/admin/vendors" element={<AdminLayout><AdminVendors /></AdminLayout>} />
          <Route path="/admin/categories" element={<AdminLayout><AdminCategories /></AdminLayout>} />
          <Route path="/admin/settings" element={<AdminLayout><Settings /></AdminLayout>} />
          <Route path="/admin/verification" element={<AdminLayout><ProviderVerification /></AdminLayout>} />



          {/* ================= VENDOR ROUTES ================= */}
          
          <Route path="/provider/onboarding" element={<OnboardingWizard />} />
          <Route path="/provider/status" element={<ProviderStatus />} />
          <Route path="/vendor/register" element={<OnboardingWizard />} />

          <Route path="/vendor/login" element={
            <PageWrapper>
              <ResponsiveSection>
                <VendorLogin />
              </ResponsiveSection>
            </PageWrapper>
          } />

          {/* ✅ Role-Specific Provider Dashboards */}
          <Route path="/provider/dashboard" element={<ProviderProtectedRoute><UnifiedDashboard /></ProviderProtectedRoute>} />
          <Route path="/doctor/dashboard" element={<ProviderProtectedRoute allowedRole="DOCTOR"><UnifiedDashboard /></ProviderProtectedRoute>} />
          <Route path="/vendor/dashboard" element={<ProviderProtectedRoute allowedRole="VENDOR"><UnifiedDashboard /></ProviderProtectedRoute>} />
          <Route path="/lab/dashboard" element={<ProviderProtectedRoute allowedRole="LAB"><UnifiedDashboard /></ProviderProtectedRoute>} />
          <Route path="/nutrition/dashboard" element={<ProviderProtectedRoute allowedRole="NUTRITION"><UnifiedDashboard /></ProviderProtectedRoute>} />
          <Route path="/pharmacy/dashboard" element={<ProviderProtectedRoute allowedRole="PHARMACY"><PharmacyDashboard /></ProviderProtectedRoute>} />
          <Route path="/trainer/dashboard" element={<ProviderProtectedRoute allowedRole="TRAINER"><TrainerDashboard /></ProviderProtectedRoute>} />
          <Route path="/dashboard" element={<UserDashboard />} />

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
                  <Ecosystem />
                  <Pricing />
                  <ResponsiveSection>
                    <Dashboard />
                  </ResponsiveSection>
                  <ResponsiveSection>
                    <Diet />
                  </ResponsiveSection>
                  <ResponsiveSection>
                    <Testimonials />
                  </ResponsiveSection>
                  <Metrics />
                  <ContactUs />
                </main>

                <Footer />
              </PageWrapper>
            }
          />

          {/* ================= OTHER ROUTES ================= */}
          <Route path="/services" element={<PageWrapper><ResponsiveSection><Dashboard /></ResponsiveSection><Footer /></PageWrapper>} />
          <Route path="/ecosystem" element={<PageWrapper><Ecosystem /><Footer /></PageWrapper>} />
          <Route path="/pricing" element={<PageWrapper><Pricing /><Footer /></PageWrapper>} />
          <Route path="/testimonial" element={<PageWrapper><Testimonials /><Footer /></PageWrapper>} />
          <Route path="/contactus" element={<PageWrapper><ContactUs /><Footer /></PageWrapper>} />
          <Route path="/join-as-trainer" element={<PageWrapper><TrainerForm /><Footer /></PageWrapper>} />

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
    </div>
  );
}

export default App;

/* ================= PAGE WRAPPER ================= */
function PageWrapper({ children }) {
  return (
    <div>{children}</div>
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