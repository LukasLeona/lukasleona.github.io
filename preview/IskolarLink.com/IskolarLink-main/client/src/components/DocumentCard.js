import React, { useState } from 'react';
import { Carousel, Image, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronRight, faChevronLeft, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './general.css'; 

library.add(faChevronRight, faChevronLeft, faCheckCircle);

const DocumentCard = ({ title, subtitle, list_req, documents, userType}) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (  
    <Container className="border p-4 mx-4 rounded" style={{ width: '37rem' }}> 
      <div>
        <div className='border-bottom'>
          <h3 className="Inter text-36px mb-1">{title}</h3>
          <p className="Inter-normal text-20px">{subtitle}</p>
        </div>
        <Container className="requirements pt-3 mb-3" style={{minHeight:'10vh'}}>
          {list_req.map((req, index) => (
            <div key={index} className="d-flex align-items-center mb-1">
              <FontAwesomeIcon icon="check-circle" className="darkyellow-icon" />
              <div className='ps-3'></div>
              <span className="Inter-normal text-16px">{req}</span>
            </div>
          ))}
        </Container>
        <Row>
        <p className="Inter-med text-20px"> If all of those are met, the <span>{userType}</span> can now submit the following:</p>
        </Row>
      </div>
      <Carousel activeIndex={index} onSelect={handleSelect} indicators={false}>
        {documents.map((document, index) => (
          <Carousel.Item key={index}>
            <Container className="d-flex justify-content-center">
              <Image
                className="img-top mb-3"
                src={document.imageSrc}
                alt={`Document ${index + 1}`}
                style={{maxHeight:'45vh',maxWidth:'60vh'}} 
              />
            </Container>
            <div className="text-center">
              <p className='Inter-med text-20px'>{document.caption}</p>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default DocumentCard;
