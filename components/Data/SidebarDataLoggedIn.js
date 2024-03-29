import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io';
import * as FcIcons from 'react-icons/fc';



export const SidebarDataLoggedIn = [
  
  {
    title: 'Host Ad',
    path: '/search',
    icon: <FcIcons.FcAddDatabase />,
    cName: 'navText'
  },
  {
    title: 'Team',
    path: '/team',
    icon: <IoIcons.IoMdPeople />,
    cName: 'navText'
  },
  {
    title: 'Messages',
    path: '/messages',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'navText'
  },
  {
    title: 'Support',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'navText'
  },
  {
    title: 'signout',
    path: '/signout',
    icon: <IoIcons.IoIosLogIn />,
    cName: 'navText'
  }
];