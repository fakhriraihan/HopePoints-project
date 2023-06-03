import { useContext } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { AuthContext } from '../Context/AuthContext';

const useLogout = () => {
  const { dispatch } = useContext(AuthContext);
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return handleLogout;
};

export default useLogout;
