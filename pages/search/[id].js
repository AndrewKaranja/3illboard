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

import {ErrorMessage,useField,Formik,Form,Field} from 'formik';
import * as Yup from 'yup';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import {
  addDays,
  endOfDay,
  startOfDay,
  startOfMonth,
  endOfMonth,
  addMonths,
  startOfWeek,
  endOfWeek,
  isSameDay,
  differenceInCalendarDays,
  format,
} from 'date-fns';




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
import preLoadGif from '../../images/uploaded.gif'
import Link from 'next/link';
import { async } from '@firebase/util';
import { collection, doc, getDoc,addDoc,getDocs,query, orderBy,where,setDoc,serverTimestamp  } from "firebase/firestore";

import {useCollection} from "react-firebase-hooks/firestore";

import { useAuth } from '../../context/AuthContext';

import LoadingScreen from '../../components/LoadingScreen';
import { db } from '../../firebase';
import ListingModal from '../../components/ListingModal';
import Footer from '../../components/Footer';

export default function ListingDetails() {
  const {user}=useAuth();
  const{query:{id}}=useRouter();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [response, setResponse] = useState("");
  const [done, setDone] = useState(undefined);
  const [showCalendar,setShowCalendar]=useState(false);
  const [listing,setListing]=useState("");
  const [showModal, setShowModal] = React.useState(false);

  const dates = [];


    const getReservations=async ()=>{
      
      const q = query(collection(db, `listings/${id}/reservations`), where("status", "==", "booked"));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  
  // doc.data() is never undefined for query doc snapshots
  const date = new Date(doc.data().startDate.toDate().getTime());



  while (date <= doc.data().endDate.toDate()) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }


});



    }

getReservations();



  // remember to fix this issue---> when user is logged out
  // this section returns an error
  // const userChatRef = collection(db, "chats");
  // const chatsQuery = query(userChatRef,where('users','array-contains',user?.email));
  // const [chatsSnapshot]=getDocs(chatsQuery);

  // const chatAlreadyExists=(recepientEmail)=>
  // !!chatsSnapshot?.docs.find(
  //     (chat)=>chat.data().users.find(user=>user===recepientEmail)?.length>0
  //     );

  const validate=Yup.object({
    message:Yup.string()
    .min(5,'Must be atleast 5 characters')
    .max(100,'Must be 50 characters or less')
    .required('Message is required'),
    fname:Yup.string()
    .min(4,'Must be atleast 4 characters')
    .required('Fullname is required'),
    email:Yup.string()
    .email('Invalid email format').required('Required'),
    
  });

  const [MessageInfo, setMessageInfo] = useState([]);
  const [chatRefId, setChatRefId] = useState(null);
 

  const[startDate,setStartDate]=useState(new Date());
  // let minimumDays=Number(listing?.minimumListingPeriod);
  // console.log(String(minimumDays));
  const[endDate,setEndDate]=useState(new Date());

  useEffect(() => {
    async function getListingDetail(){
      const promises=[];
      const docRef = doc(db, "listings", `${id}`);
      // const reservationsRef=collection(db,`listings/${id}/reservations`);
      // const reservationsQuerySnapshot = await getDocs(reservationsRef);
      const docSnap = await getDoc(docRef);
      promises.push(docSnap);
      // console.log(docSnap)
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
// console.log(listing)
  // const listing=value?.data();

  const selectionRange={
    startDate:startDate,
    endDate:endDate,
    key:'selection',
}

const handleSelect=(ranges)=>{
    setStartDate(ranges.selection.startDate)
    setEndDate(addDays(ranges.selection.startDate,Math.max(Number(listing?.price?.minimumBookingPeriod), 1) - 1))
}
 
const messageEnquiry=()=>{
  const enquiry=`Hello ${listing?.owneremail},${MessageInfo?.fname} is inquiring about your Listing http://localhost:3000/account/listings/${listing?.listingid}.Additional message:
  ${MessageInfo?.message}`
  return enquiry;
}

const handleEnquireClick= async()=>{

 
  if(!user){
    const prevPath=router.pathname;
            router.push({
                pathname:'/login',
                query:{
                  prevPath:`/search/${listing?.listingid}`
                }
              })
  }else{
    const requestedPeriod=`${format(startDate,"do 'of' MMMM yyyy")} - ${format(endDate,"do 'of' MMMM yyyy")}`
    router.push({
      pathname:'/enquire',
      query:{
        owneremail:listing?.owneremail,
        listingID:listing?.listingid,
        ownerID:listing?.ownerid,
        billboardTitle:listing?.details?.billboardTitle,
        requestedPeriod:requestedPeriod,
      }
    })

  }

}

const handleCanlendar=(isPressed)=>{
  if (isPressed) {
    return <div>
    <DateRange
      ranges={[selectionRange]}
      minDate={new Date()}
      disabledDates={dates}
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
        <div className="bg-white w-full flex flex-row text-[#fab038] justify-center items-center p-2 cursor-pointer">
        <AiIcons.AiOutlineRollback className='h-12 w-12'/>
        <p className='text-xl align-middle font-bold'>Return to Search</p>

        </div>
              
              </Link>
      
      {/* {console.log("Hello",id)}
     
      {console.log("Millo",listing)} */}
      

{/* {loading && <LoadingScreen/>} */}
      
    
    <div className='flex lg:mt-10 lg:ml-8 lg:mr-8 mb-2   h-84  lg:rounded-xl bg-white select-none '>
    
      <div className='flex flex-col lg:flex-row mx-auto lg:flex-[10]'>
            <div className='relative h-full w-32 flex-grow-[1]  '>
              <Image src={listing.length==0 ? preLoadGif : listing?.photosURLS?.[0]} layout="fill" alt='ad image' objectFit='cover' className='rounded-l-xl rounded-bl-xl'/>
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
              onClick={()=>setShowCalendar(!showCalendar)}>{!showCalendar ? '📅 Show Ad Calendar' :'📅 Hide Ad Calendar'}</button>
              
            
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
        <div className='flex  mt-3  h-fit  lg:rounded-xl bg-white cursor-pointer select-none '>
    
    <div className='flex flex-col md:flex-row md:justify-between w-full '>
    <div className='h-full w-full  md:w-[50%] lg:w-[60%]  md:p-5 '>

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

<Swiper
        effect={"flip"}
        grabCursor={true}
        pagination={true}
        navigation={true}
        modules={[EffectFlip, Pagination, Navigation]}
        className="mySwiper md:w-[45vw] lg:w-[50vw] w-[80vw] h-80"
      >
        {listingImage}
      </Swiper>
 

</div>


          </div>
          <div className='flex flex-col md:w-fit w-full h-fit '>
            <div className='p-5 h-fit w-full md:w-fit   text-white bg-black rounded-xl '>
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
              <p className='text-xs'>{format(startDate,"do 'of' MMMM yyyy")}</p>
              </div>
              <div className='flex justify-between py-2'>
              <p className='text-xs'>to</p>
              <p className='text-xs'>{format(endDate,"do 'of' MMMM yyyy")}</p>
              </div>
              <div className="mx-auto">
              <DateRange
      ranges={[selectionRange]}
      minDate={new Date()}
      rangeColors={["#FAB038"]}
      disabledDates={dates}
      onChange={handleSelect}/>

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
      <Footer/>
       
        </div>
  )
}
