import React, {useEffect, useState,createRef} from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { Dropzone, FileItem, FullScreenPreview } from "@dropzone-ui/react";

import BackgroundImg from '../../images/streetlights.png';


const dropzoneRef = createRef();
const openDialog = () => {
  // Note that the ref is set async,
  // so it might be null at some point 
  if (dropzoneRef.current) {
    dropzoneRef.current.open()
  }
};

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
  };
  
  const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
  };
  
  const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  };
  
  const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
  };


function Photos() {
    const [files, setFiles] = useState([]);
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
    
  return (
    <div className='2xl:container h-screen m-auto'>
      {/* <Head>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
      </Head> */}
      <div className='fixed inset-0 w-7/12 invisible md:visible md:hidden lg:block  '>
        
        <Image src={BackgroundImg}  alt='traffic lights' objectFit='cover' layout="fill"/>
        <h1 className='absolute z-10 text-2xl justify-center top-[45%] left-[24%] text-white'>Show your customers how the billboard looks like</h1>
       
        
        {/* <video className="w-full h-full object-cover" src="" autoPlay loop poster='../public'></video> */}
      </div>
      <div role="hidden" className='fixed inset-0 w-6/12 ml-auto bg-white bg-opacity-70 backdrop-blur-xl lg:block'></div>
        <div className='relative h-full ml-auto lg:w-6/12'>
          <div className="m-auto px-6 mt-4 xl:w-10/12">
        
            <div className='space-y-4 mb-10'>
              <h3 className='text-3xl'>Upload photos</h3>
            </div>


            <Dropzone
        onChange={updateFiles}
        value={files}
	onClean
	accept={"image/jpeg,.ts,.png, video/*"}
	maxFileSize={104857600}
	maxFiles={14}
	label={"Drop Files here or click to browse"}
	minHeight={"200px"}
	maxHeight={"500px"}
	method={"POST"}
	behaviour={"add"}
	uploadOnDrop
	color={"#fab308"}
	disableScroll
      >
        {files.map((file) => (
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
      <div className="flex p-2 mt-4">
            <button className="text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
        hover:bg-gray-200  
        bg-gray-100 
        text-gray-700 
        border duration-200 ease-in-out 
        border-gray-600 transition">Previous</button>
            <div className="flex-auto flex flex-row-reverse">
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