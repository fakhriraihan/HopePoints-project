import React from 'react';
import Navigation from '../../Components/Navigation/Navigation';
import './Login.css';
import { useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../Config/firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { collection, doc, getDoc } from "firebase/firestore";

const LoginPage = () => {
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const navigate = useNavigate();
  
    const { dispatch } = useContext(AuthContext);
  
    const handleLogin = async (e) => {
      e.preventDefault();
    
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
    
        if (role === "admin") {
          navigate("/dashboard");
        } else if (role === "user") {
          navigate("/");
        } else {
          setError(true);
        }
    
        console.log(user);
      } catch (error) {
        setError(true);
      }
    };

  return (
    <>
    <Navigation />
    <form className="login" onSubmit={handleLogin}>
        <h2>Welcome, User!</h2>
        <p>Please log in</p>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
        <input type="submit" value="Log In" />
            <div className="links">
                <a href="/">Forgot password</a>
                <a href="/register">Register</a>
            </div>
    </form>
        </>
  );
};

export default LoginPage;
