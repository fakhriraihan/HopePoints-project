import React, { useState } from 'react';
import Nav from '../../Components/DashboardComp/Nav';
import { Table, Button, Card} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { GetReport, handleDeleteReport } from '../../Utils/crudData';
import './dashboardcomp.css';
import { getUserRoleFromLocalStorage,  getIdOfficeFromLocalStorage} from "../../Utils/UserData";
import Swal from 'sweetalert2';

const DashReport = ({ Toggle }) => {
  const Navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const userRole = getUserRoleFromLocalStorage();
  const idOffice = getIdOfficeFromLocalStorage();

  const handleDelete = (reportId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this report. This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteReport(reportId);
        Swal.fire('Deleted!', 'The report has been deleted.', 'success');
      }
    });
  };
  
      
  return (
    <div className='px-3'>
      <Nav Toggle={Toggle} />
      <h2 className='text-white mb-3'>Table Report</h2>
      <Card>
        <Card.Body>
          <Table responsive bordered hover className='bg-white'>
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
                  <td>{report.kekerasanFisik && <small>Fisik </small>}
                      {report.kekerasanPsikis && <small>Psikis </small>}
                      {report.kekerasanSeksual && <small>Seksual</small>}</td>
                  <td>{report.nameOffice}</td>
                  <td>{report.status}</td>
                  <td>
                    <Button
                      variant='info'
                      onClick={() => Navigate(`/dashboard/report/detail/${report.idReport}`)}
                    >
                      <i className='fa-solid fa-eye'></i>
                    </Button>
                    {userRole === 'admin' && (
                      <Button variant='danger' style={{marginTop: '5px'}} onClick={() => handleDelete(report.idReport)}>
                        <i className='fa-solid fa-trash-can'></i>
                      </Button>
                    )}
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
