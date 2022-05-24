import React, { useState } from 'react';
import { Timeline, Text } from '@mantine/core';
import Sidebar from '../../../components/dashboard/Sidebar';
import SidebarClient from '../../../components/dashboard/SidebarClient';
import { useUserType } from '../../../context/UserTypeContext';
import Header from '../../../components/dashboard/Header';

function Roadmap() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const {userInfo}=useUserType();
  return (
    <div className="flex h-screen overflow-hidden">
           {/* Sidebar */}
           
      {userInfo?.usertype==="client" && <SidebarClient sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> }
{userInfo?.usertype==="lister" && <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> }

 {/* Content area */}
 <div className="relative bg-slate-200 flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

{/*  Site header */}

<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

<main >
  <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

<Timeline active={3} bulletSize={24} lineWidth={2}>
      <Timeline.Item  title="Idea">
        <Text color="dimmed" size="sm">The idea for 3illboard was conceptualized</Text>
        <Text size="xs" mt={4}>December 2022</Text>
      </Timeline.Item>

      <Timeline.Item  title="Design and Development">
        <Text color="dimmed" size="sm">Design and development of 3illboard started based of companies that offer the same type of service in other industries</Text>
        <Text size="xs" mt={4}>January 2022</Text>
      </Timeline.Item>

      <Timeline.Item title="MVP"  lineVariant="dashed">
        <Text color="dimmed" size="sm">A Minimum Viable Product was created</Text>
        <Text size="xs" mt={4}>May 2022</Text>
      </Timeline.Item>

      <Timeline.Item title="Marketing and Funding" >
        <Text color="dimmed" size="sm">3illboard is in the process of looking for partners and funding to bring the project to life</Text>
        <Text size="xs" mt={4}>In Progress</Text>
      </Timeline.Item>
    </Timeline>
    </div>
    </main>
    </div>
    </div>
  )
}

export default Roadmap