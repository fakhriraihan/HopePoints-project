import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import * as firestore from 'firebase/firestore';
import { db } from '../../Config/firebase';
import { useNavigate } from 'react-router-dom';
import './office.css';

const Office = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const unsubscribe = firestore.onSnapshot(
      firestore.query(
        firestore.collection(db, 'users'),
        firestore.where('role', '==', 'office')
      ),
      (snapshot) => {
        const userList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
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

  return (
    <div className='office-container'>
      <div className='py-3'>
        <h1 className='text-center mb-3'>Office</h1>
        <form className='form-search' action='#' id='form-search'>
          <input
            className='rounded'
            id='searchOffice'
            type='text'
            placeholder='Cari Nama Lembaga'
          />
          <button className='cari mx-3' type='submit'>
            <i className='fas fa-search'></i>
          </button>
        </form>
        {users.map((user) => (
          <React.Fragment key={user.id}>
            <Card className='my-3'>
              <Card.Body className='d-flex justify-content-between align-items-center'>
                <h6>{user.name}</h6>
                <div>
                  <button
                    className='lihat-detail'
                    onClick={() => navigate(`/detailoffice/${user.id}`)}
                  >
                    <i className='fas fa-eye ml-auto fs-1'></i>
                  </button>
                </div>
              </Card.Body>
            </Card>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Office;
