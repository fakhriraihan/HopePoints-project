import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './Pages/home/Home';
import About from './Pages/about/About';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  )
}

export default App;
