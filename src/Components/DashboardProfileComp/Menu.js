import React from 'react';
import { Col, Nav, ListGroup } from 'react-bootstrap';
import { handleDeleteAkun } from '../../Utils/crudData';

function MenuProfile() {
  return (
    <>
          <Col sm={3}>
            <Nav className='flex-column mb-4'>
              <ListGroup>
                <ListGroup.Item action href='/profile'>
                  Profile
                </ListGroup.Item>
                <ListGroup.Item action href='/profile/list'>
                  List Reports
                </ListGroup.Item>
                <ListGroup.Item action href='/profile/change'>
                  Change Password
                </ListGroup.Item>
                <ListGroup.Item action onClick={handleDeleteAkun}>
                  Delete Account
                </ListGroup.Item>
              </ListGroup>
            </Nav>
          </Col>
    </>
  );
}

export default MenuProfile;
