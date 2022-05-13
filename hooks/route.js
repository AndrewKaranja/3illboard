import React from "react";
import Image from 'next/image';
import OfficialLogoMini from '../images/3illboardLogoMini.svg';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';



export function withPublic(Component){
    
    return function WithPublic(props){
        const {user}=useAuth();
        const router= useRouter();
        
        if(user!==null){
            router.replace("/")
            return <div className="relative w-screen h-screen ">
            <div className="absolute top-[50%] left-[50%]">
            <Image 
   src={OfficialLogoMini}
   alt='Logo'
   width={'140px'}
   height={'200px'}
   
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
            
            return  <div className="relative w-screen h-screen ">
                <div className="absolute top-[50%] left-[50%]">
                <Image 
       src={OfficialLogoMini}
       alt='Logo'
       width={'140px'}
       height={'200px'}
       
       />

                </div>
            
        </div>
        

        
        }
        
        return <Component user={user} {...props}/>

    }
}