import React from "react";
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';



export function withPublic(Component){
    
    return function WithPublic(props){
        const {user}=useAuth();
        const router= useRouter();
        
        if(user!==null){
            router.replace("/")
            return <h1>Loading...</h1>

        
        }
        return <Component user={user} {...props}/>

    }
}

export function withProtected(Component){
    
    return function WithProtected(props){
        const {user}=useAuth();
        const router= useRouter();
        
        if(user==null){
            router.replace("/login")
            return <h1>Loading...</h1>

        
        }
        return <Component user={user} {...props}/>

    }
}