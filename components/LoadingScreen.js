import React from 'react'
import Image from 'next/image';
import LoadingGif from '../images/loading1.gif'

function LoadingScreen() {
  return (
    <div className='flex bg-white w-full h-full items-center justify-center'>
        <Image src={LoadingGif} alt='ad image' width={300} height={300}  objectFit="fit" className=''/>
    </div>
  )
}

export default LoadingScreen