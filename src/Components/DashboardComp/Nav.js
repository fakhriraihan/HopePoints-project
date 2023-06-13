import React, { useContext } from 'react';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import './dashboardcomp.css';
import { AuthContext } from '../../Context/AuthContext';

const Nav = ({ Toggle }) => {
  const { dispatch } = useContext(AuthContext);
  const usersData = localStorage.getItem('user');
  const user = JSON.parse(usersData);
  const userData = user.user;
  const email = userData.email;

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <nav className='navbar navbar-expand-sm bg-white fixed-top px-4'>
      <i
        className='navbar-brand fa-solid fa-align-left fs-4'
        onClick={Toggle}
        style={{ cursor: 'pointer', color: '#f94892' }}
      ></i>
      <button
        className='navbar-toggler d-lg-none'
        type='button'
        data-bs-toggle='collapse'
        data-bs-target='#collapsibleNavId'
        aria-controls='collapsibleNavId'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <i
          className='fa-solid fa-bars'
          style={{ cursor: 'pointer', color: '#f94892' }}
        ></i>
      </button>
      <div className='collapse navbar-collapse' id='collapsibleNavId'>
        <ul className='navbar-nav ms-auto mt-2 mt-lg-0'>
          <li className='nav-item dropdown'>
            <button
              className='nav-link fs-6 dropdown-toggle rounded border-0 bg-transparent'
              id='dropdownId'
              data-bs-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'
              style={{ color: '#f94892' }}
            >
              {email}
            </button>
            <div
              className='dropdown-menu dropdown-menu-end'
              aria-labelledby='dropdownId'
            >
              <button
                className='dropdown-item'
                onClick={handleLogout}
                style={{ color: '#f94892' }}
              >
                <i className='fa-solid fa-right-from-bracket me-2'></i>
                Logout
              </button>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
