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
import { firebaseCloudMessaging } from '../../firebase';
import ReactNotificationComponent from '../../components/Notifications/ReactNotification';
import Notifications from '../../components/Notifications/Notifications';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import ListingsOverviewCard from '../../components/dashboard/ListingsOverviewCard';
import NewRequestsCard from '../../components/dashboard/NewRequestsCard';

function Dashboard() {
  const {user}=useAuth();
    const {userInfo}=useUserType();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [show,setShow]=useState(false);
  const [notification, setNotification] = useState({title:"",body:""});
  const messaging = getMessaging();
  console.log(show,notification);
  onMessage(messaging,(payload) => {
    console.log('Message received. ', payload);
    setShow(true);
  setNotification({
    title:payload.notification.title,
    body:payload.notification.body,
  });
  console.log("Payload"+payload);
  });

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      {userInfo?.usertype==="client" && <SidebarClient sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> }
{userInfo?.usertype==="lister" && <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> }

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="bg-slate-200">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Welcome banner */}
            <WelcomeBanner />

           
             
            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              <div className='col-span-full xl:col-span-6'>
              <ListingsOverviewCard totalListings={userInfo?.totalListings} enquiries={userInfo?.totalRequests} bookings={userInfo?.totalAdsActive} />
              <NewRequestsCard/>
              {userInfo?.usertype==="client" && <DashboardCardBookings/> }
{/* {userInfo?.usertype==="lister" && <DashboardCard01 /> } */}

              </div>

              
            
              <div className='col-span-full xl:col-span-6'>
              {/* <ListingsOverviewCard totalListings={userInfo?.totalListings} enquiries={userInfo?.totalRequests} bookings={userInfo?.totalAdsActive} /> */}
              
              <DashboardCard02 />
              

              </div>
              

              

              <Notifications/>
              
              
              
            </div>
            {show? (
                <ReactNotificationComponent title={notification.title} body={notification.body}/>
              ):(<></>)}
          </div>
        </main>

        <Banner />

      </div>
    </div>
  );
}

export default withProtected(Dashboard) ;