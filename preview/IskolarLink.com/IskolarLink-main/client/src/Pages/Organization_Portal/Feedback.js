import React, { useState } from 'react';
import './Organization_Profile.css';
import { HeroVariant } from '../../components/HeroVariant/Hero';
import FAQs_Form from '../../components/FAQs_Form';
import { Container } from 'react-bootstrap';


function OrgFeedback() {
  return (
    <div>
      <HeroVariant
        h1Text="Feedback"
        pText="Tell us what we can improve! "
      />
      <Container className='my-5'>
    <FAQs_Form/>
    </Container>
    </div>

  )
}

export default OrgFeedback