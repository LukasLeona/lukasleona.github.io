import React,{useState,useEffect} from 'react';
import { Form, Container, Image, Row, Col, Button} from 'react-bootstrap';
import './general.css';
import axios from 'axios';


const FAQs_Form = () => {
  const [feedback, setFeedback] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_BASE_URL}/feedback/add`, feedback)
      .then(res => {
        alert(res.data.success);
        setFeedback({});
        window.location.reload();
      })
      .catch(err => {
        alert(err.response.data.error);
      });
  }

  return (
    <>
        <Container>
            <Container className='text-center'>
              <Image src="/icon_125.png"/>
              <Row>
                <h3>Still Have Questions? <strong>Get In Touch With Us</strong></h3>
                <p>Can’t find the answer you’re looking for? Please chat to our friendly team.</p>
              </Row>
            </Container>
              <Form className='m-5'>
                <Row className='mb-3'>
                  <Form.Group as={Col}>
                    <Form.Label> Name <span className='Inter-normal'>(Optional)</span></Form.Label>
                    <Form.Control type='text' placeholder='Enter Name' value={feedback.fullName} onChange={(e) => setFeedback({...feedback, fullName: e.target.value})} />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Email <span className='text-red'>*</span></Form.Label>
                    <Form.Control type="email" placeholder='Enter Email' value={feedback.email} onChange={(e) => setFeedback({...feedback, email: e.target.value})} />
                  </Form.Group>
                </Row>
                <Row className='mb-3'>
                  <Form.Group>
                    <Form.Label>Subject <span className='text-red'>*</span></Form.Label>
                    <Form.Control type='text' placeholder='Enter the Subject' value={feedback.subject} onChange={(e) => setFeedback({...feedback, subject: e.target.value})} required/>
                  </Form.Group>
                </Row>
                <Row className='mb-4'>
                  <Form.Group>
                    <Form.Label>Message <span className='text-red'>*</span></Form.Label>
                    <Form.Control as='textarea' rows={5} placeholder='Hi! I am the student organization representative of...' value={feedback.message} onChange={(e) => setFeedback({...feedback, message: e.target.value})} required/>
                  </Form.Group>
                </Row>
                <Row>
                  <Col>
                    <Button variant="secondary" type="submit" className="text-start px-3" onClick={handleSubmit}>
                      Submit
                    </Button>
                  </Col>
                  <Col>
                    <p className='text-end'>Your request will be sent securely and remain private.</p>
                  </Col>
                </Row>
              </Form>
        </Container>
    
    </>
      
  );
};

export default FAQs_Form;
