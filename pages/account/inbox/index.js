import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/dashboard/Sidebar';
import SidebarClient from '../../../components/dashboard/SidebarClient';
import Header from '../../../components/dashboard/Header';
import { useAuth } from '../../../context/AuthContext';
import {useUserType} from '../../../context/UserTypeContext';
import { withProtected } from '../../../hooks/route';
import Link from 'next/link';

import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelHeader, ChannelList, LoadingIndicator, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';
import { getFunctions, httpsCallable } from "firebase/functions";
import 'stream-chat-react/dist/css/index.css';
import { CustomPreview } from '../../../components/dashboard/inbox/CustomPreview';


  

const Inbox = () => {
    const {user}=useAuth();
    const {userInfo}=useUserType();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const filters = { type: 'messaging', members: { $in: [`${user.uid}`] } };
    const sort = { last_message_at: -1 };
    let count=0;
    

    const [chatClient, setChatClient] = useState(null);
   

  useEffect(() => {
    const initChat = async () => {
    const functions = getFunctions();
    const getStreamToken= httpsCallable(functions, 'getStreamToken');
   
    getStreamToken({ userID: user.uid })
    .then((result) => {
    // Read result of the Cloud Function.
    /** @type {any} */
    const userToken = `${result.data}`;
    const client = StreamChat.getInstance(`${process.env.NEXT_PUBLIC_STEAMCHAT_APIKEY}`);

    client.connectUser(
      {
        id:`${user.uid}`,
        name:`${user?.displayName}` ,
        image:`${user?.photoURL}` ,
      },
      userToken,
    );


    setChatClient(client);
    // const sanitizedMessage = data.text;
    // alert(userToken);
  })
  .catch((error) => {
    // Getting the Error details.
    const code = error.code;
    const message = error.message;
    const details = error.details;
    // ...
  });
     
    };
   

    initChat();
  }, [user]);

  if (!chatClient) {
    return <LoadingIndicator />;
  }
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
                {/* Sidebar */}

{userInfo?.usertype==="client" && <SidebarClient sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> }
{userInfo?.usertype==="lister" && <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> }
       {/* Content area */}
       <div className="relative flex flex-col h-screen flex-1  overflow-x-hidden">
        <div className='absolute right-0 w-fit bg-white p-4 z-50 border-l-8 border-l-[#fab038]'><Link passHref href="/account" ><a className='text-[#fab038] text-sm'>Back to dashboard</a></Link></div>

{/*  Site header */}
{/* <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}

<div >

<Chat client={chatClient} theme='messaging light'>
      <ChannelList Preview={CustomPreview} filters={filters} sort={sort} showChannelSearch />
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
</div>

  
</div>
        
    </div>
  )
}

export default  withProtected(Inbox);