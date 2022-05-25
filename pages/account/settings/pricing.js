import React, { useState } from 'react';
import Sidebar from '../../../components/dashboard/Sidebar';
import SidebarClient from '../../../components/dashboard/SidebarClient';
import Header from '../../../components/dashboard/Header';
import Image from 'next/image';
import Plan from '../../../components/Plan';
import billboard from '../../../images/cat.png';
import imgprint from '../../../images/billboard_fl2.png';
import imgdigi from '../../../images/digital_signage.png';
import imgside from '../../../images/street-sideAd.png';
import imgclock from '../../../images/clock.png';
import imgmoving from '../../../images/movingAd.png';

import { useAuth } from '../../../context/AuthContext';
import {useUserType} from '../../../context/UserTypeContext';


function Pricing() {
  const {user}=useAuth();
    const {userInfo}=useUserType();
    const [sidebarOpen, setSidebarOpen] = useState(false);
const basic=["Client Chat Features","Listing analytics","Calender Scheduling","Booking"]
const enterprise=["Chat Features","Listing analytics","Listing Support","Calender Scheduling","Custom configuration"]
  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      {userInfo?.usertype==="client" && <SidebarClient sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> }
{userInfo?.usertype==="lister" && <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> }

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-[#fab038]">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        

        <main>
         <div className='flex flex-col mx-auto items-center m-3'>
<h4 className='text-2xl lg:text-2xl font-bold text-white'>Pricing Plans</h4>
<p className=''>Choose a plan that works best for you and your team</p>
<div>
</div>
                
                
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
        <Plan
        planName="Print Billboard"
        price="KES 5000"
        img={imgprint}
        features={basic}
        />
        <Plan
        planName="Digital Billboard"
        price="KES 6000"
        img={imgdigi}
        features={basic}/>
        <Plan
        planName="SideWalk Ad"
        price="KES 1000"
        img={imgside}
        features={basic}/>
        <Plan
        planName="CityClock Ad"
        price="KES 2000"
        img={imgclock}
        features={basic}/>
        <Plan
        planName="Moving Ad"
        price="KES 2000"
        img={imgmoving}
        features={basic}/>

        {/* Custom Quote */}
       <div className='p-5 h-fit text-black font-semibold bg-white rounded-xl m-5 hover:bg-black hover:text-white cursor-pointer '>
            <div className='flex '>
              
              <div className='flex ml-2  flex-col'>
                <p className='text-xl font-semibold justify-center '>Enterprise(Custom Price)</p>
                <div className='flex text-xs font-normal  items-center'>
                    <p>Ideal for all Ad companies with 20+ listing ready to increase revenue and improve operations with the full 3illboard platform.</p>
                

                </div>
              

              </div>
              
              
             
              </div>

              <div className='border-b pt-2 border-slate-200'/>
              <ul className='my-4'>
              {enterprise?.map((feature)=>
              <li className='text-gray-400 font-normal' key={feature}>✅ {feature}</li>
              )}

              </ul>
          <button className=' border-2 border-orange-200 bg-blue-500 w-full  text-white font-semibold hover:bg-orange-300 p-2  rounded-xl'
            >Get Quote</button>

            </div>
            </div>
            </main>
            </div>
        
    </div>
  )
}

export default Pricing;