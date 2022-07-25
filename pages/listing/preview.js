/* eslint-disable @next/next/no-img-element */
import React, {useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import Image from 'next/image';
import BackgroundImg from '../../images/streetlights.png';
import { HeartIcon} from '@heroicons/react/outline';
import { StarIcon } from '@heroicons/react/solid';
import CatImg from '../../images/cat.png';
import { useRouter } from 'next/router';
import {v4} from 'uuid';
import LoadingScreen from '../../components/LoadingScreen';
import { geohashForLocation } from 'geofire-common';

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, EffectFlip, Pagination } from "swiper";
import { writeBatch,serverTimestamp,doc} from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';

function Preview() {

  const router=useRouter();
  const{user}=useAuth();
  const [details, setDetails] = useState([]);
  const [price, setPrice] = useState([]);
  const [location, setLocation] = useState([]);
  const [photosURLS, setPhotosURLS] = useState([]);

  const [legalsURLS, setLegalsURLS] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [hash,setHash]=useState(null);
  const listingID=v4();


 

  const addListing =async(user)=>{
    const listingDocRef=doc(db,"listings",listingID);
    const userDocRef = doc(db, "users", `${user.uid}`);
    const listingUserDocRef=doc(db,`users/${user.uid}/listings`,listingID);
    const promises=[];
    const increment = firebase.firestore.FieldValue.increment(1);


    const batch = writeBatch(db);
    batch.set(listingUserDocRef,{details,price,location,photosURLS,legalsURLS,listingType:details.listingType,paymentStatus:"pending",created:serverTimestamp(),listingid:listingID,ownerid:user.uid,owneremail:user.email,activated:false,rating:0.00,geohash:hash});
    batch.set(listingDocRef,{details,price,location,photosURLS,legalsURLS,listingType:details.listingType,paymentStatus:"pending",created:serverTimestamp(),listingid:listingID,ownerid:user.uid,owneremail:user.email,activated:false,rating:0.00,geohash:hash});
    batch.update(userDocRef,{usertype:"lister",totalListings:increment});

    const addListingBatch= await batch.commit();
    promises.push(addListingBatch);
   

  
    Promise.all(promises)
  .then(()=>{localStorage.clear(); setTimeout(() => { router.push("/account");}, 1000);})
  .catch((err)=>console.log(err));
  }

  const images=photosURLS?.map((photosURL)=>
  <>
    <SwiperSlide key={photosURL}>
            

            <Image src={photosURL} layout="fill" alt='ad image' objectFit="contain"  className='rounded-2xl w-full h-full'/>
        </SwiperSlide>
  </>
  )
  
  useEffect(() => {
    const listingInfo = JSON.parse(localStorage.getItem('listingInfo'));
    const listingPrice = JSON.parse(localStorage.getItem('listingPrice'));
    const listingLocation = JSON.parse(localStorage.getItem('listingLocation'));
    const photosURLS = JSON.parse(localStorage.getItem('photosURLS'));
    const legalsURLS = JSON.parse(localStorage.getItem('legalsURLS'));
    if (listingInfo) {
     setDetails(listingInfo);
    }
    if (listingPrice) {
      setPrice(listingPrice);
     }
    if (listingLocation) {
      setLocation(listingLocation);
      
      setHash(geohashForLocation([listingLocation.lat,listingLocation.long]))
      
     }
     if (photosURLS) {
      setPhotosURLS(photosURLS);
     }
  
     if (legalsURLS) {
      setLegalsURLS(legalsURLS);
     }
  }, []);




  const handleNextClick=()=>{
    
    setTimeout(() => { setUploading(true);}, 1000);
  addListing(user);
      // router.push("/account")

    
  }

  return (
    <div className='2xl:container h-screen m-auto'>
     
      <div className='fixed inset-0 w-7/12 invisible md:visible md:hidden lg:block  '>
        
        <Image src={BackgroundImg}  alt='traffic lights' objectFit='cover' layout="fill"/>
        <h1 className='absolute z-10 text-2xl justify-center top-[45%] left-[24%] text-white'>TaaDaaah!</h1>
       

      </div>
      <div role="hidden" className='fixed inset-0 w-6/12 ml-auto bg-white bg-opacity-70 backdrop-blur-xl lg:block'></div>
        <div className='relative h-full ml-auto lg:w-6/12 overflow-auto bg-slate-100'>
        {uploading ?(<LoadingScreen/>):(
            <></>
          )}
          <div className=" flex flex-col px-6 mt-4 w-full justify-items-center">

          <div className='space-y-4 mb-5 mt-4 '>
              <h3 className='text-sm sm:text-xl border-b'>Here is how your listing looks like on 3illboard</h3>
            </div>

        
            

            <div className='items-center sm:h-1/3 w-fit justify-self-center bg-white  border-[#FAB038]  p-6 border-2 rounded-lg cursor-pointer select-none hover:opacity-80 hover:shadow-lg  transition duration-100 ease-out '>
        <div className='relative  h-52 w-full  flex-shrink-0'>

      
      <Swiper
        effect={"flip"}
        grabCursor={true}
        pagination={true}
        navigation={true}
        modules={[EffectFlip, Pagination, Navigation]}
        className="lg:w-[40vw] w-[80vw] h-[100%]"
      >
        {images}
      </Swiper>
        </div>
        <div className='flex flex-col flex-grow pl-5 mt-6 sm:mt-0'>
            <div className='flex justify-between'>
            <h4 className='text-xl font-bold'>{details.billboardTitle}</h4>
                
                <HeartIcon className='h-7 cursor-pointer'/>
                
            </div>
            <p>{details.billboardDescription}</p>
            <div className='border-b w10 pt-2'/>
            <p className='pt-2 text-sm text-gray-500 flex-grow'>{details.otherServices?.map((service)=>
          
              <> {service} .</>
            )}</p>
            {details.otherServices?.map((service)=>{
             
              <p className='text-black' key={service}>{service}</p>
            })}

            <div className='flex justify-between items-end pt-5'>
            <p className='flex items-center'>
            <StarIcon className='h-5 text-[#FAB038]'/>
            0.0
            </p>
            <div>
                
                <p className='text-right font-extralight'>{price.price}KES/{price.interval}</p>
            </div>
        </div>
        </div>

        <div className="flex p-2 mt-4">
            <button className="text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
        hover:bg-gray-200  
        bg-gray-100 
        text-gray-700 
        border duration-200 ease-in-out 
        border-gray-600 transition">Edit</button>
            <div className="flex-auto flex flex-row-reverse">
                <button onClick={handleNextClick}  className="text-base  ml-2  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
        hover:bg-[#FAB038]  
        bg-[#FAB038] 
        text-orange-100 
        border duration-200 ease-in-out 
        border-[#FAB038] transition">Finish</button>
               
            </div>
        </div>
        

        </div>

           
        

            
               
<p>Approval should take less than 3 business days</p>

          </div>
        </div>
      </div>
  )
}

export default Preview