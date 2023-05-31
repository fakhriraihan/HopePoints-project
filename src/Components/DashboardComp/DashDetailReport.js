import React, { useEffect, useState } from 'react';
import Nav from '../../Components/DashboardComp/Nav';
import { Button, Card, Form, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../Config/firebase';

const DashDetailReport = ({ Toggle }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const docRef = doc(db, 'reports', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setReport(data);
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
      <Card>
        <Card.Header>
          <Button variant='danger' type='cancel' onClick={() => navigate('/dashboard/report')}>
            Cancel
          </Button>
        </Card.Header>
        <Card.Body className=''>
          <div className='row'>
            <div className='col-md-6'>
              <label className='mb-2'>Maps</label>
              <Card className='mb-3' style={{ width: '100%', height: '25rem' }}>
                <Card.Body>Ini untuk maps</Card.Body>
              </Card>
            </div>
            <div className='col-md-6'>
              <Form onSubmit={handleProcessSubmit}>
                <Form.Group className='mb-3' controlId='formGroupName'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control type='email' placeholder='' defaultValue={report.name} readOnly />
                </Form.Group>

                <Row className='mb-3'>
                  <Form.Group as={Col} controlId='formGridLatitude'>
                    <Form.Label>Latitude</Form.Label>
                    <Form.Control type='latitude' placeholder='' defaultValue={report.latitude} readOnly />
                  </Form.Group>

                  <Form.Group as={Col} controlId='formGridLongitude'>
                    <Form.Label>Longitude</Form.Label>
                    <Form.Control type='longitude' placeholder='' defaultValue={report.longitude} readOnly />
                  </Form.Group>
                </Row>

                <Form.Group className='mb-3' controlId='formGridAddress'>
                  <Form.Label>Address</Form.Label>
                  <Form.Control placeholder='1234 Main St' value={report.address} readOnly />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formGridDescription'>
                  <Form.Label>Description</Form.Label>
                  <Form.Control as='textarea' rows={3} value={report.description} readOnly />
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
