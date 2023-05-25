import React from 'react';
import Nav from '../../Components/DashboardComp/Nav';
import { Table, Button, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './dashboardcomp.css';

const DashReport = ({ Toggle }) => {
  const Navigate = useNavigate();

  return (
    <div className='px-3'>
      <Nav Toggle={Toggle} />
      <h2 className='text-white mb-3'>Table Report</h2>
      <Card>
        <Card.Header className='d-flex align-items-center justify-content-end'>
          <Form className='d-flex'>
            <Form.Control
              type='search'
              placeholder='Search'
              className='me-2'
              aria-label='Search'
            />
            <Button variant='outline-success'>
              <i className='fa-solid fa-magnifying-glass'></i>
            </Button>
          </Form>
        </Card.Header>
        <Card.Body>
          <Table responsive bordered hover className='bg-white'>
            <thead>
              <tr>
                <th>No</th>
                <th>Categories</th>
                <th>Office</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Otto</td>
                <td>
                  <Button
                    variant='info'
                    onClick={() => Navigate('/dashdetailreport')}
                  >
                    <i className='fa-solid fa-eye'></i>
                  </Button>{' '}
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>Otto</td>
                <td>
                  <Button
                    variant='info'
                    onClick={() => Navigate('/dashdetailreport')}
                  >
                    <i className='fa-solid fa-eye'></i>
                  </Button>{' '}
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>@twitter</td>
                <td>@twitter</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>
                  <Button
                    variant='info'
                    onClick={() => Navigate('/dashdetailreport')}
                  >
                    <i className='fa-solid fa-eye'></i>
                  </Button>{' '}
                </td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DashReport;
