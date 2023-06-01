import React from 'react';
import './office.css';
import OfficeCard from './OfficeCard';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Office = () => {
  return (
    <>
      <Form className="d-flex">
        <Form.Control type="search" placeholder="Cari Kantor Terdekat" className="me-2" aria-label="Search" />
        <Button variant="">Search</Button>
      </Form>
      <div className="row">
        <div className="col">
          <OfficeCard />
        </div>
        <div className="col">
          <OfficeCard />
        </div>
        <div className="col">
          <OfficeCard />
        </div>
        <div className="col">
          <OfficeCard />
        </div>
        <div className="col">
          <OfficeCard />
        </div>
        <div className="col">
          <OfficeCard />
        </div>
        <div className="col">
          <OfficeCard />
        </div>
        <div className="col">
          <OfficeCard />
        </div>
        <div className="col">
          <OfficeCard />
        </div>
      </div>
    </>
  );
};

export default Office;
