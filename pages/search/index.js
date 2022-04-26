import { format } from 'date-fns';
import {useRouter} from "next/router";

import React from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import InfoCard from '../../components/InfoCard';
import Map from '../../components/Map';
import {useCollection} from "react-firebase-hooks/firestore";
import { collection, query, where,getDocs } from "firebase/firestore";
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';

function Search({listings,searchResults}) {
  const router=useRouter();
  const {user}=useAuth();
const {location,startDate,endDate}=router.query;




const formattedStartDate=format(new Date(startDate),"dd MMMM yy");
const formattedEndDate=format(new Date(endDate),"dd MMMM yy");
const range=`${formattedStartDate} - ${formattedEndDate}`;

  return (
    <div>
        <Header placeholder={`${location} | ${range}`}/>
        <main className='flex'>
            <section className='flex-grow pt-14 px-6'>
                <p className='txt-xs'>200+ Ad spaces available {range}</p>
                <h1 className='text-3xl font-semibold mt-2 mb-6'>Ad spaces in {location}</h1>

                <div className='hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap'>
                    <p className='button'>Cancellation Flexiblity</p>
                    <p className='button'>Type of Ad space</p>
                    <p className='button'>Price</p>
                    <p className='button'>More Filters</p>
                </div>

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

                    />
                  ))}
                {/* {searchResults.map(({img,location,title,description,star,price,total})=>(
                  <InfoCard 
                  key={img}
                  img={img}
                  location={location}
                  title={title}
                  description={description}
                  star={star}
                  price={price}
                  total={total}/>
                ))} */}
                </div>

            </section>

            <section className='hidden xl:inline-flex w-1/3'>
            
            </section>
            <Map searchResults={searchResults}/>
        </main>
        
        <Footer/>
    </div>
  );
}

export default Search;

export async function getServerSideProps() {
  const listingsRef = collection(db, "listings");
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