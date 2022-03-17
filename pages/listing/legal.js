import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import BackgroundImg from '../../images/streetlights.png';
import {ErrorMessage,useField,Formik,Form,Field} from 'formik';
import * as Yup from 'yup';
import { Dropzone, FileItem, FullScreenPreview } from "@dropzone-ui/react";
import {storage} from "../../firebase";
import { getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { useAuth } from '../../context/AuthContext';


function ErrorNotification({errors}){
  return <div>
    <p className="text-red-500">{errors}</p>
  </div>
}

function Legal() {
const {user}=useAuth()
const router=useRouter();
    const [files, setFiles] = useState([]);
    const [errors,setErrors]=useState('');
    const [imageSrc, setImageSrc] = useState(undefined);
    const updateFiles = (incommingFiles) => {
      console.log("incomming files", incommingFiles);
      setFiles(incommingFiles);
    };
    const onDelete = (id) => {
      setFiles(files.filter((x) => x.id !== id));
    };
    const handleSee = (imageSource) => {
      setImageSrc(imageSource);
    };
    const handleNextClick=()=>{
      console.log(files);
      if(Object.keys(files).length==0){
        setErrors("please upload atleast one document")

      }else{
        setErrors("")
        uploadFiles(files);

        router.push("/listing/preview")
        
        
      }
    }



const [progress,setProgress]=useState(0);
// const formHandler=(e)=>{
//   const file=e.target[0].files[0];
//   console.log(file);
//   uploadFiles(file);
// }

const uploadFiles=(file)=>{
  if(!file) return;
  const storageRef=ref(storage, `/files/${user.uid}/legal/${file.name}`)
  const uploadTask=uploadBytesResumable(storageRef,file);
  uploadTask.on("state_changed",(snapshot)=>{
    const prog=Math.round(
      (snapshot.bytesTransferred/snapshot.totalBytes)* 100
    );
    setProgress(prog);
  },(err)=>console.log(err),
  ()=>{
    getDownloadURL(uploadTask.snapshot.ref)
    .then((url)=>console.log(url))
  }
  );
}


  return (
    <div className='2xl:container h-screen m-auto'>
      {/* <Head>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
      </Head> */}
      <div className='fixed inset-0 w-7/12 invisible md:visible md:hidden lg:block  '>
        
        <Image src={BackgroundImg}  alt='traffic lights' objectFit='cover' layout="fill"/>
        <h1 className='absolute z-10 text-2xl justify-center top-[45%] left-[24%] text-white'>Finally!! Is This Legit Business</h1>
       
        
        {/* <video className="w-full h-full object-cover" src="" autoPlay loop poster='../public'></video> */}
      </div>
      <div role="hidden" className='fixed inset-0 w-6/12 ml-auto bg-white bg-opacity-70 backdrop-blur-xl lg:block'></div>
        <div className='relative h-full ml-auto lg:w-6/12'>
          <div className="m-auto px-6 mt-4 xl:w-10/12">
        
            <div className='space-y-4'>
              <h3 className='text-3xl'>Upload the required docs</h3>
            </div>

            <div>
              <div className="text-orange-400">Please upload atleast two of this documents to speed up verification and listing.<p className="text-gray-900 text-lg">(Certificate of occupancy,Business license,Tax certificate,Business insurance or A service contract)</p></div>
            <Dropzone
        onChange={updateFiles}
        value={files}
	onClean
	accept={"image/jpeg,.png,.pdf"}
	maxFileSize={5242880}
	maxFiles={5}
	label={"Drop Files here or click to browse"}
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
            <div className="flex-auto flex flex-row-reverse">
                <button onClick={handleNextClick}  className="text-base  ml-2  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
        hover:bg-[#FAB038]  
        bg-[#FAB038] 
        text-orange-100 
        border duration-200 ease-in-out 
        border-[#FAB038] transition">Review Listing</button>
               
            </div>
        </div>
   

                                </div>
            
            

            
               


          </div>
        </div>
      </div>
  )
}

export default Legal