import React, { useState } from 'react';
import { Table, Button, Card, Pagination } from 'react-bootstrap';
import { GetUserWhereRole, handleDeleteUser } from '../../Utils/crudData';
import Swal from 'sweetalert2';

const DashUser = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  // Logic for pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

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
    if (currentPage < usersPerPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Fungsi untuk mengubah halaman ke halaman terakhir
  const goToLastPage = () => {
    setCurrentPage(usersPerPage);
  };

  const nomorUrutAwal = (currentPage - 1) * usersPerPage;

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
            Swal.fire(
              'Deleted!',
              'User has been deleted successfully.',
              'success'
            );
          })
          .catch((error) => {
            Swal.fire(
              'Oops!',
              'An error occurred while deleting the user.',
              'error'
            );
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
              <tr className='text-center'>
                <th style={{ width: '5%' }}>No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Telephone</th>
                <th style={{ width: '5%' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={user.id}>
                  <td style={{ textAlign: 'center' }}>
                    {nomorUrutAwal + index + 1}
                  </td>
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
          <Pagination className='justify-content-center custom-pagination'>
            <Pagination.First onClick={goToFirstPage} />
            <Pagination.Prev onClick={goToPrevPage} />
            {Array.from({
              length: Math.ceil(users.length / usersPerPage),
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

      <GetUserWhereRole setUsers={setUsers} setRole={'user'} />
    </div>
  );
};

export default DashUser;
