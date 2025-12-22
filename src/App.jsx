import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import WhatLookingFor from './components/WhatLookingFor';
import Statistics from './components/Statistics';
import GoalsExpertise from './components/GoalsExpertise';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Metrics from './components/Metrics';
import CallToAction from './components/CallToAction';
import About from './components/About';
import Trainer from './components/Trainer';
import ConsultationForm from './components/ConsultationForm';
import Footer from './components/Footer';
import FloatingSocials from './components/FloatingSocials';
import TermsAndConditions from './components/TermsAndConditions';
import AdminPanel from './components/AdminPanel';
import TrainerForm from './components/TrainerForm';
import SectionWrapper from './components/SectionWrapper';
import ContactUs from './components/ContactUs';
import NotFound from './components/NotFound';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Routes>
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/join-as-trainer" element={<>
          <Helmet>
            <title>Join as a Trainer | Wellwigen</title>
            <meta name="description" content="Become a Wellwigen trainer and help clients achieve their fitness goals." />
          </Helmet>
          <Header />
          <TrainerForm />
          <Footer />
        </>} />
        <Route path="/admin-dashboard" element={<AdminPanel />} />
        <Route path="/terms-and-conditions" element={<>
          <Helmet>
            <title>Terms and Conditions | Wellwigen</title>
            <meta name="description" content="Read the terms and conditions for using Wellwigen services." />
          </Helmet>
          <Header />
          <TermsAndConditions />
          <Footer />
        </>} />
        <Route path="/" element={
          <>
            <Helmet>
              <title>Home Fitness Training Online | Wellwigen</title>
              <meta name="description" content="Wellwigen is your premier online fitness training platform. Connect with a top home workout trainer or personal trainer online. Start your workout at home in India today with a dedicated online fitness coach." />
              <meta name="keywords" content="online fitness training, home workout trainer, personal trainer online, workout at home India, online fitness coach, fitness India, home gym, weight loss online, get fit at home, welwigen, well wigen, fitnes training, home work out, personal traner, fittness coach, online zym, jim trainer" />
            </Helmet>
            <Header />
            <main>
              <Hero />
              <SectionWrapper><WhatLookingFor /></SectionWrapper>
              <SectionWrapper><Statistics /></SectionWrapper>
              <SectionWrapper><GoalsExpertise /></SectionWrapper>
              <SectionWrapper><Services /></SectionWrapper>
              <SectionWrapper><Testimonials /></SectionWrapper>
              <SectionWrapper><Metrics /></SectionWrapper>
              <SectionWrapper><CallToAction /></SectionWrapper>
              <SectionWrapper><About /></SectionWrapper>
              <SectionWrapper><Trainer /></SectionWrapper>

              <SectionWrapper><ConsultationForm /></SectionWrapper>
              <SectionWrapper><ContactUs /></SectionWrapper>
            </main>
            <Footer />
            <FloatingSocials />
          </>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
