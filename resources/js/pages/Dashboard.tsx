import React from 'react';
import {
  WelcomeSection,
  StatsGrid,
  ActivitySection,
  QuickActions
} from '@/Components/Layouts/DashboardComponents';
import AdminLayout from '@/Layouts/AdminLayout';

const Dashboard: React.FC = () => {
  return (
    <>
      <AdminLayout>


        <button className='bg-primary p-4 text-black rounded-lg'>vf</button>
        <WelcomeSection />
        <StatsGrid />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ActivitySection />
          <QuickActions />
        </div>
      </AdminLayout>

    </>
  );
};

export default Dashboard;