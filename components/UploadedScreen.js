import React from 'react'
import Image from 'next/image';
import UploadedGif from '../images/uploaded.gif'

function UploadedScreen() {
  return (
    <div className='absolute z-50 overflow-hidden flex bg-white w-full h-full items-center justify-center'>
        <Image src={UploadedGif} alt='ad image' width={300} height={300}  objectFit="fit" className='' />
    </div>
  )
}

export default UploadedScreen