
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Dashboard as DashboardComponent } from '@/components/dashboard/Dashboard';

const Dashboard = () => {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Driver Dashboard</h1>
        <DashboardComponent />
      </div>
    </AppLayout>
  );
};

export default Dashboard;
