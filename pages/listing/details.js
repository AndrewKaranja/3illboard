import React from 'react';
import Image from 'next/image';
import Head from 'next/head';
import BackgroundImg from '../../images/streetlights.png';
import {SearchIcon,GlobeAltIcon,UserIcon,MenuIcon,UserCircleIcon} from '@heroicons/react/solid';
import * as FcIcons from 'react-icons/fc';
import * as MdIcons from 'react-icons/md';
import * as BiIcons from 'react-icons/bi';
import {ErrorMessage,useField,Formik,Form,Field} from 'formik';
import * as Yup from 'yup';

function details() {

    const handleChange = (event) => {
        setOwnershipType(event.target.value);
      };

    const validate=Yup.object({
        ownerfullname:Yup.string()
        .min(3,'Must be atleast 3 characters')
        .max(20,'Must be 20 characters or less')
        .required('Full Name is required'),
        landSize:Yup.string()
        .min(3,'Must be atleas 3 characters')
        .max(10,'Must be 10 characters or less')
        .required('Land size in m2 is required'),
        parcelNo:Yup.string()
        .required('Parcel Number is required'),
        location:Yup.string()
        .required('Location is required'),
        ownershipType:Yup.string()
        .required('Required'),
        regDate:Yup.string()
        .oneOf([Yup.ref('password'),null],'Password must match')
        .required('Required'),
        forSale:Yup.bool()
        .required('Required'),
        acceptedTerms:Yup.bool()
        .oneOf([true],'You must accept the terms and conditons')
        .required('Required'),
        
      });


  return (
    <div className='2xl:container h-screen m-auto'>
      {/* <Head>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
      </Head> */}
      <div className='fixed inset-0 w-7/12 invisible md:visible md:hidden lg:block  '>
        
        <Image src={BackgroundImg}  alt='traffic lights' objectFit='cover' layout="fill"/>
        <h1 className='absolute z-10 text-2xl justify-center top-[45%] left-[24%] text-white'>How does the ad look like?</h1>
       
        
        {/* <video className="w-full h-full object-cover" src="" autoPlay loop poster='../public'></video> */}
      </div>
      <div role="hidden" className='fixed inset-0 w-6/12 ml-auto bg-white bg-opacity-70 backdrop-blur-xl lg:block'></div>
        <div className='relative h-full ml-auto lg:w-6/12'>
          <div className="m-auto px-6  mb-50 xl:w-10/12">
           {/* Text side */}
           <div className="mx-4 p-4">
         <div className="flex items-center">
            <div className="flex items-center text-orange-600 relative">
                <div className="rounded-full h-12 w-12 py-3 px-2 text-2xl border-2  border-orange-600">
                    
                <BiIcons.BiSelectMultiple/>
                </div>
                
            </div>
            <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-orange-600"></div>
            <div className="flex items-center text-white relative">
                <div className=" rounded-full items-end  h-12 w-12 py-3 px-3 scale-110 border-2 bg-orange-600 border-orange-600">
                <FcIcons.FcViewDetails className='justify-end'/>
                
                </div>
                
            </div>
            <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300"></div>
            <div className="flex items-center text-gray-500 relative">
                <div className="rounded-full h-12 w-12 py-3 px-2 text-2xl border-2 border-gray-300">
                <MdIcons.MdOutlineAddLocation/>
                </div>
               
            </div>
            <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300"></div>
            <div className="flex items-center text-gray-500 relative">
                <div className="rounded-full text-2xl h-12 w-12 py-3 px-2 border-2 border-gray-300">
                <MdIcons.MdPriceChange/>
                
                
                </div>
               
            </div>
            <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300"></div>
            <div className="flex items-center text-gray-500 relative">
                <div className="rounded-full h-12 w-12 py-3 px-2 text-2xl border-2  border-gray-300">
                <MdIcons.MdMonochromePhotos/>
                
                
                </div>
                
            </div>
        </div>
    </div>



            <div className='space-y-4'>
              <h3 className='text-3xl'>Enter details on the Billboard</h3>
             
              
            </div>

            <Formik
                      initialValues={{
                          ownerfullname:'',
                          landSize:'',
                          parcelNo:'',
                          location:'',
                          ownershipType:'',
                          regDate:'',
                          forSale:false,
                          acceptedTerms:false,
                          }}
                          validationSchema={validate}
                          onSubmit={(values,{setSubmitting,resetForm,setErrors})=>{
                              setTimeout(()=>{
                                  alert(JSON.stringify(values,null,2));
                                  resetForm();
                                  setSubmitting(false);
                              },3000)
                              //signup(values.email,values.password)
                          }}
                          >

                          {formik=>(
                              <div>
                                  <div className="p-5">
    
    <div className="mt-8 p-4">
        <div>
            <div className="font-bold text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-3">Dimensions</div>
            <div className="flex flex-col md:flex-row">
                <div className="w-full flex-1 mx-2 svelte-1l8159u">
                    <div className="bg-white my-2 p-1 flex border border-gray-200 rounded svelte-1l8159u">
                        <input placeholder="Width" className="p-1 px-2 appearance-none outline-none w-full text-gray-800"/> </div>
                </div>
                <div className="w-full flex-1 mx-2 svelte-1l8159u">
                    <div className="bg-white my-2 p-1 flex border border-gray-200 rounded svelte-1l8159u">
                        <input placeholder="Height" className="p-1 px-2 appearance-none outline-none w-full text-gray-800"/> </div>
                </div>
                <div className="w-15 align-bottom">
    <select className="form-select appearance-none
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
        <option selected>m</option>
        <option value="in">In</option>
        
    </select>
  </div>
            </div>
            <div className="flex flex-col md:flex-row">
                <div className="w-full mx-2 flex-1 svelte-1l8159u">
                    <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase"> Username</div>
                    <div className="bg-white my-2 p-1 flex border border-gray-200 rounded svelte-1l8159u">
                        <input placeholder="Just a hint.." className="p-1 px-2 appearance-none outline-none w-full text-gray-800"/> </div>
                </div>
                <div className="w-full mx-2 flex-1 svelte-1l8159u">
                    <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase"> Your Email</div>
                    <div className="bg-white my-2 p-1 flex border border-gray-200 rounded svelte-1l8159u">
                        <input placeholder="jhon@doe.com" className="p-1 px-2 appearance-none outline-none w-full text-gray-800"/> </div>
                </div>
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
        hover:bg-orange-600  
        bg-orange-600 
        text-orange-100 
        border duration-200 ease-in-out 
        border-orange-600 transition">Next</button>
                <button className="text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
        hover:bg-orange-200  
        bg-orange-100 
        text-orange-700 
        border duration-200 ease-in-out 
        border-orange-600 transition">Skip</button>
            </div>
        </div>
    </div>
</div>
                                </div>
                          )}
                      </Formik>
            
            

            
               


          </div>
        </div>
      </div>
  )
}

export default details