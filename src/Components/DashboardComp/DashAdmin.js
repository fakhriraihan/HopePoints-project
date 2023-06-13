import React, { useState } from 'react';
import { Table, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './dashboardcomp.css';
import { GetUserWhereRole, handleDeleteUser } from '../../Utils/crudData';

const DashAdmin = () => {
  const Navigate = useNavigate();
  const [users, setUsers] = useState([]);

  return (
    <div className='container-dashboard'>
      <h2 className='text-white mb-3'>Table Data Admin</h2>
      <Card>
        <Card.Header className='d-flex align-items-center justify-content-between'>
          <Button
            variant='primary'
            onClick={() => Navigate('/dashboard/office/add')}
          >
            Add Admin
          </Button>
        </Card.Header>
        <Card.Body>
          <Table responsive bordered hover className='bg-white'>
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
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

      <GetUserWhereRole setUsers={setUsers} setRole={'admin'} />
    </div>
  );
};

export default DashAdmin;
