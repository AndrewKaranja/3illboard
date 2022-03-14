import React, { useState } from 'react';

import Sidebar from '../../components/dashboard/Sidebar';
import Header from '../../components/dashboard/Header';
import WelcomeBanner from '../../components/dashboard/WelcomeBanner';
import DashboardCard01 from '../../components/dashboard/CardCustomers';
import DashboardCard02 from '../../components/dashboard/RecentCard';


import Banner from '../../components/dashboard/Banner';
import { withProtected } from '../../hooks/route';

function Dashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Welcome banner */}
            <WelcomeBanner />

           

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">

              {/* Line chart (Acme Plus) */}
              <DashboardCard01 />
              {/* Line chart (Acme Advanced) */}
              <DashboardCard02 />
              {/* Line chart (Acme Professional) */}
              
              
            </div>

          </div>
        </main>

        <Banner />

      </div>
    </div>
  );
}

export default withProtected(Dashboard) ;