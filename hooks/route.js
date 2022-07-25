import React from "react";
import Image from 'next/image';
import OfficialLogoMini from '../images/3illboardLogo.png';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';



export function withPublic(Component){
    
    return function WithPublic(props){
        const {user}=useAuth();
        const router= useRouter();
        
        if(user!==null){
            router.replace("/")
            return <div className="w-full h-full">
            <div className="absolute top-[40%] mx-auto animate-pulse text-center">
            <Image 
   src={OfficialLogoMini}
   alt='Logo'
   width={'240px'}
   height={'100px'}
   className="animate-pulse"
   objectFit="contain"
   />

            </div>
            
        
    </div>

        
        }
        return <Component user={user} {...props}/>

    }
}

export function withProtected(Component){
    
    return function WithProtected(props){
        const {user}=useAuth();
        const router= useRouter();
        
        if(user==null){
            // router.replace("/login");
            const prevPath=router.pathname;
            router.replace({
                pathname:'/login',
                query:{
                  prevPath:prevPath
                }
              })
            
            return  <div className="w-full h-full">
            <div className="absolute top-[40%] mx-auto animate-pulse text-center">
            <Image 
   src={OfficialLogoMini}
   alt='Logo'
   width={'240px'}
   height={'100px'}
   className="animate-pulse"
   objectFit="contain"
   />

            </div>
            
        
    </div>
        

        
        }
        
        return <Component user={user} {...props}/>

    }
}