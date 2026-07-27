import React from 'react';
import { Card, Button, Col, Badge, Row, Pagination, Container } from 'react-bootstrap';
import './general.css'
import {useNavigate} from 'react-router-dom';
const renderTagBadge = (tag) => {
  const academicOrgTags = [
    'Academic Organization',
    'Advocacy Organization',
    'Cultural/Arts/Dance Organization',
    'Fraternities and Sororities',
    'Political Organization',
    'Religious Organization',
    'Scholars Organization',
    'Socio-civic Organization',
    'Special Interest Organization',
    'Sports Organization',
  ];

  const specificTags = [
    'CAF',
    'CADBE',
    'CAL',
    'CBA',
    'COC',
    'CCIS',
    'COED',
    'CE',
    'CHK',
    'CL',
    'CPSPA',
    'CSSD',
    'CS',
    'CTHTM',
    'ITECH',
    'OUS',
    'GS',
    'SHS',
    'U-Wide'
  ];

  if (academicOrgTags.includes(tag)) {
    return (
      <Badge
        key={tag}
        pill
        className="me-2 mb-2"
        bg=""
        style={{ backgroundColor: 'var(--light-red)', color: 'var(--red)' }}
      >
        {tag}
      </Badge>
    );
  } else if (specificTags.includes(tag)) {
    return (
      <Badge
        key={tag}
        pill
        className="me-2 mb-2"
        style={{ backgroundColor: 'var(--light-yellow)', color: 'var(--dark-yellow)' }}
        bg=""
      >
        {tag}
      </Badge>
    );
  } else {
    return (
      <Badge key={tag} pill className="me-2 mb-2">
        {tag}
      </Badge>
    );
  }
};

const Accredited_Org = ({ imageSrc, title, description, tags, orgId }) => {
  const navigate = useNavigate();
  return (
    <Col fluid>
      <Card className="p-3 mx-3" style={{width:'350px',height:'500px', cursor:'pointer'}} onClick={()=>{navigate(`/org/profile/${orgId}`)}} >
        <Card.Img variant="top" src={imageSrc} className="announcement-image" style={{backgroundSize:'cover'}}/>
        <Card.Body>
          <div className="d-flex flex-wrap mb-2">
          {tags.map((tag, index) => renderTagBadge(tag))}
          </div>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
          {description.length > 100 ? description.substring(0, 100) + '...' : description}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="bg-transparent border-0">
          <Button variant="primary">View</Button>
        </Card.Footer>
      </Card>
    </Col>
  );
};

const Affiliated_Organizations = ({ imageSrc, title, description }) => {
  return (
    <Col fluid>
      <Card className="p-3 mx-3 shadow">
      <Card.Img variant="top" src={imageSrc} className='card-image-orgvariant'/>

        <Card.Header className='bg-white'>
          <Card.Title className='text-center Inter text-21px'>{title}</Card.Title>
        </Card.Header>
    
        <Card.Body>
          <Card.Text className='Inter-normal text-15px'>
          {description ? (description.length > 150 ? description.substring(0, 150) + '...' : description): 'No description yet.'}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="bg-transparent border-0 text-center">
          <Row>
          <Button variant="primary" className='px-5 Inter'>View</Button>
          </Row>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default Accredited_Org;

export {Affiliated_Organizations};
