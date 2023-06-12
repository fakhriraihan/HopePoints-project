import React, { useContext, useState, useEffect } from 'react';
import { Card, Modal, Form, Button } from 'react-bootstrap';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import './dashboardcomp.css';
import { AuthContext } from '../../Context/AuthContext';
import { Map, Marker, NavigationControl, ScaleControl, GeolocateControl } from 'react-map-gl';
import { updatePasswordProfile as updateProfilePassword } from '../../Utils/crudData';
import { GetUserById, updateUserProfile } from '../../Utils/crudData';
import Swal from 'sweetalert2';
import { GeoPoint } from 'firebase/firestore';

const Nav = ({ Toggle }) => {
  const { dispatch } = useContext(AuthContext);
  const usersData = localStorage.getItem('user');
  const user = JSON.parse(usersData);
  const userData = user.user;
  const email = userData.email;
  const role = user.role;
  const uid = userData.uid;

  const [users, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalPassword, setShowModalPassword] = useState(false);
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

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

    const handleSubmit = (event) => {
    event.preventDefault();

    const name = event.target.elements.name.value;
    const phone = event.target.elements.phone.value;
    const address = event.target.elements.address.value;
    const email = event.target.elements.email.value;

    const newData = {
      name: name,
      phone: phone,
      address: address,
      email: email,
      location: new GeoPoint(newPlace.lat, newPlace.long),
    };

    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to update your profile?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!',
    }).then((result) => {
      if (result.isConfirmed) {
        updateUserProfile(uid, newData)
          .then((updatedUser) => {
            setUser(updatedUser);
            setShowModal(false);
            Swal.fire('Updated!', 'Your profile has been updated.', 'success');
          })
          .catch((error) => {
            Swal.fire('Error!', 'Failed to update profile.', 'error');
          });
      }
    });
  };

  const handleSubmitPassword = (event) => {
    event.preventDefault();

    const currentPassword = event.target.elements.currentPassword.value;
    const newPassword = event.target.elements.newPassword.value;
    const confirmPassword = event.target.elements.confirmPassword.value;

    if (newPassword !== confirmPassword) {
      console.error('New password and confirm password do not match');
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to update your password?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!',
    }).then((result) => {
      if (result.isConfirmed) {
        updateProfilePassword(currentPassword, newPassword)
          .then(() => {
            Swal.fire('Updated!', 'Your password has been updated.', 'success');
            console.log('Password updated successfully!');
          })
          .catch((error) => {
            Swal.fire('Error!', 'Failed to update password.', 'error');
            console.error('Failed to update password:', error.message);
          });
      }
    });
    setShowModalPassword(false);
  };

  return (
    <nav className='navbar navbar-expand-sm bg-white fixed-top px-4'>
      <i
        className='navbar-brand fa-solid fa-align-left fs-4'
        onClick={Toggle}
        style={{ cursor: 'pointer', color: '#f94892' }}
      ></i>
      <button
        className='navbar-toggler d-lg-none'
        type='button'
        data-bs-toggle='collapse'
        data-bs-target='#collapsibleNavId'
        aria-controls='collapsibleNavId'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <i
          className='fa-solid fa-bars'
          style={{ cursor: 'pointer', color: '#f94892' }}
        ></i>
      </button>
      <div className='collapse navbar-collapse' id='collapsibleNavId'>
        <ul className='navbar-nav ms-auto mt-2 mt-lg-0'>
          <li className='nav-item dropdown'>
            <button
              className='nav-link fs-6 dropdown-toggle rounded border-0 bg-transparent'
              id='dropdownId'
              data-bs-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'
              style={{ color: '#f94892' }}
            >
              {email}
            </button>
            <div
              className='dropdown-menu dropdown-menu-end'
              aria-labelledby='dropdownId'
            >
               {role === 'office' && (
                <div>
                  <button
                    className='dropdown-item'
                    style={{ color: '#f94892' }}
                    onClick={() => setShowModal(true)}
                  >
                    <i className='fa-solid fa-user me-2'></i>
                    My Profile
                  </button>
                  <button
                    className='dropdown-item'
                    style={{ color: '#f94892' }}
                    onClick={() => setShowModalPassword(true)}
                  >
                    <i className='fa-solid fa-lock me-2'></i>
                    Change Password
                  </button>
                </div>
              )}

              <button
                className='dropdown-item'
                onClick={handleLogout}
                style={{ color: '#f94892' }}
              >
                <i className='fa-solid fa-right-from-bracket me-2'></i>
                Logout
              </button>
            </div>
          </li>
        </ul>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='formGroupName'>
              <Form.Label>Nama :</Form.Label>
              <Form.Control type='text' placeholder='' defaultValue={users?.name} name='name' />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formGroupName'>
              <Form.Label>Email :</Form.Label>
              <Form.Control
                type='email'
                placeholder=''
                defaultValue={users?.email}
                name='email'
                readOnly
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formGroupName'>
              <Form.Label>No Handphone :</Form.Label>
              <Form.Control
                type='text'
                placeholder=''
                defaultValue={users?.phone}
                name='phone'
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formGroupName'>
              <Form.Label>Address :</Form.Label>
              <Form.Control
                type='text'
                placeholder=''
                defaultValue={users?.address}
                name='address'
              />
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
            <Button variant='warning' type='submit' style={{marginTop: '1rem'}}>
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal show={showModalPassword} onHide={() => setShowModalPassword(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitPassword}>
            <Form.Group className="mb-3" controlId="formGroupOldPassword">
              <Form.Label>Old Password:</Form.Label>
              <Form.Control type="password" placeholder="Enter old password" name="currentPassword" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupNewPassword">
              <Form.Label>New Password:</Form.Label>
              <Form.Control type="password" placeholder="Enter new password" name="newPassword" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupConfirmPassword">
              <Form.Label>Confirm Password:</Form.Label>
              <Form.Control type="password" placeholder="Confirm new password" name="confirmPassword" required />
            </Form.Group>

            <Button variant="warning" type="submit">
              Change Password
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <GetUserById setUser={setUser} uid={uid} />
    </nav>
  );
};

export default Nav;
