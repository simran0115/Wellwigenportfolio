import React from 'react';
import NutritionDashboard from './NutritionDashboard';
import LabDashboard from './LabDashboard';
import DoctorDashboard from './DoctorDashboard';

const UnifiedDashboard = () => {
  const providerInfo = JSON.parse(
    localStorage.getItem("providerInfo") || 
    localStorage.getItem("vendorInfo") || 
    localStorage.getItem("user") || 
    "{}"
  );
  
  const path = window.location.pathname.toLowerCase();
  const role = (providerInfo.role || providerInfo.category || '').toLowerCase();
  
  const renderDashboard = () => {
    // Prioritize Path-based routing for explicit URLs
    if (path.includes('/lab')) return <LabDashboard />;
    if (path.includes('/doctor')) return <DoctorDashboard />;
    if (path.includes('/vendor')) return <NutritionDashboard />;
    if (path.includes('/nutrition')) return <NutritionDashboard />;

    // Fallback to Role-based routing
    switch (role) {
      case 'lab':
      case 'diagnostic':
        return <LabDashboard />;
      case 'doctor':
      case 'consultant':
        return <DoctorDashboard />;
      case 'nutrition':
      case 'vendor':
      case 'fresh_produce':
        return <NutritionDashboard />;
      default:
        return <NutritionDashboard />; // Final Fallback
    }
  };

  return (
    <div id="unified-dashboard-container">
      {renderDashboard()}
    </div>
  );
};

export default UnifiedDashboard;
