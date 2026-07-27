import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ResetPasswordPage.css'; // Import the CSS file for styling
import axios from 'axios';

const ResetPasswordPage = () => {
  const { email, code } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if(email === undefined || code === undefined){
            navigate('/');
        }

        axios.get(`${process.env.REACT_APP_BASE_URL}/auth/reset-password-auth/${email}/${code}`)
            .then(res => {
                if(res.data.error){
                    alert(res.data.error);
                    navigate('/');
                }
            })
            .catch(err => {
                console.log(err);
                alert('An error occurred while resetting the password.');
                navigate('/');
            });

    }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (window.confirm('Do you want to continue with password reset?')) {
      try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/reset-password/${email}/${code}`, {
            password: password,
        })
            .then(res => {
                if(res.data.error){
                    alert(res.data.error);
                    return;
                }
                alert('Password has been reset successfully!');
                navigate('/');
            })
        // Assume resetPassword is a function that makes an API call
        //await resetPassword(email, code, password);
      } catch (error) {
        // Handle errors appropriately
        alert('An error occurred while resetting the password.');
      }
    }
  };

  return (
    <div className="reset-password-wrapper">
    <div className="reset-password-container">
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit} className="reset-password-form">
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
    </div>
  );
};

export default ResetPasswordPage;
