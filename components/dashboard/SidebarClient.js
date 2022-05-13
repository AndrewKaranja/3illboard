import React, { useState, useEffect, useRef }  from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Logo from '../../images/Logo.png';
import OfficialLogoWhite from '../../images/3illboardLogoWhite.svg';
import OfficialLogoMiniWhite from '../../images/3illboardLogoMiniWhite.svg';
import SidebarLinkGroup from './SidebarLinkGroup';
import { useAuth } from '../../context/AuthContext';
import { useUserType } from '../../context/UserTypeContext';

function SidebarClient({ sidebarOpen,
  setSidebarOpen
}) {
 
  const {user}=useAuth();
 const {userInfo}=useUserType();
 
  
  const router = useRouter();
  // const location = useLocation();
  // const { router.pathname } = location;
  const { asPath } = useRouter();
  //const { pathname } = "/";

 const trigger = useRef(null);
  const sidebar = useRef(null);
  // const trigger = React.forwardRef(null);
  // const sidebar=React.forwardRef(null);

  // NOTE THIS IS A TEMPORARY FIX
  //!!!!!!!!!!!
  //!!!!!!!!!!
  //!!!!!!!!!
  //!!!!!!!!

  //const storedSidebarExpanded=useRef(null);
//   const ISSERVER = typeof window === "undefined";

// if(!ISSERVER) {
//  // Access localStorage
//  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
//  return storedSidebarExpanded;
// }else{
//   storedSidebarExpanded=null;
//   return storedSidebarExpanded;
// }

  //This is
  const [storedSidebarExpanded, setstoredSidebarExpanded] = useState('true');

  useEffect(() => {
    // Perform localStorage action
    const storedSidebarExpandedState = localStorage.getItem('sidebar-expanded');
    console.log(storedSidebarExpandedState);
    
    setstoredSidebarExpanded(storedSidebarExpandedState);
  
   
    
  }, [])

 
  const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true');

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector('body').classList.add('sidebar-expanded');
    } else {
      document.querySelector('body').classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);
  
  return (
    <div>
    {/* Sidebar backdrop (mobile only) */}
    <div className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} aria-hidden="true"></div>

    {/* Sidebar */}
    <div
      id="sidebar"
      ref={sidebar}
      className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-64'}`}
    >

      {/* Sidebar header */}
      <div className="flex justify-between mb-10 pr-3 sm:px-2">
        {/* Close button */}
        <button
          ref={trigger}
          className="lg:hidden text-slate-500 hover:text-slate-400"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
        >
          <span className="sr-only">Close sidebar</span>
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
          </svg>
        </button>
        {/* Logo */}
        <Link passHref href="/" className="block">
          {sidebarExpanded?<Image 
           src={OfficialLogoWhite}
           alt='Logo'
           
           width={'140px'}
           height={'50px'}
           />:
           <Image 
           src={OfficialLogoMiniWhite}
           alt='Logo'
           objectFit="fill"
           width={'140px'}
           height={'200px'}
           />}
        
        </Link>
      </div>

      {/* Links */}
      <div className="space-y-8">
        {/* Pages group */}
        <div>
          <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
            <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">•••</span>
            <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Pages</span>
          </h3>
          <ul className="mt-3">
            {/* Dashboard */}
            <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${router.pathname === '/account' && 'bg-slate-900'}`}>
              <Link passHref href="/account" className={`block text-slate-200  hover:text-white truncate transition duration-150 ${router.pathname === '/account' && 'hover:text-slate-200'}`}>
                <div className="flex items-center hover:cursor-pointer">
                  <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                    <path className={`fill-current text-slate-400 ${router.pathname === '/account' && 'text-orange-500'}`} d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z" />
                    <path className={`fill-current text-slate-600 ${router.pathname === '/account' && 'text-indigo-600'}`} d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z" />
                    <path className={`fill-current text-slate-400 ${router.pathname === '/account' && 'text-indigo-200'}`} d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z" />
                  </svg>
                  <span className="text-sm text-white font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Dashboard</span>
                </div>
              </Link>
            </li>
    
                {/* Messages */}
                <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${router.pathname.includes('messages') && 'bg-slate-900'}`}>
              <Link passHref href="/account/messages" className={`block text-slate-200 hover:text-white truncate transition duration-150 ${router.pathname.includes('messages') && 'hover:text-slate-200'}`}>
                <div className="flex items-center hover:cursor-pointer">
                  <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                    <path className={`fill-current text-slate-600 ${router.pathname.includes('messages') && 'text-indigo-500'}`} d="M14.5 7c4.695 0 8.5 3.184 8.5 7.111 0 1.597-.638 3.067-1.7 4.253V23l-4.108-2.148a10 10 0 01-2.692.37c-4.695 0-8.5-3.184-8.5-7.11C6 10.183 9.805 7 14.5 7z" />
                    <path className={`fill-current text-slate-400 ${router.pathname.includes('messages') && 'text-[#fab038]'}`} d="M11 1C5.477 1 1 4.582 1 9c0 1.797.75 3.45 2 4.785V19l4.833-2.416C8.829 16.85 9.892 17 11 17c5.523 0 10-3.582 10-8s-4.477-8-10-8z" />
                  </svg>
                  <span className="text-sm text-white font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Messages</span>
                </div>
              </Link>
            </li>
           
            
            {/* Campaigns */}
            <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${router.pathname.includes('campaigns') && 'bg-slate-900'}`}>
              <Link passHref href="/" className={`block text-slate-200 hover:text-white truncate transition duration-150 ${router.pathname.includes('campaigns') && 'hover:text-slate-200'}`}>
                <div className="flex items-center hover:cursor-pointer">
                  <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                    <path className={`fill-current text-slate-600 ${router.pathname.includes('campaigns') && 'text-indigo-500'}`} d="M20 7a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 110 1.5 1.5 1.5 0 00-1.5 1.5A.75.75 0 0120 7zM4 23a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 110 1.5 1.5 1.5 0 00-1.5 1.5A.75.75 0 014 23z" />
                    <path className={`fill-current text-slate-400 ${router.pathname.includes('campaigns') && 'text-indigo-300'}`} d="M17 23a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 010-2 4 4 0 004-4 1 1 0 012 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1zM7 13a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 110-2 4 4 0 004-4 1 1 0 112 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1z" />
                  </svg>
                  <span className="text-sm text-white font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Campaigns</span>
                </div>
              </Link>
            </li>
            
    
            {/* Settings */}
            <SidebarLinkGroup activecondition={router.pathname.includes('profile')}>
              {(handleClick, open) => {
                return (
                  <React.Fragment>
                    <a href="#0" className={`block text-slate-200 hover:text-white truncate transition duration-150 ${router.pathname.includes('profile') && 'hover:text-slate-200'}`} onClick={(e) => { e.preventDefault(); sidebarExpanded ? handleClick() : setSidebarExpanded(true) }}>
                      <div className="flex items-center justify-between hover:cursor-pointer">
                        <div className="flex items-center">
                          <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                            <path className={`fill-current text-slate-600 ${router.pathname.includes('profile') && 'text-orange-500'}`} d="M19.714 14.7l-7.007 7.007-1.414-1.414 7.007-7.007c-.195-.4-.298-.84-.3-1.286a3 3 0 113 3 2.969 2.969 0 01-1.286-.3z" />
                            <path className={`fill-current text-slate-400 ${router.pathname.includes('profile') && 'text-orange-300'}`} d="M10.714 18.3c.4-.195.84-.298 1.286-.3a3 3 0 11-3 3c.002-.446.105-.885.3-1.286l-6.007-6.007 1.414-1.414 6.007 6.007z" />
                            <path className={`fill-current text-slate-600 ${router.pathname.includes('profile') && 'text-orange-500'}`} d="M5.7 10.714c.195.4.298.84.3 1.286a3 3 0 11-3-3c.446.002.885.105 1.286.3l7.007-7.007 1.414 1.414L5.7 10.714z" />
                            <path className={`fill-current text-slate-400 ${router.pathname.includes('profile') && 'text-orange-300'}`} d="M19.707 9.292a3.012 3.012 0 00-1.415 1.415L13.286 5.7c-.4.195-.84.298-1.286.3a3 3 0 113-3 2.969 2.969 0 01-.3 1.286l5.007 5.006z" />
                          </svg>
                          <span className="text-sm text-white font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Settings</span>
                        </div>
                        {/* Icon */}
                        <div className="flex shrink-0 ml-2">
                          <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${open && 'transform rotate-180'}`} viewBox="0 0 12 12">
                            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                          </svg>
                        </div>
                      </div>
                    </a>
                    <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                      <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                        <li className="mb-1 last:mb-0">
                          <Link passHref href="/account/profile" className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate">
                            <span className="text-sm hover:cursor-pointer text-white font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">My Account</span>
                          </Link>
                        </li>
                        <li className="mb-1 last:mb-0">
                          <Link passHref href="/" className="block hover:cursor-pointer text-slate-400 hover:text-slate-200 transition duration-150 truncate">
                            <span className="text-sm text-white font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">My Notifications</span>
                          </Link>
                        </li>
                        <li className="mb-1 last:mb-0">
                          <Link passHref href="/" className="block hover:cursor-pointer text-slate-400 hover:text-slate-200 transition duration-150 truncate">
                            <span className="text-sm text-white font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Connected Apps</span>
                          </Link>
                        </li>
                        <li className="mb-1 last:mb-0">
                          <Link passHref href="/" className="block hover:cursor-pointer text-slate-400 hover:text-slate-200 transition duration-150 truncate">
                            <span className="text-sm text-white font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Plans</span>
                          </Link>
                        </li>
                        <li className="mb-1 last:mb-0">
                          <Link passHref href="/" className="block hover:cursor-pointer text-slate-400 hover:text-slate-200 transition duration-150 truncate">
                            <span className="text-sm text-white font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Billing & Invoices</span>
                          </Link>
                        </li>
                        <li className="mb-1 last:mb-0">
                          <Link passHref href="/" className="block hover:cursor-pointer text-slate-400 hover:text-slate-200 transition duration-150 truncate">
                            <span className="text-sm text-white font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Give Feedback</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </React.Fragment>
                );
              }}
            </SidebarLinkGroup>
            {/* Utility */}
            <SidebarLinkGroup activecondition={router.pathname.includes('utility')}>
              {(handleClick, open) => {
                return (
                  <React.Fragment>
                    <a href="#0" className={`block text-slate-200 hover:text-white truncate transition duration-150 ${router.pathname.includes('utility') && 'hover:text-slate-200'}`} onClick={(e) => { e.preventDefault(); sidebarExpanded ? handleClick() : setSidebarExpanded(true) }}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center hover:cursor-pointer">
                          <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                            <circle className={`fill-current text-slate-400 ${router.pathname.includes('utility') && 'text-indigo-300'}`} cx="18.5" cy="5.5" r="4.5" />
                            <circle className={`fill-current text-slate-600 ${router.pathname.includes('utility') && 'text-indigo-500'}`} cx="5.5" cy="5.5" r="4.5" />
                            <circle className={`fill-current text-slate-600 ${router.pathname.includes('utility') && 'text-indigo-500'}`} cx="18.5" cy="18.5" r="4.5" />
                            <circle className={`fill-current text-slate-400 ${router.pathname.includes('utility') && 'text-indigo-300'}`} cx="5.5" cy="18.5" r="4.5" />
                          </svg>
                          <span className="text-sm text-white font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Utility</span>
                        </div>
                        {/* Icon */}
                        <div className="flex shrink-0 ml-2">
                          <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${open && 'transform rotate-180'}`} viewBox="0 0 12 12">
                            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                          </svg>
                        </div>
                      </div>
                    </a>
                    <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                      <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                        <li className="mb-1 last:mb-0">
                          <Link passHref href="/" className="block hover:cursor-pointer text-slate-400 hover:text-slate-200 transition duration-150 truncate">
                            <span className="text-sm text-white font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Changelog</span>
                          </Link>
                        </li>
                        <li className="mb-1 last:mb-0">
                          <Link passHref href="/" className="block hover:cursor-pointer text-slate-400 hover:text-slate-200 transition duration-150 truncate">
                            <span className="text-sm text-white font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Roadmap</span>
                          </Link>
                        </li>
                        <li className="mb-1 last:mb-0">
                          <Link passHref href="/" className="block hover:cursor-pointer text-slate-400 hover:text-slate-200 transition duration-150 truncate">
                            <span className="text-sm text-white font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">FAQs</span>
                          </Link>
                        </li>
                        <li className="mb-1 last:mb-0">
                          <Link passHref href="/" className="block hover:cursor-pointer text-slate-400 hover:text-slate-200 transition duration-150 truncate">
                            <span className="text-sm text-white font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Empty State</span>
                          </Link>
                        </li>
                        <li className="mb-1 last:mb-0">
                          <Link passHref href="/" className="block hover:cursor-pointer text-slate-400 hover:text-slate-200 transition duration-150 truncate">
                            <span className="text-sm text-white font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">404</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </React.Fragment>
                );
              }}
            </SidebarLinkGroup>
          </ul>
        </div>
      </div>

      {/* Expand / collapse button */}
      <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-passHref mt-auto">
        <div className="px-3 py-2">
          <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
            <span className="sr-only">Expand / collapse sidebar</span>
            <svg className="w-6 h-6 fill-current sidebar-expanded:rotate-180" viewBox="0 0 24 24">
              <path className="text-slate-400" d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z" />
              <path className="text-slate-600" d="M3 23H1V1h2z" />
            </svg>
          </button>
        </div>
      </div>

    </div>
  </div>
  )
}

export default SidebarClient