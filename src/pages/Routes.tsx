
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import RouteOptimizer from '@/components/routes/RouteOptimizer';

const RoutesPage = () => {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Route Optimizer</h1>
        <RouteOptimizer />
      </div>
    </AppLayout>
  );
};

export default RoutesPage;
