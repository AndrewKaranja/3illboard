import React, { useState } from 'react';
import Sidebar from '../../../components/dashboard/Sidebar';
import SidebarClient from '../../../components/dashboard/SidebarClient';
import Header from '../../../components/dashboard/Header';
import {ErrorMessage,useField,Formik,Form,Field} from 'formik';
import * as Yup from 'yup';


import { useAuth } from '../../../context/AuthContext';
import {useUserType} from '../../../context/UserTypeContext';



import { withProtected } from '../../../hooks/route';

function Feedback() {
    const {user}=useAuth();
    const {userInfo}=useUserType();
    const [feedbackInfo, setFeedbackInfo] = useState([]);
    const validate=Yup.object({
        fname:Yup.string()
        .min(5,'Must be atleast 5 characters')
        .required('Fullname is required'),
        email:Yup.string()
        .min(10,'Must be atleast 10 characters')
        .required('Email is required'),
        message:Yup.string()
        .min(10,'Must be atleast 10 characters')
        .max(500,'Must be less than 500 characters')
        .required('Fullname is required'),
       
        
      });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      {userInfo?.usertype==="client" && <SidebarClient sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> }
{userInfo?.usertype==="lister" && <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> }

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-[#fab038]">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className='mx-3 p-5'>
        <h4 className='text-xl text-black font-bold'>Feedback</h4>
                <p className='text-sm text-white font-semibold'>Should you face any issue.Feel free to contact us.
                We will get back to you as soon as we can</p>

        </div>

        

        <main>
        
        <div className='flex flex-col bg-white m-6 p-5 rounded-2xl'>
           
        <Formik
                initialValues={{
                fname:'',
                email:'',
                message:'',
                
                          }}

                          validationSchema={validate}
                          onSubmit={async (values)=>{
                            
                           
                            setFeedbackInfo({
                              fname:values.fname,
                              email:values.email,
                              message:values.message

                           });
                           
                          }}
                          
                          >

                {formik=>(
                  <div>
                
                    
                    <Form>
                     
                        <div className=" p-1">
                        <div>
                            

                        
                            <div className="font-bold text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-2">Name</div>
                            <div className="w-full flex-1 mx-2">
                              <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                                <Field id='fname' name="fname" placeholder="names" className="p-1 px-2 appearance-none outline-none w-full text-gray-800"/>
                            
                                
                                 </div>
                                 <ErrorMessage component="div"  name="fname" className="text-red-600"/>
                            </div>


                            <div className="flex flex-row font-bold text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-2">Client Email</div>
                            <div className="w-full flex-1 mx-2">
                              <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                              <Field name="email"  placeholder="email" type="email" className="p-1 px-2 appearance-none outline-none w-full text-gray-800"/>
                                
                                 </div>
                                 <ErrorMessage component="div" name="email" className="text-red-600"/>
                            </div>
                           
                            <div className="flex flex-row font-bold text-gray-600 text-xs leading-8 uppercase h-6 mx-2 ">Message</div>
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

                            


                           



            
            
           
            
            
        </div>
        
        <div className="flex items-center justify-end py-2 border-t border-solid border-slate-200 rounded-b">
                  
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                    
                  >
                    Send Feedback
                  </button>
                </div>
    
</div>
                                </Form>
                                </div>
                          )}
                      </Formik>
         
            </div>
        </main>

      </div>
    </div>
  )
}

export default withProtected(Feedback)