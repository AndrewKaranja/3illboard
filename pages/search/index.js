import { format } from 'date-fns';
import {useRouter} from "next/router";
import Image from 'next/image';
import Head from 'next/head';
import React, { useState,useEffect} from 'react';
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import InfoCard from '../../components/InfoCard';
import Map from '../../components/Map';

import { collection, query, where,getDocs, limit , orderBy } from "firebase/firestore";
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import imgall from '../../images/billboard_yellow2.png';
import imgbill from '../../images/billboard_fl2.png';
import imgdigi from '../../images/digital_signage.png';
import imgside from '../../images/street-sideAd.png';
import imgclock from '../../images/clock.png';
import imgmoving from '../../images/movingAd.png';
import * as AiIcons from 'react-icons/ai';
import { useMediaQuery } from 'react-responsive';

function Search({listings}) {
  const router=useRouter();
  const {user}=useAuth();
const {location,startDate,endDate}=router.query;
const range="today";
const [showMap, setShowMap] = useState(true);
const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

useEffect(() => {
  if(!isMobile){
    setShowMap(true);
  }
}, [isMobile])



if(startDate && endDate){
  const formattedStartDate=format(new Date(startDate),"dd MMMM yy");
  const formattedEndDate=format(new Date(endDate),"dd MMMM yy");
  
 
  
}

  return (
    <div className="flex flex-col">
      <Head>
        <title>Search</title>
        <meta name="description" content="A billboard marketplace" />
        <link rel="icon" href="/3illboardLogoMini.ico" />
      </Head>
        <Header placeholder={location ?`${location} | ${range} `:"Search Location"}/>
        <div className="flex py-1 justify-between w-full bg-white z-40">
          <div className="flex overflow-auto max-w-full">
            <div className="mx-2 text-center border-b-2 border-b-[#fab038] hover:border-b-2 hover:border-b-black hover:cursor-pointer">
            <Image src={imgall} width={40} height={40} className='mx-auto' alt='pic'/>
            <p className="text-xs font-bold text-gray-600 w-12"> All </p>
            </div>
            <div className="mx-2 text-center hover:border-b-2 hover:border-b-black hover:cursor-pointer">
            <Image src={imgbill} width={40} height={40} className='mx-auto' alt='pic'/>
            <p className="text-xs font-bold text-gray-600">Print Billboard</p>
            </div>
            <div className="mx-2 text-center hover:border-b-2 hover:border-b-black hover:cursor-pointer">
            <Image src={imgdigi} width={40} height={40} className='mx-auto' alt='pic'/>
            <p className="text-xs font-bold text-gray-600">Digital Billboard</p>
            </div>
            <div className="mx-2 text-center hover:border-b-2 hover:border-b-black hover:cursor-pointer">
            <Image src={imgclock} width={40} height={40} className='mx-auto' alt='pic'/>
            <p className="text-xs font-bold text-gray-600">Clock Ads</p>
            </div>
            <div className="mx-2 text-center hover:border-b-2 hover:border-b-black hover:cursor-pointer">
            <Image src={imgside} width={40} height={40} className='mx-auto' alt='pic'/>
            <p className="text-xs font-bold text-gray-600">Lampost Ads</p>
            </div>

          </div>
          {!isMobile && <div><button className="flex button mt-3 m-1"><AiIcons.AiOutlineFilter className="pt-1" /><p>Filter</p></button></div>}
            
            {/* Remember to fix the ismobile showmap bug */}
          </div>
        <main className="flex-col lg:flex">
          {showMap && <div className="  lg:right-0 h-[70vh] lg:h-full z-0 lg:fixed lg:top-0 w-full lg:w-[40vw] "><Map searchResults={listings}/></div> }
        
        {isMobile && <div className=" bg-slate-900 w-full h-[10vh] text-center">
          <p className="font-extrabold rounded-t-xl bg-white text-3xl px-auto h-full">_</p>
        </div> }
        
         <section className='pt-6 px-6 lg:w-[60vw] w-full '>
                <p className='text-xs mb-2'>200+ Ad spaces available {range} in { location ?`${location}`:"the area"}</p>
    
                <div className='flex flex-col'>
                  
                  {JSON.parse(listings)?.map((listing)=>(
                    <InfoCard
                    key={listing.listingid}
                    id={listing.listingid}
                    img={listing?.photosURLS?.[0]}
                    title={listing?.details?.billboardTitle}
                    description={listing?.details?.billboardDescription}
                    price={listing?.price}
                    location={listing?.details?.locationDescription}

                    />
                  ))}
                
                </div>

            </section>

            


           
            

        
            
            
        </main>
        {isMobile && <button className='sticky bottom-6 mx-auto px-4 border-2 bg-black rounded-full border-[#FAB038] text-white hover:bg-orange-300 p-2'
          onClick={()=>{setShowMap(!showMap)}}>{showMap ?'Hide Map':'Show Map'}</button>}
        
       
       <div  className="sticky z-50">
       <Footer/>

       </div>
          

       
        
    </div>
  );
}

export default Search;

export async function getServerSideProps() {
  const listingsRef = collection(db, "listings");
  // remember to fix the listingQuery
  const listingQuery=query(listingsRef,where('activated','==',true), limit(15));
 
  const listingsRes=await getDocs(listingQuery) ;

    const listings=listingsRes.docs?.map((doc)=>({
        id:doc.id,
        ...doc.data(),
    }));





  return{
    props:{
      listings:JSON.stringify(listings),
    }
  }
}