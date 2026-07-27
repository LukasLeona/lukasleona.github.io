import React from 'react';
import { Row } from 'react-bootstrap'
import '../general.css';
import FAQs_Accordion from '../FAQs_Accordion';

const Section5 = () => {
  return (
    <div className="m-5">
      <Row className="text-center">
        <h1 className="text-45px text-red Inter-b">Frequently Asked Questions</h1>
        <p className="text-16px text-gray2 Inter-normal">Do you have your questions? We may have your answer below.</p>
      </Row>
      <Row className='mx-4 my-2 px-5'>
        <FAQs_Accordion/>
      </Row>
  </div>
  );
};

export default Section5;

