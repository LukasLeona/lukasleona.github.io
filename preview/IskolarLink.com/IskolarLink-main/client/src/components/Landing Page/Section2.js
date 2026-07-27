import React,{useState,useEffect} from 'react';
import { Container, Row, Col, Card, Image, Stack } from 'react-bootstrap';
import '../general.css';

const Section2 = () => {

  return (
    <div className="p-5 bg-lightgray Inter text-black d-flex align-items-center">
      <Container fluid>
        <Row className="text-center">
          <h2 className='Inter-b text-36px'>PUP Commission on Student Organizations<br />and Accreditation (COSOA)</h2>
        </Row>
        <Row className='mt-2'>
          <Row>
          <Card className="bg-transparent border-0 mb-2">
              <div className="d-flex">
                <div className="logo-card pt-3">
                  <Card.Img src="s2-icon1.png" />
                </div>
                <div>
                  <Card.Body>
                    <Card.Title className="Inter-extrab text-22px">Who Are We</Card.Title>
                    <Card.Text className="Inter-normal mt-2 s2-body">
                      <p>We are the sole-accrediting body and an independent student body set to develop an effective working relationship between the Central Student Council, the Office of Student Services (OSS), and all student organizations at the Polytechnic University of the Philippines (PUP).</p>
                      <p>We have the authority over the accreditation of all student organizations within PUP. The role encompasses setting accreditation standards, evaluating applications, granting accreditation status, and monitoring compliance.</p>
                    </Card.Text>
                    <Card.Link href="/cosoa" className="no-decoration text-yellow Inter text-15px">Learn More <i className="fas fa-arrow-right"></i></Card.Link>
                  </Card.Body>
                </div>
              </div>
              <Card.Footer className='d-flex align-items-center justify-content-center mt-0 text-center bg-transparent border-0 m-4' style={{ backgroundImage: `url(studentorg.png)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', borderRadius: '1rem', padding: '10rem' }}></Card.Footer>
            </Card>
          </Row>
        </Row>
      </Container>
    </div>
  );
};

export default Section2;