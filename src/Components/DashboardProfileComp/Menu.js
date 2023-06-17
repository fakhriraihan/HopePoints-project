import React, {useContext} from 'react';
import { Col, Nav, ListGroup } from 'react-bootstrap';
import { handleDeleteAkun } from '../../Utils/crudData';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Context/AuthContext';


function MenuProfile() {
  const { dispatch } = useContext(AuthContext);
  const handleDelete = () => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Anda akan menghapus akun ini.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteAkun();
        dispatch({ type: 'LOGOUT' });
      }
    });
  };

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
                <ListGroup.Item action onClick={handleDelete}>
                  Delete Account
                </ListGroup.Item>
              </ListGroup>
            </Nav>
          </Col>
    </>
  );
}

export default MenuProfile;
