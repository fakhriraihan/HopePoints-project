import React from 'react';
import DashDetailReport from '../../Components/DashboardComp/DashDetailReport';
import Sidebar from '../../Components/DashboardComp/Sidebar';
import { useState } from 'react';
import './dashboardpage.css';

const DashDetailReportPage = () => {
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
          <DashDetailReport Toggle={Toggle} />
        </div>
      </div>
    </div>
  );
};

export default DashDetailReportPage;
