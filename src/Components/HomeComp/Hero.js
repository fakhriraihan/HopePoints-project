import React from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import hero from '../../assets/hero/hero.png';
import './home.css';
import { AiOutlineForm } from 'react-icons/ai';
import { BsPinMap } from 'react-icons/bs';
import { MDBAccordion, MDBAccordionItem, MDBContainer } from 'mdb-react-ui-kit';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container className="hero">
        <div className="d-flex">
          <div className="wrap-text">
            <h1 className="title">HopePoints</h1>
            <p className="subtitle">Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, eius? Obcaecati perferendis voluptas temporibus. Eius neque qui quam quidem alias.</p>
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
          <div className="featureForm" style={{ fontSize: '100px' }}>
            <h2 className="featureFormTitle">Office</h2>
            <i className="fa-regular fa-building"></i>
            <p>Kamu bisa melihat daftar Kantor terdekat yang terdaftar pada fitur ini </p>
          </div>
        </div>
        <button onClick={() => navigate('/register')}>Registrasi</button>
      </section>
      <section className="faq">
        <div className="container">
          <div className="faq-title">
            <h2>Cara Penggunaan</h2>
            <p>Silahkan cek tutorial berikut agar kamu tidak salah langkah ya</p>
          </div>
        </div>
        <MDBContainer className="mt-1" style={{ maxWidth: '1200px' }}>
          <MDBAccordion>
            <MDBAccordionItem collapseId={1} headerTitle="Apa Itu HopePoints?" claassName="accordian-header">
              <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well
              as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>,
              though the transition does limit overflow.
            </MDBAccordionItem>
            <MDBAccordionItem collapseId={2} headerTitle="Bagaimana Cara Melaporkan Kejadian?">
              <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as
              well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>
              , though the transition does limit overflow.
            </MDBAccordionItem>
            <MDBAccordionItem collapseId={3} headerTitle="Bagaimana Cara Melihat Laporan yang Telah Diproses?">
              <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well
              as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>,
              though the transition does limit overflow.
            </MDBAccordionItem>
            <MDBAccordionItem collapseId={3} headerTitle="Bagaimana Cara Menyampaikan Feedback Terhadap Kantor Pelayanan?">
              <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well
              as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>,
              though the transition does limit overflow.
            </MDBAccordionItem>
            <MDBAccordionItem collapseId={3} headerTitle="Bagaimana cara Menghubungi Admin?">
              <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well
              as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>,
              though the transition does limit overflow.
            </MDBAccordionItem>
          </MDBAccordion>
        </MDBContainer>
      </section>
    </>
  );
};

export default Hero;
