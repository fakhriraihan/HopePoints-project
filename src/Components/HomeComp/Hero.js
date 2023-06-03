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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero,
              eius? Obcaecati perferendis voluptas temporibus. Eius neque qui
              quam quidem alias.
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
