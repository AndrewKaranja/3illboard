import Image from 'next/image'
import Link from 'next/link'
function MediumCard({img,title}) {
  return (
    <Link href='/search' passHref><div className='cursor-pointer py-10 px-3 select-none hover:scale-105 transform transition duration-300 ease-out'>
        <div className='relative h-44 w-44'>
            <Image src={img} layout="fill" alt='medium image' className='rounded-xl '/>
        </div>
        <h3 className='block text-2xl mt-3 mx-auto text-center font-semibold'>{title}</h3>  
    </div></Link>
        
  )
}

export default MediumCard