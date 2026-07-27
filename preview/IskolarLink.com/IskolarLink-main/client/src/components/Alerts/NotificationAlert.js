import { useState, useEffect } from 'react';
import {Button, Modal, Image, Row, Container} from 'react-bootstrap';

const NotificationAlert = ({feature,item,setShowAlert}) => {
  const [show, setShow] = useState(true);

  const handleClose = () => setShowAlert(false);
  const handleShow = () => setShow(true);

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
            <Modal.Title style={{fontSize:'1.5rem'}} className='text-capitalize'>{feature} Successfully!</Modal.Title>
        </Row>
        <Modal.Body className='text-center'>We have successfully <span className='text-lowercase'><strong>{feature}</strong></span> your <span className='text-lowercase'>{item}</span>!</Modal.Body>
        <Modal.Footer className='d-flex justify-content-center align-items-center'>
            <Button variant="primary" onClick={handleClose} className='px-5' as={Row}>
            Done
          </Button>
        </Modal.Footer>
        </Container>
      </Modal>
    </>
  );
}

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const NotificationError = ({ feature, item, setShowAlert }) => {
  const [show, setShow] = useState(true);

  const handleClose = () => setShowAlert(false);

  return (
    <>
      <Modal show={show} onHide={handleClose} className='rounded-5'>
        <Container>
          <Modal.Header className='d-flex justify-content-center'>
            <Row>
              <Image src="/information.png" className='me-3' alt="Error Alert" /> {/* Replace with your error icon */}
            </Row>
          </Modal.Header>
          <Row className='text-center'>
            <Modal.Title style={{ fontSize: '1.5rem' }} className='text-capitalize'>
              {`${feature} Error!`}
            </Modal.Title>
          </Row>
          <Modal.Body className='text-center'>
            {`There was an error when you ${feature.toLowerCase()} your ${item.toLowerCase()}. Try Again!`}
          </Modal.Body>
          <Modal.Footer className='d-flex justify-content-center align-items-center'>
            <Button variant="primary" onClick={handleClose} className='px-5' as={Row}>
              OK
            </Button>
          </Modal.Footer>
        </Container>
      </Modal>
    </>
  );
};

export { NotificationAlert, NotificationError };


export default NotificationAlert;