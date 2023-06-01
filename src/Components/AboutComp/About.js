import React from 'react';
// import { Container } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
import './about.css';
// import AboutPage from '../../Pages/AboutPage/AboutPage';
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
                <Button variant="success">Connect</Button>
              </Card.Body>
            </Card>
            <Card className="cardItemTeam" style={{ width: '18rem' }}>
              <Card.Img variant="top" src="/assets/hero/hero.png" />
              <Card.Body>
                <Card.Title>Ramji Renanda Sitorus</Card.Title>
                <Card.Text>Front-End</Card.Text>
                <Button variant="success">Connect</Button>
              </Card.Body>
            </Card>
            <Card className="cardItemTeam" style={{ width: '18rem' }}>
              <Card.Img variant="top" src="/assets/hero/hero.png" />
              <Card.Body>
                <Card.Title>Muhammad Taufik</Card.Title>
                <Card.Text>Front-End</Card.Text>
                <Button variant="success">Connect</Button>
              </Card.Body>
            </Card>
            <Card className="cardItemTeam" style={{ width: '18rem' }}>
              <Card.Img variant="top" src="/assets/hero/hero.png" />
              <Card.Body>
                <Card.Title>Daffa Rizky</Card.Title>
                <Card.Text>Front-End</Card.Text>
                <Button variant="success">Connect</Button>
              </Card.Body>
            </Card>
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
