import React, { useEffect, useState } from 'react';
import Sidebar from '../../../../components/dashboard/Sidebar';
import SidebarClient from '../../../../components/dashboard/SidebarClient';
import Header from '../../../../components/dashboard/Header';
import { useAuth } from '../../../../context/AuthContext';
import {useUserType} from '../../../../context/UserTypeContext';
import Image from 'next/image';
import { Badge,Table } from '@mantine/core';
import Link from 'next/link';
import { db } from '../../../../firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import {
    addDays,
    format,
  } from 'date-fns';
import { withProtected } from '../../../../hooks/route';

function Billing() {
    
    const {user}=useAuth();
    const {userInfo}=useUserType();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [listings,setListings] =useState([]);
    const [done, setDone] = useState(undefined);

    useEffect(() => {
        async function getListings(user){
           const promises=[];
          const querySnapshot = await getDocs(collection(db, `users/${user.uid}/listings`));
          promises.push(querySnapshot);
          setListings(querySnapshot.docs.map(docSnapshot => docSnapshot.data()));
                Promise.all(promises)
                .then(()=>{setTimeout(() => { setDone(true);}, 2000);})
                .catch((err)=>console.log(err));
        }
        
        getListings(user);
       
      
      }, [user])

  
 
      const listingrows = listings.map((listing) => (
        <Link
    
          href={`/account/settings/billing/${listing.listingid}`}
          passHref
           key={listing.listingid}>
        <tr >
          <td>
          <Image height={50} width={50} src={listing.photosURLS?.[0]}  alt='ad image' objectFit='cover' /></td>
          <td>{listing.details.billboardTitle}</td>
          <td>{listing.lastPayment ? format(listing.lastPayment.toDate(),"do MMMM yyyy"): "Unknown"}</td>
          <td>{listing.nextPayment ? format(listing.nextPayment.toDate(),"do MMMM yyyy"): "Unknown"}</td>
          <td><Badge color={listing.paymentStatus==="pending"?"red":"green"} variant="light">
        {listing?.paymentStatus}
        </Badge></td>
          <td>Ksh 5000</td>
          <td><button className=' text-white bg-emerald-500 text-xs px-3 py-1 h-fit font-semibold rounded'>Pay</button></td>
        </tr>
        </Link>
      ));


  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      {userInfo?.usertype==="client" && <SidebarClient sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> }
{userInfo?.usertype==="lister" && <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> }

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-slate-300">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        

        <main>
        <div className='flex flex-col mx-auto items-center m-3'>
        <h4 className='text-2xl lg:text-2xl font-bold text-white'>Billing</h4>
<p className=''>Make payment to ensure listing stays active</p>
</div>









        <div className="bg-white mx-auto w-[95%] p-5 rounded-xl">
        <Table highlightOnHover fontSize="xs" >
      <thead>
        <tr>
          <th>Listing image</th>
          <th>Listing Description</th>
          <th>Last Payment</th>
          <th>Payment Due</th>
          <th>Status</th>
          <th>Total Due</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody className='hover:cursor-pointer'>{listingrows}</tbody>
    </Table>

        </div>
        
            </main>
            </div>
    </div>
  )
}

export default  withProtected(Billing);