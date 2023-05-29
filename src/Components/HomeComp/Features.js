import React from 'react';
import Card from 'react-bootstrap/Card';

const features = () => {
  return (
    <div className='container-fluid px-0'>
      <div className='row g-3 d-flex justify-content-between'>
        <div className='col-md-4'>
          <Card>
            <Card.Body className='text-center'>
              <Card.Title as='h3'>Pelaporan</Card.Title>
              <Card.Text className='fs-4'>50</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className='col-md-4'>
          <Card>
            <Card.Body className='text-center'>
              <Card.Title as='h3'>Pelaporan</Card.Title>
              <Card.Text className='fs-4'>50</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className='col-md-4'>
          <Card>
            <Card.Body className='text-center'>
              <Card.Title as='h3'>Pelaporan</Card.Title>
              <Card.Text className='fs-4'>50</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default features;
