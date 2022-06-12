import React, { useState,useMemo} from 'react';
import {useRouter} from "next/router";
import ReactMapGL,{Marker,Popup} from 'react-map-gl';
import getCenter from 'geolib/es/getCenter';
import imgbill from '../images/billboard_fl2.png';
import { Popover,Card, Text, Badge, Button, Group, useMantineTheme } from '@mantine/core';
import Link from 'next/link'
import Image from "next/image"

function Map({searchResults}) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const router = useRouter();

  const redirect=(listingurl)=>{
   
    router.push(`/search/${listingurl}`);

  }
  
  const markers = useMemo(()=> JSON.parse(searchResults)?.map((result)=>(
    
    <div key={result?.listingid}>
     
          <Marker
          longitude={result?.location?.long}
          latitude={result?.location?.lat}
          offsetLeft={-20}
          offsetRight={-10}>
            
            {/* <p 
            onClick={()=>setSelectedLocation(result)}
            className='cursor-pointer text-2xl animate-bounce active:animate-none'
            aria-label='push-pin'>📌</p> */}
            {/* <Image onClick={()=>setSelectedLocation(result)} src={imgbill}  alt='billboard pin' height={40} className='cursor-pointer animate-bounce active:animate-none'/> */}
            <Image onClick={() => {
            setSelectedLocation(result);
          }} src={imgbill} height={40} width={30} alt="" className='cursor-pointer hover:animate-none animate-bounce active:animate-none' />

            
            

            
          </Marker>
           
    </div>
    
      
  )),[]);
   
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
    style={{width: '100%', height: '100%'}}
    {...viewstate}
    onMove={(nextViewstate)=>setViewstate(nextViewstate)}
    mapboxAccessToken={process.env.mapbox_key}
    >
      {markers}
      

      {selectedLocation && (
            <Popup
            onClose={()=>setSelectedLocation(null)}
           
            latitude={selectedLocation?.location?.lat}
            longitude={selectedLocation?.location?.long}>
              {/* <div className='flex flex-col'>
              <Image src={result?.photosURLS?.[0]}  alt='ad image' width={70} height={70} className='rounded-lg'/>
              <p>{result?.details?.billboardTitle}</p>

              </div> */}

              <div className="w-44 h-fit">
              <Card shadow="sm" p="lg">
                <Card.Section>
                  <Image
                  src={selectedLocation?.photosURLS?.[0]}
                  height={120}
                  width={200}
                  alt={selectedLocation?.details?.billboardTitle}/>
                </Card.Section>

      

      <Group position="apart" style={{ marginBottom: 1, marginTop: 1 }}>
        <Text weight={500} size="sm">{selectedLocation?.details?.billboardTitle}</Text>
        <Badge color="green" variant="light">
        {selectedLocation?.price?.price}/{selectedLocation?.price?.interval}
        </Badge>
      </Group>


      <Button onClick={()=>redirect(selectedLocation?.listingid)} variant="light" color="yellow" fullWidth style={{ marginTop: 6 }}>
        Learn More
      </Button>
    </Card>
              </div>


              
               
              
            </Popup>
          )}
     

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


// {/* <Popover
// opened={opened}
// onClose={() => setOpened(false)}
// target={<Marker
//   longitude={result?.location?.long}
//   latitude={result?.location?.lat}
//   offsetLeft={-20}
//   offsetRight={-10}>
    
//     {/* <p 
//     onClick={()=>setSelectedLocation(result)}
//     className='cursor-pointer text-2xl animate-bounce active:animate-none'
//     aria-label='push-pin'>📌</p> */}
//     {/* <Image onClick={()=>setSelectedLocation(result)} src={imgbill}  alt='billboard pin' height={40} className='cursor-pointer animate-bounce active:animate-none'/> */}
//     <Image onClick={()=>setSelectedLocation(result)} src={imgbill} height={40} width={30} alt="" className='cursor-pointer animate-bounce active:animate-none' />

    
    

    
//   </Marker>}
// width={260}
// position="bottom"
// withArrow
// >
//  <Card shadow="sm" p="lg">
//           <Card.Section>
//             <Image
//             src={result?.photosURLS?.[0]}
//             height={160}
//             width={200}
//             alt={result?.details?.billboardTitle}/>
//           </Card.Section>



// <Group position="apart" style={{ marginBottom: 3, marginTop: 1 }}>
//   <Text weight={500}>{result?.details?.billboardTitle}</Text>
//   <Badge color="green" variant="light">
//   {result?.price.price}/{result?.price.interval}
//   </Badge>
// </Group>


// <Button onClick={()=>redirect(result?.listingid)} variant="light" color="yellow" fullWidth style={{ marginTop: 10 }}>
//   Learn More
// </Button>
// </Card>
// </Popover>

//  */}
