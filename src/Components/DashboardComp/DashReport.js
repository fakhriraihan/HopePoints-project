import React, { useState } from 'react';
import { Table, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { GetReport } from '../../Utils/crudData';
import './dashboardcomp.css';
import {
  getUserRoleFromLocalStorage,
  getIdOfficeFromLocalStorage,
} from '../../Utils/UserData';

const DashReport = () => {
  const Navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const userRole = getUserRoleFromLocalStorage();
  const idOffice = getIdOfficeFromLocalStorage();

  return (
    <div className='container-dashboard'>
      <h2 className='text-white text-center mb-3'>Table Report</h2>
      <Card>
        <Card.Body>
          <Table responsive bordered hover className='table bg-white'>
            <thead>
              <tr>
                <th>No</th>
                <th>Date</th>
                <th>Name</th>
                <th>Categories</th>
                <th>Office</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <tr key={report.idReport}>
                  <td>{index + 1}</td>
                  <td>{report.tgl}</td>
                  <td>{report.name}</td>
                  <td>
                    {report.kekerasanFisik && <small>Fisik </small>}
                    {report.kekerasanPsikis && <small>Psikis </small>}
                    {report.kekerasanSeksual && <small>Seksual</small>}
                  </td>
                  <td>{report.nameOffice}</td>
                  <td>{report.status}</td>
                  <td>
                    <Button
                      variant='info'
                      onClick={() =>
                        Navigate(`/dashboard/report/detail/${report.idReport}`)
                      }
                    >
                      <i className='fa-solid fa-eye'></i>
                    </Button>{' '}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      {userRole === 'admin' ? (
        <GetReport setReports={setReports} />
      ) : (
        <GetReport setReports={setReports} idOffice={idOffice} />
      )}
    </div>
  );
};

export default DashReport;
