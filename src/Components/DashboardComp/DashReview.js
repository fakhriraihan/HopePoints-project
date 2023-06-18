import React, { useState } from 'react';
import { Table, Button, Card, Form, Modal, Pagination } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import {
  GetReviewWhereRole,
  handleReplyReview,
  handleDeleteReview,
} from '../../Utils/crudData';
import {
  getUserRoleFromLocalStorage,
  getIdOfficeFromLocalStorage,
} from '../../Utils/UserData';
import Swal from 'sweetalert2';

const DashReview = () => {
  const userRole = getUserRoleFromLocalStorage();
  const idOffice = getIdOfficeFromLocalStorage();
  const [show, setShow] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [replyValue, setReplyValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;
  const handleClose = () => setShow(false);
  const handleShow = (review) => {
    setSelectedReview(review);
    setShow(true);
  };
  const stars = Array(5).fill(0);
  const colors = {
    orange: '#FFBA5A',
    grey: '#a9a9a9',
  };

  const handleReply = async () => {
    if (selectedReview) {
      const reviewId = selectedReview.id;
      const reply = replyValue;
      const userId = selectedReview.idOffice;

      await handleReplyReview(userId, reviewId, reply, setReviews);
      handleClose();

      Swal.fire({
        title: 'Success',
        text: 'Reply submitted successfully',
        icon: 'success',
      });
    }
  };

  const handleHapusReview = async (reviewId, officeId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this review!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handleDeleteReview(reviewId, officeId);
        Swal.fire('Deleted!', 'The review has been deleted.', 'success');
      }
    });
  };

  // Logic for pagination
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const paginate = (pageNumber) => {
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
    if (currentPage < reviewsPerPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Fungsi untuk mengubah halaman ke halaman terakhir
  const goToLastPage = () => {
    setCurrentPage(reviewsPerPage);
  };

  return (
    <div className='container-dashboard'>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reply to {selectedReview?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3' controlId='formGridReply'>
              <Form.Control
                as='textarea'
                rows={3}
                value={replyValue}
                onChange={(e) => setReplyValue(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleReply}>
            Reply
          </Button>
        </Modal.Footer>
      </Modal>
      <h2 className='text-white text-center mb-3'>Table Review</h2>
      <Card>
        <Card.Body>
          <Table responsive bordered hover className='bg-white'>
            <thead>
              <tr className='text-center'>
                <th style={{ width: '5%' }}>No</th>
                <th style={{ width: '23%' }}>Name</th>
                <th style={{ width: '35%' }}>Comment</th>
                {userRole === 'admin' ? (
                  <th style={{ width: '15%' }}>Id Office</th>
                ) : (
                  <th style={{ width: '15%' }}>Rating</th>
                )}
                <th style={{ width: '27%' }}>Reply</th>
              </tr>
            </thead>
            <tbody>
              {currentReviews &&
                currentReviews.map((review, index) => (
                  <tr key={index}>
                    <td style={{ textAlign: 'center' }}>{index + 1}</td>
                    <td>{review.name}</td>
                    <td>{review.comment}</td>
                    {userRole === 'admin' ? (
                      <td>{review.idOffice}</td>
                    ) : (
                      <td>
                        <div className='stars-comment'>
                          {stars.map((_, index) => {
                            return (
                              <FaStar
                                key={index}
                                size={15}
                                style={{
                                  marginRight: 2,
                                  cursor: 'pointer',
                                  color:
                                    review.rating > index
                                      ? colors.orange
                                      : colors.grey,
                                }}
                              />
                            );
                          })}
                        </div>
                      </td>
                    )}
                    {userRole === 'admin' ? (
                      <td style={{ textAlign: 'center' }}>
                        <Button
                          variant='danger'
                          onClick={() =>
                            handleHapusReview(review.id, review.idOffice)
                          }
                        >
                          <i className='fa-solid fa-trash-can'></i>
                        </Button>
                      </td>
                    ) : (
                      <td>
                        {review.reply === null ? (
                          <Button
                            variant='secondary'
                            onClick={() => handleShow(review)}
                          >
                            Reply
                          </Button>
                        ) : (
                          review.reply
                        )}
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </Table>
          <Pagination className='justify-content-center custom-pagination'>
            <Pagination.First onClick={goToFirstPage} />
            <Pagination.Prev onClick={goToPrevPage} />
            {Array.from({
              length: Math.ceil(reviews.length / reviewsPerPage),
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
      {userRole === 'admin' ? (
        <GetReviewWhereRole setReviews={setReviews} />
      ) : (
        <GetReviewWhereRole setReviews={setReviews} idOffice={idOffice} />
      )}
    </div>
  );
};

export default DashReview;
