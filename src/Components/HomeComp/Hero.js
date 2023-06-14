import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import hero from '../../assets/hero/hero.png';
import './home.css';
import { AiOutlineForm } from 'react-icons/ai';
import { BsPinMap } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const [activeCollapseId, setActiveCollapseId] = useState(null);

  const handleAccordionToggle = (id) => {
    setActiveCollapseId(activeCollapseId === id ? null : id);
  };

  return (
    <>
      <Container className="hero">
        <div className="d-flex">
          <div className="wrap-text">
            <h1 className="title">HopePoints</h1>
            <p className="subtitle">
              Kami hadir untuk mendengar dan membantu Anda mengatasi kekerasan yang dialami perempuan dan anak-anak. Laporkan kekerasan sekarang dan bersama-sama kita wujudkan dunia yang aman bagi perempuan dan anak-anak.
            </p>
            <button onClick={() => navigate('/form')}>Laporkan!</button>
          </div>
          <div className="image">
            <img src={hero} alt="hero HopePoints" />
          </div>
        </div>
      </Container>
      <section className="feature">
        <h1 className="fiturTitle">Explore Our Feature</h1>
        <div className="overlay">
          <div className="featureForm" style={{ fontSize: '100px' }}>
            <h2 className="featureFormTitle">Form</h2>
            <AiOutlineForm />
            <p>Kamu dapat menggunakan fitur Form ini untuk membantu kami dengan mudah mengumpulkan informasi yang dibutuhkan </p>
          </div>
          <div className="featureForm" style={{ fontSize: '100px' }}>
            <h2 className="featureFormTitle">Maps</h2>
            <BsPinMap />
            <p>Fitur Map ini akan membantu kamu dalam melihat lokasi yang dibutuhkan</p>
          </div>
          <div className="featureForm" style={{ fontSize: '100px' }} onClick={() => navigate('/form')}>
            <h2 className="featureFormTitle">Office</h2>
            <i className="fa-regular fa-building"></i>
            <p>Kamu bisa melihat daftar Kantor terdekat yang terdaftar pada fitur ini </p>
          </div>
        </div>
        <button onClick={() => navigate('/register')}>Registrasi</button>
      </section>
      <section className="faq">
        <div className="faq-title">
          <h2>Cara Penggunaan</h2>
          <p>Silahkan cek tutorial berikut agar kamu tidak salah langkah ya</p>
        </div>

        <div className="faq-list">
          <div className="col-12 col-sm-10 col-lg-9">
            <div className="accordion faq-accordian" id="faqAccordion">
              <div className="card border-0 wow fadeInUp " data-wow-delay="0.2s" style={{ visibility: 'visible', animationDelay: '0.4s', animationName: 'fadeInUp' }}>
                <div className="card-header" id="headingOne">
                  <h6 className="mb-0 collapsed" data-toggle="collapse" data-target="#collapseOne" aria-controls="collapseOne" onClick={() => handleAccordionToggle(1)}>
                    Apa itu HopePoints?<span className="lni-chevron-up"></span>
                  </h6>
                </div>
                <div className={`collapse ${activeCollapseId === 1 ? 'show' : ''}`} id="collapseOne" aria-labelledby="headingOne" data-parent="#faqAccordion">
                  <div className="card-body">
                    <p>
                      HopePoints adalah website pelayanan terhadap perempuan dan anak yang mendukung hak-hak perempuan dan anak agar terbebas dari segala bentuk kekerasan, dengan komitmen untuk membangun kesadaran dan menciptakan perubahan
                      sosial untuk mencapai dampak yang positif.
                    </p>{' '}
                  </div>
                </div>
              </div>
              <div className="card border-0 wow fadeInUp" data-wow-delay="0.3s" style={{ visibility: 'visible', animationDelay: '0.4s', animationName: 'fadeInUp' }}>
                <div className="card-header" id="headingTwo">
                  <h6 className="mb-0 collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-controls="collapseTwo" onClick={() => handleAccordionToggle(2)}>
                    Bagaimana Cara Melaporkan Kejadian?<span className="lni-chevron-up"></span>
                  </h6>
                </div>
                <div className={`collapse ${activeCollapseId === 2 ? 'show' : ''}`} id="collapseTwo" aria-labelledby="headingTwo" data-parent="#faqAccordion">
                  <div className="card-body">
                    <p>1. Silahkan registrasi dahulu. Jika sudah mempunyai akun Login terlebih dahulu ya.</p>
                    <p>2. Silahkan memasuki fitur "Form".</p>
                    <p>3. Isi semua data yang diminta (Mohon isi dengan benar, karena data yang kamu isi dengan benar dapat membantu kami mengumpulkan informasi yang dibutuhkan).</p>
                    <p>4. Setelah selesai mengisi semua Form yang diminta, klik "Laporkan!".</p>
                  </div>
                </div>
              </div>
              <div className="card border-0 wow fadeInUp" data-wow-delay="0.4s" style={{ visibility: 'visible', animationDelay: '0.4s', animationName: 'fadeInUp' }}>
                <div className="card-header" id="headingThree">
                  <h6 className="mb-0 collapsed" data-toggle="collapse" data-target="#collapseThree" aria-controls="collapseThree" onClick={() => handleAccordionToggle(3)}>
                    Bagaimana Cara Melihat Laporan yang Telah Buat?<span className="lni-chevron-up"></span>
                  </h6>
                </div>
                <div className={`collapse ${activeCollapseId === 3 ? 'show' : ''}`} id="collapseThree" aria-labelledby="headingThree" data-parent="#faqAccordion">
                  <div className="card-body">
                    <p>1. Laporan yang telah kamu buat dapat dilihat pada menu Akun di fitur Profile yang berada dipojok kanan atas.</p>
                    <p>2. Pilih "List Reports" .</p>
                    <p>2. Kamu dapat melihat detail Form yang telah kamu buat pada menu List Reports .</p>
                  </div>
                </div>
              </div>
              <div className="card border-0 wow fadeInUp" data-wow-delay="0.4s" style={{ visibility: 'visible', animationDelay: '0.4s', animationName: 'fadeInUp' }}>
                <div className="card-header" id="headingFour">
                  <h6 className="mb-0 collapsed" data-toggle="collapse" data-target="#collapseFour" aria-controls="collapseFour" onClick={() => handleAccordionToggle(4)}>
                    Bagaimana Cara Menyampaikan Feedback Terhadap Kantor Pelayanan?<span className="lni-chevron-up"></span>
                  </h6>
                </div>
                <div className={`collapse ${activeCollapseId === 4 ? 'show' : ''}`} id="collapseFour" aria-labelledby="headingFour" data-parent="#faqAccordion">
                  <div className="card-body">
                    <p>1. Silahkan menuju fitur "Office".</p>
                    <p>2. Cari daftar Kantor yang ingin dicari.</p>
                    <p>3. Klik ikon yang ada disebelah nama Kantor.</p>
                    <p>4. Berikan feedback.</p>
                    <p>5. Jika sudah selesai, klik "Submit".</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="support-button text-center d-flex justify-content-center mt-4 wow fadeInUp" data-wow-delay="0.5s" style={{ visibility: 'visible', animationDelay: '0.4s', animationName: 'fadeInUp' }}>
              <p className="mb-0 px-2">Tidak menemukan Jawaban?</p>
              <Link to="/contact" className="link">
                Hubungi kami
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
