import React, { useEffect, useState } from 'react';
import Nav from '../../Components/DashboardComp/Nav';
import Map, {
  Marker,
  NavigationControl,
  ScaleControl,
  GeolocateControl,
} from 'react-map-gl';
import { Button, Card, Form, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../Config/firebase';

const token = process.env.REACT_APP_MAPBOX_TOKEN;
const DashDetailReport = ({ Toggle }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [viewport, setViewPort] = useState({
    width: '100%',
    height: '25rem',
    latitude: 0,
    longitude: 0,
    zoom: 15,
  });

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const docRef = doc(db, 'reports', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setReport(data);
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

    fetchReport();
  }, [id]);

  const handleProcessSubmit = async () => {
    try {
      // Perbarui status menjadi "Diproses"
      await updateDoc(doc(db, 'reports', id), { status: 'Diproses' });
      console.log('Status updated to "Diproses"');
    } catch (error) {
      console.log('Error updating status:', error);
    }
  };

  const handleCompleteSubmit = async () => {
    try {
      // Perbarui status menjadi "Selesai"
      await updateDoc(doc(db, 'reports', id), { status: 'Selesai' });
      console.log('Status updated to "Selesai"');
    } catch (error) {
      console.log('Error updating status:', error);
    }
  };

  if (!report) {
    return <p>Loading report...</p>;
  }

  return (
    <div className='px-3'>
      <Nav Toggle={Toggle} />
      <h2 className='text-white my-3'>Detail Report</h2>
      <Card className='mb-5'>
        <Card.Header>
          <Button
            variant='danger'
            type='cancel'
            onClick={() => navigate('/dashboard/report')}
          >
            Cancel
          </Button>
        </Card.Header>
        <Card.Body className=''>
          <div className='row'>
            <div className='col-md-6'>
              <label className='mb-2'>Maps</label>
              <Card className='mb-3' style={{ width: '100%', height: '25rem' }}>
                <Card.Body>
                  <Map
                    initialViewState={viewport}
                    mapboxAccessToken={token}
                    mapStyle='mapbox://styles/renanda26/cli49zhib02nc01qyaka1dq8w'
                    width='100%'
                    height='100%'
                    onViewportChange={setViewPort}
                  >
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
            </div>
            <div className='col-md-6'>
              <label className='mb-2'>Detail Kejadian</label>
              <Form onSubmit={handleProcessSubmit}>
                <Form.Group className='mb-3' controlId='formGroupName'>
                  <Form.Label>Nama :</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder=''
                    defaultValue={report.name}
                    readOnly
                  />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formGroupName'>
                  <Form.Label>Email :</Form.Label>
                  <Form.Control
                    type='phone'
                    placeholder=''
                    defaultValue={report.email}
                    readOnly
                  />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formGroupName'>
                  <Form.Label>No Telfon :</Form.Label>
                  <Form.Control
                    type='phone'
                    placeholder=''
                    defaultValue={report.tlfn}
                    readOnly
                  />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formGroupName'>
                  <Form.Label>Tanggal dan Waktu Kejadian</Form.Label>
                  <Form.Control
                    type='dateandtime'
                    placeholder=''
                    defaultValue={report.tglkejadian}
                    readOnly
                  />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formGridAddress'>
                  <Form.Label>Jenis Kekerasan</Form.Label>
                  <Form.Control
                    placeholder='1234 Main St'
                    value={
                      (report.kekerasanFisik ? 'Fisik ' : '') +
                      (report.kekerasanPsikis ? 'Psikis ' : '') +
                      (report.kekerasanSeksual ? 'Seksual' : '')
                    }
                    readOnly
                  />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formGridAddress'>
                  <Form.Label>Kantor Terdekat</Form.Label>
                  <Form.Control
                    placeholder='1234 Main St'
                    value={report.province}
                    readOnly
                  />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formGridDescription'>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as='textarea'
                    rows={3}
                    value={report.description}
                    readOnly
                  />
                </Form.Group>

                {report.status === 'Diproses' ? (
                  <Button variant='success' type='submit'>
                    Selesai
                  </Button>
                ) : (
                  <Button variant='warning' type='submit'>
                    Diproses
                  </Button>
                )}
              </Form>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DashDetailReport;
