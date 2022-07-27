import React, {useEffect, useState,createRef} from 'react';
import Image from 'next/image';

import { Dropzone, FileItem, FullScreenPreview } from "@dropzone-ui/react";
import { useRouter } from 'next/router';

import BackgroundImg from '../../images/streetlights.png';
import {storage} from "../../firebase";
import {ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

import {v4} from 'uuid';
import LoadingScreen from '../../components/LoadingScreen';
import UploadedScreen from '../../components/UploadedScreen';


const dropzoneRef = createRef();
const openDialog = () => {
  // Note that the ref is set async,
  // so it might be null at some point 
  if (dropzoneRef.current) {
    dropzoneRef.current.open()
  }
};


  function ErrorNotification({errors}){
    return <div>
      <p className="text-red-500">{errors}</p>
    </div>
  }


function Photos() {
  const router=useRouter();
    const [files, setFiles] = useState([]);
    //const [images, setImages] = useState(null);
    const [urls,setUrls]=useState("");
    const [errors,setErrors]=useState('');
    const [imageSrc, setImageSrc] = useState(undefined);
    const [progress,setProgress]=useState(0);
    const [uploading, setUploading] = useState(false);
    const [done, setDone] = useState(false);

    useEffect(() => {
      localStorage.setItem('photosURLS', JSON.stringify(urls));
    }, [urls]);

  

    

    //Upload to firebase storage
    const uploadFiles=()=>{
      if(!files) return;
      const promises=[];
      files?.map((file)=>{

        const storageRef=ref(storage, `listings/images/${file.file.name + v4()}`);
        const uploadTask=uploadBytesResumable(storageRef,file.file);
        promises.push(uploadTask);
        uploadTask.on("state_changed",(snapshot)=>{
          const prog=Math.round(
            (snapshot.bytesTransferred/snapshot.totalBytes)* 100
          );
          setProgress(prog);
        },(err)=>console.log(err),
        async ()=>{
         await getDownloadURL(uploadTask.snapshot.ref).then((urls)=>{
            setUrls((prevState)=>[...prevState,urls]);
           
          });
        }
        );
        

      });
      Promise.all(promises)
      .then(()=>{setTimeout(() => { setUploading(false);setDone(true); }, 1000);setTimeout(() => {router.push("/listing/price");}, 4000);   })
      .catch((err)=>console.log(err));
      
      

     
    }


    //Update files state
    const updateFiles = (incommingFiles) => {
  
      setFiles(incommingFiles);
     // setImages(incommingFiles);
      
    };
    const onDelete = (id) => {
      setFiles(files.filter((x) => x.id !== id));
      //setImages(images.filter((x) => x.id !== id));
    };
    const handleSee = (imageSource) => {
      setImageSrc(imageSource);
    };

    //handle actions when next button is clicked
    const handleNextClick=()=>{
      
      
      
      
      if(Object.keys(files).length==0){
        setUploading(true);
        setTimeout(() => { setUploading(false); }, 2000);
        
        setErrors("please upload a photo of the listing")

      }else{
        setTimeout(() => { setUploading(true); }, 2000);
        setErrors("")
        
        uploadFiles();

        

       
        
        
      }
    }
    
  return (
    <div className='2xl:container h-screen m-auto'>
     
    
      <div className='fixed inset-0 w-7/12 invisible md:visible md:hidden lg:block  '>
        
        <Image src={BackgroundImg}  alt='traffic lights' objectFit='cover' layout="fill"/>
        <h1 className='absolute z-10 text-2xl justify-center top-[45%] left-[24%] text-white'>Showcase your billboard</h1>
       
        
       
      </div>
      <div role="hidden" className='fixed inset-0 w-6/12 ml-auto bg-white bg-opacity-70 backdrop-blur-xl lg:block'></div>
        <div className='relative h-full overflow-auto ml-auto lg:w-6/12'>
          {uploading ?(<LoadingScreen/>):(
            <></>
          )}
          {done ?(<UploadedScreen/>):(
            <></>
          )}

        
          <div className="m-auto px-6 mt-4 xl:w-10/12">
        
            <div className='space-y-4 mb-10'>
              <h3 className='text-3xl'>Upload photos</h3>
            </div>


            <Dropzone
        onChange={updateFiles}
        value={files}
	onClean
	accept={"image/jpeg,.ts,.png"}
	maxFileSize={2097152}
	maxFiles={5}
	label={"Drop images here or click to browse"}
	minHeight={"200px"}
	maxHeight={"500px"}
	method={"POST"}
	behaviour={"add"}
	uploadOnDrop
	color={"#fab308"}
	disableScroll
      >
        {files?.map((file) => (
          <FileItem
            {...file}
            key={file.id}
	    onDelete={onDelete}
	    onSee={handleSee}
	    alwaysActive
	    preview
	    info
	    hd
	    elevation={1}
	    resultOnTooltip
          />
        ))}
       <FullScreenPreview
          imgSource={imageSrc}
          openImage={imageSrc}
          onClose={(e) => handleSee(undefined)}
       />
      </Dropzone>
      <ErrorNotification errors={errors}/>
      <div className="flex p-2 mt-4">
            <button className="text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
        hover:bg-gray-200  
        bg-gray-100 
        text-gray-700 
        border duration-200 ease-in-out 
        border-gray-600 transition">Previous</button>
            <div onClick={handleNextClick} className="flex-auto flex flex-row-reverse">
                <button className="text-base  ml-2  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
        hover:bg-[#FAB038]  
        bg-[#FAB038] 
        text-orange-100 
        border duration-200 ease-in-out 
        border-[#FAB038] transition">Next</button>
               
            </div>
        </div>



  
   


          </div>
        </div>
      </div>
  )
}

export default Photos