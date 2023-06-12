import React, { useState, useRef, useEffect } from 'react';
import { Table, Button, Card, Form, Modal } from 'react-bootstrap';
import './dashboardcomp.css';
import { GetUserWhereRole, handleDeleteUser } from '../../Utils/crudData';
import { Map, Marker, NavigationControl, ScaleControl, GeolocateControl } from 'react-map-gl';

const DashOffice = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [province, setProvince] = useState('');
  const formRef = useRef(null);
  const [newPlace, setNewPlace] = useState(null);
  const token = process.env.REACT_APP_MAPBOX_TOKEN;
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

  return (
    <div className="container-dashboard">
      <h2 className="text-white text-center mb-3">Table Data Office</h2>
      <Card>
        <Card.Header className="d-flex align-items-center justify-content-between">
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Add Office
          </Button>
        </Card.Header>
        <Card.Body>
          <Table responsive bordered hover className="bg-white">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
                <th>No Kantor</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <Button variant="danger" onClick={() => handleDeleteUser(user.id)}>
                      <i className="fa-solid fa-trash-can"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Office</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form ref={formRef}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="province">
              <Form.Label>Province</Form.Label>
              <Form.Control type="text" name="province" value={province} onChange={(e) => setProvince(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="province">
              <Form.Label>Location</Form.Label>
              {/* <Form.Control required /> */}
              <Card>
                <Card.Body>
                  <div className="map-container" style={{ width: '100%', height: '300px' }}>
                    <Map initialViewState={viewport} mapboxAccessToken={token} mapStyle="mapbox://styles/renanda26/cli49zhib02nc01qyaka1dq8w" width="100%" height="100%" onViewportChange={setViewPort}>
                      {newPlace && (
                        <>
                          <Marker latitude={newPlace?.lat} longitude={newPlace?.long} offsetleft={-3.5 * viewport.zoom} offsetTop={-7 * viewport.zoom} draggable={true} onDragEnd={handleMarkerDragEnd} style={{ zIndex: 999 }}>
                            <i
                              className="fa-solid fa-location-dot"
                              style={{
                                fontSize: 7 * viewport.zoom,
                                color: 'tomato',
                                cursor: 'pointer',
                              }}
                            ></i>
                          </Marker>
                        </>
                      )}
                      <GeolocateControl position="bottom-right" onGeolocate={handleGeolocateClick} />
                      <NavigationControl position="bottom-right" />
                      <ScaleControl />
                      {/* Konten peta */}
                    </Map>
                  </div>
                </Card.Body>
              </Card>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
      <GetUserWhereRole setUsers={setUsers} setRole={'office'} />
    </div>
  );
};

export default DashOffice;
