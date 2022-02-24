import React,{useCallback, useState,useRef} from 'react';
import BackgroundImg from '../../images/streetlights.png';
import Image from 'next/image';

import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import mapStyles from '../../mapStyles';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

import "@reach/combobox/styles.css";

const containerStyle = {
    width: '30rem',
    height: '30rem'
  };

  const options = {
    styles:mapStyles,
    disableDefaultUI:true,
    zoomControl:true,
  }
  
  const center = {
    lat: -1.292066,
    lng: 36.821945
  };

  const libraries=["places"];


  function PlaceMarkerText(){
    return <div>
      <p className=' text-black text-lg bg-[#FAB308] w-[30rem]'>Please click on map to place marker on the Location of your ad space</p>
    </div>
  }

function Location() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: `${process.env.GOOGLEMAPS_API_KEY}`,
    libraries
  });

 
  const onLoad = useCallback(
      function onLoad (mapInstance) {
        // do something with map Instance
  });

  const onMapClick= useCallback((event)=>{
    setMarkers((current)=>[{
      lat:event.latLng.lat(),
      lng:event.latLng.lng(),
      time:new Date(),
    },]);
  });

  const mapRef = useRef();
  const onMapLoad=useCallback((map)=>{
    mapRef.current=map;

  },[]);

  const panTo=useCallback(({lat,lng})=>{
    mapRef.current.panTo({lat,lng});
    mapRef.current.setZoom(16);
    
  },[])

  const [markers, setMarkers] = useState([]);

  

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }
  if(!isLoaded){
    return <div>Loading...</div>
  }



  return (
    <div className='2xl:container h-screen m-auto'>
      <div className='fixed inset-0 w-7/12 invisible md:visible md:hidden lg:block '>
       
        <Image src={BackgroundImg}  alt='cat looking at billboard' objectFit='cover' layout="fill"/>
        <h1 className='absolute z-10 text-2xl justify-center top-[45%] left-[24%] text-white'>Where is your ad space Located?</h1>
        
      
      </div>
      <div role="hidden" className='fixed inset-0 w-6/12 ml-auto bg-white bg-opacity-70 backdrop-blur-xl lg:block'></div>
        <div className='relative h-full ml-auto lg:w-6/12'>
          <div className="m-auto pt-12 px-6 sm:p-15 xl:w-10/12">
            <div className='space-y-4 mb-2'>
              
              <h3 className='text-3xl'>Enter Location of Ad space:</h3>
              
              
            </div>
            
            <GoogleSearch panTo={panTo}/>
            
                <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                options={options}
                onLoad={onMapLoad}
                zoom={11}
                onClick={onMapClick}>

                  {/* should check this out in future -not optimised */}
                  {markers.map((marker)=>(
                    <Marker
                    key={marker.time.toISOString()}
                    position={{lat: marker.lat,lng: marker.lng}}
                    icon={{
                      url:"/billboard_pin.svg",
                      scaledSize:new window.google.maps.Size(70,70),
                      
                    }}/>
                  ))}
                    

                   
                    </GoogleMap>
                    <PlaceMarkerText/>

                    <div className='flex  justify-between pb-10  w-[30rem]'>
                      <button className='text-sm text-gray-900 bg-gray-100 px-4 py-2 rounded-lg mt-5 active:scale-90 transition duration-150'>Back</button>
                      <button className='text-sm text-white bg-gray-900 px-4 py-2 rounded-lg mt-5 active:scale-90 transition duration-150'>Next</button>
                    </div>
           

            
                
            


          </div>

         
        </div>
      </div>
  )
}



function GoogleSearch({panTo}){
  const {ready,value,suggestions:{status,data},setValue,clearSuggestions} =usePlacesAutocomplete({
    requestOptions:{
      location:{lat:()=> -1.292066,lng:()=> 36.821945},
      radius:600*1000,
    },
  });

  return <div className='mb-2'>
    <Combobox  onSelect={async (address)=>{
      console.log(address);
      setValue(address,false);
      clearSuggestions()
      try {
        const results=await getGeocode({address});
        console.log(address);
        const {lat,lng}=await getLatLng(results[0]);
        panTo({lat,lng});
        
      } catch (error) {
        console.log("error!");
      }
    
  }}>
    <ComboboxInput 
       className="city-search-input"
       style={{ width: 400 ,border: '2px solid #FAB038',borderRadius:'5px',backgroundColor:'#f0f0f0' }}
       value={value}
       
       onChange={(e)=>{
         setValue(e.target.value)
       }}
       disabled={!ready}
       placeholder="Enter An address"
    />
    <ComboboxPopover className="shadow-popup">
    <ComboboxList>
      {status==="OK" && data.map(({id,description}) => (<ComboboxOption key={id} value={description}/>))}
    </ComboboxList>
    </ComboboxPopover>


  </Combobox>
  </div>
}

{/* <Image src={imgbill} alt="billboard pin"  width={"50px"} height={"50px"} objectFit="fill"/> */}

export default Location;