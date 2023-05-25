import React from 'react';
import Nav from '../../Components/DashboardComp/Nav';
import { Card } from 'react-bootstrap';
import './dashboardcomp.css';

const mbuh = ({ Toggle }) => {
  return (
    <div className='px-3'>
      <Nav Toggle={Toggle} />
      <h2 className='text-white mb-3'>Dashboard</h2>
      <div className='d-flex justify-content-between mb-3'>
        <Card style={{ width: '23rem' }}>
          <Card.Body className='text-center'>
            <Card.Title as='h3'>Pelaporan</Card.Title>
            <Card.Text className='fs-4'>50</Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ width: '23rem' }}>
          <Card.Body className='text-center'>
            <Card.Title as='h3'>Diproses</Card.Title>
            <Card.Text className='fs-4'>50</Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ width: '23rem' }}>
          <Card.Body className='text-center'>
            <Card.Title as='h3'>Selesai</Card.Title>
            <Card.Text className='fs-4'>50</Card.Text>
          </Card.Body>
        </Card>
      </div>
      <Card className='mb-3'>
        <Card.Body>Ini untuk maps</Card.Body>
      </Card>
      {/* <div className='container-fluid'>
        <div className='row g-3 my-2 d-flex justify-content-between'>
          <div className='col-md-4'>
            <div className='p-1 bg-white shadow-sm d-flex flex-column justify-content-around align-items-center rounded'>
              <h3 className='fs-3'>Pelaporan</h3>
              <p className='fs-4'>50</p>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='p-1 bg-white shadow-sm d-flex flex-column justify-content-around align-items-center rounded'>
              <h3 className='fs-3'>Diproses</h3>
              <p className='fs-4'>50</p>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='p-1 bg-white shadow-sm d-flex flex-column justify-content-around align-items-center rounded'>
              <h3 className='fs-3'>Selesai</h3>
              <p className='fs-4'>50</p>
            </div>
          </div>
        </div>
      </div>
      <div className='container-fluid'>
        <div className='row mt-4 mx-0 d-flex'>
          <div className='p-1 bg-white shadow-sm d-flex align-items-center flex-column rounded'>
            <h3 className='fs-3'>Maps</h3>
            <p className='fs-4'>Maps</p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default mbuh;
