import React from 'react';
import Image from 'next/image';
import Head from 'next/head';
import BackgroundImg from '../../images/streetlights.png';
import {ErrorMessage,useField,Formik,Form,Field} from 'formik';
import * as Yup from 'yup';




function Legal() {
  return (
    <div className='2xl:container h-screen m-auto'>
      {/* <Head>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
      </Head> */}
      <div className='fixed inset-0 w-7/12 invisible md:visible md:hidden lg:block  '>
        
        <Image src={BackgroundImg}  alt='traffic lights' objectFit='cover' layout="fill"/>
        <h1 className='absolute z-10 text-2xl justify-center top-[45%] left-[24%] text-white'>Finally!! Is This Legit Business</h1>
       
        
        {/* <video className="w-full h-full object-cover" src="" autoPlay loop poster='../public'></video> */}
      </div>
      <div role="hidden" className='fixed inset-0 w-6/12 ml-auto bg-white bg-opacity-70 backdrop-blur-xl lg:block'></div>
        <div className='relative h-full ml-auto lg:w-6/12'>
          <div className="m-auto px-6 mt-4 xl:w-10/12">
        
            <div className='space-y-4'>
              <h3 className='text-3xl'>Upload the required docs</h3>
            </div>

            <div>
                     <div className="p-5">
                        <div className=" p-4">
                        <div>
                         
                            
                        
            
                            <div className="font-bold text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-3">Certificate of occupancy</div>
                            <div className="w-full flex-1 mx-2">
                              <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                                <input type="file" placeholder="KES" className="p-1 px-2 appearance-none outline-none w-full text-gray-800"/> </div>
                            </div>
                            <div className="font-bold text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-3">Business license</div>
                            <div className="w-full flex-1 mx-2">
                              <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                                <input type="file" placeholder="KES" className="p-1 px-2 appearance-none outline-none w-full text-gray-800"/> </div>
                            </div>
                            <div className="font-bold text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-3">Tax certificate</div>
                            <div className="w-full flex-1 mx-2">
                              <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                                <input type="file" placeholder="KES" className="p-1 px-2 appearance-none outline-none w-full text-gray-800"/> </div>
                            </div>
                            <div className="font-bold text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-3">Business insurance</div>
                            <div className="w-full flex-1 mx-2">
                              <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                                <input type="file" placeholder="KES" className="p-1 px-2 appearance-none outline-none w-full text-gray-800"/> </div>
                            </div>
                            <div className="font-bold text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-3">A service contract</div>
                            <div className="w-full flex-1 mx-2">
                              <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                                <input type="file" placeholder="KES" className="p-1 px-2 appearance-none outline-none w-full text-gray-800"/> </div>
                            </div>
                         
            
           
        </div>
        
        <div className="flex p-2 mt-4">
            <button className="text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
        hover:bg-gray-200  
        bg-gray-100 
        text-gray-700 
        border duration-200 ease-in-out 
        border-gray-600 transition">Previous</button>
            <div className="flex-auto flex flex-row-reverse">
                <button className="text-base  ml-2  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
        hover:bg-[#FAB038]  
        bg-[#FAB038] 
        text-orange-100 
        border duration-200 ease-in-out 
        border-[#FAB038] transition">Review Listing</button>
               
            </div>
        </div>
    </div>
</div>
                                </div>
            
            

            
               


          </div>
        </div>
      </div>
  )
}

export default Legal