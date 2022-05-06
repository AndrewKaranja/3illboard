import React, { useState,useMemo} from 'react';
import Image from 'next/image';
import ReactMapGL,{Marker,Popup} from 'react-map-gl';
import getCenter from 'geolib/es/getCenter';
import imgbill from '../images/billboard_fl2.png';

function Map({searchResults}) {
  const [selectedLocation, setSelectedLocation] = useState({});
  
  const markers = useMemo(()=> JSON.parse(searchResults)?.map(result=>(
    
    <div key={result?.created}>
      
          <Marker
          longitude={result?.location?.long}
          latitude={result?.location?.lat}
          offsetLeft={-20}
          offsetRight={-10}>
            
            {/* <p 
            onClick={()=>setSelectedLocation(result)}
            className='cursor-pointer text-2xl animate-bounce active:animate-none'
            aria-label='push-pin'>📌</p> */}
            <Image onClick={()=>setSelectedLocation(result)} src={imgbill}  alt='billboard pin' width={20} height={40} className='cursor-pointer animate-bounce active:animate-none'/>

            
            

            
          </Marker>
           {selectedLocation?.location?.long === result?.location?.long ? (
            <Popup
            onClose={()=>setSelectedLocation(result)}
            onOpen={()=>setSelectedLocation(result)}
            closeOnClick={true}
            latitude={result?.location?.lat}
            longitude={result?.location?.long}>
              <div className='flex flex-col'>
              <Image src={result?.photosURLS?.[0]}  alt='ad image' width={70} height={70} className='rounded-lg'/>
              <p>{result?.details?.billboardTitle}</p>

              </div>
               
              
            </Popup>
          ):(
            false
          )}
    </div>
    
      
  )));
   
    // Transform the  search results object to lat log object
    const coordinates=JSON.parse(searchResults)?.map(result=>({
      longitude:result?.location?.long,
      latitude:result?.location?.lat,
    }));
    console.log("coordinates"+coordinates);
    console.log(JSON.parse(searchResults));
    

    // long and lat of center of locations coordinates
    const center=getCenter(coordinates);

    const [viewstate,setViewstate]=useState({
      longitude:center.longitude,
      latitude:center.latitude,
      zoom:11
  });


  return (
    <ReactMapGL
    mapStyle='mapbox://styles/karanjah/ckzmwpzfk003m14p4x5mrjswi'
    style={{width: 1000, height: 600}}
    {...viewstate}
    onMove={(nextViewstate)=>setViewstate(nextViewstate)}
    mapboxAccessToken={process.env.mapbox_key}
    >
      {markers}
     

    </ReactMapGL>
  );
}
export default Map

// {searchResults.map(result=>(
//   <div key={result.long}>
//     <Marker 
//     longitude={result.long}
//     latitude={result.lat}
//     offsetLeft={-20}
//     offsetRight={-10}>
//       <p 
//       onClick={()=>setSelectedLocation(result)}
//       className='cursor-pointer text-2xl animate-bounce active:animate-none'
//       aria-label='push-pin'>📌</p>

      
//     </Marker>
//     {/* Popup if you click on marker */}
//     {selectedLocation.long === result.long ? (
//       <Popup
//       onClose={()=>setSelectedLocation({})}
//       closeOnClick={true}
//       latitude={result.lat}
//       longitude={result.long}>
//         {result.title}
//       </Popup>
//     ):(
//       false
//     )}


//   </div>
  
// ))}

