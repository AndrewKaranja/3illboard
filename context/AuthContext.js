import {createContext,useContext, useEffect, useState} from 'react';
import {onAuthStateChanged, signOut} from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext= createContext({});

export const useAuth=()=>useContext(AuthContext);
export const AuthContextProvider=({children})=>{

    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        const unsubscribe= onAuthStateChanged(auth,(user)=>{
            
            if(user){
                setUser({
                    uid:user.uid,
                    email:user.email,
                    displayName:user.displayName,
                });
                
            }else{
                setUser(null);
            }
            setLoading(false);

           // console.log(user)
        })
        return ()=> unsubscribe();
    },[]);

    const logout= async () =>{
        setUser(null);
       await signOut(auth);
    }

    return (
        <AuthContext.Provider value={{user,logout}}>
            {!loading && children}
        </AuthContext.Provider>
    )
}