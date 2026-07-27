import { useState, useRef, useEffect } from 'react';
import { Button, Modal, Form, Row, Col, Image } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import './general.css';
import axios from 'axios';
import LoadingOverlay from './LoadingOverlay';
import NotificationAlert from './Alerts/NotificationAlert';
import { NotificationError } from './Alerts/NotificationAlert';

function RegisterPopup2({regDetails, complete, setRegDetails, setSuccess}) {
    const [showRegister, setShowRegister] = useState(false);
    const [loading, setLoading] = useState(false);
    const [otp, setOTP] = useState('');
    const [errorItem, setErrorItem] = useState(false); // New state to track OTP error

    const navigate = useNavigate();
    const [canResend, setCanResend] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60);
    const [showAlert, setShowAlert] = useState(false);
    const [feature, setFeature] = useState('');
    const [item, setItem] = useState('');
    const otp1Ref = useRef(null);
    const otp2Ref = useRef(null);
    const otp3Ref = useRef(null);
    const otp4Ref = useRef(null);

    const handleCloseRegister = () => setShowRegister(false);
    const handleShowRegister =  () => {
        setLoading(true);
        if(complete){
        if(regDetails.password !== regDetails.confirmPassword){
            alert("Passwords do not match!");
            setLoading(false);
            return;
        }else{
            axios.post(`${process.env.REACT_APP_BASE_URL}/mailing/send_verification`,{
                email: regDetails.email,
            }).then((res) => {
                if(res.data.error){
                    alert(res.data.error);
                    
                }else{
                    alert(res.data.success)
                    setOTP(res.data.code)
                    setShowRegister(true);
                }
            }).catch((err) => {
                console.log(err);
            });
        }
        setLoading(false);
        }else{
            alert("Please supply missing required fields.")
            setLoading(false);
        }
    }

    const handleOTPChange = (e, nextRef, prevRef) => {
        const value = e.target.value;
        if (value.length === 1 && nextRef) {
            nextRef.current.focus();
        } else if (value.length === 0 && prevRef) {
            prevRef.current.focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        let code = otp1Ref.current.value + otp2Ref.current.value + otp3Ref.current.value + otp4Ref.current.value;
        if(code !== otp){
            alert("Incorrect OTP. please try again.")
            setLoading(false);
            return;
        }else{
            setRegDetails({...regDetails, code: code})
        }
        if(regDetails.suffix === "N/A"){
            setRegDetails({...regDetails, student_suffix: ""});
        }
        axios.post(`${process.env.REACT_APP_BASE_URL}/auth/register`, regDetails).then((response) => {
            if(response.data === "Student created!"){
                alert("Registration successful!");
                setLoading(false);
                handleCloseRegister();  
                navigate('/');
            }else{
                setLoading(false);
                alert(response.data);
            }
        });
    }

    useEffect(() => {
        if (!canResend && timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        }
        if (timeLeft === 0) {
            setCanResend(true);
            setTimeLeft(60); // Reset time for next use
        }
    }, [timeLeft, canResend]);

    const handleResend = () => {
        if (canResend) {
            axios.post(`${process.env.REACT_APP_BASE_URL}/mailing/resend_verification`,{
                email: regDetails.email,
            }).then((res) => {
                if(res.data.error){
                    alert(res.data.error);
                }else{
                    alert(res.data.success)
                    setCanResend(false);
                    setTimeLeft(60); // Restart timer
                    setOTP(res.data.code)
                }
            }).catch((err) => {
                console.log(err);
            });
            
        }
    };

    return (
        <>
            <Button variant="primary" className="text-white link-button Inter" onClick={handleShowRegister}>
                Sign Up
            </Button>

            <Modal
                show={showRegister}
                onHide={handleCloseRegister}
                backdrop="static"
                keyboard={true}
                size="lg"
                className="rounded-modal"
                centered
                animation
            >
                <div className="register-modal pt-1">
                    <Modal.Header closeButton className="modal-header text-white px-4 mx-5 text-center">
                        <Modal.Title id="register-popup2" className="ms-auto Inter-b modal-title mt-4">
                            Sign Up!
                        </Modal.Title>
                    </Modal.Header>
                    <div>
                        <p className="modal-subtitle text-center Inter-normal text-white pt-3">Be part of our growing Iskolar Family!</p>
                    </div>
                    <Modal.Body className="Inter-normal text-white">
                        <div className='register-form p-5 mx-auto text-black shadow-lg text-center'>
                            <div className='text-center'>
                                <Image src="Register_icon.png" roundedCircle/>
                                <h3 className="reg-h3 Inter text-red pb-3">Second Step Verification</h3>
                            </div>
                            <Image src="Phone.png" className="my-4"/>
                            <div>
                                <p className='Inter-normal reg2-p mb-5'>Enter the verification code we sent to <br/> <strong>{regDetails.email}</strong><br/>
                                <span className='mx-3 text-red'>If you can't find the email, check your spam/junk folder.</span></p>
                            
                            </div>
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
                {showAlert ? (
                errorItem ? ( // Check if error variable is true
                <NotificationError
                    feature={feature}
                    item={item}
                    setShowAlert={setShowAlert}
                />
                ) : (
                <NotificationAlert
                    feature={feature}
                    item={item}
                    setShowAlert={setShowAlert}
                />
                )
      ) : null}            </Modal>
            
        </>
    )
}

export default RegisterPopup2;
