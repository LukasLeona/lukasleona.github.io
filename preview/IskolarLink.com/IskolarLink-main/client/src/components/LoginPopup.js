import { useState, useContext, useEffect } from 'react';
import { Button, Modal, Form, Row, Col, CloseButton} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './general.css';
import { AuthContext } from '../helpers/AuthContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Ensure you have FontAwesome imported
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Import the eye icons
import RegisterPopup from './RegisterPopup'
import ForgotPassword from './ForgotPassword';
import LoadingOverlay from './LoadingOverlay';
import NotificationAlert from './Alerts/NotificationAlert';

function LoginPopup({showLogin,setShowLogin, setShowForgotPassword, setShowRegister}) {

  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: '',
    keepLoggedIn: false
  });

  const {auth, menu} = useContext(AuthContext);
  const {authState, setAuthState} = auth;
  const {activeMenu, setActiveMenu} = menu;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [feature, setFeature] = useState('');
  const [item, setItem] = useState('');
  const [disabled, setDisabled] = useState(false);

  axios.defaults.withCredentials = true;

  const handleShowRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  }

  const [passwordShown, setPasswordShown] = useState(false);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, loginDetails).then((response) => {
      console.log(response.data);
      if(response.data.error){
        setLoading(false);
        alert(response.data.error);
      }else{
        if(response.data.student){
        setLoading(false);
        setFeature('login');
        setItem('student account');
        setShowAlert(true);
        }
        
        if(response.data.org){
          setLoading(false);
          setFeature('login');
          setItem('organization account');
          setShowAlert(true);
          navigate('/organization/profile');
          setActiveMenu('org');
        }
        setDisabled(true);
        setTimeout(() => {
          setDisabled(false);
          handleCloseLogin();
          setAuthState({...authState, status: true});
        }, 3000);
      }
    });
  }
  

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleShowForgotPassword = () => {
    setShowLogin(false);
    setShowForgotPassword(true);
  }

  return (
    <>
      <Button variant="primary" className="text-white ms-2 px-3 Inter" onClick={handleShowLogin}>
        Log In
      </Button>
      <Modal
        show={showLogin}
        onHide={handleCloseLogin}
       
        keyboard={true}
        size="lg"
        className="rounded-modal"
        style={{ borderRadius: '20px' }}
        centered
        animation
      >
        <div className="login-modal pt-1 " >
        
          <Modal.Header className="px-4 modal-header text-white mx-5" closeButton>
            <Modal.Title id="login-popup" className="ms-auto Inter-b modal-title mt-4">
              Welcome Back!
            </Modal.Title>
          </Modal.Header>
          <div>
              <p className="modal-subtitle Inter-normal text-center text-white pt-3 ">We're glad you want to connect!</p>
          </div>
          <Modal.Body className="Inter-normal text-white">
            <div className='login-form mb-5 p-5 mx-auto  text-black shadow-lg'>
               
              <Form >
                <Form.Group className="mb-3" controlId="formLoginWebmail">
                  <Form.Label className='Inter-med'>Webmail address</Form.Label>
                  <Form.Control type="email" placeholder="Enter your webmail address" className='Inter-normal' onChange={(e) => setLoginDetails({...loginDetails, email: e.target.value})}/>
                </Form.Group>

                <Form.Group className="mb-3 position-relative" controlId="formLoginPassword">
                  <Form.Label className='Inter-med'>Password</Form.Label>
                  <Form.Control
                    type={passwordShown ? "text" : "password"}
                    placeholder="Enter your password"
                    className='Inter-normal'
                    onChange={(e) => setLoginDetails({...loginDetails, password: e.target.value})}
                  />
                  <FontAwesomeIcon
                    icon={passwordShown ? faEye : faEyeSlash }
                    className="position-absolute end-0 top-69 translate-middle-y me-3"
                    onClick={togglePasswordVisibility}
                    style={{ cursor: 'pointer', right: '10px', top: '69%', transform: 'translateY(-50%)' }}
                  />
                  
                      </Form.Group>

                <Row>
                  <Form.Group as={Col} controlId="formLoginCheckbox" >
                    <Form.Check type="checkbox" label="Keep me logged in" className='Inter-normal' onChange={(e) => setLoginDetails({...loginDetails, keepLoggedIn: e.target.value})} />
                  </Form.Group> 
                  <Form.Group as={Col} controlId="formLoginForgotPassword" className="text-end">
                    <span className='Inter-normal login-q' onClick={handleShowForgotPassword} style={{cursor:'pointer'}}>Forgot Password?</span>
                  </Form.Group>
                </Row>
                
                <Row className="p-2 my-1">
                  <Button variant="primary" type="submit" className="Inter login-b" onClick={handleSubmit} disabled={disabled}>
                  Log In
                  </Button>
                </Row>
                <Row classname="mb-3">
                      <p className='text-gray2 Inter-normal login-q text-center'>Don't have an account?       
                      <span className='Inter-normal login-q mx-3 text-yellow' onClick={handleShowRegister} style={{cursor: 'pointer'}}>Sign Up</span></p>  
                </Row>

                </Form>
            </div>
            {showAlert && <NotificationAlert setShowAlert={setShowAlert} feature={feature} item={item}/>}
            
          </Modal.Body>
        </div>
        {loading && <LoadingOverlay title={"Logging In..."}/>}
        
      </Modal>
    </>
  );
}

export default LoginPopup;
