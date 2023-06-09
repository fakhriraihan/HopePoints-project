import React from 'react';
import Sidebar from '../../Components/DashboardComp/Sidebar';
import Nav from '../../Components/DashboardComp/Nav';
import Dashboard from '../../Components/DashboardComp/Dashboard';
import { useState } from 'react';
import './dashboardpage.css';
import DashFooter from '../../Components/DashboardComp/DashFooter';

const DashReportPage = () => {
  const [toggle, setToggle] = useState(true);
  const Toggle = () => {
    setToggle(!toggle);
  };
  return (
    <div className='container-fluid min-vh-100 container-bg'>
      {toggle && <div></div>}
      <div>
        <Nav Toggle={Toggle} />
      </div>
      <div className='row'>
        {toggle && (
          <div className='col-3 col-md-2 bg-white vh-100 position-fixed sidebar-onpage'>
            <Sidebar />
          </div>
        )}
        {toggle && <div className='col-3 col-md-2'></div>}
        <div className='col mt-4'>
          <Dashboard />
          <DashFooter />
        </div>
      </div>
    </div>
  );
};

export default DashReportPage;
