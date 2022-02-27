import React from 'react';
import Image from 'next/image';
import Head from 'next/head';
import BackgroundImg from '../../images/streetlights.png';

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
          <div className="m-auto py-12 px-6 sm:p-20 xl:w-10/12">
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
                                  <Form>
                                  <Field name="lastName" placeholder="Last Name"/>
                                  <label htmlFor="name">Name</label>
                                  <input id="name" name="name" type="text" autoComplete="name" required />
                                  <label htmlFor="name">Name</label>
                                  <input id="name" name="name" type="text" autoComplete="name" required />
                                  <label htmlFor="name">Name</label>
                                  <input id="name" name="name" type="text" autoComplete="name" required />
                                  <label htmlFor="name">Name</label>
                                  <input id="name" name="name" type="text" autoComplete="name" required />
                                     
                                      
                                      
                                      <div className='flex  justify-between pb-10  w-[30rem]'>
                                          <button className='text-sm text-gray-900 bg-gray-100 px-4 py-2 rounded-lg mt-5 active:scale-90 transition duration-150'>Back</button>
                                          <button className='text-sm text-white bg-gray-900 px-4 py-2 rounded-lg mt-5 active:scale-90 transition duration-150'>Next</button>
                                      </div>
                                  </Form>
                                </div>
                          )}
                      </Formik>
            
            

            
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

export default details