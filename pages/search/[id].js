import React, {  useRef,useEffect, useState } from 'react';
import {useRouter} from "next/router";
import { HeartIcon} from '@heroicons/react/outline'
import { StarIcon } from '@heroicons/react/solid';
import * as BiIcons from 'react-icons/bi';
import * as RiIcons from 'react-icons/ri';
import * as MdIcons from 'react-icons/md';
import * as FcIcons from 'react-icons/fc';
import * as AiIcons from 'react-icons/ai';


import { DateRange } from 'react-date-range';

import {ErrorMessage,useField,Formik,Form,Field} from 'formik';
import * as Yup from 'yup';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import {
  addDays,
  endOfDay,
  startOfDay,
  startOfMonth,
  endOfMonth,
  addMonths,
  startOfWeek,
  endOfWeek,
  isSameDay,
  differenceInCalendarDays,
  format,
} from 'date-fns';




import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFlip, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import Image from 'next/image';
import billboard from '../../images/cat.png';
import Link from 'next/link';
import { async } from '@firebase/util';
import { collection, doc, getDoc,addDoc,getDocs,query, orderBy,where,setDoc,serverTimestamp  } from "firebase/firestore";

import {useCollection} from "react-firebase-hooks/firestore";

import { useAuth } from '../../context/AuthContext';

import LoadingScreen from '../../components/LoadingScreen';
import { db } from '../../firebase';
import ListingModal from '../../components/ListingModal';






// export async function getServerSideProps() {
//   const listingsRef = collection(db, "listings");
//   const listingQuery=query(listingsRef,where('activated','==',false));
 
//   const listingsRes=await getDocs(listingQuery) ;

//     const listings=listingsRes.docs?.map((doc)=>({
//         id:doc.id,
//         ...doc.data(),
//     }));


//   return{
//     props:{

//       listing:JSON.stringify(listings),
//     }
//   }
// }


export default function ListingDetails() {
  const {user}=useAuth();
  const{query:{id}}=useRouter();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [response, setResponse] = useState("");
  const [done, setDone] = useState(undefined);
  const [showCalendar,setShowCalendar]=useState(false);
  const [listing,setListing]=useState("");
  const [showModal, setShowModal] = React.useState(false);


  //variables to add mesage
  if(user!=null){

  }

  // remember to fix this issue---> when user is logged out
  // this section returns an error
  const userChatRef = collection(db, "chats");
  const chatsQuery = query(userChatRef,where('users','array-contains',user?.email));
  const [chatsSnapshot]=useCollection(chatsQuery);
  const chatAlreadyExists=(recepientEmail)=>
  !!chatsSnapshot?.docs.find(
      (chat)=>chat.data().users.find(user=>user===recepientEmail)?.length>0
      );

  const validate=Yup.object({
    message:Yup.string()
    .min(5,'Must be atleast 5 characters')
    .max(100,'Must be 50 characters or less')
    .required('Message is required'),
    fname:Yup.string()
    .min(4,'Must be atleast 4 characters')
    .required('Fullname is required'),
    email:Yup.string()
    .email('Invalid email format').required('Required'),
    
  });

  const [MessageInfo, setMessageInfo] = useState([]);
  const [chatRefId, setChatRefId] = useState(null);
 

  const[startDate,setStartDate]=useState(new Date());
  // let minimumDays=Number(listing?.minimumListingPeriod);
  // console.log(String(minimumDays));
  const[endDate,setEndDate]=useState(new Date());

  useEffect(() => {
    async function getListingDetail(){
      const promises=[];
      const docRef = doc(db, "listings", `${id}`);
      // const reservationsRef=collection(db,`listings/${id}/reservations`);
      // const reservationsQuerySnapshot = await getDocs(reservationsRef);
      const docSnap = await getDoc(docRef);
      promises.push(docSnap);
      // console.log(docSnap)
      setListing(docSnap.data()); 
      Promise.all(promises)
      .then(()=>{setTimeout(() => { setDone(true);}, 2000);})
      .catch((err)=>console.log(err));
  
    }
    if(id){
      console.log("fetched")
      getListingDetail();
      //const image=listing.photosURLS[0]
      //setBannerImage(image);
    }
    
   
  }, [id]);
  

  //const [value,listingSnapshot, loading, error] = useDocument(getDoc(doc(db, "listings", id)) );
// console.log(listing)
  // const listing=value?.data();

  const selectionRange={
    startDate:startDate,
    endDate:endDate,
    key:'selection',
}

const handleSelect=(ranges)=>{
    setStartDate(ranges.selection.startDate)
    setEndDate(addDays(ranges.selection.startDate,Math.max(Number(listing?.minimumListingPeriod), 1) - 1))
}

const messageEnquiry=()=>{
  const enquiry=`Hello ${listing?.owneremail},${MessageInfo?.fname} is inquiring about your Listing http://localhost:3000/account/listings/${listing?.listingid}.Additional message:
  ${MessageInfo?.message}`
  return enquiry;
}

const handleEnquireClick= async()=>{
 
  if(!user){
    const prevPath=router.pathname;
            router.push({
                pathname:'/login',
                query:{
                  prevPath:prevPath
                }
              })
  }else{
    setShowModal(true);

  }

}

const handleCanlendar=(isPressed)=>{
  if (isPressed) {
    return <div>
    <DateRange
      ranges={[selectionRange]}
      minDate={new Date()}
      rangeColors={["#FAB038"]}
      
      onChange={handleSelect}/>

    </div> ;
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



  return (
    <div className='bg-slate-400 h-screen overflow-auto'>
      <Link passHref href="/search" >
        <div className="bg-white w-full flex flex-row text-[#fab038] justify-center items-center p-2 cursor-pointer">
        <AiIcons.AiOutlineRollback className='h-12 w-12'/>
        <p className='text-xl align-middle font-bold'>Return to Search</p>

        </div>
              
              </Link>
      
      {/* {console.log("Hello",id)}
     
      {console.log("Millo",listing)} */}
      

{/* {loading && <LoadingScreen/>} */}
      
    
    <div className='flex lg:mt-10 lg:ml-12 lg:mr-12 mb-2   h-84  lg:rounded-xl bg-white select-none '>
    
      <div className='flex flex-col lg:flex-row mx-auto lg:flex-[10]'>
            <div className='relative h-full w-32 flex-grow-[1]  '>
              <Image src={listing.length==0 ? billboard : listing?.photosURLS?.[0]} layout="fill" alt='ad image' objectFit='cover' className='rounded-l-xl rounded-bl-xl'/>
              {/* <Link passHref href="/account/listings">
              <AiIcons.AiOutlineRollback className='h-full w-full'/>
              </Link> */}
              
            </div>
            <div className='flex flex-col flex-grow-[9] p-5 h-fit'>
                <div className='flex justify-between'>
                <h4 className='text-xl text-black font-bold'>{listing?.details?.billboardTitle}</h4>
                    
              <RiIcons.RiMenu4Fill/>
                    
                </div>
                
                <p className='text-sm text-gray-500 font-semibold'>📍{listing?.details?.billboardDescription}</p>
                
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
            {handleCanlendar(showCalendar)}
            {/* {()=>{
              if (showCalendar) {
              return <div className={showCalendar?'visible':'invisible'}>
              <DateRange
                ranges={[selectionRange]}
                minDate={new Date()}
                rangeColors={["#FAB038"]}
                
                onChange={handleSelect}/>
  
              </div>
              
            }}} */}
            </div>
        
       
  
        </div>

        {/* main body */}
        <div className='flex mt-3 lg:ml-12 lg:mr-12 lg:mb-12 h-84  lg:rounded-xl bg-white cursor-pointer select-none '>
    
    <div className='flex flex-col  mx-auto lg:flex-row md:flex-[10]'>
    <div className='h-full  w-[70%] flex-grow-[6] m-5 '>

       <div>
       <h4 className='text-xl text-black font-bold m-2'>Ad Description</h4>
       {/* <p className='invisible text-white'>{listing.listingid}</p> */}
       <p className='m-5'>{listing?.details?.billboardDescription}</p>
         </div>   
    


  <div className='border-b pt-2 border-orange-100'/>
<div className='my-5 flex flex-row'>
<div className='flex flex-row items-center mx-3'>
<BiIcons.BiCrop className='h-8 w-8'/>
<div className='ml-2'>
<p className='text-sm text-black'>{listing?.details?.dimensionWidth} x {listing?.details?.dimensionHeight} m</p>
<p className='text-sm text-gray-500'>dimensions</p>
</div>

</div>
<div className='flex flex-row items-center mx-3'>

<RiIcons.RiLightbulbFlashLine className={listing?.details?.nightVisibility ?'h-8 w-8 text-yellow-400':'h-8 w-8 text-gray-400'}/>
<p className='text-sm text-black'>Visible at Night</p>
</div>

</div>

<div className='border-b pt-2 border-orange-100'/>
<div className='my-3'>
<h4 className='font-bold text-xl m-5'>Services</h4>

<div className='flex flex-row'>
{listing?.details?.otherServices?.map((service)=>
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
            <div className='p-5 h-fit text-white bg-black rounded-xl m-5'>
            <div className='flex '>
              <Image src={billboard} alt='ad image' width={40} height={40} objectFit="cover" className='rounded-2xl'/>
              <div className='flex ml-2  flex-col'>
                <p className='text-sm font-bold  justify-center'>Temp Email</p>
              <p className='text-xs '>Ad lister</p>

              </div>
              
              
             
              </div>

              <div className='border-b pt-2 border-slate-200'/>
              <div className='flex justify-between py-2'>
              <p className='text-xs'>Available</p>
              <p className='text-xs'>{format(startDate,"do 'of' MMMM yyyy")}</p>
              </div>
              <div className='flex justify-between py-2'>
              <p className='text-xs'>to</p>
              <p className='text-xs'>{format(endDate,"do 'of' MMMM yyyy")}</p>
              </div>
              <DateRange
      ranges={[selectionRange]}
      minDate={new Date()}
      rangeColors={["#FAB038"]}
      
      onChange={handleSelect}/>
              <div className='flex justify-between py-2'>
              <p className='text-xs'>Contact</p>
              <p className='text-xs'>+254 712 345 678</p>
              </div>
              <div className='flex justify-between py-2 mb-3'>
              <p className='text-xs'>Price/{listing?.price?.interval}</p>
              <p className='text-sm font-semibold'>{listing?.price?.price}KES</p>
              </div>
              

  
          <button onClick={handleEnquireClick} className=' border-2 border-orange-200 bg-blue-500 w-full  text-white font-semibold hover:bg-orange-300 p-2  rounded-xl'
            >📫Enquire</button>

            </div>
            {/* Client transactions documents */}
            <div className='mx-4'>
              <div className='flex flex-row items-center w-full justify-evenly '>
                <FcIcons.FcDocument className='w-8 h-8 pr-1'/>
                <p className='font-semibold text-sm justify-start'>More Details</p>
                <RiIcons.RiDownload2Fill className='text-gray-400 content-end'/>
                
              </div>
              <div className='border-b mx-4 m-2 border-orange-100'/>
            </div>
              
          </div>

          {/* modal popup start */}
          {showModal ? (
        <>
        {/* <ListingModal/> */}

        <div className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed  inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-5 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Ready to Book?
                  </h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                      x
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-2 text-slate-500 text-lg leading-relaxed">
                  Enter your contact details, and we will let the ad manager know you
                   want to submit an application. If they are interested, they will contact you with next steps.
                    
                  </p>



                  <Formik
                initialValues={{
                message:'',
                fname:'',
                email:'',
                phone:'',
                
                          }}

                          validationSchema={validate}
                          onSubmit={async (values)=>{
                            
                           
                            setMessageInfo({
                              fname:values.fname,
                              message:values.message,
                              email:values.email,
                              phone:values.phone,
                           });

                           console.log(MessageInfo);
                           const clientMessage=`Hello ${listing?.owneremail},${MessageInfo?.fname} 
                           is inquiring about your Listing http://localhost:3000/account/listings/${listing?.listingid} 
                           availability from ${format(startDate,"do 'of' MMMM yyyy")} to ${format(endDate,"do 'of' MMMM yyyy")} . Additional message:${MessageInfo?.message}`;

                           
                           if(user?.email!==listing?.owneremail &&
                            !chatAlreadyExists(listing?.owneremail)){
                             
                                const chatRef = await addDoc(collection(db, "chats"), {
                                  users:[user.email,listing?.owneremail],
                                  lastMessage:messageEnquiry(),
                                  lastMessageTime:serverTimestamp(),
                                  lastSender:user?.email,
                                });
                                setChatRefId(chatRef.id) ;

                                const messagesCollectionRef=collection(db,`chats/${chatRef.id}/messages`);
                                const messageDoc=await addDoc(messagesCollectionRef, {
                                  timestamp: serverTimestamp(),
                                  message:clientMessage,
                                  user:user.email
                                  
                                });

                            }else{
                              const chatRef=chatsSnapshot?.docs.find((chat)=>chat.data().users.find(user=>user===listing?.owneremail));
                              setChatRefId(chatRef.id);
                              const messagesCollectionRef=collection(db,`chats/${chatRef.id}/messages`);
                              const messageDoc=await addDoc(messagesCollectionRef, {
                                timestamp: serverTimestamp(),
                                message:clientMessage,
                                user:user.email
                                
                              });
                              const chatDocRef=doc(db,"chats",chatRef.id);

                          await setDoc(chatDocRef,{lastMessage:clientMessage,lastMessageTime:serverTimestamp(),lastSender:user.email},{ merge: true })

                            }
                            

                            // chatsSnapshot?.docs.find(
                            //   (chat)=>chat.data().users.find(user=>user===recepientEmail)?.length>0
                            //   );
                            
                            

                           //update Last seen
                          const userDocRef=doc(db,"users",user.uid);
                          setDoc(userDocRef,{lastSeen:serverTimestamp(),workPhone:MessageInfo?.phone}, { merge: true });
                          
                        


                  

                          setShowModal(false)
                        router.push(`/account/messages/${chatRefId}`);
                           
                          }}
                          
                          >

                {formik=>(
                  <div>
                
                    
                    <Form>
                     
                        <div className=" p-1">
                        <div>
                            

                            <div className="flex flex-row font-bold text-gray-600 text-xs leading-8 uppercase h-6 mx-2 ">Message<p className='text-[0.5rem] lowercase'>(Ask questions)</p></div>
                            <div className="w-full flex-1 mx-2">
                              <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                              <textarea
                              name="message"
                              id="message"   
                              placeholder="You may enter some of your specification"
                              className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                              onChange={formik.handleChange}
                              value={formik.values.message}
                              rows={4}
                              cols={5}
                              />
                               
                                
                                 </div>
                                 <ErrorMessage component="div" name="message" className="text-red-600"/>
                            </div>

                            <div className="font-bold text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-3">First and Last Name</div>
                            <div className="w-full flex-1 mx-2">
                              <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                                <Field id='fname' name="fname" placeholder="Your names" className="p-1 px-2 appearance-none outline-none w-full text-gray-800"/>
                            
                                
                                 </div>
                                 <ErrorMessage component="div"  name="fname" className="text-red-600"/>
                            </div>


                            <div className="flex flex-row font-bold text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-3">Email</div>
                            <div className="w-full flex-1 mx-2">
                              <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                              <Field name="email"  placeholder="email" type="email" className="p-1 px-2 appearance-none outline-none w-full text-gray-800"/>
                                
                                 </div>
                                 <ErrorMessage component="div" name="email" className="text-red-600"/>
                            </div>


                            <div className="flex flex-row font-bold text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-3">Phone</div>
                            <div className="w-full flex-1 mx-2">
                              <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                              <PhoneInput
                              name="phone"
                              id="phone"
                            inputProps={{
                                name: 'phone',
                                required: true,
                                autoFocus: true
                              }}
                            country={'ke'}
                            value={formik.values.phone}
                            onChange={formik.handleChange('phone')}/>
                                
                                 </div>
                                 <ErrorMessage component="div" name="phone" className="text-red-600"/>
                            </div>


                            


                           



            
            
           
            
            
        </div>
        
        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                    
                  >
                    Send Request
                  </button>
                </div>
    
</div>
                                </Form>
                                </div>
                          )}
                      </Formik>











                  <p className="my-2 text-slate-500 text-xs">

                 
                  You agree to 3illboard Terms of Use and Privacy Policy. 
                  By choosing to contact an adlister, you also agree that 3illboard,
                   ad owners, and ad managers may call or text you about any inquiries
                    you submit through our services.
                      </p>


                </div>
                
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>



        </> 
      ) : null}

          {/* modal popup end */}

    </div>
      
     

      </div>
       
        </div>
  )
}
