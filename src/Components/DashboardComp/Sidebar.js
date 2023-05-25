import React from 'react';
import 'bootstrap/js/dist/dropdown';
import { useState } from 'react';
import './dashboardcomp.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='sidebar p-2'>
      <div className='header-sidebar d-flex justify-content-center align-items-center'>
        <img
          src='../../assets/logo.png'
          className='rounded me-2'
          alt='logo hopepoints'
        />
        <span className='brand-name fs-4'>HopePoints</span>
      </div>
      <hr className='text-dark' />
      <div className='list-group list-group-flush'>
        <a href='/dashboard' className='list-group-item py-3'>
          <i className='fa-solid fa-gauge me-3'></i>
          <span>Dashboard</span>
        </a>
        <a href='/dashreport' className='list-group-item py-3'>
          <i className='fa-solid fa-table me-3'></i>
          <span>Report</span>
        </a>
        <a href='/dashreview' className='list-group-item py-3'>
          <i className='fa-solid fa-comment me-3'></i>
          <span>Review</span>
        </a>
        <a
          className='list-group-item py-3 d-flex align-items-center button-account'
          onClick={toggleDropdown}
        >
          <i className='fas fa-users me-3'></i>
          <span>Accounts</span>
          <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'} ms-auto`}></i>
        </a>
        {isOpen && (
          <div className='list-group'>
            <a href='/dashadmin' className='list-group-item py-2'>
              <span>Admin</span>
            </a>
            <a href='/dashoffice' className='list-group-item py-2'>
              <span>Office</span>
            </a>
            <a href='/dashuser' className='list-group-item py-2'>
              <span>User</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
