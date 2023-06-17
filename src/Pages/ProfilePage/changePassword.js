import React from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import Navigation from '../../Components/Navigation/Navigation';
import MenuProfile from '../../Components/DashboardProfileComp/Menu';
import './profile.css';
import { updatePasswordProfile as updateProfilePassword } from '../../Utils/crudData';
import Swal from 'sweetalert2';

function ChangePasswordProfile() {
  const handleSubmit = (event) => {
    event.preventDefault();

    const currentPassword = event.target.elements.currentPassword.value;
    const newPassword = event.target.elements.newPassword.value;
    const confirmPassword = event.target.elements.confirmPassword.value;

    if (newPassword !== confirmPassword) {
      console.error('New password and confirm password do not match');
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to update your password?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!',
    }).then((result) => {
      if (result.isConfirmed) {
        updateProfilePassword(currentPassword, newPassword)
          .then(() => {
            Swal.fire('Updated!', 'Your password has been updated.', 'success');
            console.log('Password updated successfully!');
          })
          .catch((error) => {
            Swal.fire('Error!', 'Failed to update password.', 'error');
            console.error('Failed to update password:', error.message);
          });
      }
    });
  };

  return (
    <>
      <Navigation />
      <Container className='profile-container'>
        <Row>
          <MenuProfile />
          <Col sm={9}>
            <Card className=''>
              <Card.Header>
                <p>Update Profile</p>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className='mb-3' controlId='formGroupCurrent'>
                    <Form.Label>Current Password :</Form.Label>
                    <Form.Control
                      type='password'
                      placeholder=''
                      name='currentPassword'
                      required
                    />
                  </Form.Group>

                  <Form.Group className='mb-3' controlId='formGroupNew'>
                    <Form.Label>New Password :</Form.Label>
                    <Form.Control
                      type='password'
                      placeholder=''
                      name='newPassword'
                      required
                    />
                  </Form.Group>

                  <Form.Group className='mb-3' controlId='formGroupRe'>
                    <Form.Label>Re-enter New Password :</Form.Label>
                    <Form.Control
                      type='password'
                      placeholder=''
                      name='confirmPassword'
                      required
                    />
                  </Form.Group>

                  <Button variant='warning' type='submit'>
                    Update
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ChangePasswordProfile;
