import React,{useState,useEffect} from 'react';
import {ErrorMessage,useField,Formik,Form,Field} from 'formik';
import * as Yup from 'yup';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

function ListingModal() {
    const validate=Yup.object({
        message:Yup.string()
        .min(5,'Must be atleast 5 characters')
        .max(50,'Must be 50 characters or less')
        .required('Message is required'),
        fname:Yup.string()
        .min(10,'Must be atleast 10 characters')
        .required('Fullname is required'),
        email:Yup.string()
        .min(10,'Must be atleast 10 characters')
        .required('Location description is required'),
       
        
      });

      const [MessageInfo, setMessageInfo] = useState([]);
  return (
    <div className='h-screen'>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Ready to Book?
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                  Enter your contact details, and we will let the ad manager know you
                   want to submit an application. If they are interested, they will contact you with next steps.
                    
                  </p>



                  <Formik
                initialValues={{
                message:'',
                fname:'',
                email:'',
                phone:'',
                
                          }}

                          validationSchema={validate}
                          onSubmit={async (values)=>{
                           
                            setMessageInfo({
                              fname:values.fname,
                              message:values.message,
                              email:values.email,
                              phone:values.phone,
                           });
                           
                           //console.log(listingInfo);
                           setShowModal(false)
                        //    router.push("/account/messages");
                           
                          }}
                          
                          >

                {formik=>(
                  <div>
                
                    
                    <Form>
                     
                        <div className=" p-1">
                        <div>
                            

                            <div className="flex flex-row font-bold text-gray-600 text-xs leading-8 uppercase h-6 mx-2 ">Message<p className='text-[0.5rem] lowercase'>(Ask questions)</p></div>
                            <div className="w-full flex-1 mx-2">
                              <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                              <textarea
                              name="message"
                              id="message"   
                              placeholder="You may enter some of your specification"
                              className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                              onChange={formik.handleChange}
                              value={formik.values.message}
                              rows={5}
                              cols={5}
                              />
                               
                                
                                 </div>
                                 <ErrorMessage component="div" name="message" className="text-red-600"/>
                            </div>

                            <div className="font-bold text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-3">First and Last Name</div>
                            <div className="w-full flex-1 mx-2">
                              <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                                <Field id='fname' name="fname" placeholder="Your names" className="p-1 px-2 appearance-none outline-none w-full text-gray-800"/>
                            
                                
                                 </div>
                                 <ErrorMessage component="div"  name="fname" className="text-red-600"/>
                            </div>


                            <div className="flex flex-row font-bold text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-3">Email</div>
                            <div className="w-full flex-1 mx-2">
                              <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                              <Field name="email"  placeholder="eg. places of interest around billboard" type="text" className="p-1 px-2 appearance-none outline-none w-full text-gray-800"/>
                                
                                 </div>
                                 <ErrorMessage component="div" name="email" className="text-red-600"/>
                            </div>


                            <div className="flex flex-row font-bold text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-3">Phone</div>
                            <div className="w-full flex-1 mx-2">
                              <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                              <PhoneInput
                            inputProps={{
                                name: 'phone',
                                required: true,
                                autoFocus: true
                              }}
                            country={'ke'}
                            value={formik.values.phone}
                            onChange={formik.handleChange}/>
                                
                                 </div>
                                 <ErrorMessage component="div" name="phone" className="text-red-600"/>
                            </div>


                            


                           



            
            
           
            
            
        </div>
        
        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                    onClick={() => setShowModal(false)}
                  >
                    Send Request
                  </button>
                </div>
    
</div>
                                </Form>
                                </div>
                          )}
                      </Formik>











                  <p className="my-4 text-slate-500 text-sm leading-relaxed">

                 
                  You agree to 3illboard Terms of Use and Privacy Policy. 
                  By choosing to contact an adlister, you also agree that 3illboard,
                   ad owners, and ad managers may call or text you about any inquiries
                    you submit through our services, which may involve use of automated means
                     and prerecorded/artificial voices.  Message/data rates may apply.
                      </p>


                </div>
                
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  )
}

export default ListingModal