import React, { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
const googlekey = import.meta.env.VITE_APP_GOOGLE_KEY

const mapContainerStyle = {
  width: '35vw',
  height: '40vh',
};

interface MapProps{
  addresse: string
}
const libraries = ["places"];

const GoogleMapComponent: React.FC<MapProps>= ({addresse}) => {
  
  const [lat, setLat] = useState(0)
  const [lng, setLng] = useState(0)
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  useEffect(()=>{
    getLatLongFromAddress(addresse)
    //addMaker(lat, lng)
  },[addresse])
  const center = {
    lat: lat, // default latitude
    lng: lng, // default longitude
  };
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyB6gFZm9RECXndCZYi2UGysGOi0-jduqJc',});

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  async function getLatLongFromAddress(address: string) {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=AIzaSyB6gFZm9RECXndCZYi2UGysGOi0-jduqJc`
      );
  
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données de géocodage');
      }
  
      const data = await response.json();
  
      if (data.results && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        setLat(location.lat)
        setLng(location.lng)
        addMaker(location.lat, location.lng)
        return { lat: location.lat, lng: location.lng };
      } else {
        throw new Error('Aucune donnée de géocodage trouvée pour cette adresse');
      }
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }
  async function addMaker(lat: number, lng: number){
    if(map){
      if(marker){
        marker.setMap(null)
      }
      const newMarker = new google.maps.Marker({
        position: { lat, lng },
        map: map,
        title: "marqueur"
      })
      setMarker(newMarker)
    }

  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
        onLoad={(map) => setMap(map)}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
};

export default GoogleMapComponent;