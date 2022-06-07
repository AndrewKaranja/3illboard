import React, { useState } from 'react';
import Sidebar from '../../../components/dashboard/Sidebar';
import SidebarClient from '../../../components/dashboard/SidebarClient';
import Header from '../../../components/dashboard/Header';
import { useAuth } from '../../../context/AuthContext';
import {useUserType} from '../../../context/UserTypeContext';

function Notifications() {
  const {user}=useAuth();
  const {userInfo}=useUserType();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden">
       {/* Sidebar */}
       {userInfo?.usertype==="client" && <SidebarClient sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> }
{userInfo?.usertype==="lister" && <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> }

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-slate-300">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        

        <main>
        <p className='my-auto absolute top-[50%] w-full text-center'>No Notifications available</p>
        </main>
        </div>
    </div>
  )
}

export default Notifications