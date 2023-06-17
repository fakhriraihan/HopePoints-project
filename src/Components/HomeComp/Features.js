import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

const Features = () => {
  const navigate = useNavigate();
  return (
    <section className='feature p-4'>
      <h1 className='fiturTitle mb-5 mt-3'>Explore Our Feature</h1>
      <div className='container-fluid mb-5'>
        <div className='row g-3 d-flex justify-content-around align-items-center'>
          <div className='col-md-3 mb-3'>
            <div className='featureForm' onClick={() => navigate('/form')}>
              <h2 className='featureFormTitle'>Form</h2>
              <i className='fa-solid fa-file-pen'></i>
              <p>
                Kamu dapat menggunakan fitur Form ini untuk membantu kami dengan
                mudah mengumpulkan informasi yang dibutuhkan{' '}
              </p>
            </div>
          </div>
          <div className='col-md-3 mb-3'>
            <div className='featureForm' onClick={() => navigate('/maps')}>
              <h2 className='featureFormTitle'>Maps</h2>
              <i className='fa-solid fa-map-location-dot'></i>
              <p>
                Fitur Map ini akan membantu kamu dalam melihat lokasi rawan kekerasan terhadap perempuan dan anak
              </p>
            </div>
          </div>
          <div className='col-md-3'>
            <div className='featureForm' onClick={() => navigate('/office')}>
              <h2 className='featureFormTitle'>Office</h2>
              <i className='fa-regular fa-building'></i>
              <p>
                Kamu bisa melihat daftar Kantor terdekat yang terdaftar pada
                fitur ini{' '}
              </p>
            </div>
          </div>
        </div>
      </div>
      <button onClick={() => navigate('/register')}>Registrasi</button>
    </section>
  );
};

export default Features;
