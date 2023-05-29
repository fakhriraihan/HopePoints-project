import { useState } from "react";
import { Form, Button, Dropdown, Card } from "react-bootstrap";
import MapForm from "../MapComp/FormMap";
import PhoneInput from "react-phone-number-input";
import Dropdownlist from "./Dropdown";

const FormComp = () => {
  const token = process.env.REACT_APP_MAPBOX_TOKEN;
  const kekerasanSeksual = useState(true);
  const kekerasanFisik = useState(true);
  const kekerasanPsikis = useState(true);

  const handleChange = (data) => {
    console.log(data);
  };

  const [date, setDate] = useState();

  console.log("Date", date);

  // phone number
  const [value, setValue] = useState();

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
        </Form.Group>
        <PhoneInput className="phone" defaultCountry="ID" placeholder="Masukkan nomor handphone Anda!" value={value} onChange={setValue} />
        <Dropdownlist></Dropdownlist>

        <Form.Group className="mb-3" controlId="desc-case ">
          <Form.Control as="textarea" placeholder="Ketikkan isi laporan Anda ..." rows={3} />
        </Form.Group>
        <Form.Group>
          <input className="date-case" type="date" placeholder="Masukkan tanggal kejadian kekerasan" onChange={(e) => setDate(e.target.value)} />
          <p className="date">Tanggal terjadi: {date} </p>
        </Form.Group>
        <Form.Group>
          <Card>
            <Card.Body>
              <p>Lokasi Kejadian:</p>
              <MapForm></MapForm>
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
