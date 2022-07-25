import React from 'react';
import Image from 'next/image'
import BannerImage from '../images/streetbanner.png';
import Link from 'next/link'

function Banner() {
  return <div className='relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px] select-none ' >
      <Image src={BannerImage}
             alt="banner"
             priority="true"
             layout='fill'
             objectFit='cover'/>
             <div className='absolute top-1/2 w-full text-center'>
                 <p className='text-sm sm:text-lg text-white'>Not sure where to advertise? Perfect. We bring the 3*ll😉 in advertisment</p>
                <Link href='/search' passHref>
                 <button className='text-white bg-[#FAB038] px-5 py-2 shadow-md rounded-full font-bold my-3 hover:shadow-xl active:scale-90 transition duration-150'>Discover</button>
                </Link>
             </div>

             
    
  </div>;
}

export default Banner;
