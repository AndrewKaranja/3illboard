import React, { useEffect, useState } from 'react';
import Sidebar from '../../../../components/dashboard/Sidebar';
import SidebarClient from '../../../../components/dashboard/SidebarClient';
import Header from '../../../../components/dashboard/Header';
import { useAuth } from '../../../../context/AuthContext';
import {useUserType} from '../../../../context/UserTypeContext';
import imgprint from '../../../../images/billboard_fl2.png';
import imgmpesa from '../../../../images/mpesa.png';
import imgwire from '../../../../images/wire.png';
import imgpaypal from '../../../../images/paypal.png';
import Image from 'next/image';
import * as RiIcons from 'react-icons/ri';
import * as MdIcons from 'react-icons/md';
import {useRouter} from "next/router";
import billboard from '../../../../images/cat.png';

import { Badge,Chips, Chip,Table } from '@mantine/core';

import Link from 'next/link';
import { db } from '../../../../firebase';
import { query,doc, getDoc,collection,getDocs,orderBy,limit  } from "firebase/firestore";
import {
    addDays,
    format,
  } from 'date-fns';
import { withProtected } from '../../../../hooks/route';
import PaypalCheckoutButton from '../../../../components/dashboard/PaypalCheckoutButton';

function BillingDetails() {
    const {user}=useAuth();
    const {userInfo}=useUserType();
    const{query:{id}}=useRouter();
    const [done, setDone] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [value, setValue] = useState('mpesa');
    const basic=["Client Chat Features","Listing analytics","Calender Scheduling","Booking"];
    const [listing,setListing]=useState("");
    const [paymentHistory,setPaymentHistory]=useState("");
    const product={
      productid:listing?.listingid,
      listingowner:listing?.owneremail,
    }


    useEffect(() => {
      async function getPaymentHistory(user){
         const promises=[];
         const q = query(collection(db, `users/${user.uid}/listings/${id}/payments`), orderBy("date", "desc"), limit(10));
        const querySnapshot = await getDocs(q);
        promises.push(querySnapshot);
        setPaymentHistory(querySnapshot.docs.map(docSnapshot => docSnapshot.data()));
              Promise.all(promises)
              .then(()=>{setTimeout(() => { setDone(true);}, 2000);})
              .catch((err)=>console.log(err));
      }
      
      getPaymentHistory(user);
     
    
    }, [user,id])


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

      const paymentHistoryRows=paymentHistory && paymentHistory?.map((payment)=>(
        <tr key={payment.paymentID}>
          <td>{format(payment.date.toDate(),"do MMMM yyyy")}</td>
          <td>
          <Badge color={payment.status==="successful"?"green":"dark"} variant="light">
          {payment.status}
        </Badge></td>
          <td>{payment.amount}</td>
          <td>{payment.paymentMethod}</td>
        </tr>

      ))
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
                
              
            </div>



            <div className='p-5 h-fit text-black font-semibold bg-white rounded-xl m-5 cursor-pointer  select-none '>
            

              <div className='flex ml-2 p-5 flex-col bg-orange-100'>
              <p className='text-xs font-semibold text-gray-600 '>Next Payment</p>
                <p className='text-xl font-bold justify-center '>Ksh. 5000</p>
                
                  <p className='text-sm font-semibold text-gray-800 '>on {listing.nextPayment ? format(listing?.nextPayment.toDate(),"do MMMM yyyy"): "Unknown"}</p>
             </div>
              
           

            </div>
          
            </div>
                
                <div className="bg-white mx-auto w-[95%] p-5 rounded-xl">
                <h4 className=' font-semibold text-xl text-slate-900'>Payment History</h4>
                <Table>
      <thead>
        <tr>
          <th>Payment Date</th>
          <th>Status</th>
          <th>Amount</th>
          <th>Payment Method</th>
        </tr>
      </thead>
      <tbody>{paymentHistoryRows}</tbody>
    </Table>
    </div>

                </div>
                <div className="flex-grow-[2] ">
                    {/* <h4 className='px-5 font-semibold text-xl text-slate-900'>Payment Method</h4>
                    <Chips direction='column' radius='md' size='xl' className='m-5' color="yellow" multiple={false} value={value} onChange={setValue} >
                        <Chip value="mpesa" ><Image height={35} width={40} src={imgmpesa}  alt='ad image' objectFit='cover' /></Chip>
                        <Chip value="wire" ><Image height={35} width={40} src={imgwire}  alt='ad image' objectFit='cover' /></Chip>
                        <Chip value="paypal" ><Image height={35} width={40} src={imgpaypal}  alt='ad image' objectFit='cover' /></Chip>
                    </Chips> */}

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
              <PaypalCheckoutButton product={product} listingID={id} />
              {/* <button className=' border-2 border-orange-200 bg-[#FAB038] w-full  text-white font-semibold hover:bg-orange-300 p-2  rounded-xl '
            >Continue to Pay</button> */}
            
            

            
            

            </div>


                </div>

            </div>

        </main>
        </div>
        </div>
  )
}

export default withProtected(BillingDetails);