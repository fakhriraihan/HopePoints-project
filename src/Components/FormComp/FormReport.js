import React, { useState, useEffect } from "react";
import { Button, Card, Form } from 'react-bootstrap';
import Select from "react-select";
import { provinces } from "./province";
import { doc, getDoc, collection, setDoc, GeoPoint } from 'firebase/firestore';
import { db, storage } from '../../Config/firebase';
import MapGL, { Marker, Popup, NavigationControl, ScaleControl, GeolocateControl } from "react-map-gl";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const token = process.env.REACT_APP_MAPBOX_TOKEN;

const FormReportComp = () => {
  //maps
  const [newPlace, setNewPlace] = useState(null); // [longitude, latitude
  const [showPopup, setShowPopup] = React.useState(true);
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
  }, []);

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
      console.log(newPlace);
    }
  }, [newPlace]);

  const usersData = localStorage.getItem("user");
  const user = JSON.parse(usersData);
  const userData = user.user;
  const uid = userData.uid;
  const [users, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [tglkejadian, setTglKejadian] = useState("");
  const [description, setDescription] = useState("");
  const [kekerasanSeksual, setSeksual] = useState(false);
  const [kekerasanFisik, setFisik] = useState(false);
  const [kekerasanPsikis, setPsikis] = useState(false);
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPerc] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {

  
            // Call Firebase Firestore to fetch user data
            const docRef = doc(db, 'users', uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              const userData = docSnap.data();
              setUser(userData); // Set user data to state
            } else {
              console.log("User data not found in Firestore.");
            }
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };
  
    fetchUserData();
  }, []);

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
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
      const idReport = "report" + new Date().getTime();
      const reportData = {
        uid: uid,
        idReport: idReport,
        kekerasanSeksual: kekerasanSeksual,
        kekerasanFisik: kekerasanFisik,
        kekerasanPsikis: kekerasanPsikis,
        name: users.name,
        tlfn: users.tlfn,
        email: users.email,
        title: title,
        tglkejadian: tglkejadian,
        province: selectedProvince.value,
        description: description,
        img: data.img,
        status: "pending",
        location: new GeoPoint(newPlace.lat, newPlace.long),
      };
      
      const reportsRef = collection(db, 'reports');
      const reportDocRef = doc(reportsRef, idReport); // Ganti 'your_custom_id' dengan ID yang Anda inginkan
      await setDoc(reportDocRef, reportData);
  
      console.log('Data laporan berhasil disimpan ke Firestore');
    } catch (error) {
      console.error('Error menyimpan data laporan:', error);
      throw new Error('Gagal menyimpan data laporan');
    }
  };

  const handleProvinceChange = (selectedOption) => {
    setSelectedProvince(selectedOption);
  };
  
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    switch (name) {
      case "kekerasanSeksual":
        setSeksual(checked);
        break;
      case "kekerasanFisik":
        setFisik(checked);
        break;
      case "kekerasanPsikis":
        setPsikis(checked);
        break;
      default:
        break;
    }
  };

  return (
    <div className='px-5 mt-5'>
    <h2 className='text-white my-3'> D</h2>
    <Card>
      <Card.Header>
      <h3 className="form-subtitle-page">Sampaikan laporan Anda langsung terhadap kekerasan yang dialami</h3>
      </Card.Header>
      <Card.Body className=''>
        <div className='row'>
          <div className='col-md-6'>
            <label className='mb-2'>Lokasi Kejadian</label>
            <Card className='mb-3' style={{ width: '100%', height: '25rem' }}>
            <div className="map-comp" style={{ width: "100%", height: "100%" }}>
                <MapGL initialViewState={viewport} mapboxAccessToken={token} mapStyle="mapbox://styles/renanda26/cli49zhib02nc01qyaka1dq8w" width="100%" height="100%" onViewportChange={setViewPort}>
                  {newPlace && (
                    <>
                      <Marker latitude={newPlace?.lat} longitude={newPlace?.long} offsetleft={-3.5 * viewport.zoom} offsetTop={-7 * viewport.zoom} draggable={true} onDragEnd={handleMarkerDragEnd} style={{ zIndex: 999 }}>
                        <i
                          className="fa-solid fa-location-dot"
                          style={{
                            fontSize: 7 * viewport.zoom,
                            color: "tomato",
                            cursor: "pointer",
                          }}
                        ></i>
                      </Marker>
                    </>
                  )}
                  <GeolocateControl position="bottom-right" onGeolocate={handleGeolocateClick} />
                  <NavigationControl position="bottom-right" />
                  <ScaleControl />
                </MapGL>
              </div>
            </Card>
          </div>
          <div className='col-md-6'>
          <label className='mb-2'>Detail Kejadian</label>
            <Form onSubmit={handleSubmit}>
              <Form.Group className='mb-3' controlId='formGroupName'>
              <Form.Label>Infromasi Pelapor</Form.Label>
              <Card>
                <Card.Body style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <Card.Text>
                      <strong>Name:</strong> {users?.name}<br />
                      <strong>Email:</strong> {users?.email}<br />
                      <strong>Telephone:</strong> {users?.tlfn}
                    </Card.Text>
                  </div>
                  <Button variant="primary">Change</Button>
                </Card.Body>

              </Card>
              </Form.Group>
              <Form.Group className='mb-3' controlId='formGroupName'>
                <Form.Label>Title</Form.Label>
                <Form.Control type='text' placeholder='' onChange={(e) => setTitle(e.target.value)} required/>
              </Form.Group>
              <Form.Group className='mb-3' controlId='formGroupName'>
              <Form.Label>Jenis Kekerasan</Form.Label>
                <Form.Check
                    type="checkbox" label="Kekerasan Seksual" name="kekerasanSeksual" checked={kekerasanSeksual} onChange={handleCheckboxChange}
                  />
                  <Form.Check
                    type="checkbox" label="Kekerasan Fisik" name="kekerasanFisik" checked={kekerasanFisik} onChange={handleCheckboxChange}
                  />
                  <Form.Check
                    type="checkbox" label="Kekerasan Psikis" name="kekerasanPsikis" checked={kekerasanPsikis} onChange={handleCheckboxChange}
                  />
              </Form.Group>
              <Form.Group className='mb-3' controlId="dateInput">
                <Form.Label>Date:</Form.Label>
                <Form.Control type="date" onChange={(e) => setTglKejadian(e.target.value)} required/>
              </Form.Group>
              <Form.Group className='mb-3' controlId="dateInput">
                <Form.Label>Province Kejadian</Form.Label>
                <Select placeholder="" value={selectedProvince} options={provinces} onChange={handleProvinceChange} required/>
              </Form.Group>
              <Form.Group className='mb-3' controlId='formGridDescription'>
                <Form.Label>Description</Form.Label>
                <Form.Control as='textarea' rows={3}  onChange={(e) => setDescription(e.target.value)} />
              </Form.Group>
              <Form.Group className='mb-3' controlId="fileInput">
                <Form.Label>Choose a file:</Form.Label>
                <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])}/>
              </Form.Group>
                <Button variant='success' type='submit'>
                  laporkan!
                </Button>
            </Form>
          </div>
        </div>
      </Card.Body>
    </Card>
  </div>
  );
};

export default FormReportComp;
