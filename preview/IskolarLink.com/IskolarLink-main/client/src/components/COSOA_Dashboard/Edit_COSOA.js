import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, InputGroup, ListGroup, Image } from 'react-bootstrap';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

function Edit_COSOA({setRefresh, imgSrc, fullName, position, id}) {
    const [show, setShow] = useState(false);
    const [selectedPosition, setSelectedPosition] = useState('');

    const handleClose = () => {
        setShow(false);
    };
    
    const handleShow = () => setShow(true);

    const handlePositionChange = (positionId) => {
        setSelectedPosition(positionId);
        console.log(positionId)
    };

    const handleSubmit = async () => {
        if(window.confirm(`By continuing, you agree to change the position of ${fullName} to ${selectedPosition}`))
        try {
          const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/cosoa_member/update_cosoa_member/${id}`, {
            position: selectedPosition,
          });
      
          if (response.status === 200) {
            setRefresh(true);
            setShow(false);
            alert('Position updated successfully');
          } else {
            console.error('API request failed with status:', response.status);
            alert('Failed to update position');
          }
        } catch (error) {
          console.error('API request failed with error:', error);
          alert('Failed to update position');
        }
      };
      

    const positions = [
        'Chairperson (Asst.)',
        'Vice Chairperson',
        'Vice Chairperson (Asst.)',
        'Secretary-General',
        'Executive Director',
        'External Affairs',
        'Internal Affairs',
        'Document Management',
        'Internal Performance Evaluator',
        'Legal Affairs',
        'Social Media Management',
        'Application Evaluator'
    ];

    useEffect(() => {
        setSelectedPosition(position);
        console.log(position) // Set the initial selected position when the modal opens
      }, []);

  return (
     <>
            <FontAwesomeIcon 
            icon="fa-solid fa-pencil"
            onClick={handleShow}
            style={{
                cursor: 'pointer',
                transition: 'color 0.3s ease', // Adding a smooth transition effect
                color: 'black', // Default color
            }}
            onMouseOver={(e) => { e.target.style.color = 'var(--dark-yellow)'; }} // Change color on hover
            onMouseOut={(e) => { e.target.style.color = 'black'; }} // Revert to default color
            />
            <Modal show={show} onHide={handleClose} centered backdrop="static" size='md'>
                <Modal.Header closeButton className="d-flex justify-content-center align-items-center mb-0 pb-0 mx-4">
                    <Modal.Title className="text-center mt-3" style={{ fontSize: '2em', width: '100%' }}>
                        Change COSOA Member Position
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='pt-4'>
                <Row>
                <Form.Label>Student Information</Form.Label>
                <Col xs={4}>
                {imgSrc ? (
                <Image src={`${process.env.REACT_APP_BASE_URL}/images/${imgSrc}`} alt="Profile Image" roundedCircle fluid />
              ) : (
                <FontAwesomeIcon icon={faUser} size="5x" />
              )}
                </Col>
                <Col xs={8}>
                <div>
                    <h5 className="mb-0">{fullName}</h5>
                    <p className="mb-0">{position}</p>
                </div>
                </Col>
                

                </Row>
                <Row>
                </Row>

                    <Form className='mt-3'>
                        <Form.Group>
                            <Form.Label>Choose position</Form.Label>
                            {positions.map((position, index) => (
                                <Form.Check className='mt-3' key={index}>
                                    <Row>
                                        <Col className='text-start'>
                                            <Form.Check.Label htmlFor={position.toLowerCase().replace(/\s/g, '-')}>
                                                {position}
                                            </Form.Check.Label>
                                        </Col>
                                        <Col className='text-end'>
                                            <Form.Check.Input
                                                type="radio"
                                                name="position"
                                                id={position}
                                                checked={selectedPosition === position}
                                                onChange={(e) => handlePositionChange(e.target.id)}
                                            />
                                        </Col>
                                    </Row>
                                </Form.Check>
                            ))}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className='border-0'>
                <Row className='w-100'>
                    <Col>
                    <Button variant='primary' className='w-100 mb-3' onClick={handleSubmit}>
                        Done
                    </Button>
                    <Button variant='light' className='w-100 border' onClick={handleClose}>
                        Cancel
                    </Button>
                    </Col>
                </Row>
                </Modal.Footer>
            </Modal>
        </>
  )
}

export default Edit_COSOA
