import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/dashboard/Sidebar';
import SidebarClient from '../../../components/dashboard/SidebarClient';
import Header from '../../../components/dashboard/Header';
import { useAuth } from '../../../context/AuthContext';
import {ErrorMessage,useField,Formik,Form,Field} from 'formik';
import { query,collection, doc,where,getDocs,setDoc, addDoc,serverTimestamp} from "firebase/firestore";
import { db } from '../../../firebase';
import * as Yup from 'yup';
import PhoneInput from 'react-phone-input-2';
import {useUserType} from '../../../context/UserTypeContext';
import {useRouter} from "next/router";

function Profile() {
  const {user}=useAuth();
  const {userInfo}=useUserType();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [name, setName] = useState("");
  const router=useRouter();
  
  const validate=Yup.object({
    fname:Yup.string()
    .min(5,'Must be atleast 5 characters')
    .required('Fullname is required'),
    companyName:Yup.string()
    .min(5,'Must be atleast 5 characters')
    .required('Company name is required'),
    address:Yup.string()
    .min(3,'Must be atleast 3 characters')
    .required('Street address is required'),
    city:Yup.string()
    .min(3,'Must be atleast 3 characters')
    .required('City is required'),
    region:Yup.string()
    .min(3,'Must be atleast 3 characters')
    .required('region is required'),
    postalCode:Yup.string()
    .min(5,'Must be atleast 5 characters')
    .required('Postal Code is required'),
   
    
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
     {userInfo?.usertype==="client" && <SidebarClient sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> }
{userInfo?.usertype==="lister" && <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> }

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
      enableReintialize
                initialValues={{
                fname:userInfo?.name,
                email:userInfo?.email,
                phone:userInfo?.workPhone,
                companyName:userInfo?.companyName,
                country:userInfo?.country,
                address:userInfo?.address,
                city:userInfo?.city,
                region:userInfo?.region,
                postalCode:userInfo?.postalCode,
                
                          }}

                          validationSchema={validate}
                          onSubmit={async (values)=>{
                            console.log("which city?"+values.city)
                            const promises=[];
                            const userDocRef=doc(db,"users",user.uid);
                            
                           const docData = {
                            name:values.fname,
                            workPhone:values.phone,
                            companyName: values.companyName,
                            country:values.country,
                            address:values.address,
                            city:values.city,
                            region:values.region,
                            postalCode:values.postalCode,
                            
                        };
                        
                        const docSnap=await setDoc(userDocRef,docData, { merge: true });

                        
                        promises.push(docSnap);
                        Promise.all(promises)
                        .then(()=>{router.reload()})
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
                                <Field id='fname' name="fname" autoComplete="name"  placeholder={userInfo?.name ?`${userInfo?.name} `:"Enter full Name"} className="p-1 px-2 appearance-none outline-none w-full text-gray-800"/>
                                 </div>
                                 <ErrorMessage component="div"  name="fname" className="text-red-600"/>
                            </div>


                            <div className="flex flex-row font-bold text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-2">Email address</div>
                            <div className="w-full flex-1 mx-2">
                              <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                              <Field name="email"  placeholder={userInfo?.email} type="email" disabled className="p-1 px-2 appearance-none outline-none w-full text-gray-800"/>
                                
                                 </div>
                                 <ErrorMessage component="div" name="email" className="text-red-600"/>
                            </div>



                            <div className="flex flex-row font-bold text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-2">Phone</div>
                            <div className="w-full flex-1 mx-2">
                              <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                              <Field name="phone"  placeholder={"+"+userInfo?.workPhone} type="phone" className="p-1 px-2 appearance-none outline-none w-full text-gray-800"/>
                                
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
                                <option defaultValue value="Kenya">Kenya</option>
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
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                type="submit">
                Save
              </button>
            </div>

            
            
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



  </div>

  </main>


      </div>
    </div>
 
  )
}

export default Profile