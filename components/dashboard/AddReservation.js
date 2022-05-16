import React,{useState,useEffect} from 'react';
import {ErrorMessage,useField,Formik,Form,Field} from 'formik';
import * as Yup from 'yup';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { DateRange } from 'react-date-range';
import { query,collection, doc,where,getDocs, addDoc,setDoc, Timestamp } from "firebase/firestore"; 
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import {
  addDays,
  addSeconds,
  addHours
} from 'date-fns';

   function AddReservation({setShowModal,listingid,handleSelect,startDate,endDate}) {
    const {user}=useAuth();
    const validate=Yup.object({
        fname:Yup.string()
        .min(5,'Must be atleast 5 characters')
        .required('Fullname is required'),
        email:Yup.string()
        .email('Invalid email format')
        .required('email is required'),
       
        
      });
      const selectionRange={
        startDate:startDate,
        endDate:endDate,
        key:'selection',
    }

    const dates = [];


    const getReservations=async ()=>{
      
      const q = query(collection(db, `users/${user.uid}/listings/${listingid}/reservations`), where("status", "==", "booked"));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  
  // doc.data() is never undefined for query doc snapshots
  const date = new Date(doc.data().startDate.toDate().getTime());



  while (date <= doc.data().endDate.toDate()) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  // return dates;
  console.log(doc.id, " => ", doc.data());
});



    }

getReservations();

    console.log("startDate",startDate)

      const [ReservationInfo, setReservationInfo] = useState([]);
  return (
    <div className='h-screen'>
        <div className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed  inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-5 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between px-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold mb-2">
                    Add Booking
                  </h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-black opacity-7 h-6 w-6 text-xl block py-0 rounded-full">
                      x
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative px-6 flex-auto">

                  <Formik
                initialValues={{
                fname:'',
                email:'',
                 
                          }}

                          validationSchema={validate}
                          onSubmit={async (values)=>{
                            const promises=[];
                            const reservationsRef= collection(db, `listings/${listingid}/reservations`);
                            const userListingsReservationsRef  = collection(db, `users/${user.uid}/listings/${listingid}/reservations`);
                            
                           
                            setReservationInfo({
                              fname:values.fname,
                              email:values.email,
                           });

                           const docData = {
                            reservedBy:values.email,
                            startDate: Timestamp.fromDate(addHours(startDate,3)),
                            endDate: Timestamp.fromDate(addDays(addHours(endDate,3),1)),
                            status:"booked"
                            
                        };
                        
                        

                        const userDocSnap=await addDoc(userListingsReservationsRef, docData);
                        const docSnap=await addDoc(reservationsRef, docData);
                        console.log("docsnap"+docSnap)
                        promises.push(userDocSnap);
                        promises.push(docSnap);
                        Promise.all(promises)
      .then(()=>{setShowModal(false)})
      .catch((err)=>console.log(err));

                         
                           
                          }}
                          
                          >

                {formik=>(
                  <div>
                
                    
                    <Form>
                     
                        <div className=" p-1">
                        <div>
                            

                        
                            <div className="font-bold text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-2">Client First and Last Name</div>
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

                            <div className="flex flex-row font-bold text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mb-2 mt-1">Reservation Range</div>
                            <DateRange
                            ranges={[selectionRange]}
                            minDate={new Date()}
                            rangeColors={["#FAB038"]}
                            onChange={handleSelect}
                            disabledDates={dates}
                            />


                            


                           



            
            
           
            
            
        </div>
        
        <div className="flex items-center justify-end py-2 border-t border-solid border-slate-200 rounded-b">
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
                    
                  >
                    Set Reservation
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
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  )
}

export default AddReservation