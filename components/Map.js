import React, { useState,useMemo} from 'react';
import {useRouter} from "next/router";
import ReactMapGL,{Marker,Popup} from 'react-map-gl';
import getCenter from 'geolib/es/getCenter';
import imgbill from '../images/billboard_fl2.png';
import { Card, Text, Badge, Button, Group } from '@mantine/core';
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

            <Image onClick={() => {
            setSelectedLocation(result);
          }} src={imgbill} height={40} width={30} alt="" className='cursor-pointer animate-none hover:animate-bounce active:animate-bounce ' />

            
            

            
          </Marker>
           
    </div>
    
      
  )),[searchResults]);
   
    // Transform the  search results object to lat log object
    const coordinates=JSON.parse(searchResults)?.map(result=>({
      longitude:result?.location?.long,
      latitude:result?.location?.lat,
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
    style={{width: '100%', height: '100%'}}
    {...viewstate}
    onMove={(nextViewstate)=>setViewstate(nextViewstate)}
    mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_key} 
    >
      {markers}
      

      {selectedLocation && (
            <Popup
            onClose={()=>setSelectedLocation(null)}
           
            latitude={selectedLocation?.location?.lat}
            longitude={selectedLocation?.location?.long}>
            

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


