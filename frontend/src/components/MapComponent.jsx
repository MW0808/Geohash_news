import React, { useState, useCallback } from "react";
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
  const [selected, setSelected] = useState(null); // State to track selected marker
  const [currentPosition, setCurrentPosition] = useState(initialCenter);

  const handleMapClick = useCallback((e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setCurrentPosition({ lat, lng }); // Update position
    setSelected({ lat, lng }); // Set selected marker
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={currentPosition}
      zoom={10}
      onClick={handleMapClick} // Add click handler
    >
      {/* Marker for Current Position */}
      <Marker position={currentPosition} onClick={() => setSelected(currentPosition)} />

      {/* InfoWindow to Display Coordinates */}
      {selected && (
        <InfoWindow
          position={selected}
          onCloseClick={() => setSelected(null)} // Close InfoWindow
        >
          <div>
            <h4>Coordinates</h4>
            <p>Lat: {selected.lat.toFixed(6)}</p>
            <p>Lng: {selected.lng.toFixed(6)}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default MapComponent;
