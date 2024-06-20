import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './footer.css';
import logo from '../../assets/logo.png';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col sm className='footer-info d-flex flex-column align-items-center'>
            <a className='footer-logo d-flex align-items-center' href='/'>
              <img src={logo} className='rounded' alt='Logo HopePoints' />
              HopePoints
            </a>
            <p className='footer-text text-center'>
              Layanan pelaporan kekerasan terhadap perempuan dan anak
            </p>
          </Col>
          <Col sm={7} className='footer-team'>
            <h3>Team</h3>
            <ul className='footer-list'>
              <li className='footer-item-name'>
                <a
                  href='https://www.linkedin.com/in/fakhri-raihan-7947a5203/'
                  target='_blank'
                  className='footer-link py-3'
                  rel='noreferrer'
                >
                  Fakhri Raihan
                </a>
              </li>
              <li className='footer-item-name'>
                <a
                  href='https://www.linkedin.com/in/ramji-renanda-sitorus/'
                  target='_blank'
                  className='footer-link py-3'
                  rel='noreferrer'
                >
                  Ramji Renanda Sitorus
                </a>
              </li>
              <li className='footer-item-name'>
                <a
                  href='https://www.linkedin.com/in/muhammad-taufik-heryunanto-103223244/'
                  target='_blank'
                  className='footer-link py-3'
                  rel='noreferrer'
                >
                  Muhammad Taufik Heryunanto
                </a>
              </li>
              <li className='footer-item-name'>
                <a
                  href='https://www.linkedin.com/in/daffa-rizky-1a7722158/'
                  target='_blank'
                  className='footer-link py-3'
                  rel='noreferrer'
                >
                  Daffa Rizky Maulana Yusuf
                </a>
              </li>
            </ul>
          </Col>
          <Col sm className='footer-social'>
            <h3>Contact</h3>
            <ul className='footer-list'>
              <li className='footer-item-social'>
                <a
                  href='mailto:hopepoints123@gmail.com'
                  target='_blank'
                  className='footer-link'
                  rel='noreferrer'
                >
                  <i className='fab fa-google p-3 fs-5' />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm className='footer-bottom'>
            <p className='footer-text text-center'>HopePoints</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
