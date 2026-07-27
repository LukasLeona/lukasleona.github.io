import React, {useState,useEffect} from 'react'
import { Button, Modal, Form, Row, Col, CloseButton, Container} from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import axios from 'axios';


function GiveFeedback({studentId, cor}) {
    axios.defaults.withCredentials = true;
    const [showFeedback, setShowFeedback] = useState(false);

    const handleCloseFeedback = () => setShowFeedback(false);
    const handleShowFeedback = () => setShowFeedback(true);

    const [feedback, setFeedback] = useState('');

    const handleSubmit = async event => {
        try{
            await axios.post(`${process.env.REACT_APP_BASE_URL}/admin/give_feedback`, { studentId: studentId, feedback: feedback, cor:cor }).then((response) => {
                if(response.data.error){
                    alert(response.data.error);
                }else{
                    alert('Feedback given!');
                    handleCloseFeedback();
                    window.location.reload();
                }
            });
        }catch(err){
            console.log(err);
        }
    }
  return (
    <>
        <DropdownItem onClick={handleShowFeedback}>Give Feedback</DropdownItem>
        <Modal
        show={showFeedback}
        onHide={handleCloseFeedback}
        backdrop="static"
        keyboard={true}
        size="s"
        className="rounded-modal"
        centered
        animation
        >
        <Modal.Header className="d-flex justify-content-center align-items mb-0 pb-0 mx-4" closeButton>
                <Modal.Title className="text-center mt-3 text-red" style={{fontSize:'2em',width:'100%'}}>
                   <h2 className='Inter-b'>Verification Feedback</h2>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="pt-4">
                <Container className='px-3'>

                <Form>
                    <Row>
                    <Form.Group  controlId="formPlaintextFeedback">
                        <p className='Inter-med text-14px mb-1'>Message</p>
                            <Form.Control as="textarea" placeholder="Please enter your message to the user." rows={4} onChange={(e) => {setFeedback(e.target.value)}}/>
                    </Form.Group>
                    </Row>  
                </Form>
                <Row className='my-4 mx-2'>
                    <Col className='text-end'>
                    <Button variant="light" className="text-black Inter px-5 mx-0 border" onClick={handleCloseFeedback}>Cancel</Button>

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

export default GiveFeedback
