import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './Context/AuthContext';
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
import LoginPage from './Pages/AuthPage/LoginPage';
import RegisterPage from './Pages/AuthPage/RegisterPage';
import MapPage from './Pages/MapPage/MapPage';

const App = () => {

  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children, requiredRole }) => {
    if (currentUser && currentUser.role === requiredRole) {
      return children;
    } else {
      return <Navigate to="/login" />;
    }
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/maps' element={<MapPage />} />

          <Route path="form">
            <Route
              index
              element={
                <RequireAuth requiredRole="user">
                  <FormPage />
                </RequireAuth>
              }
            />
            </Route>

          <Route path="dashboard">
            <Route
              index
              element={
                <RequireAuth requiredRole="admin">
                  <DashboardPage />
                </RequireAuth>
              }
            />
            <Route path="report">
              <Route
                index
                element={
                  <RequireAuth requiredRole="admin">
                    <DashReportPage />
                  </RequireAuth>
                }
              />
              <Route
                path="detail/:id"
                element={
                  <RequireAuth requiredRole="admin">
                    <DashDetailReportPage />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="review">
              <Route
                index
                element={
                  <RequireAuth requiredRole="admin">
                    <DashReviewPage />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="admin">
              <Route
                index
                element={
                  <RequireAuth requiredRole="admin">
                    <DashAdminPage />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="office">
              <Route
                index
                element={
                  <RequireAuth requiredRole="admin">
                    <DashOfficePage />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="user">
              <Route
                index
                element={
                  <RequireAuth requiredRole="admin">
                    <DashUserPage />
                  </RequireAuth>
                }
              />
            </Route>
          </Route>

        </Routes>
      </Router>
    </>
  );
};

export default App;