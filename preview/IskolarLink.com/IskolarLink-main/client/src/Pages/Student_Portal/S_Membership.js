import React, { useState } from 'react';
import { HeroVariant3 } from '../../components/HeroVariant/Hero';
import { Container, Row, Col, Button, InputGroup, Form} from 'react-bootstrap';

function S_Membership() {
  return (
    <div>
      <HeroVariant3
        h1Text="Your Student Organizations"
        pText="Kickstart your journey towards widening your engagement. Nurture your members."
      />
      <Container>
      <Row className='m-4'>
        <Col xs={1}></Col>
        <Col>
          <Button variant="outline-secondary"><i class="fa-solid fa-filter"></i> Filter</Button>
        </Col>
        <InputGroup as={Col}>
          <Button variant="outline-secondary" id="button-addon2">
            <i class="fa-solid fa-magnifying-glass"></i>
          </Button>
          <Form.Control
            placeholder="Search"
            className="shadow-lg"
          />
        </InputGroup>
        <Col xs={1}></Col>
      </Row>
      </Container>
    </div>
  );
}

export default S_Membership;
