import { useState, useContext } from 'react';
import { Button, Modal, Form, Row, Col, CloseButton, Image} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './general.css';
import { AuthContext } from '../helpers/AuthContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Ensure you have FontAwesome imported
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Import the eye icons
import RegisterPopup from './RegisterPopup'
import LoadingOverlay from './LoadingOverlay'
 
function ForgotPassword({setShowLogin, showForgotPassword, setShowForgotPassword}) {
    const [forgotPasswordDetails, setForgotPasswordDetails] = useState({
        email: '',
    });
    const {auth, menu} = useContext(AuthContext);
    const {authState, setAuthState} = auth;
    const {activeMenu, setActiveMenu} = menu;
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const [loading, setLoading] = useState(false);


    const handleCloseForgotPassword = () => setShowForgotPassword(false);
    const handleShowForgotPassword = () => {
        setShowForgotPassword(true);
        setShowLogin(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        try{
            axios.post(`${process.env.REACT_APP_BASE_URL}/mailing/send_forgot_password`, {
                email: forgotPasswordDetails.email
            })
                .then(res => {
                    if(res.data.error){
                        alert(res.data.error);
                    }else{
                        alert(res.data.success)
                    }
                    handleCloseForgotPassword();
                })
                .catch(err => {
                    console.log(err);
                    alert('An error occurred while sending the email.');
                });
        }catch(err){
            console.log(err);
            alert('An error occurred while sending the email.');
        }finally{
            setLoading(false);
        }
    }

    

  return (
    <div>
        <Modal
                show={showForgotPassword}
                onHide={handleCloseForgotPassword}
                backdrop="static"
                keyboard={true}
                size="lg"
                className="rounded-modal"
                centered
                animation
            >
            <div className="register-modal pt-1">
            <Modal.Header closeButton className="modal-header text-white px-4 mx-5 text-center">
                <Modal.Title className="ms-auto Inter-b modal-title mt-4">Forgot Password</Modal.Title>
            </Modal.Header>
            <div>
                <p className="modal-subtitle text-center Inter-normal text-white pt-3">Be part of our growing Iskolar Family!</p>
            </div>
            <Modal.Body className='Inter-normal text-white'>
                <div className='register-form p-5 mx-auto text-black shadow-lg text-center'>
                    <div className='text-center'>
                        <Image src="Register_icon.png" roundedCircle/>
                        <h3 className="reg-h3 Inter text-red pb-1">Reset Your Password</h3>
                    </div>
                    <Image src="Phone.png" className="my-2"/>
                    <div>
                    <Form onSubmit={handleSubmit}>
                    <Form.Group as={Row} controlId="formEmail" className='mx-5'>
                        <Form.Label className=''><p className='no-decoration Inter-regular text-14px'>Enter the <span className='Inter-b'>PUP webmail</span> associated with your acccount:</p></Form.Label>
                            <Form.Control type="email" placeholder="sample@iskolarngbayan.pup.edu.ph" onChange={(e) => setForgotPasswordDetails({...forgotPasswordDetails, email: e.target.value})}/>
                    </Form.Group>
                    <Row className="mt-3">
                                <Col/>
                                <Button as={Col} xs={7} variant="primary" type="submit" onClick={handleSubmit}>
                                    Submit
                                </Button>
                                <Col/>
                            </Row>
                </Form>
                </div>
                </div>
                
            </Modal.Body>
            </div>
            
            
            {loading && <LoadingOverlay title={"Finding Email..."}/>}
        </Modal>
        {/*
                            <Row className="justify-content-center Poppins text-center">
                                <Form.Group as={Col} className="mb-3" md={2} controlId="formOTP1">
                                    <Form.Control type="text" className="p-4 bg-lightgray" ref={otp1Ref} onChange={(e) => handleOTPChange(e, otp2Ref, null)} maxLength={1}/>
                                </Form.Group>
                                <Form.Group as={Col} className="mb-3" md={2} controlId="formOTP2">
                                    <Form.Control type="text" className="p-4 bg-lightgray" ref={otp2Ref} onChange={(e) => handleOTPChange(e, otp3Ref, otp1Ref)} maxLength={1}/>
                                </Form.Group>
                                <Form.Group as={Col} className="mb-3" md={2} controlId="formOTP3">
                                    <Form.Control type="text" className="p-4 bg-lightgray" ref={otp3Ref} onChange={(e) => handleOTPChange(e, otp4Ref, otp2Ref)} maxLength={1}/>
                                </Form.Group>
                                <Form.Group as={Col} className="mb-3" md={2} controlId="formOTP4">
                                    <Form.Control type="text" className="p-4 bg-lightgray" ref={otp4Ref} onChange={(e) => handleOTPChange(e, null, otp3Ref)} maxLength={1}/>
                                </Form.Group>
                            </Row>

                            <Row className="mt-5 mb-3">
                                <Col/>
                                <Button as={Col} xs={7} variant="primary" type="submit" onClick={handleSubmit}>
                                    Submit
                                </Button>
                                <Col/>
                            </Row>
                            <Row classname="mb-3">
                            <p className='text-gray2 Inter-normal reg-q text-center'>
                    Didn't get the code?
                    <span 
                        className={`mx-3 ${canResend ? 'text-yellow' : 'text-gray'}`} 
                        onClick={handleResend}
                        style={{ cursor: canResend ? 'pointer' : 'default' }}
                    >
                        Resend{!canResend && ` in ${timeLeft}s`}
                    </span>
                </p>                        
                            </Row>
                        </div>
                    </Modal.Body>
                </div>
                {loading && <LoadingOverlay title={"Checking Details..."}/>}
 */}
      
    </div>
  )
}



export default ForgotPassword
