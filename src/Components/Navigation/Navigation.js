import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import './navigation.css';

function Navigation() {
  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="/">
          {' '}
          <img src="/assets/logo.png" className="rounded" alt="Logo HopePoints" /> HopePoints
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className="navbar-link" href="/">
              Home
            </Nav.Link>
            <NavDropdown title="Features" id="basic-nav-dropdown">
              <NavDropdown.Item className="navbar-dropdown" href="/form">
                Form
              </NavDropdown.Item>
              <NavDropdown.Item className="navbar-dropdown" href="/maps">
                Maps
              </NavDropdown.Item>
            </NavDropdown>
            {/* <Nav.Link className='navbar-link' href='#link'>
              Form
            </Nav.Link>
            <Nav.Link className='navbar-link' href='#link'>
              Maps
            </Nav.Link> */}
            <Nav.Link className="navbar-link" href="/office">
              Office
            </Nav.Link>
            <Nav.Link className="navbar-link" href="/about">
              About Us
            </Nav.Link>
            <span>
              <NavLink to="/login">
                <button>
                  <span>Login</span>
                </button>
              </NavLink>
            </span>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
