import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DoctorDashboard from './components/DoctorDashboard';
import LabDashboard from './components/LabDashboard';
import PharmacyDashboard from './components/PharmacyDashboard';
import TrainerDashboard from './components/TrainerDashboard';
import FreshProduceDashboard from './components/FreshProduceDashboard';
import MyProducts from './components/MyProducts';

import { 
  MOCK_PROVIDERS, 
} from './mockData';

import './DashboardTheme.css';

const VendorDashboard = () => {
  const getProviderInfo = () => {
    try {
      const info = JSON.parse(localStorage.getItem("providerInfo") || localStorage.getItem("vendorInfo") || "{}");
      return info;
    } catch (e) {
      return MOCK_PROVIDERS.DOCTOR;
    }
  };

  const [realProviderInfo] = useState(getProviderInfo());
  const [providerType, setProviderType] = useState(realProviderInfo?.type?.toUpperCase() || 'DOCTOR'); 
  const [currentView, setCurrentView] = useState('overview'); // 'overview' or 'products'
  
  const providerInfo = { ...(MOCK_PROVIDERS[providerType] || MOCK_PROVIDERS.DOCTOR), ...(realProviderInfo || {}), type: providerType };

  const renderDashboard = () => {
    if (currentView === 'products') {
      return <MyProducts providerInfo={providerInfo} />;
    }

    switch (providerType) {
      case 'DOCTOR':
        return <DoctorDashboard />;
      case 'LAB':
        return <LabDashboard />;
      case 'PHARMACY':
        return <PharmacyDashboard />;
      case 'TRAINER':
        return <TrainerDashboard />;
      case 'VENDOR':
      case 'FRUIT_VENDOR':
        return <FreshProduceDashboard />;
      default:
        return <DoctorDashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F9F8F3] font-sans text-slate-900 selection:bg-teal-100 dashboard-theme">
      <Sidebar providerInfo={providerInfo} currentView={currentView} setCurrentView={setCurrentView} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header providerInfo={providerInfo} />
        
        {renderDashboard()}
      </div>
    </div>
  );
};

export default VendorDashboard;


