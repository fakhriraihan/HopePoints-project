import React from 'react';
import { Col, Nav, ListGroup } from 'react-bootstrap';

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
                <ListGroup.Item action href='/'>
                  Logout
                </ListGroup.Item>
              </ListGroup>
            </Nav>
          </Col>
    </>
  );
}

export default MenuProfile;
