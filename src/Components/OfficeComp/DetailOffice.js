import React, { useEffect, useState } from 'react';
import Map, {
  Marker,
  NavigationControl,
  ScaleControl,
  GeolocateControl,
} from 'react-map-gl';
import { Button, Card, Form, Row, Col, FloatingLabel } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Config/firebase';
import { FaStar } from 'react-icons/fa';

const token = process.env.REACT_APP_MAPBOX_TOKEN;
const DetailOffice = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [viewport, setViewPort] = useState({
    width: '100%',
    height: '25rem',
    latitude: 0,
    longitude: 0,
    zoom: 15,
  });
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0);
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

  useEffect(() => {
    const fetchOffice = async () => {
      try {
        const docRef = doc(db, 'users', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUsers([data]);
          setViewPort((prevViewport) => ({
            ...prevViewport,
            latitude: data.location.latitude,
            longitude: data.location.longitude,
          }));
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.log('Error getting document:', error);
      }
    };

    fetchOffice();
  }, [id]);

  return (
    <div className='px-3'>
      {users.map((user) => (
        <div key={id}>
          <h2 className='text-center my-5 pt-5 px-3'>{user.name}</h2>
          <div className='row'>
            <div className='col-md-6'>
              <Card className='mb-3'>
                <Card.Header>Detail Office</Card.Header>

                <Card.Body className=''>
                  <Card
                    className='mb-3'
                    style={{ width: '100%', height: '25rem' }}
                  >
                    <Card.Body className='px-0 py-0'>
                      <Map
                        initialViewState={viewport}
                        mapboxAccessToken={token}
                        mapStyle='mapbox://styles/renanda26/cli49zhib02nc01qyaka1dq8w'
                        width='100%'
                        height='100%'
                        onViewportChange={setViewPort}
                      >
                        <Marker
                          key={user.id}
                          latitude={user.location.latitude}
                          longitude={user.location.longitude}
                          offsetleft={-3.5 * viewport.zoom}
                          offsetTop={-7 * viewport.zoom}
                          draggable={false}
                          style={{ zIndex: 999 }}
                        >
                          <i
                            className='fa-solid fa-location-dot fa-beat-fade'
                            style={{
                              fontSize: 2 * viewport.zoom,
                              color: 'tomato',
                              cursor: 'pointer',
                            }}
                          ></i>
                        </Marker>
                        <GeolocateControl position='bottom-right' />
                        <NavigationControl position='bottom-right' />
                        <ScaleControl />
                      </Map>
                    </Card.Body>
                  </Card>
                  <Form>
                    <Form.Group className='mb-3' controlId='formGroupName'>
                      <Form.Label>Nama :</Form.Label>
                      <Form.Control
                        type='name'
                        placeholder=''
                        value={user.name}
                        readOnly
                      />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='formGroupAddress'>
                      <Form.Label>Alamat :</Form.Label>
                      <Form.Control
                        type='address'
                        placeholder=''
                        value={user.adress}
                        readOnly
                      />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='formGroupPhone'>
                      <Form.Label>No. Telfon :</Form.Label>
                      <Form.Control
                        type='phone'
                        placeholder=''
                        value={user.phone}
                        readOnly
                      />
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>
            </div>

            <div className='col-md-6'>
              <Card>
                <Card.Header>Review and Rating</Card.Header>
                <Card.Body>
                  <form>
                    <FloatingLabel
                      controlId='floatingName'
                      label='Masukkan Nama Anda '
                      className='mb-3'
                    >
                      <Form.Control type='text' placeholder='Name' />
                    </FloatingLabel>
                    <FloatingLabel
                      controlId='floatingTextarea'
                      label='Masukkan Review Anda '
                      className='mb-3'
                    >
                      <Form.Control
                        as='textarea'
                        placeholder='Leave a comment here'
                      />
                    </FloatingLabel>
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

                    <Button variant='pink' type='submit'>
                      Submit
                    </Button>
                  </form>
                </Card.Body>
              </Card>

              <hr />
              <div className='cardReview mb-3'>
                <Card>
                  <Card.Body>
                    <h6>John Cena</h6>
                    <p>bacot suu, laporane lek ditanggepi nyok</p>
                    <div className='stars mx-0' style={styles.stars}>
                      {stars.map((_, index) => {
                        return (
                          <FaStar
                            key={index}
                            size={24}
                            style={{
                              marginRight: 10,
                              cursor: 'pointer',
                            }}
                          />
                        );
                      })}
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DetailOffice;
