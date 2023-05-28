import { useState } from "react";
import { Form, Button, Dropdown } from "react-bootstrap";
import Map from "react-map-gl";
import PhoneInput from "react-phone-number-input";

const FormComp = () => {
  const token = process.env.REACT_APP_MAPBOX_TOKEN;
  const kekerasanSeksual = useState(true);
  const kekerasanFisik = useState(true);
  const kekerasanPsikis = useState(true);
  const [newPlace, setNewPlace] = useState(null);


  const handleChange = (data) => {
    console.log(data);
  };

  const [date, setDate] = useState();

  console.log("Date", date);

  // phone number
  const [value, setValue] = useState();

  const [viewport, setViewport] = useState({
    longitude: 120.37460565850304,
    latitude: -2.09293964838372,
    zoom: 4,
  });

  const handleAddClick = (e) => {
    const [longitude, latitude] = e.lngLat;
    setNewPlace({
      lat: latitude,
      long: longitude,
    });
  };

  return (
    <div>
      <h1 className="form-title-page">Sistem Pelaporan Kekerasan terhadap Perempuan dan Anak</h1>
      <h3 className="form-subtitle-page">Sampaikan laporan Anda langsung terhadap kekerasan yang dialami</h3>

      {/* form */}

      <Form className="form-case">
        <h1 className="form-title">Sampaikan Pelaporan Anda!</h1>
        <div className="checkbox-container">
          <input type="checkbox" value={kekerasanSeksual} onChange={() => handleChange("Kekerasan Seksual")} />
          Kekerasan Seksual
        </div>
        <div className="checkbox-container">
          <input type="checkbox" value={kekerasanFisik} onChange={() => handleChange("Kekerasan Fisik")} />
          Kekerasan Fisik
        </div>
        <div className="checkbox-container">
          <input type="checkbox" value={kekerasanPsikis} onChange={() => handleChange("Kekerasan Psikis")} />
          Kekerasan Psikis
        </div>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Control type="email" placeholder="Nama Pelapor" />
          <Form.Text className="text-muted">*Opsional</Form.Text>
        </Form.Group>
        <PhoneInput className="phone" defaultCountry="ID" placeholder="Masukkan nomor handphone Anda!" value={value} onChange={setValue} />
        <Dropdown>
          <Dropdown.Toggle className="mt-2 mb-3" variant="pink" id="dropdown-basic">
            Daerah Kejadian
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Provinsi Aceh</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Provinsi Sumatera Utara</Dropdown.Item>
            <Dropdown.Item href="#/action-3">..dst</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Form.Group className="mb-3" controlId="title-case">
          <Form.Control type="text" placeholder="Masukkan judul laporan Anda!" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="desc-case ">
          <Form.Control as="textarea" placeholder="Ketikkan isi laporan Anda ..." rows={3} />
        </Form.Group>
        <Form.Group>
          <input className="date-case" type="date" placeholder="Masukkan tanggal kejadian kekerasan" onChange={(e) => setDate(e.target.value)} />
          <p>Tanggal terjadi: {date} </p>
        </Form.Group>
        <Form.Group>
          <div className="map-comp" style={{ width: "100%", height: "100vh" }}>
          <Form.Label>Masukkan Lokasi Kejadian:</Form.Label>
            <Map initialViewState={viewport} 
            mapboxAccessToken={token} 
            mapStyle="mapbox://styles/renanda26/cli49zhib02nc01qyaka1dq8w"
            onViewportChange={(viewport) => setViewport(viewport)}
            width="100%" 
            height="100%" 
            transitionDuration="200"
            onDblClick={handleAddClick}></Map>
          </div>
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Bukti Foto atas Kejadian</Form.Label>
          <Form.Control type="file" />
          <Form.Text className="text-muted">*Opsional</Form.Text>
        </Form.Group>
        {["radio"].map((type) => (
          <div key={`reverse-${type}`} className="mb-3">
            <Form.Check reverse label="Anonim" name="group1" type={type} id={`reverse-${type}-1`} />
            <Form.Check reverse label="Rahasia  " name="group1" type={type} id={`reverse-${type}-2`} />
          </div>
        ))}
        <Button variant="pink" type="submit">
          Laporkan!
        </Button>
      </Form>
    </div>
  );
};

export default FormComp;
