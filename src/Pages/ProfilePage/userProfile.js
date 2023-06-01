import React, {useState} from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import Navigation from '../../Components/Navigation/Navigation';
import MenuProfile from '../../Components/DashboardProfileComp/Menu';
import './profile.css';
import { getIdOfficeFromLocalStorage } from '../../Utils/UserData';
import {GetReportByid, GetUserById} from '../../Utils/crudData';

function UserProfile() {
  const uid = getIdOfficeFromLocalStorage();
  const [users, setUser] = useState(null);

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
                <Card.Body >
                <Form>
                <Form.Group className='mb-3' controlId='formGroupName'>
                  <Form.Label>Nama :</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder=''
                    defaultValue={users?.name}
                  />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formGroupName'>
                  <Form.Label>Email :</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder=''
                    defaultValue={users?.email}
                    readOnly
                  />
                </Form.Group>
                <Form.Group className='mb-3' controlId='formGroupName'>
                  <Form.Label>No Handphone :</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder=''
                    defaultValue={users?.phone}
                  />
                </Form.Group>
                <Form.Group className='mb-3' controlId='formGroupName'>
                  <Form.Label>Address :</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder=''
                    defaultValue={users?.address}
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
        <GetUserById setUser={setUser} uid={uid} />
      </Container>
    </>
  );
}

export default UserProfile;
