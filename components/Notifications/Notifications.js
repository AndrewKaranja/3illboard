
import React,{useState,useEffect} from 'react';
import { firebaseCloudMessaging } from '../../firebase';
import PropTypes from 'prop-types'


const Notifications=(props)=>{
    const [isTokenFound,setTokenFound]=useState(false);

    console.log("Token found",isTokenFound);
    useEffect(() => {
        firebaseCloudMessaging.init();
        const setToken = async () => {
          const token = await firebaseCloudMessaging.tokenInlocalforage();
          if (token) {
            setTokenFound(true);
            console.log("Token is",token)
            // not working
          }
          return token;
        };
        const result = setToken();
        console.log("result", result);
      }, []);


   

    return <></>
    
};
// Notifications.propTypes={};
export default Notifications