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
    const [details, setDetails] = useState([]);
    const [listings,setListings] =useState("");

    //const listingsQuery = query(collection(db, `users/${user.uid}/listings`));

// useEffect(() => {
//     const showListings =async()=>{
//         const promises=[];
//         const querySnapshot = await getDocs(collection(db, `users/${user.uid}/listings`));
//         promises.push(querySnapshot);
//         querySnapshot.forEach((doc) => {
//             // doc.data() is never undefined for query doc snapshots
          
    
//             console.log(doc.id, " => ", doc.data());
//           });
//           Promise.all(promises)
//           .then(()=>{alert("Listing successfully added");})
//           .catch((err)=>console.log(err));

//     }
// }, [])

useEffect(() => {
  async function getListing(user){
    const querySnapshot = await getDocs(collection(db, `users/${user.uid}/listings`));
                querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
          
  
    setListings([...listings,doc.data()])
  // setListings((prevState)=>[...prevState,doc.data()]);
            //console.log(doc.id, " => ", doc.data());
          });
         

    

  }
 
    console.log("Hello",listings);
  

  
  getListing(user);

 
}, [])



    
    
   


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
            {console.log(listings)}
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


 
</main>
</div>
    
       </div>
  )
}

export default withProtected(Listings) ;
