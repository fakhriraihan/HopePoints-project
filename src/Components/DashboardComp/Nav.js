import React from 'react';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import './dashboardcomp.css';

const Nav = ({ Toggle }) => {
  return (
    <nav className='navbar navbar-expand-sm navbar-dark  bg-transparent'>
      <i
        className='navbar-brand fa-solid fa-align-left fs-4'
        onClick={Toggle}
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
        <i className='fa-solid fa-bars'></i>
      </button>
      <div className='collapse navbar-collapse' id='collapsibleNavId'>
        <ul className='navbar-nav ms-auto mt-2 mt-lg-0'>
          <li className='nav-item dropdown'>
            <button
              className='nav-link text-white fs-5 dropdown-toggle rounded border-0 bg-transparent'
              id='dropdownId'
              data-bs-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'
            >
              Admin
            </button>
            <div
              className='dropdown-menu dropdown-menu-end'
              aria-labelledby='dropdownId'
            >
              <a className='dropdown-item' href='logout'>
                Logout
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
