import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import BackgroundImg from '../images/cat.png'
import Image from 'next/image';
import { useAuth } from '../context/AuthContext';


function Signup() {
  const firebaseConfig = {
    apiKey:`${process.env.firebase_key}`,
    authDomain: "illboard.firebaseapp.com",
    projectId: "illboard",
    storageBucket: "illboard.appspot.com",
    messagingSenderId: `${process.env.firebase_messagerID}`,
    appId: `${process.env.firebase_appID}`,
    measurementId: `${process.env.firebase_measurementID}`
  };
  firebase.initializeApp(firebaseConfig);

  const{user}=useAuth();
  console.log(user);

  // Configure FirebaseUI.
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
  };


  return (
    <div className='2xl:container h-screen m-auto'>
      <div className='fixed inset-0 w-7/12 md:hidden lg:block '>
        <div className='invisible md:visible'>
        <Image src={BackgroundImg}  alt='cat looking at billboard' objectFit='cover' layout="fill"/>
        </div>
        
        {/* <video className="w-full h-full object-cover" src="" autoPlay loop poster='../public'></video> */}
      </div>
      <div role="hidden" className='fixed inset-0 w-6/12 ml-auto bg-white bg-opacity-70 backdrop-blur-xl lg:block'></div>
        <div className='relative h-full ml-auto lg:w-6/12'>
          <div className="m-auto py-12 px-6 sm:p-20 xl:w-10/12">
            <div className='space-y-4'>
              <a href="">
              <h3 className='text-3xl'>3illboard</h3>
              </a>
              <p className='font-medium text-lg text-gray-600'>Welcome to 3illboard! Signup first:</p>
            </div>
            
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />

            
                <div className="border-t pt-12">
                    <div className="space-y-2 text-center">
                        
                        <span className="block text-sm tracking-wide text-gray-500">Get free adspace advertising for a month.</span>
                    </div>
                </div>


          </div>
        </div>
      </div>
    
  )
}

export default Signup