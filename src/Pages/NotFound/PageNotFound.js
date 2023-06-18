import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <Container
      className='d-flex align-items-center justify-content-center'
      style={{ height: '100vh' }}
    >
      <Row>
        <Col className='text-center'>
          <h1>404 - Page Not Found</h1>
          <p>The page you are looking for does not exist.</p>
          <Button onClick={() => navigate('/')} variant='secondary'>
            Back to Homepage
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default PageNotFound;
