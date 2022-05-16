import React from 'react';
import Image from 'next/image';
import moment from 'moment';
import {useRouter} from "next/router";
import billboard from '../../images/cat.png';
import {useCollection} from "react-firebase-hooks/firestore";
import { collection, query, where } from "firebase/firestore";
import getRecipientEmail from '../../utils/getRecipientEmail';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import Avatar from 'react-avatar';
import {Indicator } from '@mantine/core';

function ChatCard({id,users,lastMessage,lastSender,lastMessageTime}) {
    const router=useRouter();
    const {user}=useAuth();
    
    const recipientEmail=getRecipientEmail(users,user);
 
    const [recipientSnapshot]=useCollection(query(collection(db, "users"),where('email','==',recipientEmail)));

    const enterChat=()=>{
      router.push(`/account/messages/${id}`);
    }

    const recipient=recipientSnapshot?.docs?.[0]?.data();
    
  return (
    <Indicator position="bottom-end" color="yellow" offset={7}  size={16} disabled={user!==lastSender?true:false} withBorder>
    <div onClick={enterChat} className='relative flex flex-row bg-white p-5 m-1  overflow-hidden hover:cursor-pointer rounded-xl '>
       
      <Avatar size="40" name={recipient?.name}  email={recipientEmail} round={true} />
              {/* <Image src={billboard} alt='ad image' width={40} height={40} objectFit="cover" className='rounded-2xl'/> */}
              <div className='flex ml-2  flex-col'>
                <p className='text-sm font-bold  justify-center'>{recipientEmail}</p>
              <p className='text-xs text-ellipsis overflow-hidden w-24  whitespace-nowrap inline-block '>{lastMessage}</p>

              </div>
              
              <p className='text-xs text-gray-500 font-bold ml-auto justify-items-center '>{lastMessageTime? moment(lastMessageTime).format('LT'):'...'}</p>
              
              
                  
              
              {lastSender!==user.email ? <p className='absolute right-0 bottom-0 m-2 p-1 text-sm rounded-full text-center  bg-[#fab038] '>1</p>:<></> }
              
              </div>
              </Indicator>
  )
}

export default ChatCard