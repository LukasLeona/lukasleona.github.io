import React, { useState } from 'react';
import { HeroVariant } from '../../components/HeroVariant/Hero';
import { Container } from 'react-bootstrap';
import FAQs_Form from '../../components/FAQs_Form';

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