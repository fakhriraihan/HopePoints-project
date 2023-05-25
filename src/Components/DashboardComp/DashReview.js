import React from 'react';
import Nav from './Nav';
import { Table, Button, Card, Form, Modal } from 'react-bootstrap';
import { useState } from 'react';
import './dashboardcomp.css';

const DashReview = ({ Toggle }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className='px-3'>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reply</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3' controlId='formGridReply'>
              <Form.Control as='textarea' rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Nav Toggle={Toggle} />
      <h2 className='text-white mb-3'>Table Review</h2>
      <Card>
        <Card.Header className='d-flex align-items-center justify-content-end'>
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
                <th>Comment</th>
                <th>Rating</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>Otto</td>
                <td>
                  <Button variant='secondary' onClick={handleShow}>
                    Reply
                  </Button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>Otto</td>
                <td>
                  <Button variant='secondary' onClick={handleShow}>
                    Reply
                  </Button>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>@twitter</td>
                <td>@twitter</td>
                <td>@mdo</td>
                <td>
                  <Button variant='secondary' onClick={handleShow}>
                    Reply
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DashReview;
