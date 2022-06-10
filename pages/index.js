import Head from 'next/head'
import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import Banner from '../components/Banner'
import Header from '../components/Header'
import styles from '../styles/Home.module.css'
import SmallCard from '../components/SmallCard';
import MediumCard from '../components/MediumCard';
import LargeCard from '../components/LargeCard';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import city from '../images/city.png';
import town from  '../images/nakuru.png';
import oceancity from '../images/mombasa.png';
import imgbill from '../images/billboard_fl2.png';
import imgdigi from '../images/digital_signage.png';
import imgside from '../images/street-sideAd.png';
import imgclock from '../images/clock.png';
import imgmoving from '../images/movingAd.png';
import { useUserType } from '../context/UserTypeContext';

export default function Home() {
  const {userInfo}=useUserType();
  console.log("userinfo"+userInfo?.usertype);

  return (
    <div className="">
      <Head>
        <title>3illboard</title>
        <meta name="description" content="A billboard marketplace" />
        <link rel="icon" href="/3illboardLogoMini.ico" />
      </Head>

      {/* Header */}
      <Header/>
      {/* Sidebar */}
      {/* <Sidebar/> */}
      {/* Banner */}
      <Banner/>
<main className='max-w-7xl mx-auto px-8 sm:px-16'>
  <section className='pt-6'>
   <h2 className='text-4xl font-semibold pb-5'>Explore nearby</h2>

{/* Pull some data from a server-API endpoints */}
<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>

  <SmallCard 
  img={city}
  ads="500"
  location="Nairobi"
  />
   <SmallCard 
  img={oceancity}
  ads="500"
  location="Mombasa"
  />
   <SmallCard 
  img={town}
  ads="500"
  location="Kisumu"
  />
  <SmallCard 
  img={town}
  ads="500"
  location="Nakuru"
  />
 

</div>
  </section>

  <section>
  <h2 className='text-4xl font-semibold py-8'>Select Ad Type</h2>
 
  

  <div className='flex space-x-3 overflow-scroll scrollbar-hide p-3 ml-3'>
  
<MediumCard
img={imgbill}
title="Billboards"/>
<MediumCard
img={imgdigi}
title="Digital Billboards"/>
<MediumCard
img={imgside}
title="Light Post Ads"/>
<MediumCard
img={imgclock}
title="Clock Ads"/>
<MediumCard
img={imgmoving}
title="Moving Ads"/>

  </div>
</section>

<LargeCard
   title="The perfect ad campaign"
   description="Campaign curated by 3illboard"
   buttonText="Try out"/>
</main>
<Footer/>
    </div>
  )
}



// export async function getStaticProps() {
//   // To be edited to add 3illboard api
//   const exploreData=await fetch('https://links.papareact.com/pyp').
//   then(
//     (res)=>res.json()
//     );

//     const cardsData=await fetch('https://links.papareact.com/zp1').
//     then(
//       (res)=>res.json()
//       );
    
//     return{
//       props:{
//         exploreData,
//         cardsData,
//       }
//     }
// }
