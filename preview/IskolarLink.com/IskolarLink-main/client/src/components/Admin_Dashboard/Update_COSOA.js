import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, InputGroup } from 'react-bootstrap';

const Update_COSOA = () => {
    const [show, setShow] = useState(false);
    const [selectedPosition, setSelectedPosition] = useState(''); // State to manage selected position

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handlePositionChange = (positionId) => {
        setSelectedPosition(positionId);
    };

    const positions = [
        'Chairperson',
        'Assistant Chairperson',
        'Vice Chairperson',
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

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Edit Permission
            </Button>
            <Modal show={show} onHide={handleClose} centered backdrop="static" size='md'>
                <Modal.Header closeButton className="d-flex justify-content-center align-items-center mb-0 pb-0 mx-4">
                    <Modal.Title className="text-center mt-3" style={{ fontSize: '2em', width: '100%' }}>
                        Edit Permission
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='pt-4'>
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
                                                id={position.toLowerCase().replace(/\s/g, '-')}
                                                checked={selectedPosition === position.toLowerCase().replace(/\s/g, '-')}
                                                onChange={() => handlePositionChange(position.toLowerCase().replace(/\s/g, '-'))}
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
                    <Button variant='primary' className='w-100 mb-3' onClick={handleClose}>
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
    );
};

export default Update_COSOA;
