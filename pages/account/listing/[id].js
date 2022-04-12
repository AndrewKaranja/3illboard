import React, {  useRef,useEffect, useState } from 'react';
import {useRouter} from "next/router";
import { HeartIcon} from '@heroicons/react/outline'
import { StarIcon } from '@heroicons/react/solid';
import * as BiIcons from 'react-icons/bi';
import * as RiIcons from 'react-icons/ri';

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFlip, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Image from 'next/image';
import billboard from '../../../images/cat.png';
import Link from 'next/link';
import { async } from '@firebase/util';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../../firebase';
import { useAuth } from '../../../context/AuthContext';



// export async function getServerSideProps({params}){
//   const docRef = doc(db, `users/${user.id}/listing`, "SF");
// const docSnap = await getDoc(docRef);
// const response=docSnap.data();
// return{
//   props:{
//     listing:response,
//   },
// }
  
// }

export default function ListingDetails() {
  const {user}=useAuth();
  const{query:{listingid},}=useRouter();
  const [response, setResponse] = useState("");

  useEffect(() => {
    async function getListingDetail(user){
      const docRef = doc(db, `users/${user.id}/listings`, "f7tU7trC0zWSriZav6Uo");
      const docSnap = await getDoc(docRef);
      setResponse(docSnap.data()); 
  
    }
   
      console.log("Hello",response);
    
  
    
    getListingDetail(user);
  
   
  }, [])


  return (
    <div className='bg-slate-400 h-screen overflow-auto'>

 
    
    <div className='flex m-12   h-84 hover:border-2 hover:shadow-sm rounded-xl bg-white cursor-pointer select-none transition duration-100 ease-out '>
    
      <div className='flex flex-[10]'>
      <div className='relative h-full w-32 flex-grow-[1] '>
            
            <Image src={billboard} layout="fill" alt='ad image' objectFit='cover' className='rounded-l-xl rounded-bl-xl'/>
            </div>
            <div className='flex flex-col flex-grow-[9] p-5 h-fit'>
                <div className='flex justify-between'>
                <h4 className='text-xl text-black font-bold'>Gigantic Billboard</h4>
                    <button className='hidden md:inline h-8 border-2 border-red-600 bg-red-200 rounded text-black hover:bg-orange-300 p-2'
              >Unlisted</button>
                    
                </div>
                
                <p className='text-sm text-gray-500'>Near Strathmore</p>
                
                <p className='pt-2 text-sm text-gray-500 flex-grow'>DESIGN . MOUNTING . POTATOES</p>
    
                <div className='flex justify-between items-end pt-5'>
                <p className='flex items-center'>
                <StarIcon className='h-5 text-[#FAB038]'/>
               2.0
                </p>
                <div>
                    <p className='text-lg lg:text-2xl font-semibold pb-2'>404KES/page</p>
                </div>
            </div>
            <button className=' border-2 border-orange-200 bg-[#FAB038]  text-white font-semibold hover:bg-orange-300 p-2 w-56 rounded-full'
              >📅Check Ad Calendar</button>
            </div>

      </div>
        
       
  
        </div>

        {/* main body */}
        <div className='flex m-12   h-84 hover:border-2 hover:shadow-sm rounded-xl bg-white cursor-pointer select-none transition duration-100 ease-out '>
    
    <div className='flex flex-[10]'>
    <div className='h-full  w-[70%] flex-grow-[6] m-5 '>
          
    <h4 className='text-xl text-black font-bold m-2'>Gigantic Billboard</h4>


  <div className='border-b pt-2 border-black'/>
<div className='my-5 flex flex-row'>
<div className='flex flex-row items-center'>
<BiIcons.BiCrop className='h-8 w-8'/>
<p className='text-sm text-black'>12 x 12 m</p>
</div>
<div className='flex flex-row items-center'>

<RiIcons.RiLightbulbFlashLine className='h-8 w-8'/>
<p className='text-sm text-black'>Visible at Night</p>
</div>

</div>

<div className='border-b pt-2 border-black'/>
<div className='my-3'>
<h4 className='text-sm font-semibold mb-3'>Services</h4>
<p className='text-sm text-black bg-orange-100 w-fit p-2 rounded-sm font-medium'>Design</p>
</div>


<div className='border-b pt-2 border-black'/>

<div>
<h4>Property overview</h4>
{/* <div className='flex  p-3'>
<Image src={billboard} alt='ad image' width={100} height={100}  objectFit="fit" className='rounded-2xl m-5'/>
<Image src={billboard} alt='ad image' width={100} height={100} objectFit="cover" className='rounded-2xl m-5'/>
<Image src={billboard} alt='ad image' width={100} height={100} objectFit="cover" className='rounded-2xl mx-5'/>
<Image src={billboard} alt='ad image' width={100} height={100} objectFit="cover" className='rounded-2xl mx-5'/>


</div> */}
<Swiper
        effect={"flip"}
        grabCursor={true}
        pagination={true}
        navigation={true}
        modules={[EffectFlip, Pagination, Navigation]}
        className="mySwiper w-80 h-80"
      >
        <SwiperSlide>
        <Image src={billboard} alt='ad image' layout='fill'  objectFit="cover" className='rounded-2xl m-5'/>
        </SwiperSlide>
        <SwiperSlide>
        <Image src={billboard} alt='ad image' layout='fill'  objectFit="cover" className='rounded-2xl m-5'/>
        </SwiperSlide>
        <SwiperSlide>
        <Image src={billboard} alt='ad image' layout='fill'  objectFit="cover" className='rounded-2xl m-5'/>
        </SwiperSlide>
        <SwiperSlide>
        <Image src={billboard} alt='ad image' layout='fill'  objectFit="cover" className='rounded-2xl m-5'/>
        </SwiperSlide>
        <SwiperSlide>
        <Image src={billboard} alt='ad image' layout='fill'  objectFit="cover" className='rounded-2xl m-5'/>
        </SwiperSlide>
      </Swiper>

</div>




              

          </div>
          <div className='flex flex-col flex-grow-[4] p-5 h-fit text-white bg-black rounded-xl m-5'>
              <div className='flex '>
              <Image src={billboard} alt='ad image' width={40} height={40} objectFit="cover" className='rounded-2xl'/>
              <p className='text-sm ml-2 font-bold  justify-center'>Mary Jane</p>
              
             
              </div>

              <div className='border-b pt-2 border-slate-200'/>
              <div className='flex justify-between py-2'>
              <p className='text-xs'>Placement Date</p>
              <p className='text-xs'>12th Dec 2022</p>
              </div>
              <div className='flex justify-between py-2'>
              <p className='text-xs'>End date</p>
              <p className='text-xs'>12th Jan 2022</p>
              </div>
              <div className='flex justify-between py-2'>
              <p className='text-xs'>Contact</p>
              <p className='text-xs'>+254 712 345 678</p>
              </div>
              <div className='flex justify-between py-2 mb-3'>
              <p className='text-xs'>Price/Month</p>
              <p className='text-sm font-semibold'>200,000KES</p>
              </div>
              

  
          <button className=' border-2 border-orange-200 bg-blue-500  text-white font-semibold hover:bg-orange-300 p-2  rounded-xl'
            >📫Send Messages</button>
          </div>

    </div>
      
     

      </div>
       
        </div>
  )
}
