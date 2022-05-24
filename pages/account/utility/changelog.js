import React, { useState } from 'react';
import { Timeline, Text } from '@mantine/core';
import Sidebar from '../../../components/dashboard/Sidebar';
import SidebarClient from '../../../components/dashboard/SidebarClient';
import { useUserType } from '../../../context/UserTypeContext';
import Header from '../../../components/dashboard/Header';

function Changelog() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const {userInfo}=useUserType();
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

<Timeline active={1} bulletSize={24} lineWidth={2}>
      <Timeline.Item  title="New branch">
        <Text color="dimmed" size="sm">You&apos;ve created new branch <Text variant="link" component="span" inherit>fix-notifications</Text> from master</Text>
        <Text size="xs" mt={4}>2 hours ago</Text>
      </Timeline.Item>

      <Timeline.Item  title="Commits">
        <Text color="dimmed" size="sm">You&apos;ve pushed 23 commits to<Text variant="link" component="span" inherit>fix-notifications branch</Text></Text>
        <Text size="xs" mt={4}>52 minutes ago</Text>
      </Timeline.Item>

      <Timeline.Item title="Pull request"  lineVariant="dashed">
        <Text color="dimmed" size="sm">You&apos;ve submitted a pull request<Text variant="link" component="span" inherit>Fix incorrect notification message (#187)</Text></Text>
        <Text size="xs" mt={4}>34 minutes ago</Text>
      </Timeline.Item>

      <Timeline.Item title="Code review" >
        <Text size="xs" mt={4}>12 minutes ago</Text>
      </Timeline.Item>
    </Timeline>
    </div>
    </main>
    </div>
    </div>
  )
}

export default Changelog