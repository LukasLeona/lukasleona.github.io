import React from 'react';
import { Card, CardGroup, Row } from 'react-bootstrap';
import './general.css';

const OfficerCard = ({ imageSrc, name, role, imageSrc2, name2, role2, imageSrc3, name3, role3 }) => {
  return (
    <Row className="mb-5">
      <CardGroup>
        {imageSrc && name && role && (
          <Card className="officer-card">
            <Card.Img variant="top" src={imageSrc} />
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Text>{role}</Card.Text>
            </Card.Body>
          </Card>
        )}
        {imageSrc2 && name2 && role2 && (
          <Card className="officer-card">
            <Card.Img variant="top" src={imageSrc2} />
            <Card.Body>
              <Card.Title>{name2}</Card.Title>
              <Card.Text>{role2}</Card.Text>
            </Card.Body>
          </Card>
        )}
        {imageSrc3 && name3 && role3 && (
          <Card className="officer-card">
            <Card.Img variant="top" src={imageSrc3} />
            <Card.Body>
              <Card.Title>{name3}</Card.Title>
              <Card.Text>{role3}</Card.Text>
            </Card.Body>
          </Card>
        )}
      </CardGroup>
    </Row>
  );
};

export default OfficerCard;
