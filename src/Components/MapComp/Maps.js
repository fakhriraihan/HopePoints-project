import React, { useState, useEffect } from "react";
import Map, { NavigationControl, ScaleControl, GeolocateControl, Source, Layer, Marker } from "react-map-gl";
import * as firestore from "firebase/firestore";
import { db } from "../../Config/firebase";

const token = process.env.REACT_APP_MAPBOX_TOKEN;
const MapComponent = () => {
  const [reports, setReports] = useState([]);
  const [users, setUsers] = useState([]);
  const [viewport, setViewPort] = useState({
    longitude: 117.27756850787405,
    latitude: 0.09273370918533735,
    zoom: 4.3,
  });

  useEffect(() => {
    const getReports = async () => {
      try {
        const reportsCollection = firestore.collection(db, "reports");
        const reportsSnapshot = await firestore.getDocs(reportsCollection);
        const reportsData = reportsSnapshot.docs.map((doc) => doc.data());
        setReports(reportsData);
      } catch (error) {
        console.error("Error getting reports: ", error);
      }
    };

    getReports();
  }, []);

  useEffect(() => {
    const unsubscribe = firestore.onSnapshot(
      firestore.query(firestore.collection(db, "users"), firestore.where("role", "==", "office")),
      (snapshot) => {
        const userList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        console.log("Retrieved data:", userList);
        setUsers(userList);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const heatmapData = {
    type: "FeatureCollection",
    features: reports.map((report) => ({
      geometry: {
        type: "Point",
        coordinates: [report.location.longitude, report.location.latitude],
      },
    })),
  };

  return (
    <Map initialViewState={viewport} mapboxAccessToken={token} mapStyle="mapbox://styles/renanda26/cli49zhib02nc01qyaka1dq8w" width="100%" height="100%" onViewportChange={setViewPort}>
      <Source id="heatmapData" type="geojson" data={heatmapData}>
        <Layer
          id="heatmapLayer"
          type="heatmap"
          source="heatmapData"
          maxzoom={15}
          paint={{
            "heatmap-weight": {
              property: "weight",
              type: "exponential",
              stops: [
                [1, 0],
                [62, 1],
              ],
            },
            "heatmap-intensity": {
              stops: [
                [11, 1],
                [15, 3],
              ],
            },
            "heatmap-color": ["interpolate", ["linear"], ["heatmap-density"], 0, "rgba(236,222,239,0)", 0.2, "rgb(208,209,230)", 0.4, "yellow", 0.6, "orange", 0.8, "red"],
            "heatmap-radius": {
              stops: [
                [11, 15],
                [15, 20],
              ],
            },
            "heatmap-opacity": {
              default: 1,
              stops: [
                [14, 1],
                [15, 0],
              ],
            },
          }}
        />
      </Source>
      {users.map((user) => (
        <Marker key={user.id} latitude={user.location.latitude} longitude={user.location.longitude} offsetleft={-3.5 * viewport.zoom} offsetTop={-7 * viewport.zoom} draggable={false} style={{ zIndex: 999 }}>
          <i
            className="fa-solid fa-location-dot"
            style={{
              fontSize: 7 * viewport.zoom,
              color: "tomato",
              cursor: "pointer",
            }}
          ></i>
        </Marker>
      ))}
      <GeolocateControl position="bottom-right" />
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
    </Map>
  );
};

export default MapComponent;
