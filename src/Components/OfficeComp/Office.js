import React, { useState, useEffect } from 'react';
import { Pagination, Form, Button } from 'react-bootstrap';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../../Config/firebase';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import './office.css';

const Office = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, 'users'),
        where('role', '==', 'office'),
        orderBy('name')
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

  const handleSearch = (event) => {
    event.preventDefault();
    const searchInput = document.getElementById('searchOffice');
    setSearchValue(searchInput.value);
  };

  useEffect(() => {
    if (searchValue !== '') {
      const fuse = new Fuse(users, {
        keys: ['name'],
      });
      const results = fuse.search(searchValue);
      const filteredUsers = results.map((result) => result.item);
      setUsers(filteredUsers);
    } else {
      const unsubscribe = onSnapshot(
        query(
          collection(db, 'users'),
          where('role', '==', 'office'),
          orderBy('name')
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
    }
  }, [searchValue, users]);

  // Menghitung total halaman berdasarkan jumlah item per halaman
  const totalPages = Math.ceil(users.length / itemsPerPage);

  // Mengambil index awal dan akhir item untuk halaman saat ini
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  // Fungsi untuk mengubah halaman saat tombol halaman ditekan
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Fungsi untuk mengubah halaman ke halaman terakhir
  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  return (
    <div className='office-container'>
      <div className='py-3'>
        <h1 className='text-center mb-3'>Office</h1>
        <Form
          className='form-search d-flex justify-content-center align-items-center'
          onSubmit={handleSearch}
          id='form-search'
        >
          <Form.Control
            id='searchOffice'
            type='text'
            placeholder='Cari Nama Lembaga'
            style={{ width: '20%' }}
          />
          <Button className='cari-btn ms-3' type='submit' variant='pink'>
            <i className='fas fa-search'></i>
          </Button>
        </Form>
        {currentItems.map((user) => (
          <React.Fragment key={user.id}>
            <div className='my-3'>
              <div
                className='d-flex justify-content-between align-items-center office-card'
                onClick={() => navigate(`/detailoffice/${user.id}`)}
              >
                <h6>{user.name}</h6>
                <div></div>
              </div>
            </div>
          </React.Fragment>
        ))}
        {/* Pagination */}
        <Pagination className='justify-content-center custom-pagination mt-5'>
          <Pagination.First onClick={goToFirstPage} />
          <Pagination.Prev onClick={goToPrevPage} />
          {Array.from({ length: totalPages }, (_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={goToNextPage} />
          <Pagination.Last onClick={goToLastPage} />
        </Pagination>
      </div>
    </div>
  );
};

export default Office;
