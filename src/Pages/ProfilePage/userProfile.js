import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import Navigation from '../../Components/Navigation/Navigation';
import MenuProfile from '../../Components/DashboardProfileComp/Menu';
import './profile.css';
import { getIdOfficeFromLocalStorage } from '../../Utils/UserData';
import { GetUserById, updateUserProfile } from '../../Utils/crudData';
import Swal from 'sweetalert2';

function UserProfile() {
  const navigate = useNavigate();
  const uid = getIdOfficeFromLocalStorage();
  const [users, setUser] = useState(null);

  const handleCancel = () => {
    navigate(-1); 
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = event.target.elements.name.value;
    const phone = event.target.elements.phone.value;
    const address = event.target.elements.address.value;
    const email = event.target.elements.email.value;

    const newData = {
      name: name,
      phone: phone,
      address: address,
      email: email,
    };

    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to update your profile?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // Memanggil fungsi untuk memperbarui profil pengguna
        updateUserProfile(uid, newData)
          .then((updatedUser) => {
            setUser(updatedUser);
            Swal.fire('Updated!', 'Your profile has been updated.', 'success');
            // navigate(-1);
          })
          .catch((error) => {
            Swal.fire('Error!', 'Failed to update profile.', 'error');
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
                  <Form.Group className='mb-3' controlId='formGroupName'>
                    <Form.Label>Nama :</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder=''
                      defaultValue={users?.name}
                      name='name'
                    />
                  </Form.Group>

                  <Form.Group className='mb-3' controlId='formGroupName'>
                    <Form.Label>Email :</Form.Label>
                    <Form.Control
                      type='email'
                      placeholder=''
                      defaultValue={users?.email}
                      name='email'
                      readOnly
                    />
                  </Form.Group>

                  <Form.Group className='mb-3' controlId='formGroupName'>
                    <Form.Label>No Handphone :</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder=''
                      defaultValue={users?.phone}
                      name='phone'
                    />
                  </Form.Group>

                  <Form.Group className='mb-3' controlId='formGroupName'>
                    <Form.Label>Address :</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder=''
                      defaultValue={users?.address}
                      name='address'
                    />
                  </Form.Group>
                  <Button variant='danger' style={{ marginRight: '5px' }} onClick={handleCancel}>
                    Back
                  </Button>

                  <Button variant='warning' type='submit'>
                    Update
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <GetUserById setUser={setUser} uid={uid} />
      </Container>
    </>
  );
}

export default UserProfile;
