import React,{useState,useEffect} from 'react';
import Image from 'next/image';
import BackgroundImg from '../../images/streetlights.png';
import {ErrorMessage,useField,Formik,Form,Field} from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';

function Price() {
  const router=useRouter();
  const [listingPrice, setlistingPrice] = useState([]);

  useEffect(() => {
    localStorage.setItem('listingPrice', JSON.stringify(listingPrice));
  }, [listingPrice]);

   

    const validate=Yup.object({
        price:Yup.number()
        .min(4,'Must be atleast KES.999')
        .required('Price is required'),
        minimum:Yup.number()
        .max(90,'Must be less than 90 days')
        .required('Value is required'),
        
      });

  return (
    <div className='2xl:container h-screen m-auto'>
    
      <div className='fixed inset-0 w-7/12 invisible md:visible md:hidden lg:block  '>
        
        <Image src={BackgroundImg}  alt='traffic lights' objectFit='cover' layout="fill"/>
        <h1 className='absolute z-10 text-2xl justify-center top-[45%] left-[24%] text-white'>Time to set your price</h1>
       
        
       
      </div>
      <div role="hidden" className='fixed inset-0 w-6/12 ml-auto bg-white bg-opacity-70 backdrop-blur-xl lg:block'></div>
        <div className='relative h-full ml-auto lg:w-6/12'>
          <div className="m-auto px-6 mt-4 xl:w-10/12">
        
            <div className='space-y-4'>
              <h3 className='text-3xl'>Set your Price</h3>
            </div>

            <Formik
                initialValues={{
                price:'',
                minimum:'1',
                interval:'monthly',
                hidePrice:false,
                          }}
                          validationSchema={validate}
                          onSubmit={values=>{
                            
                             
                                setlistingPrice({
                                  price:values.price,
                                  interval:values.interval,
                                  minimumBookingPeriod:values.minimum,
                                  hidePrice:values.hidePrice,
                                });
                                router.push("/listing/legal")
                                
                             
                          }}
                          >

                {formik=>(
                    <Form>
                     <div className="p-5">
                        <div className=" p-4">
                        <div>
                         
                            
                        
            
                            <div className="font-bold text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-3">Price in KSH</div>
                            <div className="w-full flex-1 mx-2">
                              <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                                <Field id="price" name="price" type="number" placeholder="KES" className="p-1 px-2 appearance-none outline-none w-full text-gray-800"/>
                                <ErrorMessage component="div"  name="price" className="text-red-600"/> </div>
                            </div>
                            <div className="w-18">
                    <Field as="select" name="interval" className="form-select ml-2 text-center appearance-none block w-full  py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out mt-2
                    focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none" aria-label="Default select example">
                        <option  value="monthly">monthly</option>
                        <option value="weekly">Weekly</option>
                        <option value="daily">Daily</option>
                        </Field>
                </div>

                <div className="font-bold text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-3">Minimum Listing period in days</div>
                            <div className="w-full flex-1 mx-2">
                              <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                                <Field id="minimum" name="minimum" type="number" placeholder="in days" className="p-1 px-2 appearance-none outline-none w-full text-gray-800"/>
                                <ErrorMessage component="div"  name="minimum" className="text-red-600"/> </div>
                            </div>


                <div className='flex flex-row mt-4 ml-2 items-center'>
              <Field type="checkbox" name="hidePrice" className="m-2"/>
              <p>Hide Price from search page</p>
              
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
                <button type="submit" className="text-base  ml-2  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
        hover:bg-[#FAB038]  
        bg-[#FAB038] 
        text-orange-100 
        border duration-200 ease-in-out 
        border-[#FAB038] transition">Next</button>
               
            </div>
        </div>
    </div>
</div>
                                </Form>
                          )}
                      </Formik>
            
            

            
               


          </div>
        </div>
      </div>
  )
}

export default Price