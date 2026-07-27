import React from 'react';
import { Card, Button, Col, Row, Container } from 'react-bootstrap';
import '../general.css';

const AnnouncementCard = ({ imageSrc, title, description, userName, date }) => {
  return (
    <Col fluid>
    <Card className="mx-3 p-3 shadow" style={{minHeight:'65vh', maxHeight:'65vh', minWidth:'60vh'}}>
      <Card.Img variant="top" src={imageSrc} className="announcement-image mt-2" />
      <Card.Body className='my-0'> 
        <Row className='my-1'>
          <Col xs={9}>
            <Card.Title className='mx-0'>{title}</Card.Title>               
          </Col>
          <Col xs={3} className="text-end">
            {date}
          </Col>
        </Row>
        <Card.Text>
          {description.length > 100 ? description.substring(0, 100) + '...' : description}
        </Card.Text>
        <Row >

        </Row>
      </Card.Body>
      <Card.Footer className='no-decoration border-0 bg-transparent text-start ' as={Col}>
      <Button variant="link text-yellow no-decoration Inter ps-0">
          Learn More <i className="fas fa-arrow-right"></i>
        </Button>
      
      </Card.Footer>
    </Card>    
    </Col>

  );
};

const AnnouncementVariant = ({key, announcement}) => {
  return (
    <Container className='my-4'>
      <Card style={{height: "600px"}}>
        <Card.Img variant='top' src={`${process.env.REACT_APP_BASE_URL}/cosoa_announcements/${announcement.cosoa_ann_photo}`} style={{height:"300px",objectFit:'cover'}}></Card.Img>
        <Card.Body>
          <Card.Title>{announcement.cosoa_ann_title}</Card.Title>
          <Card.Text>{announcement.cosoa_ann_body}</Card.Text>
        </Card.Body>
        <Card.Footer className="bg-transparent border-0 text-start">
        <Button variant="link text-yellow no-decoration Inter p-0 m-0" onClick={() => window.open(`${announcement.cosoa_ann_link}`)} >
          Check Facebook Post <i className="fas fa-arrow-right"></i>
        </Button>
      </Card.Footer>
      </Card>
    </Container>
  );
};


const AnnouncementVariant2 = ({key, announcement}) => {
  return (
    <Container className='my-4'>
    <Card className='border-0'>
      <Row>
        <Col md={6}>
          <Card.Img variant='top' src={`${process.env.REACT_APP_BASE_URL}/org_announcements/${announcement.org_ann_photo}`} style={{height:"300px",objectFit:'cover'}}></Card.Img>
        </Col>
        <Col md={6}>
          <Card.Body className="d-flex flex-column justify-content-between h-100">
            <div>
              <Card.Title className='Inter-sb text-25px'>{announcement.org_ann_title}</Card.Title>
              <Card.Text className='Inter-normal text-16px'>{announcement.org_ann_body}</Card.Text>
            </div>
            <Card.Footer className="bg-transparent border-0 my-2 p-0">
              <Button variant="link text-yellow no-decoration Inter p-0 mt-4 mb-0" onClick={() => window.open(`${announcement.org_ann_link}`)}>
              Check Facebook Post <i className="fas fa-arrow-right"></i>
              </Button>
            </Card.Footer>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  </Container>
  );
};


export default AnnouncementCard;
export {AnnouncementVariant, AnnouncementVariant2};