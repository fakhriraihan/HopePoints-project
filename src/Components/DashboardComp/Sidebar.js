import React from 'react';
import 'bootstrap/js/dist/dropdown';
import { useState } from 'react';
import logo from '../../assets/logo.png';
import './dashboardcomp.css';
import { Nav } from 'react-bootstrap';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isUserRole = localStorage.getItem('user');
  const roleParse = JSON.parse(isUserRole);
  const role = roleParse.role;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='sidebar p-2 pt-5'>
      <div
        className='header-sidebar d-flex justify-content-center align-items-center'
        style={{ cursor: 'pointer' }}
      >
        <img
          src={logo}
          className='rounded logo-dashboard'
          alt='logo hopepoints'
        />
        <span className='brand-name fs-4'>HopePoints</span>
      </div>
      <hr className='text-dark' />
      <div className='list-group list-group-flush'>
        <a href='/dashboard' className='list-group-item py-3'>
          <i className='fa-solid fa-gauge icon-sidebar'></i>
          <span className='text-sidebar'>Dashboard</span>
        </a>
        <a href='/dashboard/report' className='list-group-item py-3'>
          <i className='fa-solid fa-table icon-sidebar'></i>
          <span className='text-sidebar'>Report</span>
        </a>
        <a href='/dashboard/review' className='list-group-item py-3'>
          <i className='fa-solid fa-comment icon-sidebar'></i>
          <span className='text-sidebar'>Review</span>
        </a>
        {role === 'admin' && (
          <>
            <Nav.Link
              className='list-group-item py-3 d-flex align-items-center button-account'
              onClick={toggleDropdown}
            >
              <i className='fas fa-users icon-sidebar'></i>
              <span className='text-sidebar'>Accounts</span>
              <i
                className={`fas fa-chevron-${
                  isOpen ? 'up' : 'down'
                } ms-auto icon-dropdown`}
              ></i>
            </Nav.Link>

            {isOpen && (
              <div className='list-group'>
                <a href='/dashboard/admin' className='list-group-item py-2'>
                  <i className='fa-solid fa-lock icon-sidebar'></i>
                  <span className='text-sidebar'>Admin</span>
                </a>
                <a href='/dashboard/office' className='list-group-item py-2'>
                  <i className='fa-solid fa-building icon-sidebar'></i>
                  <span className='text-sidebar'>Office</span>
                </a>
                <a href='/dashboard/user' className='list-group-item py-2'>
                  <i className='fa-solid fa-user icon-sidebar'></i>
                  <span className='text-sidebar'>User</span>
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
