import React, { useState } from 'react';
import { Container, Row, Col, Image, Form, Button} from 'react-bootstrap';
import axios from 'axios';
import LoadingOverlay from '../LoadingOverlay';
import '../general.css';
import {verificationSchema} from '../../Validations/VerificationValidation';
import NotificationAlert from '../Alerts/NotificationAlert';

/* When they are verified */
const Verification = () => {
  const [loading, setLoading] = useState(false);
  const [cor, setCOR] = useState(null);
  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [feature, setFeature] = useState('');
  const [item, setItem] = useState('');
  const [disabled, setDisabled] = useState(false);

  const handleFileChange = (e) => {
    console.log(e.target.files[0])
    setCOR(e.target.files[0]);
  }

  const handleSubmit = async (e) => {
    console.log(cor, privacyPolicy)
    
    const isValid = await verificationSchema.isValid({cor, privacyPolicy}); 
    if(isValid){
    e.preventDefault();
    setLoading(true);
    // set headers to multipart/form-data
    console.log(cor)
    axios.post(`${process.env.REACT_APP_BASE_URL}/student_portal/submit_cor`, {cor:cor}, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
      if(res.data.success){
        setLoading(false);
        setDisabled(true)
        setFeature('Verification');
        setItem('Certificate of Registration');
        setShowAlert(true);
        setTimeout(() => {
        window.location.reload();
        setDisabled(false);
        }, 3000);
      }else{
        setLoading(false);
        setFeature('Verification');
        setItem('Certificate of Registration Failed');
        setShowAlert(true);
      }
    }).catch(err => {
      console.log(err);
    }).finally(() => {
      setLoading(false);
    });
  }else{
    alert('Please upload a valid Certificate of Registration and accept the privacy policy.');
  }
  }

    return (
        <Container>
        <Row>
          <h2>Account Verification</h2>
          <p className="text-gray2">In order to remain compliant to regulatory requirements and to ensure that our platform is not misused for illicit or fraudulent activities, we aim to complete the verification procedure and approve your verified status within <strong>48 hours of submission</strong>. The information collected will be permanently deleted after the verification process is completed and will only be used for the purpose of student identification.</p>
        </Row>
        <hr className='my-0'/>
        <Row className="text-center">
          <Col className='text-gray2 mt-3'>
          <p>Iskolar Link is <strong className="text-yellow">exclusively</strong> available to students of the <strong>Polytechnic University of the Philippines</strong>.
          <br/>To unlock full access to our features, please verify your account by uploading your <strong className='text-red'>Certificate of Registration</strong>.</p>
          </Col>
        </Row>
        <Row>
          <Col></Col>
          <Col xs={8}>
          <Form className='mx-5 px-5'>
          <Form.Group controlId="formFile" className="mb-3 ">
            <Form.Label>Upload Current Certificate of Registration</Form.Label>
            <Form.Control type="file" className='text-gray2' onChange={handleFileChange}/>
          </Form.Group>
          <Row className='mt-4 mb-0'>
            <Col></Col>
            <Col xs={8}>
            <Form.Check
            type="checkbox"
            label={<p>I accept Iskolar Link’s <strong>Terms</strong> and <strong>Privacy Policy</strong>"</p>}
            onChange={() => setPrivacyPolicy(!privacyPolicy)}
          />
            </Col>
            <Col></Col>
          </Row>
          <div className='text-center'>
          <Button variant="primary" className='px-4' onClick={handleSubmit} disabled={disabled}>Verify Account</Button>

          </div>
        </Form>
          </Col>
          <Col></Col>
        </Row>
        {loading && <LoadingOverlay title={"Submitting Certificate of Registration..."}/>}
        {showAlert && <NotificationAlert setShowAlert={setShowAlert} feature={feature} item={item}/>}
        
        </Container>
    );
  };
  
  const Verifying = () => {
    
    return (
      <Container>
        <Row>
          <h2>Account Verification</h2>
          <p className="text-gray2">In order to remain compliant to regulatory requirements and to ensure that our platform is not misused for illicit or fraudulent activities, we aim to complete the verification procedure and approve your verified status within <strong>48 hours of submission</strong>. The information collected will be permanently deleted after the verification process is completed and will only be used for the purpose of student identification.</p>
        </Row>
        <Row className="text-center justify-content-md-center">
          <Col>
          <h3>Processing your verification.</h3>
          <p className='text-gray2'>Exciting updates on your verification status are on the way.<br/>Your cooperation with our requirements is truly appreciated!</p>
          <Image src="/processing-icon.png" />
          </Col>
         
        </Row>
      </Container>
    );
  };

  const Verified = () => {
    return (
      <Container>
        <Row>
          <h2>Account Verification</h2>
          <p className="text-gray2">Account verification occurs <strong className='text-red'>every semester </strong>. Please bear with us and comply for the best experience and security for your campus journey.</p>
        </Row>
        <Row className="text-center justify-content-md-center">
          <Col>
          <h3>You are verified.</h3>
          <p className='text-gray2'>Thanks you for meeting our requirement.<br/>Now, go ahead and make the most of your campus journey!</p>
          <Image src="/shield-check.png" />
          </Col>
         
        </Row>
      </Container>
    );
  };

  const VerifyFailed = ({remarks}) => {
    const [loading, setLoading] = useState(false);
    const [cor, setCOR] = useState(null);
    const [privacyPolicy, setPrivacyPolicy] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
  const [feature, setFeature] = useState('');
  const [item, setItem] = useState('');
  const [disabled, setDisabled] = useState(false);

    axios.defaults.withCredentials = true;

    const handleFileChange = (e) => {
      console.log(e.target.files[0])
      setCOR(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
      console.log(cor, privacyPolicy)
      
      const isValid = await verificationSchema.isValid({cor, privacyPolicy}); 
      if(isValid){
      e.preventDefault();
      setLoading(true);
      // set headers to multipart/form-data
      console.log(cor)
      axios.post(`${process.env.REACT_APP_BASE_URL}/student_portal/submit_cor`, {cor:cor}, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {

        if(res.data.success){
          setDisabled(true)
          setLoading(false);
          setFeature('Verification');
          setItem('Certificate of Registration');
          setShowAlert(true);
          setTimeout(() => {
          window.location.reload();
          setDisabled(false);
          }, 3000);
        }else{
          setLoading(false);
          setFeature('Verification');
          setItem('Certificate of Registration Failed');
        }
      }).catch(err => {
        console.log(err);
      }).finally(() => {
        setLoading(false);
      });
    }
  }


    return (
      <Container className="my-5">
        <Row>
          <h2>Account Verification</h2>
          <p className="text-gray2">In order to remain compliant to regulatory requirements and to ensure that our platform is not misused for illicit or fraudulent activities, we aim to complete the verification procedure and approve your verified status within <strong>48 hours of submission</strong>. The information collected will be permanently deleted after the verification process is completed and will only be used for the purpose of student identification.</p>
        </Row>
        <hr className='my-0'/>
        <Row className="text-center">
          <Col className='text-gray2 mt-3'>
          <h2 className='text-red'>Verification Failed.</h2>
          <p>Iskolar Link is <strong className="text-yellow">exclusively</strong> available to students of the <strong>Polytechnic University of the Philippines</strong>.
          <br/>To unlock full access to our features, please verify your account by uploading your <strong className='text-red'>Certificate of Registration</strong>.</p>
          </Col>
        </Row>
        <Row className='mx-5 text-gray2'>
          <Col xs={2}></Col>
          <Col xs={8}>
          <p className='my-2'>Here are some of the reason why your verification <strong className='text-red'>failed</strong>.</p>
          <ol className='mb-3'>
            <li>You uploaded a wrong document. (ex. Certificate of Registration is not your current semester)</li>
            <li>You are currently not enrolled on Polytechnic University of the Philippines.</li>
          </ol>
          <p>If 1 or 2 is correct, please try verifying your account again by uploading the correct requirement.</p>
          </Col>
          <Col xs={1}></Col>
          
        </Row>
        <Row className='mt-4 mb-0'>
           <center>Remarks: {remarks}</center>
        </Row>
        <Row>
        
          <Col></Col>
          <Col xs={8}>
            
          <Form className='mx-5 px-5'>
          <Form.Group controlId="formFile" className="mb-3 ">
            <Form.Label>Upload Current Certificate of Registration</Form.Label>
            <Form.Control type="file" className='text-gray2' onChange={handleFileChange}/>
          </Form.Group>
          <Row className='mt-4 mb-0'>
            <Col></Col>
            <Col xs={8}>
            <Form.Check
            type="checkbox"
            label={<p>I accept Iskolar Link’s <strong>Terms</strong> and <strong>Privacy Policy</strong>"</p>}
            onChange={() => setPrivacyPolicy(!privacyPolicy)}
            value={privacyPolicy}
          />
            </Col>
            <Col></Col>
          </Row>
          <div className='text-center'>
          <Button variant="primary" className='px-4' onClick={handleSubmit} disabled={disabled}>Verify Account</Button>

          </div>
        </Form>
          </Col>
          <Col></Col>
        </Row>
        {loading && <LoadingOverlay title={"Submitting Certificate of Registration..."}/>}
        {showAlert && <NotificationAlert setShowAlert={setShowAlert} feature={feature} item={item}/>}
        
      </Container>
    );
  };


  export default Verification;

  export {Verified, Verifying, VerifyFailed};