import React from 'react';
import './about.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const About = () => {
  return (
    <>
      <section className="about">
        <div className="about-hopePoints">
          <h1 className="title"> Tentang HopePoints</h1>
          <p className="description">HopePoints adalah website pelayanan terhadap perempuan dan anak yang mendukung hak-hak perempuan dan anak agar terbebas dari segala bentuk kekerasan</p>
        </div>
        <div className="image">
          <img src="/assets/logo.png" alt="hero HopePoints" />
        </div>
      </section>
      <section className="aboutUs">
        <h1 className="about-team"> Tentang Kami</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quos corrupti quis blanditiis aut ab illo, nisi voluptates minus tenetur quia ratione non error odit numquam perferendis quasi molestias velit pariatur dolores
          dolore?
        </p>
        <div className="cardItem">
          <div className="row justify-content-center">
            <Card className="cardItemTeam" style={{ width: '18rem' }}>
              <Card.Img variant="top" src="/assets/hero/hero.png" />
              <Card.Body>
                <Card.Title>Fakhri Raihan</Card.Title>
                <Card.Text>Front-End</Card.Text>
                <Button>Connect</Button>
              </Card.Body>
            </Card>
            <Card className="cardItemTeam" style={{ width: '18rem' }}>
              <Card.Img variant="top" src="/assets/hero/hero.png" />
              <Card.Body>
                <Card.Title>Ramji Renanda Sitorus</Card.Title>
                <Card.Text>Front-End</Card.Text>
                <Button>Connect</Button>
              </Card.Body>
            </Card>
            <Card className="cardItemTeam" style={{ width: '18rem' }}>
              <Card.Img variant="top" src="/assets/hero/hero.png" />
              <Card.Body>
                <Card.Title>Muhammad Taufik</Card.Title>
                <Card.Text>Front-End</Card.Text>
                <Button>Connect</Button>
              </Card.Body>
            </Card>
            <Card className="cardItemTeam" style={{ width: '18rem' }}>
              <Card.Img variant="top" src="/assets/hero/hero.png" />
              <Card.Body>
                <Card.Title>Daffa Rizky</Card.Title>
                <Card.Text>Front-End</Card.Text>
                <Button>Connect</Button>
              </Card.Body>
            </Card>
            <div class="card">
              <img src="foto1.jpg" alt="Foto Profil"></img>
              <h2>Nama Lengkap</h2>
              <button class="connect-button">Connect</button>
            </div>

            <div class="card">
              <img src="foto2.jpg" alt="Foto Profil"></img>
              <h2>Nama Lengkap</h2>
              <button class="connect-button">Connect</button>
            </div>

            <div class="card">
              <img src="foto3.jpg" alt="Foto Profil"></img>
              <h2>Nama Lengkap</h2>
              <button class="connect-button">Connect</button>
            </div>

            <div class="card">
              <img src="foto4.jpg" alt="Foto Profil"></img>
              <h2>Nama Lengkap</h2>
              <button class="connect-button">Connect</button>
            </div>
          </div>
        </div>
        {/* 
          <div className="col">
            <BasicExample />
          </div>
          <div className="col">
            <BasicExample />
          </div>
          <div className="col">
            <BasicExample />
          </div>
          <div className="col">
            <BasicExample />
          </div>
        </div> */}
      </section>
    </>
  );
};
export default About;
