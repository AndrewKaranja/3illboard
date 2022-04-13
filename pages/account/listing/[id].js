import React, {  useRef,useEffect, useState } from 'react';
import {useRouter} from "next/router";
import { HeartIcon} from '@heroicons/react/outline'
import { StarIcon } from '@heroicons/react/solid';
import * as BiIcons from 'react-icons/bi';
import * as RiIcons from 'react-icons/ri';
import * as MdIcons from 'react-icons/md';
import * as FcIcons from 'react-icons/fc';
import { DateRange } from 'react-date-range';


import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFlip, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

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

  const[startDate,setStartDate]=useState(new Date());
  const[endDate,setEndDate]=useState(new Date());

  const selectionRange={
    startDate:startDate,
    endDate:endDate,
    key:'selection',
}

const handleSelect=(ranges)=>{
    setStartDate(ranges.selection.startDate)
    setEndDate(ranges.selection.endDate)
}

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

 
    
    <div className='flex mt-12 ml-12 mr-12 mb-2   h-84  rounded-xl bg-white cursor-pointer select-none '>
    
      <div className='flex flex-[10]'>
      <div className='relative h-full w-32 flex-grow-[1] '>
            
            <Image src={billboard} layout="fill" alt='ad image' objectFit='cover' className='rounded-l-xl rounded-bl-xl'/>
            </div>
            <div className='flex flex-col flex-grow-[9] p-5 h-fit'>
                <div className='flex justify-between'>
                <h4 className='text-xl text-black font-bold'>Gigantic Billboard</h4>
                    
              <RiIcons.RiMenu4Fill/>
                    
                </div>
                
                <p className='text-sm text-gray-500 font-semibold'>📍Near Strathmore</p>
                
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
            
            <button className=' border-2 border-orange-200 bg-[#FAB038]  text-white font-semibold hover:bg-orange-300 p-2 w-56 rounded-full'
              >📅 Check Ad Calendar</button>
              
            </div>
            <DateRange
              ranges={[selectionRange]}
              minDate={new Date()}
              rangeColors={["#FAB038"]}
              
              onChange={handleSelect}/>

      </div>
        
       
  
        </div>

        {/* main body */}
        <div className='flex mt-3 ml-12 mr-12 mb-12 h-84  rounded-xl bg-white cursor-pointer select-none '>
    
    <div className='flex flex-[10]'>
    <div className='h-full  w-[70%] flex-grow-[6] m-5 '>

       <div>
       <h4 className='text-xl text-black font-bold m-2'>Ad Description</h4>
       <p className='m-5'>I just wanna tell you how I am feeling
Gotta make you understand
Never gonna give you up
Never gonna let you down
Never gonna run around and desert you
Never gonna make you cry
Never gonna say goodbye
Never gonna tell a lie and hurt you</p>
         </div>   
    


  <div className='border-b pt-2 border-orange-100'/>
<div className='my-5 flex flex-row'>
<div className='flex flex-row items-center mx-3'>
<BiIcons.BiCrop className='h-8 w-8'/>
<div className='ml-2'>
<p className='text-sm text-black'>12 x 12 m</p>
<p className='text-sm text-gray-500'>dimensions</p>
</div>

</div>
<div className='flex flex-row items-center mx-3'>

<RiIcons.RiLightbulbFlashLine className='h-8 w-8'/>
<p className='text-sm text-black'>Visible at Night</p>
</div>

</div>

<div className='border-b pt-2 border-orange-100'/>
<div className='my-3'>
<h4 className='font-bold text-xl m-5'>Services</h4>
<p className='text-sm text-black bg-orange-50 w-fit m-4 p-2 rounded-xl font-medium'>Design</p>
</div>


<div className='border-b pt-2 border-orange-100'/>

<div>
<h4 className='font-bold text-xl m-4'>Ad Space overview</h4>
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
        className="mySwiper w-[60vw] h-80"
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
      {/* <Swiper
        slidesPerView={2}
        spaceBetween={30}
        slidesPerGroup={2}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper w-[60vw] h-80"
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
      </Swiper> */}

</div>




              

          </div>
          <div className='flex flex-col flex-grow-[4] h-fit'>
            <div className='p-5 h-fit text-white bg-black rounded-xl m-5'>
            <div className='flex '>
              <Image src={billboard} alt='ad image' width={40} height={40} objectFit="cover" className='rounded-2xl'/>
              <div className='flex ml-2  flex-col'>
                <p className='text-sm font-bold  justify-center'>Mary Jane</p>
              <p className='text-xs '>Current client</p>

              </div>
              
              
             
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
              

  
          <button className=' border-2 border-orange-200 bg-blue-500 w-full  text-white font-semibold hover:bg-orange-300 p-2  rounded-xl'
            >📫Send Messages</button>

            </div>
            {/* Client transactions documents */}
            <div className='mx-4'>
              <div className='flex flex-row items-center w-full justify-evenly '>
                <FcIcons.FcDocument className='w-8 h-8 pr-1'/>
                <p className='font-semibold text-sm justify-start'>Contract Document</p>
                <RiIcons.RiDownload2Fill className='text-gray-400 content-end'/>
                
              </div>
              <div className='border-b mx-4 m-2 border-orange-100'/>
            </div>
              
          </div>

    </div>
      
     

      </div>
       
        </div>
  )
}
