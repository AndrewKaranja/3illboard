import React from 'react';
import BackgroundImg from '../../images/streetlights.png';
import img from '../../images/billboard_fl2.png';
import imgdigi from '../../images/digital_signage.png';
import imgside from '../../images/street-sideAd.png';
import imgclock from '../../images/clock.png';
import imgmoving from '../../images/movingAd.png';
import Image from 'next/image';

function listingtype() {
  return (
    <div className='2xl:container h-screen m-auto'>
      <div className='fixed inset-0 w-7/12 invisible md:visible md:hidden lg:block '>
        
        <Image src={BackgroundImg}  alt='traffic lights' objectFit='cover' layout="fill"/>
        <h1 className='absolute z-10 text-2xl justify-center top-[40%] left-[23%] text-white'>What type of ad space do you own?</h1>
      
      </div>
      <div role="hidden" className='fixed inset-0 w-6/12 ml-auto bg-white bg-opacity-70 backdrop-blur-xl lg:block'></div>
        <div className='relative h-full ml-auto lg:w-6/12'>
          <div className="m-auto py-12 px-6 sm:p-20 xl:w-10/12">
            <div className='space-y-4 mb-5'>
              
              <h3 className='text-3xl'>Select Ad type</h3>
              
              
            </div>
            
            

            
                <div className="border-t m-4 grid grid-flow-row-dense grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
                    <div className='listingType'>
                        {/* left */}
                        <div className='relative h-16 w-16 mb-2'>
                        <Image src={img} layout="fill" className='rounded-lg' alt='pic'/>
                        </div>
                        {/* right */}
                        <div>
                            <h2>Print Billboard</h2>
                        </div>
                    </div>
                    <div className='listingType'>
                        {/* left */}
                        <div className='relative h-16 w-16 mb-2'>
                        <Image src={imgdigi} layout="fill" className='rounded-lg' alt='pic'/>
                        </div>
                        {/* right */}
                        <div >
                            <h2 className='text-center'>Digital Billboard</h2>
                        </div>
                    </div>
                    <div className='listingType'>
                        {/* left */}
                        <div className='relative h-16 w-16 mb-2'>
                        <Image src={imgside} layout="fill" className='rounded-lg' alt='pic'/>
                        </div>
                        {/* right */}
                        <div>
                            <h2>Sidewalk Ad</h2>
                        </div>
                    </div>
                    <div className='listingType'>
                        {/* left */}
                        <div className='relative h-16 w-16 mb-2'>
                        <Image src={imgclock} layout="fill" className='rounded-lg' alt='pic'/>
                        </div>
                        {/* right */}
                        <div>
                            <h2>Cityclock Ad</h2>
                        </div>
                    </div>
                    <div className='listingType'>
                        {/* left */}
                        <div className='relative h-16 w-16 mb-2'>
                        <Image src={imgmoving} layout="fill" className='rounded-lg' alt='pic'/>
                        </div>
                        {/* right */}
                        <div>
                            <h2>Moving Ad</h2>
                        </div>
                    </div>
                </div>
                <div className='flex  justify-between'>
                <button className='text-sm text-gray-900 bg-gray-100 px-4 py-2 rounded-lg mt-5 active:scale-90 transition duration-150'>Back</button>
                <button className='text-sm text-white bg-gray-900 px-4 py-2 rounded-lg mt-5 active:scale-90 transition duration-150'>Next</button>
                </div>


          </div>
        </div>
      </div>

  )
}

export default listingtype