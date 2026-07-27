import React, {useState,useEffect} from 'react'
import { Button, Modal, Form, Row, Col, CloseButton, Container} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function GiveCredentials({role, applicationStatus, orgId}) {
    
    const [showCredentials, setShowCredentials] = useState(false);

    const handleCloseCredentials = () => setShowCredentials(false);
    const handleShowCredentials = () => setShowCredentials(true);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_BASE_URL}/auth/add_org/${orgId}`, { email: email, password: password }).then((response) => {
            if(response.data.error){
                alert(response.data.error);
            }else{
                alert('Credentials given!');
                handleCloseCredentials();
            }
        });
    }


    axios.defaults.withCredentials = true;

  return (
    <>
        {(role === "student" && applicationStatus === "Accredited") ? 
        <Button variant="primary" size="sm" onClick={handleShowCredentials}>Give Credentials</Button>
        : (role === "organization") ? <Button variant="dark" size="sm" disabled>Provided</Button> 
        : <Button variant="secondary" size="sm">To Be Verified</Button>
        }
        <Modal
        show={showCredentials}
        onHide={handleCloseCredentials}
        backdrop="static"
        keyboard={true}
        size="s"
        className="rounded-modal"
        centered
        animation
        >
        <Modal.Header className="d-flex justify-content-center align-items mb-0 pb-0 mx-4" closeButton>
        <Modal.Title className="text-center mt-3 text-red" style={{fontSize:'2em',width:'100%'}}>
        <h2 className='Inter-b'>Credentials</h2>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="pt-4">
                <Container className="px-3">
                    <Form>
                        <Row className='mb-3'>
                        <Form.Group controlId="formPlaintextEmail">
                        <p className='Inter-med text-14px mb-1'>PUP Webmail</p>
                        <Form.Control type="email" placeholder="Please enter the student organization email." onChange={(e) => {setEmail(e.target.value)}}/>
                    </Form.Group>
                        </Row>
                        <Row className='mb-3'>
                        <Form.Group className="" controlId="formPlaintextPassword">
                        <p className='Inter-med text-14px mb-1'>Tentative Password</p>
                            <Form.Control type="password" placeholder="Please enter the tentative student organization password." onChange={(e) => {setPassword(e.target.value)}}/>
                    </Form.Group>
                        </Row>
                    </Form>
                    <Row className='my-4 mx-2'>
                    <Col className='text-end'>
                    <Button variant="light" className="text-black Inter px-5 mx-0 border" onClick={handleCloseCredentials}>Cancel</Button>

                    </Col>
                    <Col className='text-end' xs={4}>
                    <Button variant="primary" className="Inter px-5" onClick={handleSubmit}>Done</Button>

                    </Col>
                </Row>
                </Container>
            </Modal.Body>
        </Modal>
    </>
  )
}

export default GiveCredentials
