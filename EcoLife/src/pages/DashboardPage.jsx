import React from 'react';
import Dashboard from '../components/dashboard/Dashboard';
import RealtimeActivityFeed from '../components/activity/RealtimeActivityFeed';

const DashboardPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Dashboard />
        </div>
        <div className="lg:col-span-1">
          <RealtimeActivityFeed />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;