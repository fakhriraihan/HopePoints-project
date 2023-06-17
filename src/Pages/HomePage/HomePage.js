import Hero from '../../Components/HomeComp/Hero';
import Navigation from '../../Components/Navigation/Navigation';
import Footer from '../../Components/Footer/Footer';
import Features from '../../Components/HomeComp/Features';
import Faq from '../../Components/HomeComp/Faq';
import JumlahKasus from '../../Components/HomeComp/JumlahKasus';

const HomePage = () => {
  return (
    <>
      <Navigation />
      <Hero />
      <JumlahKasus />
      <Features />
      <Faq />
      <Footer />
    </>
  );
};

export default HomePage;
