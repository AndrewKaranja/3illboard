import React from 'react';
import { HeartIcon} from '@heroicons/react/outline'
import { StarIcon } from '@heroicons/react/solid'
import Image from 'next/image';
import billboard from '../../images/cat.png';
import Link from 'next/link';
import * as BsIcons from 'react-icons/bs';

export default function ListingCard({img,title,location,activated,interval,price,rating,listingid,otherServices}) {
  return (
    <Link
    className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
    href={`/account/listings/${listingid}`}
   passHref
  >
    <a>

    <div className='flex mx-5 my-2 p-3 px-2  h-84 hover:border-2 hover:shadow-sm rounded-xl bg-white hover:border-[#FAB038] cursor-pointer select-none hover:opacity-80  transition duration-100 ease-out '>
    
               
            
      <div className='flex flex-[10]'>
      <div className='relative h-full w-32 flex-grow-[1] '>
            <Image src={img} layout="fill" alt='ad image' objectFit='cover' className='rounded-2xl'/>
            </div>
            <div className='flex flex-col flex-grow-[9] pl-5 h-fit'>
                <div className='flex justify-between'>
                <h4 className='text-lg text-black font-bold'>{title}</h4>
                {activated && <button className='hidden md:inline text-xs  border-2 border-green-600 bg-green-200 rounded text-black  p-2'
              >listed</button> }
              {!activated && <button className='hidden md:inline text-xs  border-2 border-red-600 bg-red-200 rounded text-black p-2'
              >Unlisted</button> }
                    
                    
                </div>
                
                <p className='text-sm text-gray-500'>{location}</p>
                <div className='border-b w10 pt-1'/>
                {/* <p className='pt-2 text-sm text-gray-500 flex-grow'>{otherServices?.map((service)=>
          
          <> {service} .</>
        )}</p> */}
    
                <div className='flex justify-between items-end pt-2'>
                <p className='flex items-center'>
                <StarIcon className='h-5 text-[#FAB038]'/>
               {rating}
                </p>
                <div>
                  <BsIcons.BsBookmarkCheckFill className='text-green-300'/>
                </div>
            </div>
            </div>

      </div>
        
       
        
      
        </div>
        </a>
        </Link>

  )
}
