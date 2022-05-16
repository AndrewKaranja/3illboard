import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as FcIcons from 'react-icons/fc';


export const SidebarData = [
  {
    title: 'Sign in',
    path: '/login',
    icon: <IoIcons.IoIosLogIn />,
    cName: 'navText'
  },
  {
    title: 'Host Ad',
    path: '/listing/listingtype',
    icon: <FcIcons.FcAddDatabase />,
    cName: 'navText'
  },
  {
    title: 'Messages',
    path: '/account/messages',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'navText'
  },
  {
    title: 'Support',
    path: '/account/settings/feedback',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'navText'
  }
];

export const SidebarDataLoggedIn = [
  
  {
    title: 'Host Ad',
    path: '/listing/listingtype',
    icon: <FcIcons.FcAddDatabase />,
    cName: 'navText'
  },
  {
    title: 'Dashboard',
    path: '/account',
    icon: <IoIcons.IoMdPeople />,
    cName: 'navText'
  },
  {
    title: 'Messages',
    path: '/account/messages',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'navText'
  },
  {
    title: 'Support',
    path: '/account/settings/feedback',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'navText'
  }
];