import React, { useState } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const initialCenter = {
  lat: 37.7749, // Example Latitude (San Francisco)
  lng: -122.4194, // Example Longitude (San Francisco)
};

const MapComponent = () => {
  const [selected, setSelected] = useState(null); // Track selected coordinates

  // Handle map clicks
  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const coordinates = { lat, lng }; // Prepare coordinates object
    console.log(`Selected Coordinates:`, coordinates); // Log coordinates for debugging
    setSelected(coordinates); // Update state with selected coordinates
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={initialCenter}
      zoom={10}
      onClick={handleMapClick} // Trigger on map click
    >
      {/* Marker for the selected position */}
      {selected && (
        <>
          <Marker position={selected} />

          {/* InfoWindow to Display Coordinates */}
          <InfoWindow
            position={selected}
            onCloseClick={() => setSelected(null)} // Allow closing InfoWindow
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
