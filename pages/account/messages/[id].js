import React, { useEffect, useState } from 'react';
import {  query, orderBy, doc, getDoc,getDocs,collection,where } from "firebase/firestore";
import { db } from '../../../firebase';
import Image from 'next/image';
import Sidebar from '../../../components/dashboard/Sidebar';
import SidebarClient from '../../../components/dashboard/SidebarClient';
import Header from '../../../components/dashboard/Header';
import { useAuth } from '../../../context/AuthContext';
import {useUserType} from '../../../context/UserTypeContext';
import { withProtected} from '../../../hooks/route';
import billboard from '../../../images/cat.png';
import {SearchIcon,GlobeAltIcon,UserIcon,MenuIcon,UserCircleIcon} from '@heroicons/react/solid';
import {useCollection} from "react-firebase-hooks/firestore";

import ChatCard from '../../../components/dashboard/ChatCard';
import ChatScreen from '../../../components/dashboard/ChatScreen';


function Chat({chat,messages}) {
    const {user}=useAuth();
    const {userInfo}=useUserType();
   
    const [sidebarOpen, setSidebarOpen] = useState(true);
    //get chats snapshots
    const userChatRef = collection(db, "chats");
    const chatsQuery = query(userChatRef,where('users','array-contains',user?.email));
    const [chatsSnapshot]=useCollection(chatsQuery);
    const chatAlreadyExists=(recepientEmail)=>
    !!chatsSnapshot?.docs.find(
        (chat)=>chat.data().users.find(user=>user===recepientEmail)?.length>0
        );
  return (
    <div className="flex h-screen  bg-gray-100  max-h-[100vh]">
         {/* Sidebar */}
         {userInfo?.usertype==="client" && <SidebarClient sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> }
{userInfo?.usertype==="lister" && <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> }
       {/* Content area */}
       <div className="relative flex flex-col flex-1 overflow-hidden max-h-screen">

{/*  Site header */}
<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
<div className='flex sm:flex-row sm:flex-[10] '>
<div className='hidden  sm:flex sm:flex-col text-black bg-slate-200 rounded-xl m-5 sm:flex-grow-[1] sm:overflow-y-scroll sm:min-w-fit  sm:max-h-[85vh] sm:scrollbar-hide'>
    {/*Chat search*/}
    <div className='flex items-center md:border-2 rounded-full py-2 md:shadow-sm hover:border-2'>
          <input 
          className='flex-grow pl-5 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 text-ellipsis' 
          type="text" 
          placeholder='Search for chat'/>

          <SearchIcon className='hidden md:inline-flex h-8 bg-orange-300 text-white rounded-full p-2 cursor-pointer md:mx-2'/>
      </div>
           {/* {chatsSnapshot?.docs.map((chat)=>(
               <ChatCard key={chat.id} id={chat.id} users={chat.data().users} 
               lastMessage={chat.data()?.lastMessage} 
               lastSender={chat.data()?.lastSender} 
               lastMessageTime={chat.data()?.lastMessageTime?.toDate().getTime()} />
           ))} */}
            {/* <ChatCard/> */}
            
</div>

{/*chat screen*/}
          <div className='flex flex-col flex-grow-[9] w-full h-full'>
            {/* <ChatScreen messages={messages} chat={chat}/> */}
          </div>


</div>

        </div>
        </div>
  )
}
export default withProtected(Chat);

// export async function getServerSideProps(context){ 
   
//     const collectionRef = collection(db,`chats/${context.query.id}/messages`);
//     const ref = doc(db,"chats",context.query.id);
 
//     //const ref=collection(db,`chats/${context.query.id}/messages`);
   

//     //prep the messages on the server

//     const q=query(collectionRef,orderBy("timestamp","asc"))
    
//     const messagesRes=await getDocs(q) ;

//     const messages=messagesRes.docs?.map((doc)=>({
//         id:doc.id,
//         ...doc.data(),
//     })).map(messages=>({
//         ...messages,
//         timestamp:messages.timestamp.toDate().getTime()
//     }));

//     //prep the chats
//     //There is an error here to fix
//     const chatRes=await getDoc(ref);
//     const chat={
//         id:chatRes.id,
//         lastMessage:chatRes.data().lastMessage,
//         lastMessageTime:chatRes.data().lastMessageTime.toDate().getTime(),
//         lastSender:chatRes.data().lastSender,
//         users:chatRes.data().users,
//     }

//     return{
//         props:{
//             messages:JSON.stringify(messages),
//             chat:chat,
//         }
//     }

// }

