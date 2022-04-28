
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import billboard from '../images/cat.png';
import miniLogo from '../images/3illboardLogoMini.svg'



function Plan({price,planName,img,features}) {
  return (
        <div className='p-5 h-fit text-black font-semibold bg-white rounded-xl m-5 hover:bg-black hover:text-white cursor-pointer hover:scale-105 transition transform duration-200 ease-out select-none '>
            <div className='flex '>
              <Image src={img} alt='ad image' width={50} height={50} objectFit="fill" className='rounded-xl bg-white'/>
              <div className='flex ml-2  flex-col'>
                <p className='text-xl font-semibold justify-center '>{planName}</p>
                <div className='flex flex-row items-center'>
                  <p className='text-2xl font-bold '>{price}</p>
                <p className='text-xs font-normal text-gray-600 '>/month</p>

                </div>
              

              </div>
              
              
             
              </div>

              <ul className='my-4'>
              {features?.map((feature)=>
              <li className='text-gray-400 font-normal' key={feature}>✅ {feature}</li>
              )}

              </ul>
              
              

  
          <button className=' border-2 border-orange-200 bg-blue-500 w-full  text-white font-semibold hover:bg-orange-300 p-2  rounded-xl '
            >Create Listing</button>

            </div>
            
    
  )
}

export default Plan