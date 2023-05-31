import React, { useState, useEffect } from "react";
import MapGL, { Marker, Popup, NavigationControl, ScaleControl, GeolocateControl } from "react-map-gl";

const token = process.env.REACT_APP_MAPBOX_TOKEN;
const MapComponent = () => {
  const [newPlace, setNewPlace] = useState(null); // [longitude, latitude
  const [showPopup, setShowPopup] = React.useState(true);
  const [viewport, setViewPort] = useState({
    longitude: 117.27756850787405,
    latitude: 0.09273370918533735,
    zoom: 4.3,
  });

  const handleMarkerDragEnd = (event) => {
    const { lngLat } = event;
    const { lng, lat } = lngLat;
    setNewPlace({ lat, long: lng });
  };

  useEffect(() => {
    // Set initial marker on map load
    setNewPlace({
      lat: viewport.latitude,
      long: viewport.longitude,
    });
  }, []);

  const handleGeolocateClick = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setViewPort((prevViewport) => ({
          ...prevViewport,
          longitude,
          latitude,
        }));
        setNewPlace({ lat: latitude, long: longitude });
      },
      (error) => {
        console.error(error);
      }
    );
  };

  useEffect(() => {
    if (newPlace) {
      console.log(newPlace);
    }
  }, [newPlace]);

  return (
    <div className="map-comp" style={{ width: "100vw", height: "100vh" }}>
      <MapGL initialViewState={viewport} mapboxAccessToken={token} mapStyle="mapbox://styles/renanda26/cli49zhib02nc01qyaka1dq8w" width="100%" height="100%" onViewportChange={setViewPort}>
        {newPlace && (
          <>
            <Marker latitude={newPlace?.lat} longitude={newPlace?.long} offsetleft={-3.5 * viewport.zoom} offsetTop={-7 * viewport.zoom} draggable={true} onDragEnd={handleMarkerDragEnd} style={{ zIndex: 999 }}>
              <i
                className="fa-solid fa-location-dot"
                style={{
                  fontSize: 7 * viewport.zoom,
                  color: "tomato",
                  cursor: "pointer",
                }}
              ></i>
            </Marker>
          </>
        )}
        <GeolocateControl position="bottom-right" onGeolocate={handleGeolocateClick} />
        <NavigationControl position="bottom-right" />
        <ScaleControl />
        {/* <Popup
          longitude={113.764686933965}
          latitude={0.6763165071501142}
          anchor='bottom'
          onClose={() => setShowPopup(false)}
        >
          You are here
        </Popup> */}
      </MapGL>
    </div>
  );
};
export default MapComponent;
