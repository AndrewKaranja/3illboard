import "tailwindcss/tailwind.css"
import '../styles/globals.css'
import 'mapbox-gl/dist/mapbox-gl.css';
import Router from "next/router";
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import * as firebase from 'firebase/app'
import 'firebase/messaging'
import React, { useEffect, useMemo } from 'react';


import ProgressBar from "@badrap/bar-of-progress";
import { AuthContextProvider } from "../context/AuthContext";
import { UserTypeContextProvider } from "../context/UserTypeContext";
import { useState } from "react";
import { firebaseCloudMessaging, onMessageListener } from "../firebase";
import ReactNotificationComponent from "../components/Notifications/ReactNotification";
import Notifications from "../components/Notifications/Notifications";


const progress=new ProgressBar({
  size:4,
  color:"#FAB038",
  className:"z-50",
  delay:100,
});

Router.events.on('routeChangeStart',progress.start);
Router.events.on('routeChangeComplete',progress.finish);
Router.events.on('routeChangeError',progress.finish);

function MyApp({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    firebaseCloudMessaging.init();
    const setToken = async () => {
      const token = await firebaseCloudMessaging.tokenInlocalforage();
      if (token) {
        setMounted(true);
        // not working
        console.log("token",token)
      }
    };
    const result = setToken();
    console.log("result", result);
  }, []);




 

  return(
    <AuthContextProvider>
      <UserTypeContextProvider>
      <Component {...pageProps} />
      </UserTypeContextProvider>
     </AuthContextProvider>

  )
}

export default MyApp
