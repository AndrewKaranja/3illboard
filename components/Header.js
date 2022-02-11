import React, { useState } from 'react';
import Image from 'next/image';
import Logo from '../images/titlelogo02.png';
import {SearchIcon,GlobeAltIcon,UserIcon,MenuIcon,UserCircleIcon} from '@heroicons/react/solid';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useRouter } from 'next/router';

function Header({placeholder}) {
    const [searchInput,setSearchInput]=useState("");
    const[startDate,setStartDate]=useState(new Date());
    const[endDate,setEndDate]=useState(new Date());
    const router=useRouter();
    const selectionRange={
        startDate:startDate,
        endDate:endDate,
        key:'selection',
    }

    const handleSelect=(ranges)=>{
        setStartDate(ranges.selection.startDate)
        setEndDate(ranges.selection.endDate)
    }

    const resetInput=()=>{
        setSearchInput("");
    }

    const search=()=>{
        router.push({
            pathname:'/search',
            query:{
                location:searchInput,
                startDate:startDate.toISOString(),
                endDate:endDate.toISOString(),

            }
        });
    }



  return <header className='sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md py-5 px-5 md:p-5'>
      {/* left */}
      <div
      onClick={()=> router.push("/")}
      className='relative flex items-center h-10 cursor-pointer my-auto'>
          {/* <Image 
           src={Logo}
           alt='Logo'
           objectFit='contain'
           objectPosition='left'/> */}
           <h3 className='text-3xl'>3illboard</h3>

      </div>
      {/* middle-search */}
      <div className='flex items-center md:border-2 rounded-full py-2 md:shadow-sm hover:border-2'>
          <input 
          value={searchInput}
          onChange={(e)=>setSearchInput(e.target.value)}
          className='flex-grow pl-5 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 text-ellipsis' 
          type="text" 
          placeholder={placeholder || 'Start your search'}/>

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

      {searchInput && (
          <div className='flex flex-col col-span-3 mx-auto'>
              <DateRangePicker 
              ranges={[selectionRange]}
              minDate={new Date()}
              rangeColors={["#FAB038"]}
              onChange={handleSelect}/>

              <div className='flex'>
                  <button onClick={resetInput} className='flex-grow text-gray-500'>Cancel</button>
                  <button 
                  onClick={search}
                  className='flex-grow text-[#FAB038]'> Search</button>
                </div>
          </div>
      )}
  </header>;
}

export default Header;

