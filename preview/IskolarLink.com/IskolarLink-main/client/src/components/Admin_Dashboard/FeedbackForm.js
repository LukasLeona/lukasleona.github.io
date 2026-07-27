import React, { useState,useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Container } from 'react-bootstrap';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FeedbackForm = ({id, fullName, email, date, subject, message}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function formatDate(dateString) {
    const date = new Date(dateString);
    return format(date, "MMMM dd, yyyy");
  }

  return (
    <>
      <FontAwesomeIcon 
      icon="fa-solid fa-maximize"
      onClick={handleShow}
            style={{
                cursor: 'pointer',
                transition: 'color 0.3s ease', // Adding a smooth transition effect
                color: 'black', // Default color
            }}
            onMouseOver={(e) => { e.target.style.color = 'var(--dark-yellow)'; }} // Change color on hover
            onMouseOut={(e) => { e.target.style.color = 'black'; }} // Revert to default color
            size="xl"
            />
      <Modal 
      show={show} onHide={handleClose} centered backdrop="static" size='lg' >
      <Modal.Header closeButton className="d-flex justify-content-center align-items-center mb-0 pb-0 mx-4">
        <Modal.Title className="text-center mt-3" style={{ fontSize: '2em', width: '100%' }}>
        {<div>
          <h2>Feedback Form</h2>
          <h4 className=''>{`ID: ${id}`} </h4>
        </div>}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='pt-4'>
        <Form>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Full Name</Form.Label>
                <Form.Control type='text' value={fullName} readOnly/>
              </Form.Group>
            </Col>
            <Col>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' value={email} readOnly/>
              </Form.Group>
            </Col>
            <Col>
            <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control type='text' value={formatDate(date)} readOnly/>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Form.Group>
              <Form.Label>Subject</Form.Label>
              <Form.Control type='text' value={subject} readOnly/>
            </Form.Group>
          </Row> 
          <Row>
            <Form.Group>
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={3} value={message} readOnly/>
            </Form.Group>
          </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer className='border-0'>
          <Row className=''>
              <Button variant='primary' className="px-5 me-5" onClick={handleClose}>
                Close
              </Button>
          </Row>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FeedbackForm;
