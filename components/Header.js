import React, { useState,useRef,useEffect } from 'react';
import Image from 'next/image';
import Logo from '../images/Logo.png';
import {SearchIcon,GlobeAltIcon,UserIcon,MenuIcon,UserCircleIcon} from '@heroicons/react/solid';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useRouter } from 'next/router';
import Sidebar from './Sidebar';

import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';

import Link from 'next/link'
import { SidebarData } from './Data/SidebarData';

import { IconContext } from 'react-icons';



function Header({placeholder}) {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const [searchInput,setSearchInput]=useState("");
    const[startDate,setStartDate]=useState(new Date());
    const[endDate,setEndDate]=useState(new Date());

    const wrapperRef=useRef(null);
    useOutsideNavAlerter(wrapperRef);
    
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

    function useOutsideNavAlerter(ref){
      useEffect(() => {
        function handleClickOutside(event){
          if (ref.current && !ref.current.contains(event.target)) {
            setSidebar(false)
          }
        }
        document.addEventListener("mousedown",handleClickOutside);
      
        return () => {
          document.removeEventListener("mousedown",handleClickOutside)
        }
      }, [ref]);
      
    }

  return <header ref={wrapperRef} className='sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md py-5 px-5 md:p-5'>
      {/* left */}
      <div 
      onClick={()=> router.push("/")}
      className='relative flex items-center h-10 cursor-pointer my-auto'>
          <Image 
           src={Logo}
           alt='Logo'
           
           width={'140rem'}
           height={'36rem'}
           />
           {/* <h3 className='text-3xl'>3illboard</h3> */}
           

      </div>
      {/* middle-search */}
      <div className='flex items-center md:border-2 rounded-full py-2 md:shadow-sm hover:border-2'>
          <input 
          value={searchInput}
          onChange={(e)=>setSearchInput(e.target.value)}
          onClick={()=>setSidebar(false)}
          className='flex-grow pl-5 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 text-ellipsis' 
          type="text" 
          placeholder={placeholder || 'Start your search'}/>

          <SearchIcon className='hidden md:inline-flex h-8 bg-orange-300 text-white rounded-full p-2 cursor-pointer md:mx-2'/>
      </div>

      {/* right */}
      <div className='flex items-center space-x-4 justify-end text-gray-500'>
          <p className='hidden md:inline'>Add your ad space</p>
          <GlobeAltIcon className='invisible sm:visible h-6 cursor-pointer'/>
          <div className='flex items-center space-x-2 p-2'>
              <UserCircleIcon className='invisible sm:visible h-6 cursor-pointer'/>
              <MenuIcon className='h-6 cursor-pointer text-black' onClick={showSidebar}/>
              
          </div>

        
      </div>
        {/* testing */}
        <IconContext.Provider value={{ color: '#fff' }}>
        
         <nav  className={sidebar ? 'bg-[#FAB038] w-[10rem] h-[20rem] rounded-2xl flex justify-center m-2 absolute  z-50  transition duration-850 right-4  mt-20  ' : 'bg-[#060b26] w-64 h-[100vh] flex justify-center fixed top-0 right-[-100%] transition duration-850'}>
         <MdIcons.MdOutlineCancel className='absolute m-2 right-0 z-50 hover:scale-150' onClick={()=>setSidebar(false)}/>
          <ul className='w-[100%]' onClick={showSidebar}>
           
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link href={item.path} passHref>
                      <div className='flex text-[#f5f5f5] select-none text-sm h-[85%] w-[85%] p-3 justify-start list-none items-center rounded hover:bg-black cursor-pointer'>
                      {item.icon}
                    <span className='ml-4'>{item.title}</span>
                    </div>
                   
                  </Link>
                </li>
              );
            })}
          </ul>
         </nav>
        </IconContext.Provider>

      {searchInput && (
          <div className='flex flex-col max-w-full col-span-3 mx-auto'>
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

