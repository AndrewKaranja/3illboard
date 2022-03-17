import React from 'react';
import Image from 'next/image';
import BackgroundImg from '../../images/streetlights.png';
import { HeartIcon} from '@heroicons/react/outline'
import { StarIcon } from '@heroicons/react/solid'
import CatImg from '../../images/cat.png'

function Preview() {
  return (
    <div className='2xl:container h-screen m-auto'>
      {/* <Head>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
      </Head> */}
      <div className='fixed inset-0 w-7/12 invisible md:visible md:hidden lg:block  '>
        
        <Image src={BackgroundImg}  alt='traffic lights' objectFit='cover' layout="fill"/>
        <h1 className='absolute z-10 text-2xl justify-center top-[45%] left-[24%] text-white'>TaaDaaah!</h1>
       
        
        {/* <video className="w-full h-full object-cover" src="" autoPlay loop poster='../public'></video> */}
      </div>
      <div role="hidden" className='fixed inset-0 w-6/12 ml-auto bg-white bg-opacity-70 backdrop-blur-xl lg:block'></div>
        <div className='relative h-full ml-auto lg:w-6/12'>
          <div className=" flex flex-col px-6 mt-4 w-full justify-items-center">

          <div className='space-y-4 mb-10 mt-4 '>
              <h3 className='text-3xl'>Here is how your listing looks like on 3illboard</h3>
            </div>

        
            

            <div className='items-center sm:h-1/3 w-2/3 justify-self-center  border-[#FAB038]  p-6 border-2 rounded-lg cursor-pointer select-none hover:opacity-80 hover:shadow-lg  transition duration-100 ease-out '>
        <div className='relative  h-52 w-full  flex-shrink-0'>
        <Image src={CatImg} layout="fill" alt='ad image' objectFit='cover' className='rounded-2xl'/>
        </div>
        <div className='flex flex-col flex-grow pl-5 mt-6 sm:mt-0'>
            <div className='flex justify-between'>
                <p>Madaraka Estate</p>
                <HeartIcon className='h-7 cursor-pointer'/>
                
            </div>
            <h4 className='text-xl'>Iconic billboard</h4>
            <div className='border-b w10 pt-2'/>
            <p className='pt-2 text-sm text-gray-500 flex-grow'>design .Mounting .assignment</p>

            <div className='flex justify-between items-end pt-5'>
            <p className='flex items-center'>
            <StarIcon className='h-5 text-[#FAB038]'/>
            0.0
            </p>
            <div>
                <p className='text-lg lg:text-2xl font-semibold pb-2'>20000</p>
                <p className='text-right font-extralight'>2000KES</p>
            </div>
        </div>
        </div>
        

        </div>

           
            

            
               


          </div>
        </div>
      </div>
  )
}

export default Preview