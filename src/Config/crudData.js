import { useEffect } from 'react';
import { collection, query, where, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';

const GetUserWhereRole = ({ setUsers, setRole }) => {
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'users'), where('role', '==', setRole)), 
      (snapshot) => {
        const userList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        console.log('Retrieved data:', userList);
        setUsers(userList);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [setUsers, setRole]);

  return null;
};

const handleDeleteUser = async (userId) => {
    try {
      const userRef = doc(db, 'users', userId);
      await deleteDoc(userRef);
      console.log('User deleted successfully!');
    } catch (error) {
      console.log('Error deleting user:', error);
    }
  };

export {GetUserWhereRole, handleDeleteUser};
