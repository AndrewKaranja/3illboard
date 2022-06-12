import { HeartIcon} from '@heroicons/react/outline'
import { StarIcon } from '@heroicons/react/solid'
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';

function InfoCard({img,id,location,title,description,star,price,total}) {
    const router=useRouter();
    const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
    const viewListing=()=>{
        router.push(`/search/${id}`);
      }
  return (
    <div  onClick={viewListing} className='flex flex-col sm:flex-row py-7 px-2 border-b cursor-pointer select-none hover:opacity-80 hover:shadow-lg  transition duration-100 ease-out first:border-t'>
        <div className='relative h-36 w-full md:h-52 md:w-80 flex-shrink-0'>
        <Image src={img} layout="fill" alt='ad image' objectFit='cover' className='rounded-2xl'/>
        </div>
        <div className='flex flex-col flex-grow pl-5'>
            <div className='flex justify-between'>
                <p>{location}</p>
                <HeartIcon className='h-7 cursor-pointer'/>
                
            </div>
            <h4 className='text-xl'>{title}</h4>
            <div className='border-b w10 pt-2'/>
            {!isMobile && <p className='pt-2 text-sm text-gray-500 flex-grow'>{description}</p>}
            

            <div className='flex justify-between items-end pt-5'>
            <p className='flex items-center'>
            <StarIcon className='h-5 text-[#FAB038]'/>
            {/* {star} */}
            3.5
            </p>
            <div>
                <p className='text-xs font-semibold pb-2'>KES{price.price}/{price.interval}</p>
                {/* <p className='text-right font-extralight'>{total}</p> */}
            </div>
        </div>
        </div>
        

        </div>

        
  )
}

export default InfoCard