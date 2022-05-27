import React, { useEffect, useState } from 'react';
import Sidebar from '../../../../components/dashboard/Sidebar';
import SidebarClient from '../../../../components/dashboard/SidebarClient';
import Header from '../../../../components/dashboard/Header';
import { useAuth } from '../../../../context/AuthContext';
import {useUserType} from '../../../../context/UserTypeContext';
import imgprint from '../../../../images/billboard_fl2.png';
import Image from 'next/image';
import * as RiIcons from 'react-icons/ri';
import * as MdIcons from 'react-icons/md';
import {useRouter} from "next/router";
import billboard from '../../../../images/cat.png';

import { Chips, Chip,Table } from '@mantine/core';

import Link from 'next/link';
import { db } from '../../../../firebase';
import { doc, getDoc,collection,getDocs } from "firebase/firestore";
import {
    addDays,
    format,
  } from 'date-fns';
import { withProtected } from '../../../../hooks/route';

function BillingDetails() {
    const {user}=useAuth();
    const {userInfo}=useUserType();
    const{query:{id}}=useRouter();
    const [done, setDone] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const basic=["Client Chat Features","Listing analytics","Calender Scheduling","Booking"];
    const [listing,setListing]=useState("");


    useEffect(() => {
        async function getListingDetail(user){
          const promises=[];
          const docRef = doc(db, `users/${user.uid}/listings`, `${id}`);
    
          const docSnap = await getDoc(docRef);
          promises.push(docSnap);
          console.log(docSnap)
          setListing(docSnap.data()); 
          Promise.all(promises)
          .then(()=>{setTimeout(() => { setDone(true);}, 2000);})
          .catch((err)=>console.log(err));
      
        }
        if(id){
          getListingDetail(user);
          //const image=listing.photosURLS[0]
          //setBannerImage(image);
        }
        
       
      }, [user,id]);


    const elements = [
        { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
        { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
        { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
        { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
        { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
      ];
    const rows = elements.map((element) => (
        <tr key={element.name}>
          <td>{element.position}</td>
          <td>{element.name}</td>
          <td>{element.symbol}</td>
          <td>{element.mass}</td>
        </tr>
      ));
  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      {userInfo?.usertype==="client" && <SidebarClient sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> }
{userInfo?.usertype==="lister" && <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> }

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-slate-100">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        

        <main>
            <div className="flex flex-[10] ">
                <div className="bg-white flex flex-col flex-grow-[8] ">


                <div className='flex flex-col lg:flex-row  '>
            <div className='relative h-full w-32 flex-grow-[1]  '>
              <Image src={listing.length==0 ? billboard : listing?.photosURLS?.[0]} layout="fill" alt='ad image' objectFit='cover' className='rounded-l-xl rounded-bl-xl'/>
              {/* <Link passHref href="/account/listings">
              <AiIcons.AiOutlineRollback className='h-full w-full'/>
              </Link> */}
              
            </div>
            <div className='flex flex-col flex-grow-[9] p-5 h-fit'>
                <div className='flex justify-between'>
                <h4 className='text-xl text-black font-bold'>{listing.details?.billboardTitle}</h4>
                    
              <RiIcons.RiMenu4Fill/>
                    
                </div>
                
                <p className='text-sm text-gray-500 font-semibold'>📍{listing.details?.locationDescription}</p>
                
                <div className='flex flex-row m-2 items-center font-semibold text-gray-500'>
               
                <div className='flex flex-row m-2 items-center'>
                  <MdIcons.MdOutlinePeopleAlt />
                  <p className='px-1 '>6 clients</p>
                </div>
                <div className='flex flex-row m-2 items-center'>
                  <MdIcons.MdOutlineReport />
                  <p className='px-1 '>10 requests</p>
                </div>

                </div>
              
            </div>
          
            </div>
                
                <div className="bg-white mx-auto w-[95%] p-5 rounded-xl">
                <h4 className=' font-semibold text-xl text-slate-900'>Payment History</h4>
                <Table>
      <thead>
        <tr>
          <th>Element position</th>
          <th>Element name</th>
          <th>Symbol</th>
          <th>Atomic mass</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
    </div>

                </div>
                <div className="flex-grow-[2] ">
                    <h4 className='px-5 font-semibold text-xl text-slate-900'>Payment Method</h4>
                    <Chips direction='column' radius='md' size='xl' className='m-5' >
                        <Chip value="mpesa" >mpesa</Chip>
                        <Chip value="wire" >wire</Chip>
                        <Chip value="paypal" >paypal</Chip>
                    </Chips>

                    <h4 className='px-5 font-semibold text-xl text-slate-900'>Details</h4>
                    <div className='p-5 h-fit text-black font-semibold bg-white rounded-xl m-5 cursor-pointer  select-none '>
            <div className='flex '>
              <Image src={imgprint} alt='ad image' width={50} height={50} objectFit="contain" className='rounded-xl bg-white'/>
              <div className='flex ml-2  flex-col'>
                <p className='text-xl font-semibold justify-center '>Plain Billlboard</p>
                <div className='flex flex-row items-center'>
                  <p className='text-2xl font-bold '>5000</p>
                <p className='text-xs font-normal text-gray-600 '>/month</p>
                </div>
             </div>
              </div>
              <ul className='my-4'>
              {basic?.map((feature)=>
              <li className='text-gray-400 font-normal' key={feature}>✅ {feature}</li>
              )}
              </ul>
              <div className='flex flex-row justify-between'>
                  <h4>Total:</h4>
                  <p className='text-[#FAB038] mb-3'>KES 5000</p>
              </div>
              <button className=' border-2 border-orange-200 bg-orange-500 w-full  text-white font-semibold hover:bg-orange-300 p-2  rounded-xl '
            >Continue to Pay</button>

            </div>


                </div>

            </div>

        </main>
        </div>
        </div>
  )
}

export default withProtected(BillingDetails);