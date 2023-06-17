import React, { useState } from 'react';
import Map, {
  Marker,
  NavigationControl,
  ScaleControl,
  GeolocateControl,
} from 'react-map-gl';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import './dashboardcomp.css';
import { GetReport } from '../../Utils/crudData';
import {
  getUserRoleFromLocalStorage,
  getIdOfficeFromLocalStorage,
} from '../../Utils/UserData';

const token = "pk.eyJ1IjoicmVuYW5kYTI2IiwiYSI6ImNsaHgxMTkzdzBsZWkzbW4wMnZ5cDd0OTgifQ.ubLqseZPFD3Ym8ENEzvbCw";
const userRole = getUserRoleFromLocalStorage();
const idOffice = getIdOfficeFromLocalStorage();

const Dashboard = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [viewport, setViewPort] = useState({
    longitude: 117.27756850787405,
    latitude: 0.09273370918533735,
    zoom: 3.9,
  });

  const getProcessedReportsCount = () => {
    const processedReports = reports.filter(
      (report) => report.status === 'proses'
    );
    return processedReports.length;
  };

  const getDoneReportsCount = () => {
    const doneReports = reports.filter((report) => report.status === 'selesai');
    return doneReports.length;
  };

  const getCanceledReportsCount = () => {
    const canceledReports = reports.filter(
      (report) => report.status === 'tolak'
    );
    return canceledReports.length;
  };

  return (
    <div className='container-dashboard'>
      <h2 className='text-white text-center mb-3'>Dashboard</h2>
      <div className='container-fluid px-0'>
        <div className='row g-3 d-flex justify-content-between'>
          <div className='col-md-3'>
            <Card>
              <Card.Body className='text-center'>
                <Card.Title as='h3'>Laporan</Card.Title>
                <Card.Text className='fs-4'>{reports.length}</Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className='col-md-3'>
            <Card>
              <Card.Body className='text-center'>
                <Card.Title as='h3'>Proses</Card.Title>
                <Card.Text className='fs-4'>
                  {getProcessedReportsCount()}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className='col-md-3'>
            <Card>
              <Card.Body className='text-center'>
                <Card.Title as='h3'>Selesai</Card.Title>
                <Card.Text className='fs-4'>{getDoneReportsCount()}</Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className='col-md-3'>
            <Card>
              <Card.Body className='text-center'>
                <Card.Title as='h3'>Ditolak</Card.Title>
                <Card.Text className='fs-4'>
                  {getCanceledReportsCount()}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
        <Card className='my-3' style={{ width: '100wh', height: '30.5rem' }}>
          <Card.Body>
            <Map
              initialViewState={viewport}
              mapboxAccessToken={token}
              mapStyle='mapbox://styles/renanda26/cli49zhib02nc01qyaka1dq8w'
              width='100%'
              height='100%'
              onViewportChange={setViewPort}
            >
              {reports.map((report) => (
                <Marker
                  key={report.idReport}
                  latitude={report.location.latitude}
                  longitude={report.location.longitude}
                  offsetleft={-3.5 * viewport.zoom}
                  offsetTop={-7 * viewport.zoom}
                  draggable={false}
                  style={{ zIndex: 999 }}
                  onClick={() =>
                    navigate(`/dashboard/report/detail/${report.idReport}`)
                  }
                >
                  <i
                    className='fa-solid fa-location-dot'
                    style={{
                      fontSize: 5 * viewport.zoom,
                      color: 'tomato',
                      cursor: 'pointer',
                    }}
                  ></i>
                </Marker>
              ))}
              <GeolocateControl position='bottom-right' />
              <NavigationControl position='bottom-right' />
              <ScaleControl />
            </Map>
          </Card.Body>
        </Card>
        {userRole === 'admin' ? (
          <GetReport setReports={setReports} />
        ) : (
          <GetReport setReports={setReports} idOffice={idOffice} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
