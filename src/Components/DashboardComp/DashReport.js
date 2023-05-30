import React, { useEffect, useState } from 'react';
import Nav from '../../Components/DashboardComp/Nav';
import { Table, Button, Card} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs} from 'firebase/firestore';
import { db } from '../../Config/firebase';
import './dashboardcomp.css';

const DashReport = ({ Toggle }) => {
  const Navigate = useNavigate();
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const getReports = async () => {
      try {
        const reportsCollection = collection(db, 'reports');
        const reportsSnapshot = await getDocs(reportsCollection);
        const reportsData = reportsSnapshot.docs.map((doc) => doc.data());
        setReports(reportsData);
      } catch (error) {
        console.error('Error getting reports: ', error);
      }
    };

    getReports();
  }, []);

      const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      };

  return (
    <div className='px-3'>
      <Nav Toggle={Toggle} />
      <h2 className='text-white mb-3'>Table Report</h2>
      <Card>
        {/* ... Komponen lainnya ... */}
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
                <tr key={report.id}>
                  <td>{index + 1}</td>
                  <td>{formatDate(report.date)}</td>
                  <td>{report.name}</td>
                  <td>{report.categories}</td>
                  <td>{report.province}</td>
                  <td>{report.status}</td>
                  <td>
                    <Button
                      variant='info'
                      onClick={() => Navigate(`/dashboard/report/detail/${report.idReport}`)} >
                      <i className='fa-solid fa-eye'></i>
                    </Button>{' '}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DashReport;
