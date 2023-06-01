import React, { useState } from 'react';
import Nav from './Nav';
import { Table, Button, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './dashboardcomp.css';
import { GetUserWhereRole, handleDeleteUser } from '../../Config/crudData';

const DashOffice = ({ Toggle }) => {
  const Navigate = useNavigate();
  const [users, setUsers] = useState([]);

  return (
    <div className='px-3'>
      <Nav Toggle={Toggle} />
      <h2 className='text-white mb-3'>Table Data Office</h2>
      <Card>
        <Card.Header className='d-flex align-items-center justify-content-between'>
        <Button variant='primary' onClick={() => Navigate('/dashboard/office/add')}>
            Add Office
          </Button>
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
                <th>Name</th>
                <th>Email</th>
                <th>Province</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.province}</td>
                  <td>
                    <Button
                      variant='danger'
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <i className='fa-solid fa-trash-can'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <GetUserWhereRole setUsers={setUsers} setRole={'office'} />
    </div>
  );
};

export default DashOffice;