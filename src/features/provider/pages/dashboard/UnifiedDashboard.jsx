import React from 'react';
import NutritionDashboard from './NutritionDashboard';

const UnifiedDashboard = () => {
  try {
    return (
      <div id="unified-dashboard-container">
        <NutritionDashboard />
      </div>
    );
  } catch (error) {
    console.error("Dashboard Render Error:", error);
    return <div className="p-20 text-red-500">Error loading dashboard. Please check console.</div>;
  }
};

export default UnifiedDashboard;
