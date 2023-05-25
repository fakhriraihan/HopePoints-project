import React from 'react';
import Nav from '../../Components/DashboardComp/Nav';
import { Button, Card, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './dashboardcomp.css';

const DashDetailReport = ({ Toggle }) => {
  const navigate = useNavigate();
  return (
    <div className='px-3'>
      <Nav Toggle={Toggle} />
      <h2 className='text-white my-3'>Detail Report</h2>
      <Card>
        <Card.Header>
          <Button
            variant='danger'
            type='cancel'
            onClick={() => navigate('/dashreport')}
          >
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
              <Form>
                <Form.Group className='mb-3' controlId='formGroupName'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control type='email' placeholder='' />
                </Form.Group>

                <Row className='mb-3'>
                  <Form.Group as={Col} controlId='formGridLatitude'>
                    <Form.Label>Latitude</Form.Label>
                    <Form.Control type='latitude' placeholder='' />
                  </Form.Group>

                  <Form.Group as={Col} controlId='formGridLongitude'>
                    <Form.Label>Longitude</Form.Label>
                    <Form.Control type='longitude' placeholder='' />
                  </Form.Group>
                </Row>

                <Form.Group className='mb-3' controlId='formGridAddress'>
                  <Form.Label>Address</Form.Label>
                  <Form.Control placeholder='1234 Main St' />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formGridDescription'>
                  <Form.Label>Description</Form.Label>
                  <Form.Control as='textarea' rows={3} />
                </Form.Group>

                <Button variant='warning' type='submit'>
                  Diproses
                </Button>
                <Button className='mx-3' variant='success' type='submit'>
                  Selesai
                </Button>
              </Form>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DashDetailReport;
