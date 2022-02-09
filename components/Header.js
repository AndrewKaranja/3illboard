import React from 'react';
import Image from 'next/image'
import Logo from '../images/titlelogo02.png'
import {SearchIcon,GlobeAltIcon,UserIcon,MenuIcon,UserCircleIcon} from '@heroicons/react/solid'

function Header() {
  return <header className='sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md py-5 px-5 md:p-5'>
      {/* left */}
      <div className='relative flex items-center h-10 cursor-pointer my-auto'>
          {/* <Image 
           src={Logo}
           alt='Logo'
           objectFit='contain'
           objectPosition='left'/> */}
           <h3 className='text-3xl'>3illboard</h3>

      </div>
      {/* middle-search */}
      <div className='flex items-center border-2 rounded-full py-2 md:shadow-sm'>
          <input className='flex-grow pl-5 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 text-ellipsis placehold' type="text" placeholder='Start your search'/>
          <SearchIcon className='hidden md:inline-flex h-8 bg-orange-300 text-white rounded-full p-2 cursor-pointer md:mx-2'/>
      </div>

      {/* right */}
      <div className='flex items-center space-x-4 justify-end text-gray-500'>
          <p className='hidden md:inline'>Add your ad space</p>
          <GlobeAltIcon className='h-6 cursor-pointer'/>
          <div className='flex items-center space-x-2 border-2 p-2 rounded-full'>
              <MenuIcon className='h-6 cursor-pointer'/>
              <UserCircleIcon className='h-6 cursor-pointer'/>
          </div>
      </div>
  </header>;
}

export default Header;

