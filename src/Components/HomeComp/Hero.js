import React from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './home.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container className="hero">
        <div className="d-flex">
          <div className="wrap-text">
            <h1 className="title">HopePoints</h1>
            <p className="subtitle">Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, eius? Obcaecati perferendis voluptas temporibus. Eius neque qui quam quidem alias.</p>
            <button onClick={() => navigate('form')}>Laporkan!</button>
          </div>
          <div className="image">
            <img src="/assets/hero/hero.png" alt="hero HopePoints" />
          </div>
        </div>
      </Container>
      <section className="feature">
        <h1 className="fiturTitle">Explore Our Feature</h1>
        <div className="overlay">
          <div className="featureForm">
            <img src="/assets/logo.png" alt="fitur form"></img>
            <h2 className="featureFormTitle">Form</h2>
          </div>
          <div className="featureForm">
            <img src="/assets/logo.png" alt="fitur form"></img>
            <h2 className="featureFormTitle">Maps</h2>
          </div>
          <div className="featureForm">
            <img src="/assets/logo.png" alt="fitur form"></img>
            <h2 className="featureFormTitle">Office</h2>
          </div>
        </div>
        <button onClick={() => navigate('')}>Registrasi</button>
      </section>
      <section className="tutorials">
        <h1 className="tutorial">Cara Penggunaan</h1>
        <p className="tutorial-description">Silahkan cek tutorial berikut agar kamu tidak salah langkah ya</p>
        <div className="dropdown">
          <DropdownButton id="dropdown-item-button" title="Cara Penggunaan">
            <Dropdown.ItemText id="dropdown-text">Dropdown asfas item text Dropdown item text Dropdown item text Dropdown item text Dropdown item text</Dropdown.ItemText>
            <Dropdown.ItemText id="dropdown-text">Dropdown item text</Dropdown.ItemText>
            <Dropdown.ItemText id="dropdown-text">Dropdown item text</Dropdown.ItemText>
            <Dropdown.ItemText id="dropdown-text">Dropdown item text</Dropdown.ItemText>
            <Dropdown.ItemText id="dropdown-text">Dropdown item text</Dropdown.ItemText>
          </DropdownButton>
        </div>
      </section>
    </>
  );
};

export default Hero;
