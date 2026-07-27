import React, { useState } from 'react';
import { HeroVariant3 } from '../../components/HeroVariant/Hero';
import { Container, Row } from 'react-bootstrap';
import './COSOA_Portal.css'

function COSOA_Applicants() {
  return (
    <div>
      <HeroVariant3
        h1Text="Revalidation and Accreditation Applicants"
        pText="Check your applicants."
      />
      <Container>
        <Row className='my-5 align-items-center'>
          
        </Row>
      </Container>
    </div>
  );
}

export default COSOA_Applicants;
