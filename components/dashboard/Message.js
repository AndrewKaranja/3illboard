import moment from 'moment';
import React from 'react'
import { IoMdDocument } from 'react-icons/io';
import { useAuth } from '../../context/AuthContext'


function Message({message}) {
  const{user}=useAuth();
  console.log(message.user);
  

  //const TypeOfMessage=user===userLoggedIn?.email ? Sender : Reciever;


  return (
    <div >
       <p className={message.user===user?.email ?'text-white w-fit max-w-lg p-4 border rounded-bl-2xl rounded-t-2xl m-3 min-w-[60px] pb-2 relative text-right ml-auto bg-[#fab038]':
       'text-black w-fit max-w-lg p-4 border rounded-lg m-3 min-w-[60px] pb-2 relative  text-left bg-white'}>{message.message}
       <p className='text-xs align-bottom font-semibold text-gray-400'>{message.timestamp? moment(message.timestamp).format('LT'):'...'}</p>
       
       </p>
        
        
    </div>
  )
}

export default Message