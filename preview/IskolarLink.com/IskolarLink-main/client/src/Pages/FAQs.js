import React from 'react'
import { HeroVariant6 } from '../components/HeroVariant/Hero';
import './FAQs.css';
import { Container, Row } from 'react-bootstrap';
import FAQs_Accordion from '../components/FAQs_Accordion';

function FAQs() {
  return (
    <div>
      <HeroVariant6 
        h1Text="Frequently Asked Questions"
        pText="Have questions? We’re here to help."
      />
      <Container >
        <Row className='m-5 text-center'>
          <h2>Check Your Questions Below</h2>
          <p>These questions were often asked by student organizations' representatives in the main communication channels of PUP COSOA. <br/>
             This compilation aims to provide comprehensive answers, streamlining the support process and enhancing the efficiency of <br/>information dissemination.
        </p>
        </Row>
        <Row className='m-5'>
          <FAQs_Accordion/>
        </Row>
      </Container>
    </div>
  )
}

export default FAQs
