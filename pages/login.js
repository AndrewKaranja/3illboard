import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import GoogleLogo from '../public/google.svg';
import FacebookLogo from '../public/facebook.svg';
import BackgroundImg from '../images/cat.png'
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

function choosePath(hostAd){
  let path="/";
  if (hostAd=="true") {
    path="/listing/listingtype"
    
  }else{
    path="/"
  }
  return path;

  } 

function Login() {
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
  const router=useRouter();
 
  const {hostAd}=router.query;
  console.log(hostAd)
 

 

  
 

  const{user}=useAuth();
  console.log(user);

  // Configure FirebaseUI.
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: choosePath(hostAd),
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
     
    },
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
              <p className='font-medium text-lg text-gray-600'>Welcome to 3illboard! Login first:</p>
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

export default Login

{/* <div className="mt-12 grid gap-6 sm:grid-cols-2">
              <button className='py-3 px-6 rounded-xl bg-yellow-50 hover:bg-yellow-100 focus:bg-yellow-100 active:bg-yellow-200'>
                <div className='flex justify-center gap-4'>
                <Image src={GoogleLogo}  alt='google logo' width="20px" height="20px"/>
                  <span className='block w-max font-medium tracking-wide text-sm text-[#FAB038]'>With Google</span>
                </div>
              </button>
              <button className='py-3 px-6 bg-blue-700 rounded-xl hover:bg-blue-800 focus:bg-blue-800 active:bg-blue-900'>
                <div className='flex justify-center gap-4'>
                <Image src={FacebookLogo}  alt='google logo' width="20px" height="20px"/>
                  <span className='block w-max font-medium tracking-wide text-sm text-white'>With Facebook</span>
                </div>
              </button>
            </div>

            <div role="hidden" className="mt-12 border-t">
                    <span className="block w-max mx-auto -mt-3 px-4 text-center text-gray-500 bg-white">Or</span>
            </div>

            <form action="" className="space-y-6 py-6">
                    <div>
                        <input 
                                type="email" 
                                placeholder="Your Email"
                                className="w-full py-3 px-6 ring-1 ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none"
                        />
                    </div>

                    <div className="flex flex-col items-end">
                        <input 
                                type="password" 
                                placeholder="Password"
                                className="w-full py-3 px-6 ring-1 ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none"
                        />
                        <button type="reset" className="w-max p-3 -mr-3">
                            <span className="text-sm tracking-wide text-blue-600">Forgot password ?</span>
                        </button>
                    </div>

                    <div>
                        <button className="w-full px-6 py-3 rounded-xl bg-sky-500 transition hover:bg-sky-600 focus:bg-sky-600 active:bg-sky-800">
                            <span className="font-semibold text-white text-lg">Login</span>
                        </button>
                        <a href="#" type="reset" className="w-max p-3 -ml-3">
                            <span className="text-sm tracking-wide text-blue-600">Create new account</span>
                        </a>
                    </div>
                </form> */}


