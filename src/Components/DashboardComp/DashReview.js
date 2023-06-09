import React from 'react';
import { Table, Button, Card, Form, Modal } from 'react-bootstrap';
import { useState } from 'react';
import './dashboardcomp.css';
import { GetReviewWhereRole } from '../../Utils/crudData';
import {
  getUserRoleFromLocalStorage,
  getIdOfficeFromLocalStorage,
} from '../../Utils/UserData';

const DashReview = () => {
  const userRole = getUserRoleFromLocalStorage();
  const idOffice = getIdOfficeFromLocalStorage();
  const [show, setShow] = useState(false);
  const [reviews, setReviews] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(reviews);
  return (
    <div className='container-dashboard'>
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
      <h2 className='text-white text-center mb-3'>Table Review</h2>
      <Card>
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
              {reviews &&
                reviews.map((review, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{review.name}</td>
                    <td>{review.comment}</td>
                    <td>{review.rating}</td>
                    <td>
                      <Button variant='secondary' onClick={handleShow}>
                        Reply
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      {userRole === 'admin' ? (
        <GetReviewWhereRole setReviews={setReviews} />
      ) : (
        <GetReviewWhereRole setReviews={setReviews} idOffice={idOffice} />
      )}
    </div>
  );
};

export default DashReview;
