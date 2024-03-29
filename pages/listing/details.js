import React,{useState,useEffect} from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import BackgroundImg from '../../images/streetlights.png';

import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";

import 'react-phone-input-2/lib/style.css'
import {ErrorMessage,useField,Formik,Form,Field} from 'formik';
import * as Yup from 'yup';



function Details() {
  const router=useRouter();
const {listingType}=router.query;

const [tags, setTags] =useState(["design"]);


const [listingInfo, setlistingInfo] = useState([]);

useEffect(() => {
  localStorage.setItem('listingInfo', JSON.stringify(listingInfo));
}, [listingInfo]);





      

    const validate=Yup.object({
        billboardTitle:Yup.string()
        .min(5,'Must be atleast 5 characters')
        .max(50,'Must be 50 characters or less')
        .required('Title is required'),
        billboardDescription:Yup.string()
        .min(10,'Must be atleast 10 characters')
        .required('Billboard description is required'),
        locationDescription:Yup.string()
        .min(10,'Must be atleast 10 characters')
        .required('Location description is required'),
        dimensionWidth:Yup.number()
        .required('Width is required'),
        dimensionHeight:Yup.number()
        .required('Height is required'),
       
        
      });


  return (
    <div className='2xl:container h-screen m-auto'>
     
      <div className='fixed inset-0 w-7/12 invisible md:visible md:hidden lg:block  '>
        
        <Image src={BackgroundImg}  alt='traffic lights' objectFit='cover' layout="fill"/>
        <h1 className='absolute z-10 text-2xl justify-center top-[45%] left-[24%] text-white'>How does the ad look like?</h1>
       
 
      </div>
      <div role="hidden" className='fixed inset-0 w-6/12 ml-auto bg-white bg-opacity-70 backdrop-blur-xl lg:block'></div>
        <div className='relative h-full ml-auto lg:w-6/12'>
          <div className="m-auto px-6 mt-4 xl:w-10/12">
        
            <div className='space-y-4'>
              <h3 className='text-3xl'>Enter details on the Billboard</h3>
            </div>

            <Formik
                initialValues={{
                billboardTitle:'',
                billboardDescription:'',
                locationDescription:'',
                dimensionWidth:'',
                dimensionHeight:'',
                nightVisibility:false,
                
                          }}

                          validationSchema={validate}
                          onSubmit={async (values)=>{
                           
                            setlistingInfo({
                              listingType:listingType,
                              billboardTitle:values.billboardTitle,
                              billboardDescription:values.billboardDescription,
                              locationDescription:values.locationDescription,
                              dimensionWidth:values.dimensionWidth,
                              dimensionHeight:values.dimensionHeight,
                              otherServices:tags,
                              nightVisibility:values.nightVisibility
                           });
                           
                          
                           router.push("/listing/location");
                           
                          }}
                          
                          >

                {formik=>(
                  <div>
                
                    
                    <Form>
                      
                     <div className="p-5">
                     
                        <div className=" p-4">
                        <div>
                            <div className="font-bold text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-3">Billboard Title</div>
                            <div className="w-full flex-1 mx-2">
                              <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                                <Field id='billboardTitle' name="billboardTitle" placeholder="eg..Iconic billboard along Ngong rd" className="p-1 px-2 appearance-none outline-none w-full text-gray-800"/>
                            
                                
                                 </div>
                                 <ErrorMessage component="div"  name="billboardTitle" className="text-red-600"/>
                            </div>

                            <div className="flex flex-row font-bold text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-3">Billboard Description<p className='text-[0.5rem] lowercase'>(Defining Features of the billboard)</p></div>
                            <div className="w-full flex-1 mx-2">
                              <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                              <textarea
                              name="billboardDescription"
                              id="billboardDescription"   
                              placeholder="eg. Its on a Junction,no surrounding buildings,on busy road etc"
                              className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                              onChange={formik.handleChange}
                              value={formik.values.billboardDescription}
                              rows={5}
                              cols={5}
                              />
                               
                                
                                 </div>
                                 <ErrorMessage component="div" name="billboardDescription" className="text-red-600"/>
                            </div>


                            <div className="flex flex-row font-bold text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-3">Location Description<p className='text-[0.5rem] lowercase'>(eg nearby places of interest to boost intrest)</p></div>
                            <div className="w-full flex-1 mx-2">
                              <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                              <Field name="locationDescription"  placeholder="eg. places of interest around billboard" type="text" className="p-1 px-2 appearance-none outline-none w-full text-gray-800"/>
                                
                                 </div>
                                 <ErrorMessage component="div" name="locationDescription" className="text-red-600"/>
                            </div>

            <div className="font-bold text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-3">Dimensions</div>

            <div className="flex flex-col md:flex-row">
                <div className="w-full flex-1 mx-2">
                    <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                        <Field name="dimensionWidth"  type="number" placeholder="Width" className="p-1 px-2 appearance-none outline-none w-full text-gray-800"/>
                        <ErrorMessage
                        component="div"
                        name="dimensionWidth"
                        className="text-red-600"/>
                         </div>
                </div>
                <div className="w-full flex-1 mx-2">
                    <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                        <Field name="dimensionHeight" type="number" placeholder="Height" className="p-1 px-2 appearance-none outline-none w-full text-gray-800"/>
                        <ErrorMessage
                        component="div"
                        name="dimensionHeight"
                        className="text-red-600"/> 
                    </div>
                </div>
                <div className="w-7">
                    <select className="form-select bg-orange-200 ml-2 text-center appearance-none block w-full  py-1.5 text-base font-normal text-gray-700  bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out mt-2
                    focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none" aria-label="Default select example">
                        <option defaultValue value="m">m</option>
                        </select>
                </div>
            </div>
            
                     
            
            <div className="font-bold text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-3">Other Services Offered</div>
            <ReactTagInput 
  tags={tags} 
  placeholder="Type and press enter"
  maxTags={10}
  editable={true}
  readOnly={false}
  removeOnBackspace={true}
  onChange={(newTags) => setTags(newTags)}/>
            <div className='flex flex-row mt-4 ml-2 items-center'>
              <Field type="checkbox" name="nightVisibility" className="m-2"/>
              <p>Visible at night</p>
              
            </div>
        </div>
        
        <div className="flex p-2 mt-4">
            <button className="text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
        hover:bg-gray-200  
        bg-gray-100 
        text-gray-700 
        border duration-200 ease-in-out 
        border-gray-600 transition" type='reset'>Previous</button>
            <div className="flex-auto flex flex-row-reverse">
                <button className="text-base  ml-2  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
        hover:bg-orange-600  
        bg-orange-600 
        text-orange-100 
        border duration-200 ease-in-out 
        border-orange-600 transition" type='submit'>Next</button>
               
            </div>
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
  )
}

export default Details