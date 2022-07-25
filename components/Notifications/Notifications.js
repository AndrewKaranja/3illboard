
import React,{useState,useEffect} from 'react';
import { firebaseCloudMessaging } from '../../firebase';


const Notifications=(props)=>{
    const [isTokenFound,setTokenFound]=useState(false);

    useEffect(() => {
        firebaseCloudMessaging.init();
        const setToken = async () => {
          const token = await firebaseCloudMessaging.tokenInlocalforage();
          if (token) {
            setTokenFound(true);
            // not working
          }
          return token;
        };
        const result = setToken();
      }, []);


   

    return <></>
    
};

export default Notifications