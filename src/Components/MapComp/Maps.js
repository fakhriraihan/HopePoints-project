import React, { useState } from "react";
import Map, {Marker, Popup } from "react-map-gl";

const token = process.env.REACT_APP_MAPBOX_TOKEN;
const MapComponent = () => {
  const [showPopup, setShowPopup] = React.useState(true);
  const [viewport, setViewport] = useState({
    longitude: 117.27756850787405,
    latitude: 0.09273370918533735,
    zoom: 4.3,
  });

  const handlerAddClick = (e) =>{
    console.log(e)
  }
  return (
    <div className="map-comp" style={{ width: "100vw", height: "100vh" }}>
      <Map initialViewState={viewport} 
      mapboxAccessToken={token} 
      mapStyle="mapbox://styles/renanda26/cli49zhib02nc01qyaka1dq8w" 
      width="100%" 
      height="100%" 
      transitionDuration="200"
      onDblClick={handlerAddClick}
      >
        <Marker
      longitude={113.764686933965}
      latitude={0.6763165071501142}
      offsetLeft={-20}
      offsetTop={-10}
      >
        <div>You are here</div>
      </Marker>
      <Popup 
      longitude={113.764686933965} 
      latitude={0.6763165071501142}
        anchor="bottom"
        onClose={() => setShowPopup(false)}>
        You are here
      </Popup>
      </Map>
      
    </div>
  );
};
export default MapComponent;
