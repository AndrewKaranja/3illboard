import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Sidebar from '../../../components/dashboard/Sidebar';
import Header from '../../../components/dashboard/Header';
import { useAuth } from '../../../context/AuthContext';
import { withProtected } from '../../../hooks/route';
import billboard from '../../../images/cat.png';
import {db} from '../../../firebase';
import {SearchIcon,GlobeAltIcon,UserIcon,MenuIcon,UserCircleIcon} from '@heroicons/react/solid';
import {useCollection} from "react-firebase-hooks/firestore";
import { collection, query, where } from "firebase/firestore";


import * as BiIcons from 'react-icons/bi';
import * as RiIcons from 'react-icons/ri';
import * as MdIcons from 'react-icons/md';
import * as FcIcons from 'react-icons/fc';
import ChatCard from '../../../components/dashboard/ChatCard';

function Messages() {
    const {user}=useAuth();
    //get chats snapshots
    const userChatRef = collection(db, "chats");
    const chatsQuery = query(userChatRef,where('users','array-contains',user.email));
    const [chatsSnapshot]=useCollection(chatsQuery);

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const chatAlreadyExists=(recepientEmail)=>
        !!chatsSnapshot?.docs.find(
            (chat)=>chat.data().users.find(user=>user===recepientEmail)?.length>0
            );
   
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
         {/* Sidebar */}
    <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
       {/* Content area */}
       <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

{/*  Site header */}
<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
<div className='flex flex-row flex-[10]'>
<div className='flex flex-col text-black bg-slate-200 rounded-xl m-5 flex-grow-[1] h-full'>
    {/*Chat search*/}
    <div className='flex items-center md:border-2 rounded-full py-2 md:shadow-sm hover:border-2'>
          <input 
          className='flex-grow pl-5 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 text-ellipsis' 
          type="text" 
          placeholder='Search for chat'/>

          <SearchIcon className='hidden md:inline-flex h-8 bg-orange-300 text-white rounded-full p-2 cursor-pointer md:mx-2'/>
      </div>
           {chatsSnapshot?.docs.map((chat)=>(
               <ChatCard key={chat.id} id={chat.id} users={chat.data().users}/>
           ))}
            {/* <ChatCard/> */}
              
</div>
          <div className='flex flex-col flex-grow-[9] h-full'>
            <div className='p-5  text-white bg-slate-200 rounded-xl m-5 h-full'>
            <div className='flex bg-black'>
              <Image src={billboard} alt='ad image' width={40} height={40} objectFit="cover" className='rounded-2xl'/>
              <div className='flex ml-2  flex-col'>
                <p className='text-sm font-bold  justify-center'>Mary Jane</p>
              <p className='text-xs '>Current client</p>

              </div>
              </div>

            </div>
              
          </div>


</div>

        </div>
        </div>
  )
}

export default withProtected(Messages);