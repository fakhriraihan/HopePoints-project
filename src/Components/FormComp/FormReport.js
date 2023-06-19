import React, { useState, useEffect } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import Select from 'react-select';
import {
  doc,
  collection,
  setDoc,
  GeoPoint,
  Timestamp,
} from 'firebase/firestore';
import { db, storage } from '../../Config/firebase';
import MapGL, {
  Marker,
  NavigationControl,
  ScaleControl,
  GeolocateControl,
} from 'react-map-gl';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { GetUserById, ProvincesSelect } from '../../Utils/crudData';
import Swal from 'sweetalert2';

const token = process.env.REACT_APP_MAPBOX_TOKEN;
const FormReportComp = () => {
  //maps
  const [newPlace, setNewPlace] = useState(null); // [longitude, latitude
  const [viewport, setViewPort] = useState({
    longitude: 117.27756850787405,
    latitude: 0.09273370918533735,
    zoom: 4.3,
  });

  const handleMarkerDragEnd = (event) => {
    const { lngLat } = event;
    const { lng, lat } = lngLat;
    setNewPlace({ lat, long: lng });
  };

  useEffect(() => {
    // Set initial marker on map load
    setNewPlace({
      lat: viewport.latitude,
      long: viewport.longitude,
    });
  }, [viewport.latitude, viewport.longitude]);

  const handleGeolocateClick = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setViewPort((prevViewport) => ({
          ...prevViewport,
          longitude,
          latitude,
        }));
        setNewPlace({ lat: latitude, long: longitude });
      },
      (error) => {
        console.error(error);
      }
    );
  };

  useEffect(() => {
    if (newPlace) {
    }
  }, [newPlace]);

  const usersData = localStorage.getItem('user');
  const user = JSON.parse(usersData);
  const userData = user.user;
  const uid = userData.uid;
  const [users, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [tglkejadian, setTglKejadian] = useState('');
  const [description, setDescription] = useState('');
  const [kekerasanSeksual, setSeksual] = useState(false);
  const [kekerasanFisik, setFisik] = useState(false);
  const [kekerasanPsikis, setPsikis] = useState(false);
  const [file, setFile] = useState('');
  const [data, setData] = useState({});

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };

    if (file) {
      uploadFile();
    }
  }, [file]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to submit the form?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Submit',
        cancelButtonText: 'Cancel',
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        const timestamp = Timestamp.fromDate(new Date());
        const date = timestamp.toDate();
        const dateString = date.toLocaleString('id-ID', {
          timeZone: 'Asia/Jakarta',
          dateStyle: 'long',
          timeStyle: 'medium',
        });
        const idReport = 'report' + new Date().getTime();
        const img = data.img ? data.img : null;

        const reportData = {
          uid: uid,
          idReport: idReport,
          tgl: dateString,
          kekerasanSeksual: kekerasanSeksual,
          kekerasanFisik: kekerasanFisik,
          kekerasanPsikis: kekerasanPsikis,
          name: users.name,
          tlfn: users.phone,
          email: users.email,
          title: title,
          tglkejadian: tglkejadian,
          idOffice: selectedProvince.value,
          nameOffice: selectedProvince.label,
          description: description,
          img: img, // Menggunakan null jika URL tidak tersedia
          status: 'pending',
          location: new GeoPoint(newPlace.lat, newPlace.long),
        };

        const reportsRef = collection(db, 'reports');
        const reportDocRef = doc(reportsRef, idReport);
        await setDoc(reportDocRef, reportData);

        Swal.fire({
          title: 'Berhasil',
          text: 'Data laporan berhasil disubmit, Klik OK untuk melihat status laporan',
          icon: 'success',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = '/profile/list';
          }
        });
      } else {
      }
    } catch (error) {
      console.error('Error menyimpan data laporan:', error);
      Swal.fire({
        title: 'Error',
        text: 'Gagal menyimpan data laporan',
        icon: 'error',
      });
    }
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    switch (name) {
      case 'kekerasanSeksual':
        setSeksual(checked);
        break;
      case 'kekerasanFisik':
        setFisik(checked);
        break;
      case 'kekerasanPsikis':
        setPsikis(checked);
        break;
      default:
        break;
    }
  };

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-md-7 px-2 mt-4 mb-5'>
          <h2 className='text-white my-3'> D</h2>
          {/* <div className='col-md-6'> */}
          <Card>
            <Card.Header>
              <h3 className='form-subtitle-page'>
                Sampaikan laporan Anda langsung terhadap kekerasan yang dialami
              </h3>
            </Card.Header>

            <Card.Body className=''>
              <Form.Group className='mb-3' controlId='formGroupName'>
                <Form.Label className='fw-bold'>Infromasi Pelapor</Form.Label>
                <Card>
                  <Card.Body
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <Card.Text>
                        <strong>Nama:</strong> {users?.name}
                        <br />
                        <strong>Email:</strong> {users?.email}
                        <br />
                        <strong>Telephone:</strong> {users?.phone}
                      </Card.Text>
                    </div>
                    <Button
                      variant='primary'
                      onClick={() => {
                        window.location.href = '/profile';
                      }}
                    >
                      {' '}
                      Change
                    </Button>
                  </Card.Body>
                </Card>
              </Form.Group>

              <label className='mb-2 fw-bold'>Lokasi Kejadian</label>
              <Card className='' style={{ width: '100%', height: '25rem' }}>
                <div
                  className='map-comp'
                  style={{ width: '100%', height: '100%' }}
                >
                  <MapGL
                    initialViewState={viewport}
                    mapboxAccessToken={token}
                    mapStyle='mapbox://styles/renanda26/cli49zhib02nc01qyaka1dq8w'
                    width='100%'
                    height='100%'
                    onViewportChange={setViewPort}
                  >
                    {newPlace && (
                      <>
                        <Marker
                          latitude={newPlace?.lat}
                          longitude={newPlace?.long}
                          offsetleft={-3.5 * viewport.zoom}
                          offsetTop={-7 * viewport.zoom}
                          draggable={true}
                          onDragEnd={handleMarkerDragEnd}
                          style={{ zIndex: 999 }}
                        >
                          <i
                            className='fa-solid fa-location-dot'
                            style={{
                              fontSize: 7 * viewport.zoom,
                              color: 'tomato',
                              cursor: 'pointer',
                            }}
                          ></i>
                        </Marker>
                      </>
                    )}
                    <GeolocateControl
                      position='bottom-right'
                      onGeolocate={handleGeolocateClick}
                    />
                    <NavigationControl position='bottom-right' />
                    <ScaleControl />
                  </MapGL>
                </div>
              </Card>
              <p style={{ textAlign: 'center', padding: '0 20px' }}>
                <small
                  style={{
                    color: 'orange',
                    fontSize: '0.7rem',
                    textAlign: 'center',
                    justifyContent: 'center',
                  }}
                >
                  Mohon masukan lokasi dengan benar, agar dapat membantu kami
                  mengumpulkan informasi yang dibutuhkan
                </small>
              </p>
              <label className='mb-2 fw-bold'>Detail Kejadian</label>
              <Form onSubmit={handleSubmit}>
                <Form.Group className='mb-3' controlId='formGroupName'>
                  <Form.Label>Judul</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Masukan judul pelaporanmu'
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className='mb-3' controlId='formGroupName'>
                  <Form.Label>Jenis Kekerasan</Form.Label>
                  <Form.Check
                    type='checkbox'
                    label='Kekerasan Seksual'
                    name='kekerasanSeksual'
                    checked={kekerasanSeksual}
                    onChange={handleCheckboxChange}
                  />
                  <Form.Check
                    type='checkbox'
                    label='Kekerasan Fisik'
                    name='kekerasanFisik'
                    checked={kekerasanFisik}
                    onChange={handleCheckboxChange}
                  />
                  <Form.Check
                    type='checkbox'
                    label='Kekerasan Psikis'
                    name='kekerasanPsikis'
                    checked={kekerasanPsikis}
                    onChange={handleCheckboxChange}
                  />
                </Form.Group>
                <Form.Group className='mb-3' controlId='dateInput'>
                  <Form.Label>Tanggal Kejadian:</Form.Label>
                  <Form.Control
                    type='date'
                    onChange={(e) => setTglKejadian(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group id='province'>
                  <Form.Label>Kantor</Form.Label>
                  <Select
                    placeholder='Pilih kantor yang dituju untuk pelaporan'
                    className='mb-3'
                    options={provinces}
                    onChange={(selectedOption) =>
                      setSelectedProvince(selectedOption)
                    }
                  />
                </Form.Group>
                <Form.Group className='mb-3' controlId='formGridDescription'>
                  <Form.Label>Deskripsi</Form.Label>
                  <Form.Control
                    as='textarea'
                    placeholder='Masukan deskripsi pelaporanmu'
                    rows={3}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className='mb-3' controlId='fileInput'>
                  <Form.Label>
                    Bukti Gambar{' '}
                    <small style={{ color: 'orange', fontSize: '0.7rem' }}>
                      Opsional
                    </small>
                  </Form.Label>
                  <Form.Control
                    type='file'
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </Form.Group>
                <Button variant='success' type='submit'>
                  laporkan!
                </Button>
              </Form>
              {/* </div> */}
            </Card.Body>
          </Card>
          {/* </div> */}

          <GetUserById setUser={setUser} uid={uid} />
          <ProvincesSelect setProvinces={setProvinces} />
        </div>
      </div>
    </div>
  );
};

export default FormReportComp;
