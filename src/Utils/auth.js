import { useContext } from 'react';
import { getAuth, signOut, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../Config/firebase";
import { AuthContext } from '../Context/AuthContext';

export const useLogout = () => {
  const { dispatch } = useContext(AuthContext);
  const authInstance = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(authInstance);
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return handleLogout;
};

export const useLogin = () => {
  const { dispatch } = useContext(AuthContext);

  const loginUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // Retrieve user role from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.data();
      const role = userData.role;

      dispatch({ type: "LOGIN", payload: { user, role } });
      if (role === "admin" || role === "office") {
        window.location.href = "/dashboard";
      } else if (role === "user") {
        window.location.href = "/";
      } else {
        console.log('error');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return loginUser;
};

export const useRegister = () => {
  const { dispatch } = useContext(AuthContext);

  const registerUser = async (email, password, name, tlfn, address) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Set user role in Firestore
      await setDoc(doc(collection(db, 'users'), user.uid), {
        uid: user.uid,
        role: 'user', 
        name: name,
        email: user.email,
        address: address,
        phone: tlfn,
      });

      await sendEmailVerification(auth.currentUser);
      await updateProfile(user, {
        displayName: name,
      });

      dispatch({ type: 'LOGIN', payload: user });
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  return registerUser;
};

export const useForgot = () => {
  const forgotUser = async (email) => {
    const auth = getAuth();

    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.log('error');
    }
  };

  return forgotUser;
};
