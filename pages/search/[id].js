import React, {  useRef,useEffect, useState } from 'react';
import {useRouter} from "next/router";
import { getFunctions, httpsCallable } from "firebase/functions";
import * as BiIcons from 'react-icons/bi';
import * as RiIcons from 'react-icons/ri';
import * as MdIcons from 'react-icons/md';
import * as FcIcons from 'react-icons/fc';
import * as AiIcons from 'react-icons/ai';
import { Dialog, Group, Button, TextInput, Text } from '@mantine/core';
import { StreamChat } from 'stream-chat';

import { DateRange } from 'react-date-range';

import {ErrorMessage,useField,Formik,Form,Field} from 'formik';
import * as Yup from 'yup';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import {
  addDays,
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
import preLoadGif from '../../images/uploaded.gif'
import Link from 'next/link';
import { async } from '@firebase/util';
import { collection, doc, getDoc,addDoc,getDocs,query, orderBy,where,setDoc,serverTimestamp  } from "firebase/firestore";

import {useCollection} from "react-firebase-hooks/firestore";

import { useAuth } from '../../context/AuthContext';

import LoadingScreen from '../../components/LoadingScreen';
import { db } from '../../firebase';
import ListingModal from '../../components/ListingModal';
import Footer from '../../components/Footer';
import { useUserType } from '../../context/UserTypeContext';

function ListingDetails({prevUrl}) {
  const {userInfo}=useUserType();
  const {user}=useAuth();
  const{query:{id}}=useRouter();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [streamUserToken,setStreamUserToken] = useState(null);
  const [response, setResponse] = useState("");
  const [done, setDone] = useState(undefined);
  const [showCalendar,setShowCalendar]=useState(false);
  const [listing,setListing]=useState("");
  const [showModal, setShowModal] = React.useState(false);
  const [opened, setOpened] = useState(false);


  const dates = [];
  const createStreamChatDemo =async ()=>{
    const promises=[];
    const docRef = doc(db, "users", `${user.uid}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setStreamUserToken(docSnap.data().streamUserToken);
        console.log("Document data:", docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    const client = StreamChat.getInstance(`${process.env.NEXT_PUBLIC_STEAMCHAT_APIKEY}`);
    const userToken =`${streamUserToken}`;
    const connectedUser= await client.connectUser(
      {
        id: user?.uid,
        name: user?.displayName,
        image: user?.photoURL,
      },
      userToken,);
      promises.push(connectedUser);
        const channel = client.channel('messaging', {
          members: [`${user?.uid}`, `${listing?.ownerid}`],
          created_by_id: `${user?.uid}`,
          membersEmails:[`${user?.email}`,`${listing?.owneremail}`],
        });
      const channelState=await channel.watch();
      promises.push(channelState);
        Promise.all(channelState).then(async ()=>{
          const messageHeader = await channel.sendMessage({
            text: `Hello , Enquiry about your Listing http://3illboard.com/account/listings/${listing?.listingID} 
            availability from ${format(startDate,"do 'of' MMMM yyyy")} to ${format(endDate,"do 'of' MMMM yyyy")}.`,
            attachments: [
              {
                type: 'image',
                asset_url: `${listing?.photosURLS?.[0]}`,
                thumb_url: `${listing?.photosURLS?.[0]}`,
              }
            ],
          });
          promises.push(messageHeader);
          const message = await channel.sendMessage({
            text: `${values.message}`,
          });
          promises.push(message);

        })
        .catch((err)=>{console.log(err);alert("Something went wrong while sending message.Please try again in 3 seconds")});

        Promise.all(promises)
.then(()=>{ router.push(`/account/inbox`);})
.catch((err)=>{console.log(err);alert("Something went wrong while sending message.Please try again in 3 seconds")});
        


  }
  const createStreamChat = async (values)=>{
    
    const promises=[];
    const client = StreamChat.getInstance(`${process.env.NEXT_PUBLIC_STEAMCHAT_APIKEY}`);
    const functions = getFunctions();
    const getStreamToken= httpsCallable(functions, 'ext-auth-chat-getStreamUserToken');
    getStreamToken()
    .then(async (result) => {
      const userToken =`${result.data}`;
      console.log(userToken);
      // setStreamUserToken(userToken);
    const connectedUser= await client.connectUser(
        {
          id: user?.uid,
          name: user?.displayName,
          image: user?.photoURL,
        },
        userToken,);
        promises.push(connectedUser);
        const channel = client.channel('messaging', {
          members: [`${user?.uid}`, `${listing?.ownerid}`],
          created_by_id: `${user?.uid}`,
          membersEmails:[`${user?.email}`,`${listing?.owneremail}`],
        });
        console.log(channel);

        const channelState=await channel.watch();
        promises.push(channelState);
        
          const messageHeader = await channel.sendMessage({
            text: `Hello , Enquiry about your Listing http://3illboard.com/account/listings/${listing?.listingid} 
            availability from ${format(startDate,"do 'of' MMMM yyyy")} to ${format(endDate,"do 'of' MMMM yyyy")}.`,
            attachments: [
              {
                type: 'image',
                asset_url: `${listing?.photosURLS?.[0]}`,
                thumb_url: `${listing?.photosURLS?.[0]}`,
              }
            ],
          });
          promises.push(messageHeader);
          const message = await channel.sendMessage({
            text: `${values.message}`,
          });
          promises.push(message);

        
})
.catch((error) => {
// Getting the Error details.
const code = error.code;
const message = error.message;
const details = error.details;
alert(message);
// ...
});
Promise.all(promises)
.then(()=>{ router.push(`/account/inbox`);})
.catch((err)=>{console.log(err);alert("Something went wrong while sending message.Please try again in 3 seconds")});


  }


    const getReservations=async ()=>{
      
      const q = query(collection(db, `listings/${id}/reservations`), where("status", "==", "booked"));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  
  // doc.data() is never undefined for query doc snapshots
  const date = new Date(doc.data().startDate.toDate().getTime());



  while (date <= doc.data().endDate.toDate()) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }


});



    }

getReservations();



  // remember to fix this issue---> when user is logged out
  // this section returns an error
  // const userChatRef = collection(db, "chats");
  // const chatsQuery = query(userChatRef,where('users','array-contains',user?.email));
  // const [chatsSnapshot]=getDocs(chatsQuery);

  // const chatAlreadyExists=(recepientEmail)=>
  // !!chatsSnapshot?.docs.find(
  //     (chat)=>chat.data().users.find(user=>user===recepientEmail)?.length>0
  //     );

  const validate=Yup.object({
    message:Yup.string()
    .min(2,'Must be atleast 2 characters')
    .max(50,'Must be 50 characters or less')
    .required('Message is required'),
  });

  const [MessageInfo, setMessageInfo] = useState([]);
  const [chatRefId, setChatRefId] = useState(null);
 

  const[startDate,setStartDate]=useState(new Date());
  // let minimumDays=Number(listing?.minimumListingPeriod);
  // console.log(String(minimumDays));
  const[endDate,setEndDate]=useState(new Date());

  useEffect(()=>{
    function showMessageBox(){
      let previousURL=`${prevUrl}`;
      if(previousURL.includes("login")){
        setOpened(true);
      }
      
  
    }
    if(user){
      showMessageBox();
    }
  },[user,prevUrl])

  useEffect(() => {
    async function getListingDetail(){
      const promises=[];
      const docRef = doc(db, "listings", `${id}`);
      // const reservationsRef=collection(db,`listings/${id}/reservations`);
      // const reservationsQuerySnapshot = await getDocs(reservationsRef);
      const docSnap = await getDoc(docRef);
      promises.push(docSnap);
      setListing(docSnap.data()); 
      Promise.all(promises)
      .then(()=>{setTimeout(() => { setDone(true);}, 2000);})
      .catch((err)=>console.log(err));
  
    }
    if(id){
      getListingDetail();
    }
    
   
  }, [id]);
  


  const selectionRange={
    startDate:startDate,
    endDate:endDate,
    key:'selection',
}

const handleSelect=(ranges)=>{
    setStartDate(ranges.selection.startDate)
    setEndDate(addDays(ranges.selection.startDate,Math.max(Number(listing?.price?.minimumBookingPeriod), 1) - 1))
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
                  prevPath:`/search/${listing?.listingid}`
                }
              })
  }else{
    const requestedPeriod=`${format(startDate,"do 'of' MMMM yyyy")} - ${format(endDate,"do 'of' MMMM yyyy")}`
    router.push({
      pathname:'/enquire',
      query:{
        owneremail:listing?.owneremail,
        listingID:listing?.listingid,
        ownerID:listing?.ownerid,
        billboardTitle:listing?.details?.billboardTitle,
        requestedPeriod:requestedPeriod,
      }
    })

  }

}

const handleEnquiryClick= async()=>{

 
  if(!user){
    const prevPath=router.pathname;
            router.push({
                pathname:'/login',
                query:{
                  prevPath:`/search/${listing?.listingid}`
                }
              })
  }else{
    setOpened(true)

  }

}

const handleCanlendar=(isPressed)=>{
  if (isPressed) {
    return <div>
    <DateRange
      ranges={[selectionRange]}
      minDate={new Date()}
      disabledDates={dates}
      rangeColors={["#FAB038"]}
      
      onChange={handleSelect}/>

    </div> ;
  }
  
}

const listingImage=listing?.photosURLS?.map((photosURL)=>
<div key={photosURL}>
  <SwiperSlide >   
          <Image src={photosURL} layout="fill" alt='ad image' objectFit="contain"  className='rounded-2xl w-full h-full'/>
          {/* <img src={photosURL} alt="listing images" /> */}
      </SwiperSlide>
</div>
)



  return (
    <div className='bg-slate-400 h-screen overflow-auto'>
      <Link passHref href="/search" >
        <div className="bg-white w-full flex flex-row text-[#fab038] justify-center items-center p-2 cursor-pointer">
        <AiIcons.AiOutlineRollback className='h-12 w-12'/>
        <p className='text-xl align-middle font-bold'>Return to Search</p>

        </div>
              
              </Link>
      
 
      

{/* {loading && <LoadingScreen/>} */}
      
    
    <div className='flex lg:mt-10 lg:ml-8 lg:mr-8 lg:mb-2   h-84  lg:rounded-xl bg-white select-none '>
    
      <div className='flex flex-col lg:flex-row mx-auto lg:flex-[10]'>
            <div className='relative h-full w-32 flex-grow-[1]  '>
              <Image src={listing.length==0 ? preLoadGif : listing?.photosURLS?.[0]} layout="fill" alt='ad image' objectFit='cover' className='rounded-l-xl rounded-bl-xl'/>
              {/* <Link passHref href="/account/listings">
              <AiIcons.AiOutlineRollback className='h-full w-full'/>
              </Link> */}
              
            </div>
            <div className='flex flex-col flex-grow-[9] p-5 h-fit'>
                <div className='flex justify-between'>
                <h4 className='text-xl text-black font-bold'>{listing?.details?.billboardTitle}</h4>
                    
              <RiIcons.RiMenu4Fill/>
                    
                </div>
                
                <p className='text-sm text-gray-500 font-semibold'>📍{listing?.details?.locationDescription}</p>
                
                {/* <div className='flex flex-row m-2 items-center font-semibold text-gray-500'>
               
                <div className='flex flex-row m-2 items-center'>
                  <MdIcons.MdOutlinePeopleAlt />
                  <p className='px-1 '>6 clients</p>
                </div>
                <div className='flex flex-row m-2 items-center'>
                  <MdIcons.MdOutlineReport />
                  <p className='px-1 '>10 requests</p>
                </div>

                </div> */}
            
            {/* <button className=' border-2 border-orange-200 bg-[#FAB038]  text-white font-semibold hover:bg-orange-300 p-2 w-56 rounded-full'
              onClick={()=>setShowCalendar(!showCalendar)}>{!showCalendar ? '📅 Show Ad Calendar' :'📅 Hide Ad Calendar'}</button> */}

<button onClick={handleEnquiryClick} className=' border-2 border-orange-200 bg-blue-500 w-full  text-white font-semibold hover:bg-orange-300 p-2  rounded-xl'
            >📫Enquire</button>
              
            
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
        <div className='flex  lg:my-3 lg:mx-8 h-fit  lg:rounded-xl bg-white cursor-pointer select-none '>
    
    <div className='flex flex-col md:flex-row md:justify-between w-full '>
    <div className='h-full w-full  md:w-[50%] lg:w-[60%]  md:p-5 '>

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
        className="mySwiper md:w-[45vw] lg:w-[50vw] w-[80vw] h-80"
      >
        {listingImage}
      </Swiper>
 

</div>


          </div>
          <div className='flex flex-col md:w-fit w-full h-fit '>
            <div className='p-5 h-fit w-full md:w-fit   text-white bg-black rounded-xl '>
            <div className='flex '>
              <Image src={billboard} alt='ad image' width={40} height={40} objectFit="fit" className='rounded-2xl'/>
              <div className='flex ml-2  flex-col'>
                <p className='text-sm font-bold  justify-center'>Temp Email</p>
              <p className='text-xs '>Ad lister</p>

              </div>
              
              
             
              </div>

              <div className='border-b pt-2 border-slate-200'/>
              {/* <div className='flex justify-between py-2'>
              <p className='text-xs'>Available</p>
              <p className='text-xs'>{format(startDate,"do 'of' MMMM yyyy")}</p>
              </div>
              <div className='flex justify-between py-2'>
              <p className='text-xs'>to</p>
              <p className='text-xs'>{format(endDate,"do 'of' MMMM yyyy")}</p>
              </div> */}
              
              
              <div className='flex justify-between py-2'>
              <p className='text-xs'>Contact</p>
              <p className='text-xs'>+254 712 345 678</p>
              </div>
              <div className='flex justify-between py-2 mb-3'>
              <p className='text-xs'>Price/{listing?.price?.interval}</p>
              <p className='text-sm font-semibold'>{listing?.price?.price}KES</p>
              </div>
              

  
        
            <button onClick={handleEnquiryClick} className=' border-2 border-orange-200 bg-blue-500 w-full  text-white font-semibold hover:bg-orange-300 p-2  rounded-xl'
            >📫Enquire</button>

<Dialog
        opened={opened}
        withCloseButton
        onClose={() => setOpened(false)}
        size="lg"
        radius="md"
        className='bg-gray-900'
      >
        <Text size="sm" className='mb-5 text-white' weight={500}>
          Request Period
        </Text>
        <div className="mx-auto">
              <DateRange
      ranges={[selectionRange]}
      minDate={new Date()}
      rangeColors={["#FAB038"]}
      disabledDates={dates}
      onChange={handleSelect}/>

              </div>
        <Text size="sm" className='mt-3 mb-2 text-white' weight={500}>
          Send a short message to the lister
        </Text>

        
        <Formik
           initialValues={{
           message:'',
            }}
           validationSchema={validate}
           onSubmit={async (values)=>{
            if(!user){
              const prevPath=router.pathname;
                      router.push({
                          pathname:'/login',
                          query:{
                            prevPath:`/search/${listing?.listingid}`
                          }
                        })
            }
            await createStreamChat(values);
            // await createStreamChatDemo();
                          }}
                          >
                            {formik=>(
                              <Form>
                                <Group align="flex-end">
                                <div className="w-full flex-1 mx-2">
                              <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                                <Field id='message' name="message" placeholder="Ask something" className="p-1 px-2 appearance-none outline-none w-full text-gray-800"/>
                            
                                
                                 </div>
                                 <ErrorMessage component="div"  name="message" className="text-red-600"/>
                            </div>
                            <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded hover:bg-[#fab038] shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                    
                  >
                    Send
                  </button>

                                </Group>

                              </Form>
                            )}

                          </Formik>
      </Dialog>

            </div>
            {/* Client transactions documents */}
            {/* <div className='mx-4'>
              <div className='flex flex-row items-center w-full justify-evenly '>
                <FcIcons.FcDocument className='w-8 h-8 pr-1'/>
                <p className='font-semibold text-sm justify-start'>More Details</p>
                <RiIcons.RiDownload2Fill className='text-gray-400 content-end'/>
                
              </div>
              <div className='border-b mx-4 m-2 border-orange-100'/>
            </div> */}
              
          </div>

       

    </div>
      
     

      </div>
      <Footer/>
       
        </div>
  )
}

export default ListingDetails;

export async function getServerSideProps(context) {
  let previousURl="";
  if(context.req.headers.referer){
    previousURl=context.req.headers.referer;
  }
  return{
    props:{
      prevUrl:JSON.stringify(previousURl),
    }
  }
}
