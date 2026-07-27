import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import LoadingOverlay from '../LoadingOverlay'
import {useNavigate} from 'react-router-dom'


const Add_Chairperson = ({setRefresh}) => {
  const [show, setShow] = useState(false);
  const [studentNumber, setStudentNumber] = useState('');
  const [pupWebmail, setPupWebmail] = useState('');
  const [loading,setLoading] = useState(false)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate()

  const handleDone = async () => {
    setLoading(true)
    const valid = studentNumber !== "" && pupWebmail !== "";

    try{

    if (valid) {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/admin/update_chairperson`, {
          student_num: studentNumber,
          email: pupWebmail,
        })
        .then((res) => {
          if (res.data.error) {
            alert(res.data.error);
          } else {
            alert(res.data.success);
            handleClose();
            setRefresh(true)
            navigate('/admin/dashboard')
          }
        })
        .catch((error) => {
          // Handle network errors or other errors here
          console.error("API request failed with error:", error);
          alert("Failed to update chairperson");
        });
    } else {
      alert("You still haven't filled all required fields");
    }
  }catch(err){
    console.log(err)
  }finally{
    setLoading(false)
  }
  };
  

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Update Chairperson
      </Button>

      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title className='text-center' style={{fontSize:'2em'}}>Update COSOA Chairperson</Modal.Title>
        </Modal.Header>
        <Modal.Body className='pt-0'>
          <Form>
            <Form.Group controlId="studentNumber" className='mb-3'>
              <Form.Label><strong>Student Number</strong></Form.Label>
              <Form.Control
                type="text"
                placeholder="2021-XXXX-MN-0"
                value={studentNumber}
                onChange={(e) => setStudentNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="pupWebmail">
              <Form.Label><strong>PUP Webmail</strong></Form.Label>
              <Form.Control
                type="email"
                placeholder="xxxx@iskolarngbayan.pup.edu.ph"
                value={pupWebmail}
                onChange={(e) => setPupWebmail(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className='border-0'>
          <Row className='w-100'>
            <Col>
              <Button variant='primary' className='w-100 mb-3' onClick={handleDone}>
                Done
              </Button>
              <Button variant='light' className='w-100 border' onClick={handleDone}>
                Cancel
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
      {loading &&
      <LoadingOverlay title={"Processing Information"} subtitle={"Chairperson has the highest authority in using COSOA Functionalities"} />}
    </>
  );
};

export default Add_Chairperson;
