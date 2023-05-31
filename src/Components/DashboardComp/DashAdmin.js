import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import { Table, Button, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './dashboardcomp.css';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../Config/firebase';

const DashAdmin = ({ Toggle }) => {
  const Navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'users'),
      (snapshot) => {
        const userList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('Retrieved data:', userList);
        setUsers(userList);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      const userRef = doc(db, 'users', userId);
      await deleteDoc(userRef);
      console.log('User deleted successfully!');
    } catch (error) {
      console.log('Error deleting user:', error);
    }
  };

  return (
    <div className='px-3'>
      <Nav Toggle={Toggle} />
      <h2 className='text-white mb-3'>Table Data Admin</h2>
      <Card>
        <Card.Header className='d-flex align-items-center justify-content-between'>
          <h5>Admin</h5>
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
                <th>Username</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
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
    </div>
  );
};

export default DashAdmin;
