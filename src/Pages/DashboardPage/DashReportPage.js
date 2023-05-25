import React from 'react';
import Sidebar from '../../Components/DashboardComp/Sidebar';
import DashReport from '../../Components/DashboardComp/DashReport';
import { useState } from 'react';
import './dashboardpage.css';

const DashReportPage = () => {
  const [toggle, setToggle] = useState(true);
  const Toggle = () => {
    setToggle(!toggle);
  };
  return (
    <div className='container-fluid min-vh-100 container-bg'>
      <div className='row'>
        {toggle && (
          <div className='col-5 col-md-2 bg-white vh-100 position-fixed'>
            <Sidebar />
          </div>
        )}
        {toggle && <div className='col-5 col-md-2'></div>}
        <div className='col'>
          <DashReport Toggle={Toggle} />
        </div>
      </div>
    </div>
  );
};

export default DashReportPage;
