import React from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import hero from '../../assets/hero/hero.png';
import './home.css';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container className='hero'>
        <div className='d-flex'>
          <div className='wrap-text'>
            <h1 className='title'>HopePoints</h1>
            <p className='subtitle'>
              Kami hadir untuk mendengar dan membantu Anda mengatasi kekerasan
              yang dialami perempuan dan anak-anak. Laporkan kekerasan sekarang
              dan bersama-sama kita wujudkan dunia yang aman bagi perempuan dan
              anak-anak.
            </p>
            <button onClick={() => navigate('/form')}>Laporkan!</button>
          </div>
          <div className='image'>
            <img src={hero} alt='hero HopePoints' />
          </div>
        </div>
      </Container>
    </>
  );
};

export default Hero;
