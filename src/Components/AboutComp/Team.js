import React from 'react';
import { Card, Container } from 'react-bootstrap';
import daffa from '../../assets/team/daffa.jpg';
import fakhri from '../../assets/team/fakhri.jpg';
import renan from '../../assets/team/renan.jpg';
import taufik from '../../assets/team/taufik.jpg';
import './about.css';

const Team = () => {
  return (
    <section className='team'>
      <Container>
        <h1 className='title-team'> Tentang Kami</h1>
        <p className='description-team'>
          Kami adalah tim yang berkomitmen dalam menyediakan layanan terbaik
          bagi perempuan dan anak-anak. Dengan fokus pada mendukung hak-hak
          perempuan dan anak, kami bertujuan untuk memerangi segala bentuk
          kekerasan dan menciptakan perubahan sosial yang positif.
        </p>

        <div className='cardItem'>
          <div className='row justify-content-around align-items-center about-team'>
            <Card className='cardItemTeam' style={{ width: '18rem' }}>
              <Card.Img variant='top' src={fakhri} />
              <Card.Body>
                <Card.Title>Fakhri Raihan</Card.Title>
                <Card.Text>Front-End</Card.Text>
                <a
                  href='https://www.linkedin.com/in/fakhri-raihan-7947a5203/'
                  target='_blank'
                  rel='noreferrer'
                  className='logo-ref-team'
                >
                  <i className='fa-brands fa-linkedin fs-1'></i>
                </a>
                <a
                  href='https://github.com/fakhriraihan'
                  target='_blank'
                  rel='noreferrer'
                  className='logo-ref-team'
                >
                  <i
                    className='fa-brands fa-github fs-1'
                    style={{ color: 'black' }}
                  ></i>
                </a>
              </Card.Body>
            </Card>
            <Card className='cardItemTeam' style={{ width: '18rem' }}>
              <Card.Img variant='top' src={renan} />
              <Card.Body>
                <Card.Title>Ramji Renanda Sitorus</Card.Title>
                <Card.Text>Front-End</Card.Text>
                <a
                  href='https://www.linkedin.com/in/ramji-renanda-sitorus/'
                  target='_blank'
                  rel='noreferrer'
                  className='logo-ref-team'
                >
                  <i className='fa-brands fa-linkedin fs-1'></i>
                </a>
                <a
                  href='https://github.com/ramjirenanda26'
                  target='_blank'
                  rel='noreferrer'
                  className='logo-ref-team'
                >
                  <i
                    className='fa-brands fa-github fs-1'
                    style={{ color: 'black' }}
                  ></i>
                </a>
              </Card.Body>
            </Card>
            <Card className='cardItemTeam' style={{ width: '18rem' }}>
              <Card.Img variant='top' src={taufik} />
              <Card.Body>
                <Card.Title>Muhammad Taufik</Card.Title>
                <Card.Text>Front-End</Card.Text>
                <a
                  href='https://www.linkedin.com/in/muhammad-taufik-heryunanto-103223244/'
                  target='_blank'
                  rel='noreferrer'
                  className='logo-ref-team'
                >
                  <i className='fa-brands fa-linkedin fs-1'></i>
                </a>
                <a
                  href='https://github.com/opikzxx'
                  target='_blank'
                  rel='noreferrer'
                  className='logo-ref-team'
                >
                  <i
                    className='fa-brands fa-github fs-1'
                    style={{ color: 'black' }}
                  ></i>
                </a>
              </Card.Body>
            </Card>
            <Card className='cardItemTeam' style={{ width: '18rem' }}>
              <Card.Img variant='top' src={daffa} />
              <Card.Body>
                <Card.Title>Daffa Rizky</Card.Title>
                <Card.Text>Front-End</Card.Text>
                <a
                  href='https://www.linkedin.com/in/daffa-rizky-1a7722158/'
                  target='_blank'
                  rel='noreferrer'
                  className='logo-ref-team'
                >
                  <i className='fa-brands fa-linkedin fs-1'></i>
                </a>
                <a
                  href='https://github.com/daffarizky16'
                  target='_blank'
                  rel='noreferrer'
                  className='logo-ref-team'
                >
                  <i
                    className='fa-brands fa-github fs-1'
                    style={{ color: 'black' }}
                  ></i>
                </a>
              </Card.Body>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Team;
