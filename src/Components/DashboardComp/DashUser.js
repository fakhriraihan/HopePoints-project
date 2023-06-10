// DashUser.js
import React, { useState } from 'react';
import { Table, Button, Card } from 'react-bootstrap';
import { GetUserWhereRole, handleDeleteUser } from '../../Utils/crudData';

const DashUser = () => {
  const [users, setUsers] = useState([]);

  return (
    <div className='container-dashboard'>
      <h2 className='text-white text-center mb-3'>Table Data User</h2>
      <Card>
        <Card.Body>
          <Table responsive bordered hover className='bg-white'>
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Telephone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
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

      <GetUserWhereRole setUsers={setUsers} setRole={'user'} />
    </div>
  );
};

export default DashUser;
