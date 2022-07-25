import React, { useEffect, useRef, useState } from 'react';


import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from "next/router";
import Avatar from 'react-avatar';
import { PaperClipIcon,DotsVerticalIcon,EmojiHappyIcon } from '@heroicons/react/outline'
import { useAuth } from '../../context/AuthContext';
import Message from './Message';

import TimeAgo from 'timeago-react'; 

import getRecipientEmail from '../../utils/getRecipientEmail';
import * as AiIcons from 'react-icons/ai';
import { useMediaQuery } from 'react-responsive';




function ChatScreen({chat,messages}) {
    const {user}=useAuth();
    const router=useRouter();
    const endOfMessagesRef=useRef(null);
    const [input, setInput] = useState("");
    const [messagesSnapshot]=useCollection(query(collection(db,`chats/${router.query.id}/messages`)
    ,orderBy("timestamp","asc")));

    const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
    
    

    const [recipientSnapshot]=useCollection(query(collection(db,"users"),where("email","==",getRecipientEmail(chat.users,user))));

    const showMessages=()=>{
        if(messagesSnapshot){
            return messagesSnapshot.docs.map((message)=>(
                <Message
                key={message.id}
                user={message.data().user}
                message={{
                    ...message.data(),
                    timestamp:message.data().timestamp?.toDate().getTime(),
                }}
                />


            ))
        }else{
            return JSON.parse(messages).map((message)=>(
                <Message
                key={message.id}
                message={message}
                />
                
            ));
        }


    }


    const scrollToBottom=()=>{
        endOfMessagesRef.current.scrollIntoView({
            behavior:"smooth",
            block:"start",
                });
    }

    // Added async here
    const sendMessage=async (e)=>{
        e.preventDefault();
        //update Last seen
        const userDocRef=doc(db,"users",user.uid);
        setDoc(userDocRef,{lastSeen:serverTimestamp()}, { merge: true });

        const messagesCollectionRef=collection(db,`chats/${router.query.id}/messages`);
        const chatDocRef=doc(db,"chats",router.query.id);

        

        const messageDoc=await addDoc(messagesCollectionRef, {
            timestamp: serverTimestamp(),
            message:input,
            user:user.email
            
          });

          await setDoc(chatDocRef,{lastMessageId:messageDoc.id,lastMessage:input,lastMessageTime:serverTimestamp(),lastSender:user.email},{ merge: true })

          setInput("");
          scrollToBottom();
    };

    const recipient=recipientSnapshot?.docs?.[0]?.data();
    console.log(recipient);
    const recipientEmail=getRecipientEmail(chat.users,user)
  return (
    <div className='p-5  text-white bg-slate-200 rounded-xl m-5 h-[85vh]  max-h-[100vh] '>
    {/* Header info */}
    <div className='flex flex-row sticky top-16 z-30 text-black bg-white border-b p-3 items-center '>
        <Avatar name={recipient?.name} email={recipientEmail} size="40"/>
       
        <div className='flex flex-col ml-2'>
        <h3 className='text-xl font-semibold'>{recipient?.name}</h3>
        {recipientSnapshot?(
            <p className='text-sm'>Last Seen:{' '}
            {recipient?.lastSeen?.toDate()?(
                
                <TimeAgo datetime={recipient?.lastSeen?.toDate()}/>

            ):(
                "unavailable"
            )}
            </p>
            
            ):(
                <p>Loading Last active...</p>
            )}
        
        
         </div>
        
        <div className='flex ml-auto '>
       <PaperClipIcon className='h-5 w-5 m-2'/>
       <DotsVerticalIcon className='h-5 w-5 m-2'/>
            
        </div>

    </div>

{/* Message Container */}
<div className='p-2 min-h-[50vh] max-h-[65vh] whitespace-normal overflow-y-auto scrollbar-hide'>
    {showMessages()}
    <div ref={endOfMessagesRef} ></div>

</div>


{/* Input container */}
<form className='flex items-center text-black p-3 sticky bottom-0 h-fit bg-slate-200 z-30'>
    <EmojiHappyIcon className='text-[#fab038] h-6 w-6 mx-2'/>
    
<input type="text" placeholder='Add your message' value={input} onChange={e=>setInput(e.target.value)} className='flex flex-1 p-3 sticky bottom-0 rounded-full items-center bg-white' />
<button hidden disabled={!input} type="submit" onClick={sendMessage}></button>
{/* <IoIcons.IoMdSend disabled={!input} className='h-8 w-8 ml-2 bg-white p-1'  onClick={sendMessage}/> */}

</form>



{isMobile && <>
<Link passHref href="/account/messages"  >
      <div className="bg-white w-full flex flex-row text-[#fab038] justify-center items-center cursor-pointer p-2">
        <AiIcons.AiOutlineRollback className='h-10 w-10'/>
        <p className='text-xl align-middle font-bold'>Back to messages</p>

        </div>
              
              </Link>
              </> }


    </div>
  )
}

export default ChatScreen