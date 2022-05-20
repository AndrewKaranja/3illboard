import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Avatar from 'react-avatar'
import {useRouter} from "next/router";
import { useAuth } from '../../context/AuthContext';
import { collection, query, where, getDocs,orderBy,limit } from "firebase/firestore";
import { db } from '../../firebase';
import UserIcon from "../../images/ferret.png"

function NewRequestsCard() {
  const {user}=useAuth();
    const router = useRouter();
    const [requests,setRequests] =useState([]);
    const [done, setDone] = useState(undefined);


    const handleRequestedListing=(listingid)=>{
      if(requests){
        router.push(`/account/listings/${listingid}`)

      }
      
    }

    const handleRespondClick=(chatid)=>{
      if(requests){
        router.push(`/account/messages/${chatid}`)

      }

    }
    
    


  useEffect(() => {
    async function getRequests(user){
       const promises=[];
      const q = query(collection(db, `users/${user.uid}/requests`), orderBy("requestTime", "desc"), limit(5));
      const querySnapshot = await getDocs(q);
      promises.push(querySnapshot);
      setRequests(querySnapshot.docs.map(docSnapshot => docSnapshot.data()));
            Promise.all(promises)
            .then(()=>{setTimeout(() => { setDone(true);}, 2000);})
            .catch((err)=>console.log(err));
    }
    
    getRequests(user);
   
  
  }, [user])
  return (
    <div className='bg-white shadow-lg rounded-sm border border-slate-200'>
        <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">New Requests</h2>
      </header>
      {requests && requests?.map((request)=>(
      <div key={request?.requestTitle} className='flex flex-row p-2'>
      {/* <Avatar size="40" round={true}  /> */}
      <Image src={UserIcon}alt='user image' objectFit="contain" width={50} height={50} />
          <div className='text-ellipsis overflow-hidden w-32 mx-3  whitespace-nowrap inline-block'>
              <h4 className='font-bold text-sm'>{request?.fname}</h4>
              <p className='text-xs'>{request?.email}</p>
          </div>
          <div onClick={()=>{handleRequestedListing(request?.listingid)}}  className='text-xs text-ellipsis overflow-hidden hover:text-[#fab038] hover:cursor-pointer  whitespace-nowrap inline-block'>A beautiful billboard in ngong</div>
          <div><h4 className='font-semibold text-sm text-gray-700'>24 July-30 Sept</h4></div>
          <button onClick={()=>{handleRespondClick(request?.chatid)}} className='bg-[#fab038] text-white text-xs p-1 h-fit font-semibold rounded'>Respond</button>

      </div>
   ))}
      
    </div>
  )
}

export default NewRequestsCard