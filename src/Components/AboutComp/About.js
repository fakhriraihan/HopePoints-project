import React from 'react';
import './about.css';
import Card from 'react-bootstrap/Card';
import hero from '../../assets/hero/hero.png';
import logo from '../../assets/logo.png';
import daffa from '../../assets/team/daffa.jpg';

const About = () => {
  return (
    <>
      <section className='about'>
        <div className='about-hopePoints'>
          <h1 className='title'> Tentang HopePoints</h1>
          <p className='description'>
            HopePoints adalah website pelayanan terhadap perempuan dan anak yang
            mendukung hak-hak perempuan dan anak agar terbebas dari segala
            bentuk kekerasan
          </p>
        </div>
        <div className='image'>
          <img src={logo} alt='hero HopePoints' />
        </div>
      </section>
      <section className='aboutUs'>
        <h1 className='about-team'> Tentang Kami</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quos
          corrupti quis blanditiis aut ab illo, nisi voluptates minus tenetur
          quia ratione non error odit numquam perferendis quasi molestias velit
          pariatur dolores dolore?
        </p>
        <div className='cardItem'>
          <div className='row justify-content-center about-team'>
            <Card className='cardItemTeam' style={{ width: '18rem' }}>
              <Card.Img variant='top' src={hero} />
              <Card.Body>
                <Card.Title>Fakhri Raihan</Card.Title>
                <Card.Text>Front-End</Card.Text>
                <button>Connect</button>
              </Card.Body>
            </Card>
            <Card className='cardItemTeam' style={{ width: '18rem' }}>
              <Card.Img variant='top' src={hero} />
              <Card.Body>
                <Card.Title>Ramji Renanda Sitorus</Card.Title>
                <Card.Text>Front-End</Card.Text>
                <button>Connect</button>
              </Card.Body>
            </Card>
            <Card className='cardItemTeam' style={{ width: '18rem' }}>
              <Card.Img variant='top' src={hero} />
              <Card.Body>
                <Card.Title>Muhammad Taufik</Card.Title>
                <Card.Text>Front-End</Card.Text>
                <button>Connect</button>
              </Card.Body>
            </Card>
            <Card className='cardItemTeam' style={{ width: '18rem' }}>
              <Card.Img variant='top' src={daffa} />
              <Card.Body>
                <Card.Title>Daffa Rizky</Card.Title>
                <Card.Text>Front-End</Card.Text>
                <button>Connect</button>
              </Card.Body>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};
export default About;
