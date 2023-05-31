import React, { useState, useEffect } from 'react';
import Map, {
  Marker,
  Popup,
  NavigationControl,
  ScaleControl,
  GeolocateControl,
} from 'react-map-gl';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Config/firebase';

const token = process.env.REACT_APP_MAPBOX_TOKEN;
const MapComponent = () => {
  const [reports, setReports] = useState([]);
  const [viewport, setViewPort] = useState({
    longitude: 117.27756850787405,
    latitude: 0.09273370918533735,
    zoom: 4.3,
  });

  useEffect(() => {
    const getReports = async () => {
      try {
        const reportsCollection = collection(db, 'reports');
        const reportsSnapshot = await getDocs(reportsCollection);
        const reportsData = reportsSnapshot.docs.map((doc) => doc.data());
        setReports(reportsData);
      } catch (error) {
        console.error('Error getting reports: ', error);
      }
    };

    getReports();
  }, []);

  return (
    <Map
      initialViewState={viewport}
      mapboxAccessToken={token}
      mapStyle='mapbox://styles/renanda26/cli49zhib02nc01qyaka1dq8w'
      width='100%'
      height='100%'
      onViewportChange={setViewPort}
    >
      {reports.map((report) => (
        <Marker
          key={report.idReport}
          latitude={report.location.latitude}
          longitude={report.location.longitude}
          offsetleft={-3.5 * viewport.zoom}
          offsetTop={-7 * viewport.zoom}
          draggable={false}
          style={{ zIndex: 999 }}
        >
          <i
            className='fa-solid fa-location-dot'
            style={{
              fontSize: 7 * viewport.zoom,
              color: 'tomato',
              cursor: 'pointer',
            }}
          ></i>
        </Marker>
      ))}
      <GeolocateControl position='bottom-right' />
      <NavigationControl position='bottom-right' />
      <ScaleControl />
      {/* <Popup
          longitude={113.764686933965}
          latitude={0.6763165071501142}
          anchor='bottom'
          onClose={() => setShowPopup(false)}
        >
          You are here
        </Popup> */}
    </Map>
  );
};
export default MapComponent;
