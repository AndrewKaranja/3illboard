import {createContext,useContext,useState,useEffect} from 'react';
import {useCollection} from "react-firebase-hooks/firestore";
import { collection, query, where,getDoc,doc } from "firebase/firestore";
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';

const UserTypeContext=createContext({});

export const useUserType=()=>useContext(UserTypeContext);
export const UserTypeContextProvider=({children})=>{
    const {user}=useAuth();
    const [userType,setUserType]=useState(null);
    const [userInfo,setUserInfo]=useState(null);
    const [loading,setLoading]=useState(true);

    useEffect(() => {
      if(user!=null){
      async function getUserDetail(){
          const promises=[];
          const docRef = doc(db, "users", `${user.uid}`);
          const docSnap = await getDoc(docRef);
          promises.push(docSnap);
         
          setUserInfo(docSnap?.data()); 
          Promise.all(promises)
          .then(()=>{setLoading(false);})
          .catch((err)=>console.log(err));
      
        };
        
         
        getUserDetail();
        // console.log(userInfo?.usertype);
        }
        
        
       
      }, [user]);

      

      return(
          <UserTypeContext.Provider value={{userInfo}}>
              {children}
          </UserTypeContext.Provider>
      )
}

