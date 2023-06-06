import React, {useState} from 'react';
import { Container, Row, Col, Table, Button, Card } from 'react-bootstrap';
import Navigation from '../../Components/Navigation/Navigation';
import MenuProfile from '../../Components/DashboardProfileComp/Menu';
import { getIdOfficeFromLocalStorage } from '../../Utils/UserData';
import {GetReportByid} from '../../Utils/crudData';
import './profile.css';

function ListReportProfile() {

  const [reports, setReports] = useState([]);
  const uid = getIdOfficeFromLocalStorage();

  return (
    <>
      <Navigation />
      <Container className='profile-container'>
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
                            <th>Title</th>
                            <th>Office</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {reports.map((report, index) => (
                            <tr key={report.idReport}>
                            <td>{index + 1}</td>
                            <td>{report.tgl}</td>
                            <td>{report.title}</td>
                            <td>{report.nameOffice}</td>
                            <td>{report.status}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
          </Col>
        </Row>
        <GetReportByid setReports={setReports} uid={uid}/>
      </Container>
    </>
  );
}

export default ListReportProfile;
