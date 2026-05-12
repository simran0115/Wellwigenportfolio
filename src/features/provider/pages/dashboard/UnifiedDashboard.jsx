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

  try {
    return (
      <div id="unified-dashboard-container">
        {renderDashboard()}
      </div>
    );
  } catch (error) {
    console.error("Dashboard Render Error:", error);
    return <div className="p-20 text-red-500 text-center">
      <h2 className="text-2xl font-bold">Error loading dashboard</h2>
      <p className="mt-2 text-slate-500">Please check console or try logging in again.</p>
    </div>;
  }
};

export default UnifiedDashboard;
