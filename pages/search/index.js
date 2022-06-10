import { format } from 'date-fns';
import {useRouter} from "next/router";
import Image from 'next/image'
import React from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import InfoCard from '../../components/InfoCard';
import Map from '../../components/Map';
import {useCollection} from "react-firebase-hooks/firestore";
import { collection, query, where,getDocs } from "firebase/firestore";
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import imgall from '../../images/billboard_yellow2.png';
import imgbill from '../../images/billboard_fl2.png';
import imgdigi from '../../images/digital_signage.png';
import imgside from '../../images/street-sideAd.png';
import imgclock from '../../images/clock.png';
import imgmoving from '../../images/movingAd.png';
import * as AiIcons from 'react-icons/ai';

function Search({listings,searchResults}) {
  const router=useRouter();
  const {user}=useAuth();
const {location,startDate,endDate}=router.query;
const range="today";



if(startDate && endDate){
  const formattedStartDate=format(new Date(startDate),"dd MMMM yy");
  const formattedEndDate=format(new Date(endDate),"dd MMMM yy");
  const range=`${formattedStartDate} - ${formattedEndDate}`;
 
  
}

  return (
    <div>
        <Header placeholder={location ?`${location} | ${range} `:"Search Location"}/>
        <div className="flex justify-between bg-white">
          <div className="flex">
          <div className="m-2 text-center border-b-2 border-b-[#fab038] hover:border-b-2 hover:border-b-black hover:cursor-pointer">
            <Image src={imgall} width={40} height={40} className='mx-auto' alt='pic'/>
            <p className="text-xs font-bold text-gray-600">All</p>
            </div>
            <div className="m-2 text-center hover:border-b-2 hover:border-b-black hover:cursor-pointer">
            <Image src={imgbill} width={40} height={40} className='mx-auto' alt='pic'/>
            <p className="text-xs font-bold text-gray-600">Print Billboard</p>
            </div>
            <div className="m-2 text-center hover:border-b-2 hover:border-b-black hover:cursor-pointer">
            <Image src={imgdigi} width={40} height={40} className='mx-auto' alt='pic'/>
            <p className="text-xs font-bold text-gray-600">Digital Billboard</p>
            </div>
            <div className="m-2 text-center hover:border-b-2 hover:border-b-black hover:cursor-pointer">
            <Image src={imgclock} width={40} height={40} className='mx-auto' alt='pic'/>
            <p className="text-xs font-bold text-gray-600">Clock Ads</p>
            </div>
            <div className="m-2 text-center hover:border-b-2 hover:border-b-black hover:cursor-pointer">
            <Image src={imgside} width={40} height={40} className='mx-auto' alt='pic'/>
            <p className="text-xs font-bold text-gray-600">Lampost Ads</p>
            </div>

          </div>
            <div><button className="flex button mt-3 m-1"><AiIcons.AiOutlineFilter className="pt-1" /><p>Filter</p></button></div>
            
          </div>
        <main className='flex w-1/2'>
         
            <section className='flex-grow pt-6 px-6 '>
                <p className='text-xs mb-2'>200+ Ad spaces available {range} in { location ?`${location}`:"the area"}</p>
    
                <div className='flex flex-col'>
                  {console.log(listings)}
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

           
            <div className="fixed top-0 right-0 z-0"><Map searchResults={listings}/></div>
            
        </main>
       
          <Footer/>

       
        
    </div>
  );
}

export default Search;

export async function getServerSideProps() {
  const listingsRef = collection(db, "listings");
  // remember to fix the listingQuery
  const listingQuery=query(listingsRef,where('activated','==',false));
 
  const listingsRes=await getDocs(listingQuery) ;

    const listings=listingsRes.docs?.map((doc)=>({
        id:doc.id,
        ...doc.data(),
    }));



  const searchResults=await fetch('https://links.papareact.com/isz').
  then(res=>res.json());

  return{
    props:{
      searchResults,
      listings:JSON.stringify(listings),
    }
  }
}