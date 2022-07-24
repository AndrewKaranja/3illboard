import Image from 'next/image'
import Link from 'next/link'
function SmallCard({img,location,ads}) {
  return <Link href='/search' passHref><div className='flex items-center m-2 mt-5 space-x-4 rounded-xl cursor-pointer hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out select-none'>
    
                
              
      {/* left */}
      <div className='relative h-16 w-16'>
          <Image src={img} layout="fill" className='rounded-lg' alt='pic'/>
      </div>
      {/* right */}
      
      <div>
          <h2 className="font-semibold">{location}</h2>
          <h3 className='text-gray-500'>{ads}</h3>
      </div>
      
  </div></Link>;
}

export default SmallCard;
