import React from 'react';
import Navigation from '../../Components/Navigation/Navigation';
import './Login.css';
import { useState } from "react";
import { useLogin } from '../../Utils/auth';
import logo from '../../assets/logo.png'

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
      <div className='form-border'>
        <img src={logo} className='image-login centered' alt="Logo" />
        <h2>Welcome, User!</h2>
        <p>Please log in</p>
        {error && <span className='wrong-login centered'>Wrong email or password!</span>}
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
        <div className="links">
        <label>
        <input type="checkbox" defaultChecked />
        Remember Me
      </label>
          <a href="/forgot">Forgotten your password?</a>
        </div>
        <small className='privacy-policy centered'>By Logging in, you agree to Hope Points Privacy Policy and<br /> Terms of Use</small>
        <input type="submit" value="Log In" />
        <div className="links-register centered">
          <small style={{marginRight: '5px'}}>Not a Member? </small><a href="/register">Join Us</a>
        </div>
      </div>
    </form>
        </>
  );
};

export default LoginPage;
