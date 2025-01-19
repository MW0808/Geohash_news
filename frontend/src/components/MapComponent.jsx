import React, { useState } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const initialCenter = {
  lat: 37.7749, 
  lng: -122.4194, 
};

const MapComponent = () => {
  const [selected, setSelected] = useState(null); 

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const coordinates = { lat, lng }; 
    console.log(`Selected Coordinates:`, coordinates); 
    setSelected(coordinates); 
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={initialCenter}
      zoom={10}
      onClick={handleMapClick} 
    >
      {selected && (
        <>
          <Marker position={selected} />

          <InfoWindow
            position={selected}
            onCloseClick={() => setSelected(null)} 
          >
            <div>
              <h4>Coordinates</h4>
              <p>Lat: {selected.lat.toFixed(6)}</p>
              <p>Lng: {selected.lng.toFixed(6)}</p>
            </div>
          </InfoWindow>
        </>
      )}
    </GoogleMap>
  );
};

export default MapComponent;
