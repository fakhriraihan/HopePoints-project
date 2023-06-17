import React, { useEffect, useState } from 'react';
import Map, {
  Marker,
  NavigationControl,
  ScaleControl,
  GeolocateControl,
} from 'react-map-gl';
import { Modal, Button, Card, Form, FloatingLabel } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, collection, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import { getAuth } from '@firebase/auth';
import { db } from '../../Config/firebase';
import { FaStar } from 'react-icons/fa';
import './office.css';

const token = "pk.eyJ1IjoicmVuYW5kYTI2IiwiYSI6ImNsaHgxMTkzdzBsZWkzbW4wMnZ5cDd0OTgifQ.ubLqseZPFD3Ym8ENEzvbCw";
const DetailOffice = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [ setError] = useState(false);
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [viewport, setViewPort] = useState({
    width: '100%',
    height: '25rem',
    latitude: 0,
    longitude: 0,
    zoom: 15,
  });
  const [showModal, setShowModal] = useState(false);
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0);
  const colors = {
    orange: '#FFBA5A',
    grey: '#a9a9a9',
  };

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };
  const handleModalCancel = () => {
    setShowModal(false);
  };

  const handleSubmitReview = async (event) => {
    event.preventDefault();

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      
      setShowModal(true);
      return;
    }

    const reviewContent = event.target.elements.comment.value;
    const timestamp = Timestamp.fromDate(new Date());
    const date = timestamp.toDate();
    const dateString = date.toLocaleString('id-ID', {
      timeZone: 'Asia/Jakarta',
      dateStyle: 'long',
      timeStyle: 'medium',
    });
    const reviewData = {
      uid: user.uid,
      name: user.displayName,
      comment: reviewContent,
      rating: currentValue,
      idOffice: id,
      tgl: dateString,
      reply: null,
    };

    try {
      const userDocRef = doc(db, 'users', id);
      await addDoc(collection(userDocRef, 'reviews'), reviewData);
      console.log('Review berhasil ditambahkan');

      // Reset form setelah submit
      event.target.reset();
      setCurrentValue(0);

      // Memperbarui daftar ulasan dengan ulasan yang baru
      setReviews((prevReviews) => [...prevReviews, reviewData]);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    const fetchOffice = async () => {
      try {
        const userDocRef = doc(db, 'users', id);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setUsers([userData]);
          setViewPort((prevViewport) => ({
            ...prevViewport,
            latitude: userData.location.latitude,
            longitude: userData.location.longitude,
          }));

          const reviewsCollectionRef = collection(userDocRef, 'reviews');
          const reviewsQuerySnapshot = await getDocs(reviewsCollectionRef);
          const reviewsData = reviewsQuerySnapshot.docs.map((doc) =>
            doc.data()
          );
          setReviews(reviewsData);
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
    <div className='px-3 mb-3'>
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
                        value={user.address}
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
                  <form onSubmit={handleSubmitReview}>
                    <div className='stars'>
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

                    <FloatingLabel
                      controlId='floatingTextarea'
                      label='Masukkan Review Anda '
                      className='mb-3'
                    >
                      <Form.Control
                        as='textarea'
                        style={{ height: '170px' }}
                        placeholder='Leave a comment here'
                        name='comment'
                        required
                      />
                    </FloatingLabel>

                    <Button variant='pink' type='submit'>
                      Submit
                    </Button>
                  </form>
                </Card.Body>
                {/* Modal */}
                <Modal show={showModal} onHide={handleModalCancel}>
                  <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Silahkan login terlebih dahulu.</Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant='secondary'
                      onClick={() => navigate('/login')}
                    >
                      Login
                    </Button>
                    <Button variant='primary' onClick={handleModalCancel}>
                      Cancel
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Card>

              <hr />
              <div className='cardReview mb-3'>
                {reviews.map((review, index) => (
                  <Card key={index} style={{ marginTop: '1rem' }}>
                  <Card.Body key={review.id}>
                    <div className='name-comment'>{review.name}</div>
                    <div className='stars-comment'>
                      {stars.map((_, index) => {
                        return (
                          <FaStar
                            key={index}
                            size={15}
                            style={{
                              marginRight: 2,
                              cursor: 'pointer',
                              color:
                                (review.rating || hoverValue) > index
                                  ? colors.orange
                                  : colors.grey,
                            }}
                          />
                        );
                      })}
                    </div>
                    <div className='tgl-comment'>{review.tgl}</div>
                    <div className='comment-office'>{review.comment}</div>
                  </Card.Body>
                  {review.reply !== null && (
                    <Card.Footer>
                      <div className='name-comment'>Respon Office:</div>
                      <div className='reply-comment'>{review.reply}</div>
                    </Card.Footer>
                  )}
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DetailOffice;