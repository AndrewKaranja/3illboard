import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Avatar from 'react-avatar'
import {useRouter} from "next/router";
import { useAuth } from '../../context/AuthContext';
import { collection, query, where, getDocs,orderBy,limit } from "firebase/firestore";
import { db } from '../../firebase';
import UserIcon from "../../images/ferret.png";
import { Badge,Table } from '@mantine/core';

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
   
  
  }, [user]);
  const requestRows = requests && requests?.map((request)=>(
      
    <tr key={request.id} >
      <td>
      <Image src={UserIcon}alt='user image' objectFit="contain" width={50} height={50} /></td>
      
      <td>{request?.fname}</td>
      <td>{request.requestedPeriod ? request?.requestedPeriod: "Not set"}</td>
      <td><Badge onClick={()=>{handleRequestedListing(request?.listingid)}} color="green" variant="light">
        Listing
    </Badge></td>
      <td><button onClick={()=>{handleRespondClick(request?.chatid)}} className='bg-[#fab038] text-white text-xs p-1 h-fit font-semibold rounded'>Respond</button></td>
    </tr>
    
  ));

  return (
    <div className='bg-white shadow-lg rounded-sm border border-slate-200'>
        <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">New Requests</h2>
      </header>
      
      <div  className='flex flex-row p-2'>
        <Table highlightOnHover fontSize="xs" >
      <thead>
        <tr>
          <th>Avatar</th>
          <th>Name</th>
          
          <th>Requested Period</th>
          <th>View</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody className='hover:cursor-pointer'>{requestRows}</tbody>
    </Table>



      </div>

      
    </div>
  )
}

export default NewRequestsCard