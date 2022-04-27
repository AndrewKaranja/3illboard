import Image from 'next/image';
import Traffic from '../images/traffic.png'

function LargeCard({title,description,buttonText}) {
  return (
    <section className='relative py-16 cursor-pointer select-none'>
        <div className='relative h-96 min-w-[300px]'>
            <Image src={Traffic} layout="fill" objectFit='cover' alt='Large Card Image' className='rounded-2xl'/>
        </div>

        <div className='absolute top-32 left-12'>
            <h3 className='text-4xl mb-3 w-64 text-[#FAB038]'>{title}</h3>
            <p className='text-white'>{description}</p>

            <button className='text-sm text-white bg-gray-900 px-4 py-2 rounded-lg mt-5 active:scale-90 transition duration-150'>{buttonText}</button>
        </div>
    </section>
  )
}

export default LargeCard