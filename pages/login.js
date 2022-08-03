import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import BackgroundImg from '../images/cat.png'
import Image from 'next/image';
import { useRouter } from 'next/router';
import { db } from '../firebase';
import { collection,doc,setDoc} from 'firebase/firestore';
import { withPublic } from '../hooks/route';

function choosePath(hostAd){
  let path="/";
  if (hostAd=="true") {
    path="/listing/listingtype"
    
  }else{
    path="/"
  }
  return path;

  } 


function Login({user}) {
  const firebaseConfig = {
    apiKey:`${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
    authDomain: "illboard.firebaseapp.com",
    projectId: "illboard",
    storageBucket: "illboard.appspot.com",
    messagingSenderId: `${process.env.NEXT_PUBLIC_FIREBASE_messagerID}`,
    appId: `${process.env.NEXT_PUBLIC_FIREBASE_appID}`,
    measurementId: `${process.env.NEXT_PUBLIC_FIREBASE_measurementID}`
  };
  firebase.initializeApp(firebaseConfig);
  const router=useRouter();
 
 
  const {prevPath}=router.query;

  const addUser=async(user)=>{
    const userDocRef = doc(db, "users", `${user.uid}`);
    await setDoc(userDocRef,{name:user.displayName,email:user.email,phone:user.phoneNumber,userid:user.uid,usertype:"client",totalListings:0});
  }
 
 
  // Configure FirebaseUI.
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
signInSuccessUrl: prevPath,
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        const user = authResult.user;
        const credential = authResult.credential;
        const isNewUser = authResult.additionalUserInfo.isNewUser;
        const providerId = authResult.additionalUserInfo.providerId;
        const operationType = authResult.operationType;
        if(isNewUser==true){
          addUser(user);

        }
        // Do something with the returned AuthResult.
        // Return type determines whether we continue the redirect
        // automatically or whether we leave that to developer to handle.
        return true;
      }
     
    },
  };
  return (
    <div className='2xl:container h-screen m-auto'>
      <div className='fixed inset-0 w-7/12 md:hidden lg:block '>
        <div className='invisible md:visible'>
        <Image src={BackgroundImg}  alt='cat looking at billboard' objectFit='cover' layout="fill"/>
        </div>
      </div>
      <div role="hidden" className='fixed inset-0 w-6/12 ml-auto bg-white bg-opacity-70 backdrop-blur-xl lg:block'></div>
        <div className='relative h-full ml-auto lg:w-6/12'>
          <div className="m-auto py-12 px-6 sm:p-20 xl:w-10/12">
            <div className='space-y-4'>
              <a href="">
              <h3 className='text-3xl'>3illboard</h3>
              </a>
              <p className='font-medium text-lg text-gray-600'>Welcome to 3illboard! Login or signup here first:</p>
            </div>

            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
            
            
                <div className="border-t pt-12">
                    <div className="space-y-2 text-center">
                        
                        <span className="block text-sm tracking-wide text-gray-500">Enjoy free adspace advertising till October 22.</span>
                    </div>
                </div>


          </div>
        </div>
      </div>

   
  )
}

export default withPublic(Login) ;




