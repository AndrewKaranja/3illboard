import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/dashboard/Sidebar';
import Header from '../../../components/dashboard/Header';
import { useAuth } from '../../../context/AuthContext';
import { withProtected } from '../../../hooks/route';
import { collection, query, where, getDocs } from "firebase/firestore";
import ListingCard from '../../../components/dashboard/ListingCard';
import { db } from '../../../firebase';






function Listings() {
    const {user}=useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const [details,setDetails] =useState([]);
    const [listings,setListings] =useState([]);

useEffect(() => {
  async function getListings(user){
     const promises=[];
    const querySnapshot = await getDocs(collection(db, `users/${user.uid}/listings`));
    promises.push(querySnapshot);
    setListings(querySnapshot.docs.map(docSnapshot => docSnapshot.data()));
          Promise.all(promises)
          .then(()=>{alert("Listing successfully Fetched");})
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
<div>
<button className='hidden md:inline border-2 border-gray-600 bg-gray-400 rounded text-black p-2'
          >Active</button>
          <button className='hidden md:inline border-2 border-gray-600 bg-gray-200 rounded text-black hover:bg-orange-300 p-2'
          >inactive</button>
</div>
                
                
            </div>
{listings && listings.map((listing)=>(
   <ListingCard
   key={listing.listingid}
   listingid={listing.listingid}
   title={listing.details.billboardTitle}
   price={listing.price.price}
   interval={listing.price.interval}
   otherServices={listing.details.otherServices}
   img={listing.details.photosURLS}
   />
))}

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
