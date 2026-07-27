import React, { useState } from 'react';
import { Modal, Container, Button, Row} from 'react-bootstrap';

function EventModal({ event, show, handleClose }) {
  const handleFacebookLink = () => {
    window.open(event.link, '_blank');
  };

  return (
    <>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton className='bg-red text-white pe-4 '>
        <Modal.Title style={{fontSize:'2em'}}>Event Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
        <p className='mb-0'>{event.date}</p>
        <h1>{event.title}</h1>
        <p>{event.description}</p>
        </Container>
      </Modal.Body>

        <Modal.Footer className='border-0'>
            <Button variant='light' className='border px-4 me-2' onClick={handleClose}>Close</Button>
            <Button variant='primary' className='px-4' onClick={handleFacebookLink}>
              View Facebook Post
            </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}

export default EventModal;
 