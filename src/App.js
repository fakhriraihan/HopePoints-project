import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';
import AboutPage from './Pages/AboutPage/AboutPage';
import FormPage from './Pages/FormPage/FormPage';
import DashboardPage from './Pages/DashboardPage/DashboardPage';
import DashReportPage from './Pages/DashboardPage/DashReportPage';
import DashDetailReportPage from './Pages/DashboardPage/DashDetailReportPage';
import DashReviewPage from './Pages/DashboardPage/DashReviewPage';
import DashAdminPage from './Pages/DashboardPage/DashAdminPage';
import DashOfficePage from './Pages/DashboardPage/DashOfficePage';
import DashUserPage from './Pages/DashboardPage/DashUserPage';
import News from './Pages/HomePage/News';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/form' element={<FormPage />} />

          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/dashreport' element={<DashReportPage />} />
          <Route path='/dashdetailreport' element={<DashDetailReportPage />} />
          <Route path='/dashreview' element={<DashReviewPage />} />
          <Route path='/dashadmin' element={<DashAdminPage />} />
          <Route path='/dashoffice' element={<DashOfficePage />} />
          <Route path='/dashuser' element={<DashUserPage />} />

          <Route path='/news' element={<News />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
