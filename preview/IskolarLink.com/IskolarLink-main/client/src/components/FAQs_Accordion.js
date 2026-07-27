import React from 'react';
import { Accordion, Container } from 'react-bootstrap';
import './general.css';

const FAQs_Accordion = () => {
  return (
    <Container fluid className='px-5 ms-auto'>
      <Accordion defaultActiveKey="0" className='mx-5 px-5'>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Do we have to follow certain formats in terms of the content for the requirements?</Accordion.Header>
            <Accordion.Body>
              <p>You may access the released templates through this link or by navigating to Application Documents webpage:</p>
              <a href="https://bit.ly/ANR-2023-Templates" target='_blank'>View Document</a>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Do we need to accomplish the Table of Amendments if we do not have any amendments or revisions in our CBL?</Accordion.Header>
            <Accordion.Body>
              <p>No, you do not have to.</p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Are all student organizations required to file for Accreditation/Revalidation?</Accordion.Header>
            <Accordion.Body>
              <p>Yes, as stated in Title 7 of the 2019 Revised Student Handbook.</p>
              <a href="https://drive.google.com/file/d/0B1BuDAuN0r8SX1BWX2NSN3FURzg/view?resourcekey=0-oi8lUy9PCFysh0FDyL5ipw" target='_blank'>View Document</a>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>What will happen if an organization failed to file for Accreditation/Revalidation?</Accordion.Header>
            <Accordion.Body>
              <p>Any organization that fails to be Accredited or Revalidated shall deem its conduct illegal for the current and succeeding academic years.</p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>Do Student Publications need to conform with the requirements set by the SC COSOA for the Accreditation/Revalidation?</Accordion.Header>
            <Accordion.Body>
              <p>No, they don't have to.</p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="5">
            <Accordion.Header>What if we do not have any funds and assets to turn over?</Accordion.Header>
            <Accordion.Body>
              <p>If there are no funds and assets to turnover, you should accomplish the written letter to oss stating that you didn’t acquire or own any funds or assets.</p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="6">
            <Accordion.Header>Will there be an acknowledgement of turn over if we still have the same set of officers from the previous term?</Accordion.Header>
            <Accordion.Body>
              <p>Yes, there will still be the provision of Turnover of Assets and Funds, but with same set of signatories with the inclusion of their terms of office.</p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="7">
            <Accordion.Header>Are we required to have at least fifteen (15) members when we file for Accreditation?</Accordion.Header>
            <Accordion.Body>
              <p>Yes. Fifteen (15) members are required for student organizations applying for Accreditation. The Executive Officers (President, Vice President/s, Secretary/ies, Treasurer, etc.) shall also be counted.</p>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
    </Container>
  );
};

export default FAQs_Accordion;
