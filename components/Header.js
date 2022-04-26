import React, { useState,useRef,useEffect } from 'react';
import Image from 'next/image';
import Logo from '../images/Logo.png';
import {SearchIcon,GlobeAltIcon,UserIcon,MenuIcon,UserCircleIcon} from '@heroicons/react/solid';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useRouter } from 'next/router';
import Sidebar from './Sidebar';
import * as IoIcons from 'react-icons/io';

import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';

import Link from 'next/link'
import { SidebarData,SidebarDataLoggedIn } from './Data/SidebarData';

import { IconContext } from 'react-icons';
import Transition from '../utils/Transition';
import { useAuth } from '../context/AuthContext';
import Avatar from 'react-avatar';



function Header({placeholder}) {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const [searchInput,setSearchInput]=useState("");
    const[startDate,setStartDate]=useState(new Date());
    const[endDate,setEndDate]=useState(new Date());


    //usermenu
    const{user,logout}=useAuth();
  

    const [dropdownOpen, setDropdownOpen] = useState(false);
  
    const trigger = useRef(null);
    const dropdown = useRef(null);
  
    // close on click outside
    useEffect(() => {
      const clickHandler = ({ target }) => {
        if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
        setDropdownOpen(false);
      };
      document.addEventListener('click', clickHandler);
      return () => document.removeEventListener('click', clickHandler);
    });
  
    // close if the esc key is pressed
    useEffect(() => {
      const keyHandler = ({ keyCode }) => {
        if (!dropdownOpen || keyCode !== 27) return;
        setDropdownOpen(false);
      };
      document.addEventListener('keydown', keyHandler);
      return () => document.removeEventListener('keydown', keyHandler);
    });



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
    function checkLogin(){
      if(user!==null){
        router.push({
          pathname:'/listing/listingtype'
        })
      }else{
        router.push({
          pathname:'/login',
          query:{
            hostAd:true
          }
        })
      }
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
          <button className='hidden md:inline border-2 border-[#FAB038] rounded text-black hover:bg-orange-300 p-2'
          onClick={checkLogin}>Add your ad space</button>
          
          <div className='flex items-center space-x-2 p-2'>
              
              <button
        ref={trigger}
        className="inline-flex justify-center items-center group"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        {/* <UserCircleIcon className={user?'invisible sm:visible h-6 cursor-pointer text-green-400':'invisible sm:visible h-6 cursor-pointer'}/> */}
        
        <div className="flex items-center truncate">
        <Avatar size="20" name={user?.displayName}  round={true} className={user?'visible cursor-pointer':'invisible'} />
          {/* <span className="invisible sm:visible truncate ml-2 text-sm font-medium group-hover:text-slate-800">{user?.displayName}</span> */}
          <svg className="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400" viewBox="0 0 12 12">
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </button>
              <Transition
        className={user?'origin-top-right z-10 absolute top-full right-0 w-44 px-4 bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden mt-1':'hidden'}
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200">
            <div className="font-medium text-slate-800">{user?.displayName}</div>
            <div className="text-xs text-slate-500 italic">Administrator</div>
          </div>
          <ul>
            <li>
              <Link
                className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                href="/"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Settings
              </Link>
            </li>
            <li>
              <div
                className="font-medium hover:cursor-pointer text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                
                onClick={() =>{
                  logout();
                  setDropdownOpen(!dropdownOpen);
                  

                }}
              >
                Sign Out
              </div>
            </li>
          </ul>
        </div>
      </Transition>

              <MenuIcon className='h-6 cursor-pointer text-black' onClick={showSidebar}/>
              
          </div>

        
      </div>
        {/* testing */}
        <IconContext.Provider value={{ color: '#fff' }}>
        
         <nav  className={sidebar ? 'bg-[#FAB038] w-[10rem] h-fit rounded-2xl flex justify-center m-2 absolute  z-50  transition duration-850 right-4  mt-20  ' : 'bg-[#060b26] w-64 h-[100vh] flex justify-center fixed top-0 right-[-100%] transition duration-850'}>
         <MdIcons.MdOutlineCancel className='absolute m-2 right-0 z-50 hover:scale-150' onClick={()=>setSidebar(false)}/>
          <ul className='w-[100%] mx-auto text-center my-2' onClick={showSidebar}>
            
           
          {!user && SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link href={item.path} passHref>
                      <div className='flex text-[#f5f5f5] text-lg h-[100%] w-[95%]  justify-start list-none hover:cursor-pointer   items-center rounded hover:bg-black '>
                      {item.icon}
                    <span className='ml-4'>{item.title}</span>
                    </div>
                   
                  </Link>
                </li>
              );
            })}
            {user && SidebarDataLoggedIn.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link href={item.path} passHref>
                      <div className='flex text-[#f5f5f5] text-lg h-[100%] w-[95%] mx-auto justify-start list-none  items-center rounded hover:bg-black '>
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

