import React from 'react';
import Nav from '../../Components/DashboardComp/Nav';
import { Card } from 'react-bootstrap';
import './dashboardcomp.css';

const Dashboard = ({ Toggle }) => {
  return (
    <div className='px-3'>
      <Nav Toggle={Toggle} />
      <h2 className='text-white mb-3'>Dashboard</h2>
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
        <Card className='my-3' style={{ width: '100%', height: '28rem' }}>
          <Card.Body>Ini untuk maps</Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
