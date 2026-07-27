import React from 'react'
import './RevFinish.css';
import { Form, ToggleButton, Row, Image, Col, Button } from 'react-bootstrap'
import Container from 'react-bootstrap/Container';

const RevFinish = ({show}) => {
  return (
    <>
    <Container>
          <div className='accreditation-form-success-container' style={{display: show}}>
          <Image src="/4th.png" alt="IskolarLink Logo"  fluid style={{ marginBottom: '40px' }}/>   
            <div className="d-flex justify-content-center" style={{ marginBottom: '40px' }}>
              <Image src="/checkbox.png" alt="Accreditation Form Success" fluid />
            </div>
            <h2 className='accreditation-form-success-header'>Documents Ready for Submission!</h2>
    <h5 className='accreditation-form-success-subheader'>
            Your files are complete and upon submission, you will be redirected to check your accreditation status. <br/> Please await updates from <span className='cosoa'>COSOA</span> regarding the status of your application.
          </h5>
          </div>
        </Container>

    </>
  )
}

export default RevFinish
