import React, { useState } from 'react';
import { Table, Button, Card } from 'react-bootstrap';
import './dashboardcomp.css';
import { GetUserWhereRole, handleDeleteUser } from '../../Utils/crudData';

const DashAdmin = () => {
  const [users, setUsers] = useState([]);

  return (
    <div className='container-dashboard'>
      <h2 className='text-white mb-3'>Table Data Admin</h2>
      <Card>
        <Card.Body>
          <Table responsive bordered hover className='bg-white'>
            <thead>
              <tr>
                <th style={{ width: '4%', textAlign: 'center' }}>No</th>
                <th>Name</th>
                <th>Email</th>
                <th style={{ width: '4%', textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td style={{textAlign: 'center'}}>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td style={{textAlign: 'center'}}>
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
