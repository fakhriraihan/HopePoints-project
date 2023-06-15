import React from 'react';
import Navigation from '../../Components/Navigation/Navigation';
import About from '../../Components/AboutComp/About';
import Footer from '../../Components/Footer/Footer';
import Team from '../../Components/AboutComp/Team';

const AboutPage = () => {
  return (
    <>
      <Navigation />
      <About />
      <Team />
      <Footer />
    </>
  );
};

export default AboutPage;
