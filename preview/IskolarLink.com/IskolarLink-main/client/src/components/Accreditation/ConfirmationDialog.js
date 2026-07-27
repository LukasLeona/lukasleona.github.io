import { useState } from 'react';
import { Button, Modal, Form, Row, Col, CloseButton} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../Pages/Student_Portal/Student_Profile.css';
import './AccFinish.css';

function ConfirmationDialog({confirmation, setConfirmation}) {

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
        size="lg"
        className="rounded-modal"
        centered
        animation
    >
        <div className="confirmation-modal pt-1 " >
        <Modal.Header className="px-4 modal-header text-black mx-5" closeButton>
            <Modal.Title id="acc-confirmation-popup" className="ms-auto Inter-b modal-title mt-4">
              Continue?
            </Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-4 modal-body text-black mx-5">
        <div className='acc-popup-form p-5 mx-auto  text-black shadow-lg'>
            <Row>
                    <p className="Inter-normal text-black text-center">Are you sure you want to submit your application? Once you submit, you cannot do any changes until feedbacks are given. Continue?</p>
                <Button as={Col} variant="primary" className="text-white ms-2 px-3 Inter" onClick={handleCloseConfirmationDialog}>
                    Cancel
                </Button>
                <Button as={Col} variant="primary" className="text-white ms-2 px-3 Inter" onClick={handleConfirmation}>
                    Continue
                </Button>
            </Row>
        </div>
        </Modal.Body>


        </div>
    </Modal>
    </>
  )
}

export default ConfirmationDialog
