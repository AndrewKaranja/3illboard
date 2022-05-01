import React, {  useRef,useEffect, useState } from 'react';
import {useRouter} from "next/router";
import { HeartIcon} from '@heroicons/react/outline'
import { StarIcon } from '@heroicons/react/solid';
import * as BiIcons from 'react-icons/bi';
import * as RiIcons from 'react-icons/ri';
import * as MdIcons from 'react-icons/md';
import * as FcIcons from 'react-icons/fc';
import * as AiIcons from 'react-icons/ai';

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
import billboard from '../../images/cat.png';
import Link from 'next/link';
import { async } from '@firebase/util';
import { collection, doc, getDoc,addDoc } from "firebase/firestore";
import { useDocument } from 'react-firebase-hooks/firestore';

import { useAuth } from '../../context/AuthContext';

import LoadingScreen from '../../components/LoadingScreen';
import { db } from '../../firebase';






// export async function getServerSideProps() {
//   const listingsRef = collection(db, "listings");
//   const listingQuery=query(listingsRef,where('activated','==',false));
 
//   const listingsRes=await getDocs(listingQuery) ;

//     const listings=listingsRes.docs?.map((doc)=>({
//         id:doc.id,
//         ...doc.data(),
//     }));


//   return{
//     props:{

//       listing:JSON.stringify(listings),
//     }
//   }
// }


export default function ListingDetails() {
  const {user}=useAuth();
  const{query:{id}}=useRouter();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [response, setResponse] = useState("");
  const [done, setDone] = useState(undefined);
  const [showCalendar,setShowCalendar]=useState(false);
  const [listing,setListing]=useState("");
 

  const[startDate,setStartDate]=useState(new Date());
  const[endDate,setEndDate]=useState(new Date());

  useEffect(() => {
    async function getListingDetail(){
      const promises=[];
      const docRef = doc(db, "listings", `${id}`);
      const docSnap = await getDoc(docRef);
      promises.push(docSnap);
      console.log(docSnap)
      setListing(docSnap.data()); 
      Promise.all(promises)
      .then(()=>{setTimeout(() => { setDone(true);}, 2000);})
      .catch((err)=>console.log(err));
  
    }
    if(id){
      console.log("fetched")
      getListingDetail();
      //const image=listing.photosURLS[0]
      //setBannerImage(image);
    }
    
   
  }, [id]);
  

  //const [value,listingSnapshot, loading, error] = useDocument(getDoc(doc(db, "listings", id)) );
console.log(listing)
  // const listing=value?.data();

  const selectionRange={
    startDate:startDate,
    endDate:endDate,
    key:'selection',
}

const handleSelect=(ranges)=>{
    setStartDate(ranges.selection.startDate)
    setEndDate(ranges.selection.endDate)
}

const handleEnquireClick= async()=>{
  const promises=[];
  const chatRef = await addDoc(collection(db, "chats"), {
    users:[user.email,listing?.owneremail]
  });
  promises.push(chatRef);
  Promise.all(promises)
  .then(()=>{setTimeout(() => { router.push(`/account/messages/${chatRef.id}`);}, 1000);})
  .catch((err)=>console.log(err));
}

const handleCanlendar=(isPressed)=>{
  if (isPressed) {
    return <div>
    <DateRange
      ranges={[selectionRange]}
      minDate={new Date()}
      rangeColors={["#FAB038"]}
      
      onChange={handleSelect}/>

    </div> ;
  }
  
}

const listingImage=listing?.photosURLS?.map((photosURL)=>
<>
  <SwiperSlide key={photosURL}>
          
          <Image src={photosURL} layout="fill" alt='ad image' objectFit="contain"  className='rounded-2xl w-full h-full'/>
          {/* <img src={photosURL} alt="listing images" /> */}
      </SwiperSlide>
</>
)



  return (
    <div className='bg-slate-400 h-screen overflow-auto'>
      <Link passHref href="/search" >
        <div className="bg-white w-full flex flex-row items-center p-2">
        <AiIcons.AiOutlineRollback className='h-16 w-16'/>
        <p className='text-xl align-middle font-bold'>Return to Search</p>

        </div>
              
              </Link>
      
      {console.log("Hello",id)}
     
      {console.log("Millo",listing)}
      

{/* {loading && <LoadingScreen/>} */}
      
    
    <div className='flex lg:mt-10 lg:ml-12 lg:mr-12 mb-2   h-84  lg:rounded-xl bg-white cursor-pointer select-none '>
    
      <div className='flex flex-col lg:flex-row mx-auto lg:flex-[10]'>
            <div className='relative h-full w-32 flex-grow-[1]  '>
              <Image src={listing.length==0 ? billboard : listing?.photosURLS?.[0]} layout="fill" alt='ad image' objectFit='cover' className='rounded-l-xl rounded-bl-xl'/>
              {/* <Link passHref href="/account/listings">
              <AiIcons.AiOutlineRollback className='h-full w-full'/>
              </Link> */}
              
            </div>
            <div className='flex flex-col flex-grow-[9] p-5 h-fit'>
                <div className='flex justify-between'>
                <h4 className='text-xl text-black font-bold'>{listing?.details?.billboardTitle}</h4>
                    
              <RiIcons.RiMenu4Fill/>
                    
                </div>
                
                <p className='text-sm text-gray-500 font-semibold'>📍{listing?.details?.billboardDescription}</p>
                
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
              onClick={()=>setShowCalendar(!showCalendar)}>📅 Show Ad Calendar</button>
              
            </div>
            {handleCanlendar(showCalendar)}
            {/* {()=>{
              if (showCalendar) {
              return <div className={showCalendar?'visible':'invisible'}>
              <DateRange
                ranges={[selectionRange]}
                minDate={new Date()}
                rangeColors={["#FAB038"]}
                
                onChange={handleSelect}/>
  
              </div>
              
            }}} */}
            </div>
        
       
  
        </div>

        {/* main body */}
        <div className='flex mt-3 lg:ml-12 lg:mr-12 lg:mb-12 h-84  lg:rounded-xl bg-white cursor-pointer select-none '>
    
    <div className='flex flex-col  mx-auto lg:flex-row md:flex-[10]'>
    <div className='h-full  w-[70%] flex-grow-[6] m-5 '>

       <div>
       <h4 className='text-xl text-black font-bold m-2'>Ad Description</h4>
       {/* <p className='invisible text-white'>{listing.listingid}</p> */}
       <p className='m-5'>{listing?.details?.billboardDescription}</p>
         </div>   
    


  <div className='border-b pt-2 border-orange-100'/>
<div className='my-5 flex flex-row'>
<div className='flex flex-row items-center mx-3'>
<BiIcons.BiCrop className='h-8 w-8'/>
<div className='ml-2'>
<p className='text-sm text-black'>{listing?.details?.dimensionWidth} x {listing?.details?.dimensionHeight} m</p>
<p className='text-sm text-gray-500'>dimensions</p>
</div>

</div>
<div className='flex flex-row items-center mx-3'>

<RiIcons.RiLightbulbFlashLine className={listing?.details?.nightVisibility ?'h-8 w-8 text-yellow-400':'h-8 w-8 text-gray-400'}/>
<p className='text-sm text-black'>Visible at Night</p>
</div>

</div>

<div className='border-b pt-2 border-orange-100'/>
<div className='my-3'>
<h4 className='font-bold text-xl m-5'>Services</h4>

<div className='flex flex-row'>
{listing?.details?.otherServices?.map((service)=>
          <p key={service} className='text-sm text-black bg-orange-50 w-fit m-2 p-2 rounded-xl font-medium'> {service}
          </p>
        )}
        </div>
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
        className="mySwiper lg:w-[60vw] w-[80vw] h-80"
      >
        {listingImage}
      </Swiper>
 

</div>




              

          </div>
          <div className='flex flex-col flex-grow-[4] h-fit'>
            <div className='p-5 h-fit text-white bg-black rounded-xl m-5'>
            <div className='flex '>
              <Image src={billboard} alt='ad image' width={40} height={40} objectFit="cover" className='rounded-2xl'/>
              <div className='flex ml-2  flex-col'>
                <p className='text-sm font-bold  justify-center'>Temp Email</p>
              <p className='text-xs '>Ad lister</p>

              </div>
              
              
             
              </div>

              <div className='border-b pt-2 border-slate-200'/>
              <div className='flex justify-between py-2'>
              <p className='text-xs'>Available</p>
              <p className='text-xs'>12th Dec 2022</p>
              </div>
              <div className='flex justify-between py-2'>
              <p className='text-xs'>to</p>
              <p className='text-xs'>12th Jan 2022</p>
              </div>
              <div className='flex justify-between py-2'>
              <p className='text-xs'>Contact</p>
              <p className='text-xs'>+254 712 345 678</p>
              </div>
              <div className='flex justify-between py-2 mb-3'>
              <p className='text-xs'>Price/{listing?.price?.interval}</p>
              <p className='text-sm font-semibold'>{listing?.price?.price}KES</p>
              </div>
              

  
          <button onClick={handleEnquireClick} className=' border-2 border-orange-200 bg-blue-500 w-full  text-white font-semibold hover:bg-orange-300 p-2  rounded-xl'
            >📫Enquire</button>

            </div>
            {/* Client transactions documents */}
            <div className='mx-4'>
              <div className='flex flex-row items-center w-full justify-evenly '>
                <FcIcons.FcDocument className='w-8 h-8 pr-1'/>
                <p className='font-semibold text-sm justify-start'>More Details</p>
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
