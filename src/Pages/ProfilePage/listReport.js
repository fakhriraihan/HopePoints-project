import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Table, Button, Card } from 'react-bootstrap';
import Navigation from '../../Components/Navigation/Navigation';
import MenuProfile from '../../Components/DashboardProfileComp/Menu';
import { collection, getDocs, query, where} from 'firebase/firestore';
import { db } from '../../Config/firebase';

function ListReportProfile() {
    

  const [reports, setReports] = useState([]);
  const usersData = localStorage.getItem("user");
  const user = JSON.parse(usersData);
  const userData = user.user;
  const uid = userData.uid;

  useEffect(() => {
    const getReports = async () => {
      try {
        const reportsCollection = collection(db, 'reports');
        const q = query(reportsCollection, where('uid', '==', uid));
        const reportsSnapshot = await getDocs(q);
        const reportsData = reportsSnapshot.docs.map((doc) => doc.data());
        setReports(reportsData);
      } catch (error) {
        console.error('Error getting reports: ', error);
      }
    };
  
    getReports();
  }, [uid]);
  return (
    <>
      <Navigation />
      <Container fluid style={{ marginTop: '5rem' }}>
        <Row>
          <MenuProfile />
          <Col sm={9}>
            <Card className=''>
                <Card.Header>
                    <p>Pelaporan Anda</p>
                </Card.Header>
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
                        </tr>
                        </thead>
                        <tbody>
                        {reports.map((report, index) => (
                            <tr key={report.idReport}>
                            <td>{index + 1}</td>
                            <td></td>
                            <td>{report.name}</td>
                            <td>{report.kekerasanFisik && <small>Fisik </small>}
                                {report.kekerasanPsikis && <small>Psikis </small>}
                                {report.kekerasanSeksual && <small>Seksual</small>}</td>
                            <td>{report.province}</td>
                            <td>{report.status}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ListReportProfile;
