import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/dashboard/Sidebar';
import Header from '../../../components/dashboard/Header';
import { useAuth } from '../../../context/AuthContext';
import {ErrorMessage,useField,Formik,Form,Field} from 'formik';
import { query,collection, doc,where,getDocs, addDoc,serverTimestamp} from "firebase/firestore";
import { db } from '../../../firebase';
import * as Yup from 'yup';
import PhoneInput from 'react-phone-input-2';
import {useUserType} from '../../../context/UserTypeContext';

function Profile() {
  const {user}=useAuth();
  const {userInfo}=useUserType();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [name, setName] = useState("");
  
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
    .required('Message is required'),
   
    
  });




  useEffect(() => {
    setName(user.displayName);
  }, [user]);


  const onTodoChange =(value)=>{
    setName(value);
}

  
  return (
    <div className="flex h-screen overflow-hidden">

    {/* Sidebar */}
    <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

    {/* Content area */}
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

      {/*  Site header */}
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main>
        
    <div className='mx-8'>
    <div className="mt-10 sm:mt-0">
    <div className="md:grid md:grid-cols-3 md:gap-6">
      <div className="md:col-span-1">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
          <p className="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p>
        </div>
      </div>
      <div className="mt-5 md:mt-0 md:col-span-2">
      <Formik
                initialValues={{
                fname:userInfo?.name,
                email:userInfo?.email,
                phone:userInfo?.workPhone,
                companyName:'',
                country:'',
                address:'',
                city:'',
                region:'',
                postalCode:'',
                
                          }}

                          validationSchema={validate}
                          onSubmit={async (values)=>{
                            const promises=[];
                            const feedbackRef= collection(db, "feedback");
                           const docData = {
                            fullname:values.fname,
                            email:values.email,
                            message: values.message,
                            feedbackTime:serverTimestamp(),
                            userid:user.uid
                            
                        };
                        
                        

                        
                        const docSnap=await addDoc(feedbackRef, docData);
                        promises.push(docSnap);
                        Promise.all(promises)
                        .then(()=>{router.push("/account")})
                        .catch((err)=>console.log(err));
                            
                          }}
                          
                          >

                {formik=>(
                  <div>
                
                    
                    <Form>
                     
                        <div className=" p-1 shadow overflow-hidden sm:rounded-md">
                        <div className='mx-3'>
                            

                        
                            <div className="font-bold text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-2">Name</div>
                            <div className="w-full flex-1 mx-2">
                              <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                                <Field id='fname' name="fname" placeholder={userInfo?.name} className="p-1 px-2 appearance-none outline-none w-full text-gray-800"/>
                                 </div>
                                 <ErrorMessage component="div"  name="fname" className="text-red-600"/>
                            </div>


                            <div className="flex flex-row font-bold text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-2">Email address</div>
                            <div className="w-full flex-1 mx-2">
                              <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                              <Field name="email"  placeholder={userInfo?.email} type="email" className="p-1 px-2 appearance-none outline-none w-full text-gray-800"/>
                                
                                 </div>
                                 <ErrorMessage component="div" name="email" className="text-red-600"/>
                            </div>


                            <div className="flex flex-row font-bold text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-3">Phone</div>
                            <div className="w-full flex-1 mx-2">
                              <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                              <PhoneInput
                              name="phone"
                              id="phone"
                            
                            country={'ke'}
                            value={formik.values.phone}
                            onChange={formik.handleChange('phone')}/>
                                
                                 </div>
                                 <ErrorMessage component="div" name="phone" className="text-red-600"/>
                            </div>


                            <div className="flex flex-row font-bold text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-2">Company Name</div>
                            <div className="w-full flex-1 mx-2">
                              <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                              <Field  placeholder={userInfo?.companyName ?`${userInfo?.companyName} `:"Enter Company Name"}
                              type="text"
                              name="companyName"
                              id="companyName" 
                              autoComplete="organization"
                              className="p-1 px-2 appearance-none outline-none w-full text-gray-800"/>
                                
                                 </div>
                                 <ErrorMessage component="div" name="companyName" className="text-red-600"/>
                            </div>



                            <div className="w-full mx-2">
                              <div className="font-bold text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-3">Country</div>
                              <select
                              id="country"
                              name="country"
                              autoComplete="country-name"
                              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <option value="Kenya">Kenya</option>
                                <option value="Uganda">Uganda</option>
                                <option value="Tanzania">Tanzania</option>
                                </select>
                            </div>


                            <div className="flex flex-row font-bold text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-2">Street address</div>
                            <div className="w-full flex-1 mx-2">
                              <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                              <Field type="text"
                    name="address"
                    id="address"
                    autoComplete="street-address" placeholder={userInfo?.address ?`${userInfo?.address} `:"Enter Street Address"} className="p-1 px-2 appearance-none outline-none w-full text-gray-800"/>
                                
                                 </div>
                                 <ErrorMessage component="div" name="address" className="text-red-600"/>
                            </div>
                           
                           

            <div className="flex flex-col md:flex-row">

                <div className="w-full flex-1 mx-2">
                <div className="font-bold text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-3">City</div>
                    <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                        <Field type="text"
                    name="city"
                    id="city"
                    autoComplete="address-level2" placeholder={userInfo?.city ?`${userInfo?.city} `:"Enter City"} className="p-1 px-2 appearance-none outline-none w-full text-gray-800"/>
                        <ErrorMessage
                        component="div"
                        name="city"
                        className="text-red-600"/>
                         </div>
                </div>
                <div className="w-full flex-1 mx-2">
                <div className="font-bold text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-3">State/Province</div>
                    <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                        <Field type="text"
                          name="region"
                          id="region"
                          autoComplete="address-level1" placeholder={userInfo?.region ?`${userInfo?.region} `:"Enter Region"} className="p-1 px-2 appearance-none outline-none w-full text-gray-800"/>
                        <ErrorMessage
                        component="div"
                        name="region"
                        className="text-red-600"/> 
                    </div>
                </div>

                <div className="w-full flex-1 mx-2">
                <div className="font-bold text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-3">ZIP / Postal code</div>
                <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                        <Field type="text"
                    name="postalCode"
                    id="postalCode"
                    autoComplete="postal-code" 
                    placeholder={userInfo?.postalCode ?`${userInfo?.postalCode} `:"Enter Postal Code"} className="p-1 px-2 appearance-none outline-none w-full text-gray-800"/>
                        <ErrorMessage
                        component="div"
                        name="postalCode"
                        className="text-red-600"/>
                         </div>
                </div>
                
            </div>

            
            
        </div>
        
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
    
</div>
                                </Form>
                                </div>
                          )}
                      </Formik>



      </div>
    </div>
  </div>
 
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>


      {/* <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Notifications</h3>
              <p className="mt-1 text-sm text-gray-600">Decide which communications you would like to receive and how.</p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <fieldset>
                    <legend className="text-base font-medium text-gray-900">By Email</legend>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="comments"
                            name="comments"
                            type="checkbox"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="comments" className="font-medium text-gray-700">
                            Comments
                          </label>
                          <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="candidates"
                            name="candidates"
                            type="checkbox"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="candidates" className="font-medium text-gray-700">
                            Candidates
                          </label>
                          <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="offers"
                            name="offers"
                            type="checkbox"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="offers" className="font-medium text-gray-700">
                            Offers
                          </label>
                          <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  <fieldset>
                    <div>
                      <legend className="text-base font-medium text-gray-900">Push Notifications</legend>
                      <p className="text-sm text-gray-500">These are delivered via SMS to your mobile phone.</p>
                    </div>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-center">
                        <input
                          id="push-everything"
                          name="push-notifications"
                          type="radio"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        />
                        <label htmlFor="push-everything" className="ml-3 block text-sm font-medium text-gray-700">
                          Everything
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="push-email"
                          name="push-notifications"
                          type="radio"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        />
                        <label htmlFor="push-email" className="ml-3 block text-sm font-medium text-gray-700">
                          Same as email
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="push-nothing"
                          name="push-notifications"
                          type="radio"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        />
                        <label htmlFor="push-nothing" className="ml-3 block text-sm font-medium text-gray-700">
                          No push notifications
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div> */}



  </div>

  </main>


      </div>
    </div>
 
  )
}

export default Profile