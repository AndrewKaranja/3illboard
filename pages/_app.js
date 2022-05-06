import "tailwindcss/tailwind.css"
import '../styles/globals.css'
import 'mapbox-gl/dist/mapbox-gl.css';
import Router from "next/router";
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";

import ProgressBar from "@badrap/bar-of-progress";
import { AuthContextProvider } from "../context/AuthContext";
import { UserTypeContextProvider } from "../context/UserTypeContext";

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
  return(
    <AuthContextProvider>
      <UserTypeContextProvider>
      <Component {...pageProps} />
      </UserTypeContextProvider>
     </AuthContextProvider>

  )
}

export default MyApp
