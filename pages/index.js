import Head from 'next/head'
import React from 'react';
import Image from 'next/image'
import Banner from '../components/Banner'
import Header from '../components/Header'
import styles from '../styles/Home.module.css'
import SmallCard from '../components/SmallCard';
import MediumCard from '../components/MediumCard';
import LargeCard from '../components/LargeCard';
import Footer from '../components/Footer';

export default function Home({exploreData,cardsData}) {

  return (
    <div className="">
      <Head>
        <title>3illboard</title>
        <meta name="description" content="A billboard marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <Header/>
      {/* Banner */}
      <Banner/>
<main className='max-w-7xl mx-auto px-8 sm:px-16'>
  <section className='pt-6'>
   <h2 className='text-4xl font-semibold pb-5'>Explore nearby</h2>

{/* Pull some data from a server-API endpoints */}
<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
{exploreData?.map((item)=>(
  <SmallCard 
  key={item.img}
  img={item.img}
  distance={item.distance}
  location={item.location}
  />

))}
</div>
  </section>

  <section>
  <h2 className='text-4xl font-semibold py-8'>Select Ad Type</h2>

  <div className='flex space-x-3 overflow-scroll scrollbar-hide p-3 ml-3'>
  {cardsData?.map((item)=>(
<MediumCard
key={item.img}
img={item.img}
title={item.title}/>
  ))}
  </div>
</section>

<LargeCard
   img="https://links.papareact.com/4cj"
   title="The perfect ad campaign"
   description="Campaign curated by 3illboard"
   buttonText="Try out"/>
</main>
<Footer/>
    </div>
  )
}



export async function getStaticProps() {
  // To be edited to add 3illboard api
  const exploreData=await fetch('https://links.papareact.com/pyp').
  then(
    (res)=>res.json()
    );

    const cardsData=await fetch('https://links.papareact.com/zp1').
    then(
      (res)=>res.json()
      );
    
    return{
      props:{
        exploreData,
        cardsData,
      }
    }
}
