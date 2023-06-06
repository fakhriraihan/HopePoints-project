import React from 'react';
import Navigation from '../../Components/Navigation/Navigation';
import './Login.css';
import { useState } from "react";
import { useLogin } from '../../Utils/auth';

const LoginPage = () => {
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginUser = useLogin();
  
    const handleLogin = async (e) => {
      e.preventDefault();
    
      try {
       await loginUser(email, password)
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
                <a href="/forgot">Forgot password</a>
                <a href="/register">Register</a>
            </div>
        {error && <span className='wrong-login'>Wrong email or password!</span>}
    </form>
        </>
  );
};

export default LoginPage;
