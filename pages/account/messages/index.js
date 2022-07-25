import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Sidebar from '../../../components/dashboard/Sidebar';
import Header from '../../../components/dashboard/Header';
import { useAuth } from '../../../context/AuthContext';
import {useUserType} from '../../../context/UserTypeContext';
import { withProtected } from '../../../hooks/route';
import billboard from '../../../images/cat.png';
import {db} from '../../../firebase';
import {SearchIcon,GlobeAltIcon,UserIcon,MenuIcon,UserCircleIcon} from '@heroicons/react/solid';
import {useCollection} from "react-firebase-hooks/firestore";
import { collection, query, where,orderBy } from "firebase/firestore";



import ChatCard from '../../../components/dashboard/ChatCard';
import SidebarClient from '../../../components/dashboard/SidebarClient';

function Messages() {
    const {user}=useAuth();
    const {userInfo}=useUserType();
    
    //get chats snapshots
    const userChatRef = collection(db, "chats");
    const chatsQuery = query(userChatRef,where('users','array-contains',user.email));
    const [chatsSnapshot]=useCollection(chatsQuery);
    

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const chatAlreadyExists=(recepientEmail)=>
        !!chatsSnapshot?.docs.find(
            (chat)=>chat.data().users.find(user=>user===recepientEmail)?.length>0
            );
    
   
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
         {/* Sidebar */}

{userInfo?.usertype==="client" && <SidebarClient sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> }
{userInfo?.usertype==="lister" && <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> }
       {/* Content area */}
       <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

{/*  Site header */}
<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
<div className='flex sm:flex-row sm:flex-[10]'>
<div className='flex flex-col text-black bg-slate-200 rounded-xl m-5 sm:flex-grow-[1] overflow-y-scroll w-full sm:w-fit  h-[85vh] scrollbar-hide'>
    {/*Chat search*/}
    <div className='flex items-center md:border-2 rounded-full py-2 md:shadow-sm hover:border-2'>
          <input 
          className='flex-grow pl-5 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 text-ellipsis' 
          type="text" 
          placeholder='Search for chat'/>

          <SearchIcon className='hidden md:inline-flex h-8 bg-orange-300 text-white rounded-full p-2 cursor-pointer md:mx-2'/>
      </div>
           {/* {chatsSnapshot?.docs.map((chat)=>(
               <ChatCard key={chat.id} id={chat.id} 
               users={chat.data().users}
               lastMessage={chat.data().lastMessage} 
               lastSender={chat.data().lastSender} 
               lastMessageTime={chat.data().lastMessageTime?.toDate().getTime()}
               />
           ))} */}
            {/* <ChatCard/> */}
              
</div>

{/*chat screen*/}
          <div className='hidden sm:flex sm:flex-col sm:flex-grow-[9] sm:h-full'>
            {/* <ChatScreen/> */}

            <div className='p-5 relative  text-black bg-slate-200 rounded-xl m-5  h-[85vh] '>
              <p className='my-auto absolute top-[50%] w-full text-center'>Click on one of the chats to view messages</p>
            </div>


          </div>


</div>

        </div>
        </div>
  )
}

export default withProtected(Messages);