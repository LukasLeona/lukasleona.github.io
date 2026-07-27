import React, { useState,useEffect } from 'react';
import { Container, Image, Row, Col} from 'react-bootstrap';
import '../general.css';

const MissingAnnouncement = () => {
    return (
      <Container className="text-center mt-3">
        <Image src="/sad.png"/>
        <h1 className='Inter-b text-yellow text-65px'>Oops!</h1>
        <Row className='d-flex justify-content-center'>
          <Col md={4} className='px-2'>
            <p className='Inter-normal text-gray2 text-21px' >It looks like there are <br/><span className='Inter-b'>currently no available announcements</span> on this page.</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className='Inter-normal text-gray2 text-16px'>Nevertheless, stay tuned for future updates and exciting news from our vibrant student community!</p>
          </Col>
        </Row>
      </Container>
    );
  };
  
  
  export default MissingAnnouncement;