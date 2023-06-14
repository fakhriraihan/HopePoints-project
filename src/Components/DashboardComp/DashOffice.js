import React, { useState, useRef, useEffect } from 'react';
import { Table, Button, Card, Form, Modal } from 'react-bootstrap';
import './dashboardcomp.css';
import { GetUserWhereRole, handleDeleteUser } from '../../Utils/crudData';
import { useRegisterOffice } from '../../Utils/auth';
import { Map, Marker, NavigationControl, ScaleControl, GeolocateControl } from 'react-map-gl';
import Swal from 'sweetalert2';

const DashOffice = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tlfn, setPhone] = useState('');
  const formRef = useRef(null);
  const [newPlace, setNewPlace] = useState(null);
  const token = process.env.REACT_APP_MAPBOX_TOKEN;
  const [viewport, setViewPort] = useState({
    longitude: 117.27756850787405,
    latitude: 0.09273370918533735,
    zoom: 4.3,
  });

  const registerUser = useRegisterOffice();
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !tlfn || !newPlace) {
      Swal.fire('Error', 'Please fill in all the fields', 'error');
      return;
    }

    try {
      await registerUser(email, '123123', name, tlfn, 'null', 'office', newPlace.lat, newPlace.long);
      Swal.fire({
        icon: 'success',
        title: 'Registration Success',
        text: 'Default Password: 123123',
      });
    } catch (error) {
      Swal.fire('Error', 'Registration failed', 'error');
    }
    setShowModal(false);
  };

  const confirmDeleteUser = (userId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await handleDeleteUser(userId);
          Swal.fire('Deleted!', 'The user has been deleted.', 'success');
        } catch (error) {
          Swal.fire('Error', 'Failed to delete the user.', 'error');
        }
      }
    });
  };

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
  }, [viewport.latitude, viewport.longitude]);

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
                    <Button variant="danger" onClick={() => confirmDeleteUser(user.id)}>
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
        <Form ref={formRef}>
          <Modal.Header closeButton>
            <Modal.Title>Add Office</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" name="phone" value={tlfn} onChange={(e) => setPhone(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="location">
              <Form.Label>Location</Form.Label>
              {/* <Form.Control required /> */}
              <Card>
                <Card.Body>
                  <div className="map-container" style={{ width: '100%', height: '300px' }}>
                    <Map
                      initialViewState={viewport}
                      mapboxAccessToken={token}
                      mapStyle="mapbox://styles/renanda26/cli49zhib02nc01qyaka1dq8w"
                      width="100%"
                      height="100%"
                      onViewportChange={setViewPort}
                    >
                      {newPlace && (
                        <>
                          <Marker
                            latitude={newPlace?.lat}
                            longitude={newPlace?.long}
                            offsetleft={-3.5 * viewport.zoom}
                            offsetTop={-7 * viewport.zoom}
                            draggable={true}
                            onDragEnd={handleMarkerDragEnd}
                            style={{ zIndex: 999 }}
                          >
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
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleRegister}>
              Add
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <GetUserWhereRole setUsers={setUsers} setRole={'office'} />
    </div>
  );
};

export default DashOffice;
