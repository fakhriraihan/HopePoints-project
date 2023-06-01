import React from 'react';
import Navigation from '../../Components/Navigation/Navigation';
import './Login.css';
import { useContext, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../Config/firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { collection, doc, setDoc } from "firebase/firestore";

const RegisterPage = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [tlfn, setTelfn] = useState("");

  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

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

      dispatch({ type: "LOGIN", payload: user });
      navigate("/dashboard");
      console.log(user);
    } catch (error) {
      setError(true);
    }
  };
  return (
    <>
    <Navigation />
    <form className="login" onSubmit={handleLogin}>
        <h2>Hope Points</h2>
        <p>Please create your account!</p>
        <input type="text" placeholder="Full Name" required  onChange={(e) => setName(e.target.value)}/>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required/>
        <input type="password" placeholder="Password"  onChange={(e) => setPassword(e.target.value)} required/>
        <input type="text" placeholder="No Handphone"  onChange={(e) => setTelfn(e.target.value)} required/>
        <input type="text" placeholder="Address"  onChange={(e) => setAddress(e.target.value)} required/>
        <input type="submit" value="Log In" />
            <div className="links">
                <a href="/login">Already Have an Account? Login</a>
            </div>
    </form>
        </>
  );
};

export default RegisterPage;
