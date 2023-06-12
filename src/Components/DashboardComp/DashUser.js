import React, { useState } from 'react';
import { Table, Button, Card } from 'react-bootstrap';
import { GetUserWhereRole, handleDeleteUser } from '../../Utils/crudData';
import Swal from 'sweetalert2';

const DashUser = () => {
  const [users, setUsers] = useState([]);

  const confirmDeleteUser = (userId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
      dangerMode: true,
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteUser(userId)
          .then(() => {
            Swal.fire('Deleted!', 'User has been deleted successfully.', 'success');
          })
          .catch((error) => {
            Swal.fire('Oops!', 'An error occurred while deleting the user.', 'error');
          });
      }
    });
  };

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
                      onClick={() => confirmDeleteUser(user.id)}
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
