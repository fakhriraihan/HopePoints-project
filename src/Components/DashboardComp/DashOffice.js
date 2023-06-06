import React, { useState, useRef } from 'react';
import Nav from './Nav';
import { Table, Button, Card, Form, Modal } from 'react-bootstrap';
import './dashboardcomp.css';
import { GetUserWhereRole, handleDeleteUser } from '../../Utils/crudData';

const DashOffice = ({ Toggle }) => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [province, setProvince] = useState('');
  const formRef = useRef(null);

  return (
    <div className='px-3'>
      <Nav Toggle={Toggle} />
      <h2 className='text-white mb-3'>Table Data Office</h2>
      <Card>
        <Card.Header className='d-flex align-items-center justify-content-between'>
        <Button variant='primary' onClick={() => setShowModal(true)}>
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
                <th>No Kantor</th>
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
        <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Office</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form ref={formRef}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                name='name'
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                name='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId='province'>
              <Form.Label>Province</Form.Label>
              <Form.Control
                type='text'
                name='province'
                value={province}
                onChange={e => setProvince(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant='primary'>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <GetUserWhereRole setUsers={setUsers} setRole={'office'} />
    </div>
  );
};

export default DashOffice;