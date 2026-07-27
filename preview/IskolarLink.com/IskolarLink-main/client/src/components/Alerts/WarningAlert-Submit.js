import { useState } from 'react';
import {Button, Modal, Image, Row, Container} from 'react-bootstrap';

const WarningAlert = ({feature,item, confirmation, setConfirmation}) => {
    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

    const handleCloseConfirmationDialog = () => setShowConfirmationDialog(false);
    const handleShowConfirmationDialog = () => setShowConfirmationDialog(true);

    const handleConfirmation = () => {
        setConfirmation(true);
        handleCloseConfirmationDialog();
    }

  return (
    <>
    <Button variant="primary" className="custom-button margin-right" onClick={handleShowConfirmationDialog}>
        Submit
    </Button>
    <Modal
        show={showConfirmationDialog}
        onHide={handleCloseConfirmationDialog}
        backdrop="static"
        keyboard={true}
        className="rounded-5"
        centered
        animation
    >        
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
          <Button variant="dark" onClick={handleCloseConfirmationDialog}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmation}>
            Yes, {feature} it!
          </Button>
        </Modal.Footer>
        </Container>
      </Modal>
    </>
  );
}

export default WarningAlert;