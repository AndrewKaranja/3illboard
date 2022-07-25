import React,{useState} from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import Link from 'next/link'
import { SidebarData} from './Data/SidebarData';
import {SidebarDataLoggedIn } from './Data/SidebarDataLoggedIn';

import { IconContext } from 'react-icons';
import { useAuth } from '../context/AuthContext';



function Sidebar() {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const {user}=useAuth();
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='flex bg-[#060b26] h-20 justify-start items-center'>
          <div className='ml-8 text-2xl bg-none '>
            <FaIcons.FaBars onClick={showSidebar} className='hover:cursor-pointer' />
          </div>
        </div>
        <nav className={sidebar ? 'bg-black w-64 h-[70vh] rounded-2xl flex justify-center m-2 fixed  z-50  transition duration-850 active:left-0 active:transition active:duration-350' : 'bg-[#060b26] w-64 h-[100vh] flex justify-center fixed top-0 left-[-100%] transition duration-850'}>
          <ul className='w-[100%]' >
            <li className='bg-black w-[100%] h-20 flex justify-start items-center'>
              <Link href='#' className='bg-none text-3xl ml-8' passHref>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {user && SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link href={item.path} passHref>
                      <div className='flex text-[#f5f5f5] text-lg h-[100%] w-[95%] pl-8 justify-start list-none  items-center rounded hover:bg-[#FAB038] '>
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
                      <div className='flex text-[#f5f5f5] text-lg h-[100%] w-[95%] pl-8 justify-start list-none  items-center rounded hover:bg-[#FAB038] '>
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
    </>
  )
}

export default Sidebar