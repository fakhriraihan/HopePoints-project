import React, { useState } from 'react';
import Navigation from '../../Components/Navigation/Navigation';
import './Login.css';
import { useRegister } from '../../Utils/auth';
import logo from '../../assets/logo.png'
import Swal from 'sweetalert2';

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [tlfn, setTelfn] = useState("");

  const registerUser = useRegister();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await registerUser(email, password, name, tlfn, address, 'user');
      Swal.fire("Success", "Registration successful", "success")
        .then(() => {
          Swal.fire("Confirmation Email", "Please check your email to confirm your account", "info")
            .then(() => {
              window.location.href = '/login';
            });
        });
    } catch (error) {
      Swal.fire("Error", "Registration failed", "error");
    }
  };

  return (
    <>
      <Navigation />
      <form className="login" onSubmit={handleLogin}>
      <div className='form-border'>
        <img src={logo} className='image-login centered' alt="Logo" />
        <h2>Hope Points</h2>
        <p>Please create your account!</p>
        <input type="text" placeholder="Full Name" required onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <input type="text" placeholder="No Handphone" onChange={(e) => setTelfn(e.target.value)} required />
        <input type="text" placeholder="Address" onChange={(e) => setAddress(e.target.value)} required />
        <input type="submit" value="Sign Up" />
        <div className="links">
          <a href="/login">Already Have an Account? Login</a>
        </div>
        </div>
      </form>
    </>
  );
};

export default RegisterPage;
