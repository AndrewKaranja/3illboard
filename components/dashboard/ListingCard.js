import React from 'react';
import { HeartIcon} from '@heroicons/react/outline'
import { StarIcon } from '@heroicons/react/solid'
import Image from 'next/image';
import billboard from '../../images/cat.png';
import Link from 'next/link';

export default function ListingCard({img,location,title,interval,price,listingid,otherServices}) {
  return (

    <div className='flex m-5 p-7 px-2  h-84 hover:border-2 hover:shadow-sm rounded-xl bg-white hover:border-[#FAB038] cursor-pointer select-none hover:opacity-80   transition duration-100 ease-out '>
     <Link
                className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                href={`/account/listing/${listingid}`}
               passHref
              >
               
            
      <div className='flex flex-[10]'>
      <div className='relative h-full w-32 flex-grow-[1] '>
            
            <Image src={billboard} layout="fill" alt='ad image' objectFit='cover' className='rounded-2xl'/>
            </div>
            <div className='flex flex-col flex-grow-[9] pl-5 h-fit'>
                <div className='flex justify-between'>
                <h4 className='text-xl text-black font-bold'>{title}</h4>
                    <button className='hidden md:inline h-8 border-2 border-red-600 bg-red-200 rounded text-black hover:bg-orange-300 p-2'
              >Unlisted</button>
                    
                </div>
                
                <p className='text-sm text-gray-500'>Near Strathmore</p>
                <div className='border-b w10 pt-2'/>
                <p className='pt-2 text-sm text-gray-500 flex-grow'>{otherServices?.map((service)=>
          
          <> {service} .</>
        )}</p>
    
                <div className='flex justify-between items-end pt-5'>
                <p className='flex items-center'>
                <StarIcon className='h-5 text-[#FAB038]'/>
               2.0
                </p>
                <div>
                    <p className='text-lg lg:text-2xl font-semibold pb-2'>{price}KES/{interval}</p>
                </div>
            </div>
            </div>

      </div>
        
       
        
      </Link>
        </div>

  )
}
