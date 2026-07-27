import React, { useState, useEffect } from 'react';
import { Container, Form, Row, Col, Image, Button } from 'react-bootstrap';
import './ResetPasswordPage.css'; // Import the CSS file for styling
import { useParams, useNavigate } from 'react-router-dom';
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
        <Container className="forgot-password-page border p-5" style={{width:'50%'}}>
            <Container className="register-modal text-white pt-4">
                <h1 className="text-center Inter-b modal-title">Password Reset</h1>
                <div className='register-form p-5 mx-auto text-lightblack' style={{borderRadius:'30px'}}>
                    <div className='text-center'>
                        <Image src="Register_icon.png" roundedCircle />
                        <h3 className="reg-h3 text-red pb-1">Reset Your Password</h3>
                        <Image src="Phone.png" />
                    </div>
                    <Form onSubmit={handleSubmit} className='Inter-med text-14px'>
                      <Row>
                        <Form.Group>
                          <p className='mb-0'>
                            New Password <span className='text-red'>*</span>
                          </p>
                          <Form.Control
                          type="password"
                          placeholder='Password'
                          required
                          className='text-16px'
                          onChange={(e) => setPassword(e.target.value)}
                          />
                        </Form.Group>
                      </Row>
                      <Row className='mt-3'>
                        <Form.Group>
                          <p className='mb-0'>
                            Confirm Password <span className='text-red'>*</span>
                          </p>
                          <Form.Control
                          type="password"
                          placeholder='Password'
                          required
                          className='text-16px'
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </Form.Group>
                      </Row>
                      <Row className='text-center mt-3 mx-5 '>
                      <Button variant='primary' type="submit">Confirm</Button>
                      </Row>
                  </Form>
                </div>
            </Container>
        </Container>
    );
};

export default ResetPasswordPage;
