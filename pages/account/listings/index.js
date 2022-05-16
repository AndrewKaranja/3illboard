import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/dashboard/Sidebar';
import Header from '../../../components/dashboard/Header';
import { useAuth } from '../../../context/AuthContext';
import {useRouter} from "next/router";
import { withProtected } from '../../../hooks/route';
import { collection, query, where, getDocs } from "firebase/firestore";
import ListingCard from '../../../components/dashboard/ListingCard';
import { db } from '../../../firebase';
import LoadingScreen from '../../../components/LoadingScreen';
import { Chips, Chip } from '@mantine/core';






function Listings() {
    const {user}=useAuth();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const [details,setDetails] =useState([]);
    const [listings,setListings] =useState([]);
    const [done, setDone] = useState(undefined);
    const [chipValue, setChipValue] = useState('all');



   const handleCreateListing=()=>{
router.push('/listing/listingtype');
    }
    

useEffect(() => {
  async function getListings(user){
     const promises=[];
    const querySnapshot = await getDocs(collection(db, `users/${user.uid}/listings`));
    promises.push(querySnapshot);
    setListings(querySnapshot.docs.map(docSnapshot => docSnapshot.data()));
          Promise.all(promises)
          .then(()=>{setTimeout(() => { setDone(true);}, 2000);})
          .catch((err)=>console.log(err));
  }
  
  getListings(user);
 

}, [user])



    
    
   


  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
           {/* Sidebar */}
    <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
       {/* Content area */}
       <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

{/*  Site header */}
<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

<main>
<div className='flex justify-between mx-6 my-3'>
<h4 className='text-lg lg:text-2xl font-semibold'>Listings</h4>
<div className='flex flex-row'>
<button onClick={handleCreateListing} className='hidden md:inline border-2 mx-3 border-gray-600 bg-[#fab038] font-semibold rounded text-white p-2'
          >Create New Listing</button>
<Chips multiple={false} value={chipValue} onChange={setChipValue}>
<Chip value="all">All</Chip>
      <Chip value="active">Active</Chip>
      <Chip value="inactive">Inactive</Chip>
    </Chips>
</div>
                
                
            </div>
   {!done ?( 
      <LoadingScreen/>

   ):(
      <div>
      {listings && listings?.map((listing)=>(
      <ListingCard
      key={listing.listingid}
      listingid={listing.listingid}
      activated={listing.activated}
      rating={listing.rating}
      title={listing.details.billboardTitle}
      location={listing.details.locationDescription}
      price={listing.price.price}
      interval={listing.price.interval}
      otherServices={listing.details.otherServices}
      img={listing.photosURLS?.[0]}
      />
   ))}
      </div>
   )}


 


{/* {details && details.map((detail)=>(
   <ListingCard
   key={detail.listingid}
   listingid={detail.listingid}
   title={detail.details.billboardTitle}
   price={detail.price.price}
   interval={detail.price.interval}
   otherServices={detail.details.otherServices}
   img={detail.details.photosURLS}
   />
))} */}


 
</main>
</div>
    
       </div>
  )
}

export default withProtected(Listings) ;
