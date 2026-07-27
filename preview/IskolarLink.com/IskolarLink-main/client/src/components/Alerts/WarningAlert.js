import { useState } from 'react';
import {Button, Modal, Image, Row, Container} from 'react-bootstrap';

const WarningAlert = ({feature,item}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch Modal
      </Button>

      <Modal show={show} onHide={handleClose} className='rounded-5'>
        <Container className=' border border-danger border-3 rounded-2 '>
        <Modal.Header className='d-flex justify-content-center'>
            <Row>
            <Image src="/information_red.png" className='me-3'alt="Warning Alert"/>
            </Row>
        </Modal.Header>
        <Row className='text-center'>
            <Modal.Title style={{fontSize:'1.5rem'}}>Warning Alert</Modal.Title>
        </Row>
        <Modal.Body className='text-center'>Are you sure you would like to <strong>{feature}</strong> this {item}?</Modal.Body>
        <Modal.Footer className='d-flex justify-content-center'>
          <Button variant="dark" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Yes, {feature} it!
          </Button>
        </Modal.Footer>
        </Container>
      </Modal>
    </>
  );
}

export default WarningAlert;