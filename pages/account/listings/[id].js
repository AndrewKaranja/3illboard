import React, {  useEffect, useState } from 'react';
import {useRouter} from "next/router";
import { Timeline, Text,Modal, Button, Group,NativeSelect   } from '@mantine/core';

import * as BiIcons from 'react-icons/bi';
import * as RiIcons from 'react-icons/ri';
import * as MdIcons from 'react-icons/md';
import * as FcIcons from 'react-icons/fc';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import FullCalendar ,{ formatDate } from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction'




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

import { doc, getDoc,collection,getDocs } from "firebase/firestore";
import { db } from '../../../firebase';
import { useAuth } from '../../../context/AuthContext';

import LoadingScreen from '../../../components/LoadingScreen';
import AddReservation from '../../../components/dashboard/AddReservation';






export default function ListingDetails() {
  const {user}=useAuth();
  const{query:{id}}=useRouter();
  const [listing,setListing]=useState("");
  const [done, setDone] = useState(undefined);
  const [showCalendar,setShowCalendar]=useState(false);
  const [bannerImage,setBannerImage]=useState(billboard);
  const [someReserved,setSomeReserved]=useState("");
  const[bookings,setBookings]=useState("");
  const [showModal, setShowModal] = useState(false);
  const [timelineModalOpened, setTimelineModalOpened] = useState(false);

  const[startDate,setStartDate]=useState(new Date());
  const[endDate,setEndDate]=useState(new Date());



  const selectionRange={
    startDate:startDate,
    endDate:endDate,
    key:'selection',
}
const reservedDates=[];

const handleSelect=(ranges)=>{
    setStartDate(ranges.selection.startDate)
    setEndDate(ranges.selection.endDate)
}


const handleReservations=()=>{
  setShowModal(true);
}

const handleCanlendar=(isPressed)=>{
  if (isPressed) {
   
    return <div className='flex mt-3 lg:ml-12 lg:mr-12 lg:mb-12  h-[40rem]  rounded-xl bg-white cursor-pointer select-none '>
      <div className='w-full h-[36rem] m-3'>

     <FullCalendar
  plugins={[ dayGridPlugin ]}
  height="100%"
  initialView="dayGridMonth"
  weekends={true}
  events={bookings}
/>

    </div></div> ;
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


// i should break this down break down this useeffect to track errors
  useEffect(() => {
    async function getListingDetail(user){
      const promises=[];
      const docRef = doc(db, `users/${user.uid}/listings`, `${id}`);
      const reservationsRef=collection(db,`users/${user.uid}/listings/${id}/reservations`);

      const reservationsQuerySnapshot = await getDocs(reservationsRef);
      
      reservationsQuerySnapshot.docs?.forEach((doc) => {
        const event={
          title:doc.data().reservedBy,
          start:doc.data().startDate.toDate().toString(),
          end:doc.data().endDate.toDate().toISOString().replace(/T.*$/, '')
        }
       
        reservedDates.push(event);
        
      
      });

      // Another option for this
    const results=reservationsQuerySnapshot.docs?.map((doc)=>({
           title:doc.data().reservedBy+" : "+doc.data().status,
          start:doc.data().startDate.toDate().toISOString().replace(/T.*$/, ''),
          end:doc.data().endDate.toDate().toISOString().replace(/T.*$/, ''),
          allDay:true,
          backgroundColor:doc.data().background,
    }))

    // setSomeReserved(results);
    setBookings(results);


      const docSnap = await getDoc(docRef);
      promises.push(docSnap);
      
      setListing(docSnap.data()); 
      Promise.all(promises)
      .then(()=>{setTimeout(() => { setDone(true);}, 2000);})
      .catch((err)=>console.log(err));
  
    }
    if(id){
      getListingDetail(user);
     
 
    }
    
   
  }, [user,id]);


  

  return (
    <div className='bg-slate-400 h-screen overflow-auto'>
      <Link passHref href="/account/listings" >
      <div className="bg-white w-full flex flex-row text-[#fab038] justify-center items-center cursor-pointer p-2">
        <AiIcons.AiOutlineRollback className='h-10 w-10'/>
        <p className='text-xl align-middle font-bold'>Back to Listings</p>

        </div>
              
              </Link>
      
     
     
     
      {!done ?(<LoadingScreen/>):(
            <></>
          )}
      
    
    <div className='flex lg:mt-12 lg:ml-12 lg:mr-12 mb-2 h-84 rounded-xl bg-white cursor-pointer select-none '>
    
      <div className='flex flex-col lg:flex-row lg:flex-[10]'>
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
            
            <button className=' border-2 border-orange-200 bg-[#FAB038]  text-white font-semibold hover:bg-orange-300 p-2 w-56 rounded-full'
              onClick={()=>setShowCalendar(!showCalendar)}>{!showCalendar ? '📅 Show Ad Calendar' :'📅 Hide Ad Calendar'}</button>
              
            </div>
            {/* {handleCanlendar(showCalendar)} */}

           
            </div>
        
       
  
        </div>
        
        {handleCanlendar(showCalendar)}
        
        {/* main body */}
        <div className='flex mt-3 lg:ml-12 lg:mr-12 lg:mb-12 h-84  rounded-xl bg-white cursor-pointer select-none '>
    
    <div className='flex flex-col lg:flex-row md:flex-[10]'>
    <div className='h-full  w-[70%] flex-grow-[6] m-5 '>

    <h4 className='text-xl text-black font-bold m-2'>Listing Timeline</h4>
    <Timeline active={0} bulletSize={24} lineWidth={2} color="orange">
      <Timeline.Item bullet={<AiIcons.AiOutlineBook />} title="Booked">
        <Text color="dimmed" size="sm">Listing booked by <Text variant="link" component="span" inherit>testclient@gmail.com</Text></Text>
        <Text size="xs" mt={4}>2 hours ago</Text>
      </Timeline.Item>

      <Timeline.Item bullet={<MdIcons.MdDesignServices />} title="Design and Invoicing">
        <Text color="dimmed" size="sm">This step indicates talks with the client including design and invoice discussions</Text>
        <Text size="xs" mt={4}>52 minutes ago</Text>
      </Timeline.Item>

      <Timeline.Item title="Active" bullet={<BsIcons.BsBookmarkCheckFill />} lineVariant="dashed">
        <Text color="dimmed" size="sm">This step indicates the ad is active or mounted</Text>
        <Text size="xs" mt={4}>34 minutes ago</Text>
      </Timeline.Item>

      <Timeline.Item title="Unmounting" bullet={<MdIcons.MdOutlineReport />}>
        <Text color="dimmed" size="sm">This step indicates end of tenure with the client and reactivates listing on the search page for more booking</Text>
        <Text size="xs" mt={4}>12 minutes ago</Text>
      </Timeline.Item>
    </Timeline>
    <Modal
        opened={timelineModalOpened}
        onClose={() => setTimelineModalOpened(false)}
        title="Update Listing progress"
      >
        <NativeSelect
      data={['Booked', 'Design and Invoice', 'Active', 'Inactive']}
      placeholder="Pick one"
      label="Select current Listing status"
      required
    />
    <button onClick={() => setTimelineModalOpened(false)} className=' border-2 border-orange-200 bg-blue-500 w-fit  text-white font-semibold hover:bg-orange-300 p-2  rounded-xl'
            >Confirm</button>
      </Modal>
      <button onClick={() => setTimelineModalOpened(true)} className=' border-2 mt-2 border-orange-200 bg-blue-500 w-fit  text-white font-semibold hover:bg-orange-300 p-2  rounded-xl'
            >Update TimeLine</button>


  {/* You&apos;ve  */}
       

    <div className='border-b pt-2 border-orange-100'/>

       <div>
       <h4 className='text-xl text-black font-bold m-2'>Ad Description</h4>
       {/* <p className='invisible text-white'>{listing.listingid}</p> */}
       <p className='m-5'>{listing.details?.billboardDescription}</p>
         </div>   
    


  <div className='border-b pt-2 border-orange-100'/>
<div className='my-5 flex flex-row'>
<div className='flex flex-row items-center mx-3'>
<BiIcons.BiCrop className='h-8 w-8'/>
<div className='ml-2'>
<p className='text-sm text-black'>{listing.details?.dimensionWidth} x {listing.details?.dimensionHeight} m</p>
<p className='text-sm text-gray-500'>dimensions</p>
</div>

</div>
<div className='flex flex-row items-center mx-3'>

<RiIcons.RiLightbulbFlashLine className={listing.details?.nightVisibility ?'h-8 w-8 text-yellow-400':'h-8 w-8 text-gray-400'}/>
<p className='text-sm text-black'>Visible at Night</p>
</div>

</div>

<div className='border-b pt-2 border-orange-100'/>
<div className='my-3'>
<h4 className='font-bold text-xl m-5'>Services</h4>

<div className='flex flex-row'>
{listing.details?.otherServices?.map((service)=>
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
        className="mySwiper lg:w-[60vw] w-[80vw] h-80"
      >
        {listingImage}
      </Swiper>
 

</div>




              

          </div>
          <div className='flex flex-col flex-grow-[4] h-fit'>
          <button onClick={handleReservations} className=' border-2 my-2  bg-blue-500 w-full  text-white font-semibold hover:bg-orange-300 py-2  rounded-xl'
            >🎫 Add reservation</button>
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
              <p className='text-xs'>Price/{listing.price?.interval}</p>
              <p className='text-sm font-semibold'>{listing.price?.price}KES</p>
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


      {showModal ? (
        <>
        {/* <ListingModal/> */}
        <AddReservation setShowModal={setShowModal} handleSelect={handleSelect} listingid={id} startDate={startDate} endDate={endDate}/>

        </> 
      ) : null}
       
        </div>
  )
}