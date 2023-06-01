import React, { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import './navigation.css';
import { AuthContext } from '../../Context/AuthContext';

function Navigation() {
  const { dispatch } = useContext(AuthContext);
  const isUserLoggedIn = localStorage.getItem('user'); 
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <Navbar bg='light' expand='lg' fixed='top'>
      <Container>
        <Navbar.Brand href='/'>
          {' '}
          <img
            src='/assets/logo.png'
            className='rounded'
            alt='Logo HopePoints'
          />{' '}
          HopePoints
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto'>
            <Nav.Link className='navbar-link' href='/'>
              Home
            </Nav.Link>
            <NavDropdown title='Features' id='basic-nav-dropdown'>
              <NavDropdown.Item className='navbar-dropdown' href='/form'>
                Form
              </NavDropdown.Item>
              <NavDropdown.Item className='navbar-dropdown' href='/maps'>
                Maps
              </NavDropdown.Item>
            </NavDropdown>
            {/* <Nav.Link className='navbar-link' href='#link'>
              Form
            </Nav.Link>
            <Nav.Link className='navbar-link' href='#link'>
              Maps
            </Nav.Link> */}
            <Nav.Link className='navbar-link' href='#link'>
              News
            </Nav.Link>
            <Nav.Link className='navbar-link' href='/about'>
              About Us
            </Nav.Link>
            {isUserLoggedIn && isUserLoggedIn !== 'null' ? (
             <NavDropdown
             title={
                 <i className="fa-solid fa-user"></i>
             }
             id='basic-nav-dropdown' >
             <NavDropdown.Item href='/profile'>Profile</NavDropdown.Item>
             <NavDropdown.Divider />
             <NavDropdown.Item href='/profile/list'>List Reports</NavDropdown.Item>
             <NavDropdown.Divider />
             <NavDropdown.Item href='/login' onClick={handleLogout}>Logout</NavDropdown.Item>
           </NavDropdown>
            ) : (
              <span>
                <NavLink to='/login'>
                  <button>
                    <span>Login</span>
                  </button>
                </NavLink>
              </span>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
