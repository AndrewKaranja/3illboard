import React, { useState } from 'react';

import Sidebar from '../../components/dashboard/Sidebar';
import SidebarClient from '../../components/dashboard/SidebarClient';
import Header from '../../components/dashboard/Header';
import WelcomeBanner from '../../components/dashboard/WelcomeBanner';
import DashboardCard01 from '../../components/dashboard/CardCustomers';
import DashboardCardBookings from '../../components/dashboard/BookingsCard';

import DashboardCard02 from '../../components/dashboard/RecentCard';

import { useAuth } from '../../context/AuthContext';
import {useUserType} from '../../context/UserTypeContext';


import Banner from '../../components/dashboard/Banner';
import { withProtected } from '../../hooks/route';

function Dashboard() {
  const {user}=useAuth();
    const {userInfo}=useUserType();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      {userInfo?.usertype==="client" && <SidebarClient sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> }
{userInfo?.usertype==="lister" && <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> }

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
              
              {userInfo?.usertype==="client" && <DashboardCardBookings/> }
{userInfo?.usertype==="lister" && <DashboardCard01 /> }

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