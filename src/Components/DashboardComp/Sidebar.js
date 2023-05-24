import React from 'react';

const Sidebar = () => {
  return (
    <div className='bg-light'>
      <div>
        {/* <img src='../../assets/logo.png' alt='logo hopepoints' /> */}
        <span className='brand-name fs-4'>HopePoints</span>
      </div>
      <hr className='text-dark' />
      <div className='list-group list-group-flush'>
        <a className='list-group-item py-2'>
          <i class='fa-solid fa-gauge'></i>
          <span> Dashboard</span>
        </a>
        <a className='list-group-item py-2'>
          <i class='fa-solid fa-table'></i>
          <span>Table</span>
        </a>
        <a className='list-group-item py-2'>
          <i className='speedometer2'></i>
          <span>User</span>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
