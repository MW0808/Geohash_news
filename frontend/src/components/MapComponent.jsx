import React from "react";
import { GoogleMap } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 37.7749, // Replace with your desired coordinates
  lng: -122.4194,
};

const MapComponent = () => {
  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
      {/* Add any children components like markers here */}
    </GoogleMap>
  );
};

export default MapComponent;
