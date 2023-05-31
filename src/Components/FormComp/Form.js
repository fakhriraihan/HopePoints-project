import React, { useState, useEffect } from "react";
import { Form, Button, Dropdown, Card } from "react-bootstrap";
import PhoneInput from "react-phone-number-input";
import Dropdownlist from "./Dropdown";
import { doc, getDoc, collection, addDoc, GeoPoint } from 'firebase/firestore';
import { db } from '../../Config/firebase';
import MapGL, { Marker, Popup, NavigationControl, ScaleControl, GeolocateControl } from "react-map-gl";

const token = process.env.REACT_APP_MAPBOX_TOKEN;

const FormComp = () => {
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


  const [users, setUser] = useState(null);
  const [name, setName] = useState("");
  const [tlfn, setValue] = useState("");
  const [kekerasanSeksual, setSeksual] = useState(false);
  const [kekerasanFisik, setFisik] = useState(false);
  const [kekerasanPsikis, setPsikis] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const usersData = localStorage.getItem("user");
  
        if (usersData) {
          // Convert data to JavaScript object if found
          const user = JSON.parse(usersData);
  
          // Access user data within the user object
          if (user && user.user) {
            const userData = user.user;
            const uid = userData.uid;
  
            // Call Firebase Firestore to fetch user data
            const docRef = doc(db, 'users', uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              const userData = docSnap.data();
              setUser(userData); // Set user data to state
            } else {
              console.log("User data not found in Firestore.");
            }
          } else {
            console.log("User data not found in localStorage.");
          }
        } else {
          console.log("User data not found in localStorage.");
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };
  
    fetchUserData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      // Buat objek data laporan berdasarkan nilai-nilai dari formulir
      const reportData = {
        kekerasanSeksual: kekerasanSeksual,
        kekerasanFisik: kekerasanFisik,
        kekerasanPsikis: kekerasanPsikis,
        name: name,
        // tlfn: tlfn,
        location: new GeoPoint(newPlace.lat, newPlace.long),
        // tambahkan properti lainnya sesuai dengan data yang ingin disimpan
      };
  
      // Mengakses koleksi 'reports' di Firestore
      const reportsRef = collection(db, 'reports');
  
      // Menyimpan data laporan ke Firestore
      await addDoc(reportsRef, reportData);
  
      console.log('Data laporan berhasil disimpan ke Firestore');
  
      // Lakukan tindakan lainnya setelah berhasil menyimpan data, misalnya, mengosongkan formulir atau menavigasi ke halaman lain
      console.log('Data laporan berhasil disimpan');
  
    } catch (error) {
      console.error('Error menyimpan data laporan:', error);
      throw new Error('Gagal menyimpan data laporan');
    }
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
    <div>
      <h1 className="form-title-page">Sistem Pelaporan Kekerasan terhadap Perempuan dan Anak</h1>
      <h3 className="form-subtitle-page">Sampaikan laporan Anda langsung terhadap kekerasan yang dialami</h3>

      {/* form */}

      <Form className="form-case" onSubmit={handleSubmit}>
        <h1 className="form-title">Sampaikan Pelaporan Anda!</h1>
        <div className="checkbox-container">
          <input type="checkbox" name="kekerasanSeksual" checked={kekerasanSeksual} onChange={handleCheckboxChange} />
          Kekerasan Seksual
        </div>
        <div className="checkbox-container">
          <input type="checkbox" name="kekerasanFisik" checked={kekerasanFisik} onChange={handleCheckboxChange} />
          Kekerasan Fisik
        </div>
        <div className="checkbox-container">
          <input type="checkbox" name="kekerasanPsikis" checked={kekerasanPsikis} onChange={handleCheckboxChange} />
          Kekerasan Psikis
        </div>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Control type="text" placeholder="Nama Pelapor" onChange={(e) => setName(e.target.value)}/>
        </Form.Group>
        <PhoneInput className="phone" defaultCountry="ID" placeholder="Masukkan nomor handphone Anda!" onChange={(e) => setValue(e.target.value)} />
        <Dropdownlist></Dropdownlist>

        <Form.Group className="mb-3" controlId="desc-case ">
          <Form.Control as="textarea" placeholder="Ketikkan isi laporan Anda ..." rows={3} />
        </Form.Group>
        <Form.Group>
          <input className="date-case" type="date" placeholder="Masukkan tanggal kejadian kekerasan" />
        </Form.Group>
        <Form.Group>
          <Card>
            <Card.Body>
              <p>Lokasi Kejadian:</p>
              <div className="map-comp" style={{ width: "1320px", height: "100vh" }}>
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
            </Card.Body>
          </Card>
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label className="mt-3">Bukti Foto atas Kejadian</Form.Label>
          <Form.Control type="file" />
          <Form.Text className="text-muted">*Opsional</Form.Text>
        </Form.Group>
        <Button variant="pink" type="submit">
          Laporkan!
        </Button>
      </Form>
    </div>
  );
};

export default FormComp;
