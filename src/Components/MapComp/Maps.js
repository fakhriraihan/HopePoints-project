import React, { useState, useEffect } from 'react';
import Map, {
  NavigationControl,
  ScaleControl,
  GeolocateControl,
  Source,
  Layer,
  Marker,
  Popup,
} from 'react-map-gl';
import { useNavigate } from 'react-router-dom';
import { GetReport } from '../../Utils/crudData';
import * as firestore from 'firebase/firestore';
import { db } from '../../Config/firebase';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import './popup.css';
import { FaStar } from 'react-icons/fa';
import HeatmapLegend from './Legend';

const token = process.env.REACT_APP_MAPBOX_TOKEN;
const MapComponent = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0);
  const [viewport, setViewPort] = useState({
    longitude: 117.27756850787405,
    latitude: 0.09273370918533735,
    zoom: 4.3,
  });

  const colors = {
    orange: '#FFBA5A',
    grey: '#a9a9a9',
  };

  const handleClick = (value) => {
    setCurrentValue(value);

    console.log(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const heatmapData = {
    type: 'FeatureCollection',
    features: reports.map((report) => ({
      geometry: {
        type: 'Point',
        coordinates: [report.location.longitude, report.location.latitude],
      },
    })),
  };

  useEffect(() => {
    const unsubscribe = firestore.onSnapshot(
      firestore.query(
        firestore.collection(db, 'users'),
        firestore.where('role', '==', 'office')
      ),
      (snapshot) => {
        const userList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('Retrieved data:', userList);
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

  return (
    <Map
      initialViewState={viewport}
      mapboxAccessToken={token}
      mapStyle='mapbox://styles/renanda26/cli49zhib02nc01qyaka1dq8w'
      width='100%'
      height='100%'
      onViewportChange={setViewPort}
    >
      <Source id='heatmapData' type='geojson' data={heatmapData}>
        <Layer
          id='heatmapLayer'
          type='heatmap'
          source='heatmapData'
          maxzoom={15}
          paint={{
            'heatmap-weight': {
              property: 'weight',
              type: 'exponential',
              stops: [
                [1, 0],
                [62, 1],
              ],
            },
            'heatmap-intensity': {
              stops: [
                [11, 1],
                [15, 3],
              ],
            },
            'heatmap-color': [
              'interpolate',
              ['linear'],
              ['heatmap-density'],
              0,
              'rgba(236,222,239,0)',
              0.2,
              'rgb(208,209,230)',
              0.4,
              'rgb(0,255,0)', // Hijau
              0.6,
              'rgb(255,255,0)', // Kuning
              0.8,
              'rgb(255,165,0)', // Jingga
              1,
              'rgb(255,0,0)', // Merah
            ],
            'heatmap-radius': {
              stops: [
                [11, 15],
                [15, 20],
              ],
            },
            'heatmap-opacity': {
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
        <React.Fragment key={user.id}>
          <Marker
            latitude={user.location.latitude}
            longitude={user.location.longitude}
            offsetleft={-3.5 * viewport.zoom}
            offsetTop={-7 * viewport.zoom}
            draggable={false}
            style={{ zIndex: 1 }}
            onClick={() => setSelectedMarker(user)}
          >
            <i
              className='fa-solid fa-building'
              style={{
                fontSize: 5 * viewport.zoom,
                color: '#f94892',
                cursor: 'pointer',
              }}
            ></i>
          </Marker>
          {selectedMarker !== null && selectedMarker.id === user.id && (
            <Popup
              latitude={selectedMarker.location.latitude}
              longitude={selectedMarker.location.longitude}
              closeButton={true}
              closeOnClick={false}
              anchor='left'
              onClose={() => setSelectedMarker(null)}
              style={{ zIndex: 1 }}
            >
              <div className='popup-content'>
                {/* Konten popup */}
                <h2>Informasi Dinas</h2>
                <h4 className='nama-dinas'>{user.name}</h4>
                <p>Alamat: {user.adress}</p>
                <p>Phone: {user.phone}</p>

                {/* Review */}
                <div className='stars' style={styles.stars}>
                  {stars.map((_, index) => {
                    return (
                      <FaStar
                        key={index}
                        size={24}
                        onClick={() => handleClick(index + 1)}
                        onMouseOver={() => handleMouseOver(index + 1)}
                        onMouseLeave={handleMouseLeave}
                        color={
                          (hoverValue || currentValue) > index
                            ? colors.orange
                            : colors.grey
                        }
                        style={{
                          marginRight: 10,
                          cursor: 'pointer',
                        }}
                      />
                    );
                  })}
                </div>

                <Button
                  variant='pink'
                  onClick={() => navigate(`/detailoffice/${user.id}`)}
                >
                  Detail Office
                </Button>
              </div>
            </Popup>
          )}
        </React.Fragment>
      ))}
      <HeatmapLegend/>
      <GeolocateControl position='bottom-right' />
      <NavigationControl position='bottom-right' />
      <ScaleControl />
      <GetReport setReports={setReports} />
    </Map>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  stars: {
    display: 'flex',
    flexDirection: 'row',
  },
};

export default MapComponent;
