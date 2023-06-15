import React, { useState } from 'react';
import { Table, Button, Card, Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { GetReport, handleDeleteReport } from '../../Utils/crudData';
import './dashboardcomp.css';
import {
  getUserRoleFromLocalStorage,
  getIdOfficeFromLocalStorage,
} from '../../Utils/UserData';
import Swal from 'sweetalert2';

const DashReport = () => {
  const Navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const userRole = getUserRoleFromLocalStorage();
  const idOffice = getIdOfficeFromLocalStorage();
  const [currentPage, setCurrentPage] = useState(1);
  const [reportsPerPage] = useState(10);

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

  // Get current reports
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = reports.slice(indexOfFirstReport, indexOfLastReport);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Fungsi untuk mengubah halaman ke halaman pertama
  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  // Fungsi untuk mengubah halaman ke halaman sebelumnya
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Fungsi untuk mengubah halaman ke halaman berikutnya
  const goToNextPage = () => {
    if (currentPage < reportsPerPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Fungsi untuk mengubah halaman ke halaman terakhir
  const goToLastPage = () => {
    setCurrentPage(reportsPerPage);
  };

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
                <th>Title</th>
                <th>Office</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentReports.map((report, index) => (
                <tr key={report.idReport}>
                  <td>{index + 1}</td>
                  <td>{report.tgl}</td>
                  <td>{report.name}</td>
                  <td>
                    {report.kekerasanFisik && <small>Fisik </small>}
                    {report.kekerasanPsikis && <small>Psikis </small>}
                    {report.kekerasanSeksual && <small>Seksual</small>}
                  </td>
                  <td>{report.title}</td>
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
                    </Button>
                    {userRole === 'admin' && (
                      <Button
                        variant='danger'
                        style={{ marginTop: '5px' }}
                        onClick={() => handleDelete(report.idReport)}
                      >
                        <i className='fa-solid fa-trash-can'></i>
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination className='justify-content-center custom-pagination'>
            <Pagination.First onClick={goToFirstPage} />
            <Pagination.Prev onClick={goToPrevPage} />
            {Array.from({
              length: Math.ceil(reports.length / reportsPerPage),
            }).map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={goToNextPage} />
            <Pagination.Last onClick={goToLastPage} />
          </Pagination>
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
