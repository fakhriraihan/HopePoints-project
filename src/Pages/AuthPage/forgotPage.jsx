import { useState } from 'react';
import { useForgot } from '../../Utils/auth';
import Swal from 'sweetalert2';
import Navigation from '../../Components/Navigation/Navigation';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const forgotUser = useForgot();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await forgotUser(email);
      Swal.fire("Password Reset Email Sent", "Please check your email to reset your password", "success");
    } catch (error) {
      Swal.fire("Error", "Failed to send password reset email", "error");
    }
  };

  return (
    <>
    <Navigation />
      <form className="login" onSubmit={handleLogin}>
      <div className='form-border'>
        <h2>HopePoints</h2>
        <p>Forgot your password? Enter your email to reset it.</p>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="submit" value="Reset Password" />
        <div className="links">
          <a href="/login">Back to Login/Signup</a>
        </div>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
