import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './Context/AuthContext';
import Swal from 'sweetalert2';
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
import OfficePage from './Pages/OfficePage/OfficePage';
import DetailOfficePage from './Pages/OfficePage/DetailOfficePage';
import LoginPage from './Pages/AuthPage/LoginPage';
import RegisterPage from './Pages/AuthPage/RegisterPage';
import MapPage from './Pages/MapPage/MapPage';
import ListReportProfile from './Pages/ProfilePage/listReport';
import UserProfile from './Pages/ProfilePage/userProfile';
import ChangePasswordProfile from './Pages/ProfilePage/changePassword';
import ForgotPage from './Pages/AuthPage/forgotPage';

const App = () => {
  const RequireAuth = ({ children, requiredRole }) => {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    // Check if the user role matches any of the required roles
    const isAuthorized =
      Array.isArray(requiredRole) && requiredRole.includes(currentUser?.role);

      if (isAuthorized) {
        return children;
      } else {
        Swal.fire({
          title: 'Konfirmasi',
          text: 'Anda harus login untuk mengakses halaman ini',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'OK',
          cancelButtonText: 'Batal',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/login');
          } else {
            navigate(-1);
          }
        });
      
        return null; 
      }
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/forgot' element={<ForgotPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/maps' element={<MapPage />} />
          <Route path='/office' element={<OfficePage />} />
          <Route path='/detailoffice/:id' element={<DetailOfficePage />} />

          <Route path='profile'>
            <Route
              index
              element={
                <RequireAuth requiredRole={['user']}>
                  <UserProfile />
                </RequireAuth>
              }
            />
            <Route path='list'>
              <Route
                index
                element={
                  <RequireAuth requiredRole={['user']}>
                    <ListReportProfile />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path='change'>
              <Route
                index
                element={
                  <RequireAuth requiredRole={['user']}>
                    <ChangePasswordProfile />
                  </RequireAuth>
                }
              />
            </Route>
          </Route>

          <Route path='form'>
            <Route
              index
              element={
                <RequireAuth requiredRole={['user']}>
                  <FormPage />
                </RequireAuth>
              }
            />
          </Route>

          <Route path='dashboard'>
            <Route
              index
              element={
                <RequireAuth requiredRole={['admin', 'office']}>
                  <DashboardPage />
                </RequireAuth>
              }
            />
            <Route path='report'>
              <Route
                index
                element={
                  <RequireAuth requiredRole={['admin', 'office']}>
                    <DashReportPage />
                  </RequireAuth>
                }
              />
              <Route
                path='detail/:id'
                element={
                  <RequireAuth requiredRole={['admin', 'office']}>
                    <DashDetailReportPage />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path='review'>
              <Route
                index
                element={
                  <RequireAuth requiredRole={['admin', 'office']}>
                    <DashReviewPage />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path='admin'>
              <Route
                index
                element={
                  <RequireAuth requiredRole={['admin']}>
                    <DashAdminPage />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path='office'>
              <Route
                index
                element={
                  <RequireAuth requiredRole={['admin']}>
                    <DashOfficePage />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path='user'>
              <Route
                index
                element={
                  <RequireAuth requiredRole={['admin']}>
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
