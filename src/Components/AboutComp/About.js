import React from 'react';
import { Container } from 'react-bootstrap';
import './about.css';
import aboutus from '../../assets/hero/aboutus.png';

const About = () => {
  return (
    <div className='about-container'>
      <Container>
        <div className='about'>
          <div className='wrap-about'>
            <h1 className='title'> Tentang HopePoints</h1>
            <p className='description'>
              HopePoints adalah website pelayanan terhadap perempuan dan anak
              yang mendukung hak-hak perempuan dan anak agar terbebas dari
              segala bentuk kekerasan, dengan komitmen untuk membangun kesadaran
              dan menciptakan perubahan sosial untuk mencapai dampak yang
              positif.
            </p>
          </div>
          <div className='image'>
            <img src={aboutus} alt='about HopePoints' />
          </div>
        </div>
      </Container>
    </div>
  );
};
export default About;
