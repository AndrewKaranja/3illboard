import React from 'react';
import Image from 'next/image';
import {useRouter} from "next/router";
import billboard from '../../images/cat.png';
import {useCollection} from "react-firebase-hooks/firestore";
import { collection, query, where } from "firebase/firestore";
import getRecipientEmail from '../../utils/getRecipientEmail';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import Avatar from 'react-avatar';

function ChatCard({id,users}) {
    const router=useRouter();
    const {user}=useAuth();
    
    const recipientEmail=getRecipientEmail(users,user);
 
    const [recipientSnapshot]=useCollection(query(collection(db, "users"),where('email','==',recipientEmail)));

    const enterChat=()=>{
      router.push(`/account/messages/${id}`);
    }

    const recipient=recipientSnapshot?.docs?.[0]?.data();
    
  return (
    <div onClick={enterChat} className='flex flex-row bg-white p-5 m-1 overflow-hidden hover:cursor-pointer rounded-xl '>
      <Avatar size="40" name={recipient?.name}  email={recipientEmail} round={true} />
              {/* <Image src={billboard} alt='ad image' width={40} height={40} objectFit="cover" className='rounded-2xl'/> */}
              <div className='flex ml-2  flex-col'>
                <p className='text-sm font-bold  justify-center'>{recipientEmail}</p>
              <p className='text-xs text-ellipsis overflow-hidden w-24  whitespace-nowrap inline-block '>I was hoping we could meet today at the shop I was hoping we could meet today at the shop I was hoping we could meet today at the shop I was hoping we could meet today at the shop</p>

              </div>
              <div className='flex flex-col ml-auto'>
              <p className='text-sm font-bold  justify-center '>11:32</p>
              <p className='text-sm rounded-sm text-center  bg-[#fab038] '>1</p>
                  
              </div>
              </div>
  )
}

export default ChatCard