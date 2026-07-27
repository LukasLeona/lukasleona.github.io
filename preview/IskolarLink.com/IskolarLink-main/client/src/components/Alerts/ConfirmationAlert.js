import { useState } from 'react';
import {Button, Modal, Image, Row, Container} from 'react-bootstrap';

const ConfirmationAlert = ({action,action2,setShowConfirmationAlert}) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
                              setShow(false);
                              setShowConfirmationAlert(false);
                            }
  const handleShow = () => setShow(true);

  const handleYes = () => {
                            setShow(false);
                            setShowConfirmationAlert(true);
                          }

  return (
    <>

      <Modal show={show} onHide={handleClose} className='rounded-5'>
        <Container>
        <Modal.Header className='d-flex justify-content-center'>
            <Row>
            <Image src="/information.png" className='me-3'alt="Confirmation Alert"/>
            </Row>
        </Modal.Header>
        <Row className='text-center'>
            <Modal.Title style={{fontSize:'1.5rem'}}>Confirmation Alert</Modal.Title>
        </Row>
        <Modal.Body className='text-center'>Are you sure you would like to {action}?</Modal.Body>
        <Modal.Footer className='d-flex justify-content-center'>
          <Button variant="dark" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Yes, {action2} it!
          </Button>
        </Modal.Footer>
        </Container>
      </Modal>
    </>
  );
}

export default ConfirmationAlert;