import React, { useState } from 'react';
import Map, {
  Marker,
  NavigationControl,
  ScaleControl,
  GeolocateControl,
} from 'react-map-gl';
import { Button, Card, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { GetDetailReport, handelChangeStatus } from '../../Utils/crudData';
import Swal from 'sweetalert2';

const token = process.env.REACT_APP_MAPBOX_TOKEN;
const DashDetailReport = () => {
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

  const handleProcessSubmit = async () => {
    try {
      const { isConfirmed } = await Swal.fire({
        title: 'Konfirmasi',
        text: 'Apakah Anda yakin ingin memproses laporan ini?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya',
        cancelButtonText: 'Batal',
      });

      if (isConfirmed) {
        // Perbarui status menjadi "Diproses" di database
        const setStatus = 'proses';
        handelChangeStatus(setReport, setStatus, id);

        Swal.fire('Berhasil', 'Status laporan berhasil diperbarui!', 'success');
      }
    } catch (error) {
      console.log('Error updating status:', error);
    }
  };

  const handleSelesaiSubmit = async () => {
    try {
      const { isConfirmed } = await Swal.fire({
        title: 'Konfirmasi',
        text: 'Apakah Anda yakin ingin menyelesaikan laporan ini?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya',
        cancelButtonText: 'Batal',
      });

      if (isConfirmed) {
        const setStatus = 'selesai';
        handelChangeStatus(setReport, setStatus, id);

        Swal.fire('Berhasil', 'Status laporan berhasil diperbarui!', 'success');
      }
    } catch (error) {
      console.log('Error updating status:', error);
    }
  };

  const handleBatalSubmit = async () => {
    try {
      const { isConfirmed } = await Swal.fire({
        title: 'Konfirmasi',
        text: 'Apakah Anda yakin ingin menolak laporan ini?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya',
        cancelButtonText: 'Batal',
      });

      if (isConfirmed) {
        const setStatus = 'tolak';
        handelChangeStatus(setReport, setStatus, id)

        Swal.fire('Berhasil', 'Status laporan berhasil ditolak!', 'success');
      }
    } catch (error) {
      console.log('Error updating status:', error);
    }
  };


  return (
    <div className='container-dashboard'>
      <GetDetailReport setReport={setReport} setViewPort={setViewPort} id={id} />
      <Nav Toggle={Toggle} />
      <h2 className='text-white my-3'>Detail Report</h2>
      <Card className='mb-5'>
      <Card.Header>
        <div>
          <Button
            variant='danger'
            type='cancel'
            onClick={() => navigate('/dashboard/report')}
          >
            Cancel
          </Button>
        </div>
        
      </Card.Header>
        <Card.Body className=''>
          <Card className='p-3 mb-3'>
          <div style={{ textAlign: 'left' }}>
          <strong>Tanggal Pelaporan</strong> <br />
          <small>{report?.tgl}</small> <br />
          <strong>Status : </strong> 
          <small>{report?.status}</small> 
        </div>
          </Card>
        
          <div className='row'>
            <div className='col-md-6'>
              <label className='mb-2'><b>LOKASI KEJADIAN</b></label>
              <Card className='mb-3' style={{ width: '100%', height: '25rem' }}>
                <Card.Body>
                  {report && report.location && (
                    <Map
                      initialViewState={viewport}
                      mapboxAccessToken={token}
                      mapStyle='mapbox://styles/renanda26/cli49zhib02nc01qyaka1dq8w'
                      width='100%'
                      height='100%'
                      onViewportChange={setViewPort}
                    >
                      <Marker
                        key={report?.idReport}
                        latitude={report?.location.latitude}
                        longitude={report?.location.longitude}
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
                  )}
                </Card.Body>
              </Card>
            </div>
            <div className='col-md-6'>
              <label className='mb-2'><b>DETAIL KEJADIAN</b></label>
              <Form>
                <Form.Group className='mb-3' controlId='formGroupName'>
                  <Form.Label>Infromasi Pelapor</Form.Label>
                  <Card>
                    <Card.Body
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <Card.Text>
                          <strong>Name:</strong> {report?.name}
                          <br />
                          <strong>Email:</strong> {report?.email}
                          <br />
                          <strong>Telephone:</strong> {report?.tlfn}
                        </Card.Text>
                      </div>
                    </Card.Body>
                  </Card>
                </Form.Group>
                <Form.Group className='mb-3' controlId='formGroupTitle'>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type='text'
                    defaultValue={report?.title}
                    readOnly
                  />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formGroupName'>
                  <Form.Label>Tanggal dan Waktu Kejadian</Form.Label>
                  <Form.Control
                    type='dateandtime'
                    placeholder=''
                    defaultValue={report?.tglkejadian}
                    readOnly
                  />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formGridAddress'>
                  <Form.Label>Jenis Kekerasan</Form.Label>
                  <Form.Control
                    placeholder='1234 Main St'
                    defaultValue={
                      (report?.kekerasanFisik ? 'Fisik ' : '') +
                      (report?.kekerasanPsikis ? 'Psikis ' : '') +
                      (report?.kekerasanSeksual ? 'Seksual' : '')
                    }
                    readOnly
                  />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formGridAddress'>
                  <Form.Label>Kantor Terdekat</Form.Label>
                  <Form.Control
                    placeholder='1234 Main St'
                    defaultValue={report?.nameOffice}
                    readOnly
                  />
                </Form.Group>
              <Form.Group className='mb-3' controlId='formGridDescription'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as='textarea'
                  rows={3}
                  defaultValue={report?.description}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="formGridImg" style={{marginBottom: '1rem'}}>
                  <Form.Label>Gambar</Form.Label>
                  <br />
                  {report?.img ? (
                    <img src={report.img} alt="Gambar" className="img-fluid" />
                  ) : (
                    <p>Gambar tidak tersedia</p>
                  )}
                </Form.Group>
                {report?.status !== 'tolak' && (
                   <Button variant='danger' onClick={handleBatalSubmit}>
                        Tolak
                      </Button>
                  )}
                {report?.status === 'pending' ? (
                  <>
                      <Button variant='warning' style={{marginLeft: '5px'}} onClick={handleProcessSubmit}>
                      Proses
                    </Button>
                  </>
                ) : (
                  <>
                    {report?.status === 'proses' && (
                      <Button variant='success' style={{marginLeft: '5px'}} onClick={handleSelesaiSubmit}>
                      Laporan Sudah Selesai
                    </Button>
                    )}
                  </>
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
