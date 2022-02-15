import React, { useState,useMemo} from 'react'
import ReactMapGL,{Marker,Popup} from 'react-map-gl';
import getCenter from 'geolib/es/getCenter';

function Map({searchResults}) {
  const [selectedLocation, setSelectedLocation] = useState({});
  
  const markers = useMemo(()=> searchResults.map(result=>(
    <div key={result.long}>
          <Marker
          longitude={result.long}
          latitude={result.lat}
          offsetLeft={-20}
          offsetRight={-10}>
            <p 
            onClick={()=>setSelectedLocation(result)}
            className='cursor-pointer text-2xl animate-bounce active:animate-none'
            aria-label='push-pin'>📌</p>

            
          </Marker>
           {selectedLocation.long === result.long ? (
            <Popup
            onClose={()=>setSelectedLocation({})}
            onOpen={()=>setSelectedLocation(result)}
            closeOnClick={true}
            latitude={result.lat}
            longitude={result.long}>
              {result.title}
            </Popup>
          ):(
            false
          )}
    </div>
    
        
  )));
   
    // Transform the  search results object to lat log object
    const coordinates=searchResults.map(result=>({
      longitude:result.long,
      latitude:result.lat,
    }));

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
    style={{width: 800, height: 600}}
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

