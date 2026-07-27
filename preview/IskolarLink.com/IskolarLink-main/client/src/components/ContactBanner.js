import React from 'react';
import { Form, Button, InputGroup, Container } from 'react-bootstrap';
import './general.css';

const ContactBanner = () => {
  return (
    <div className='bg-lightgray text-center p-5'>
      <div className="contact-div">
        <h1 className="Inter">
          <span className='text-yellow'>Step Out of Your Comfort Zone </span>and<br />
          <span className='text-red'> Connect with Your Fellow Iskolars! </span>
        </h1>
        <p className='Inter-normal text-gray2'>To receive email notifications, simply submit your email below.</p>
      </div>
      <Container style={{ maxWidth: '36%' }} >
        <Form>
          <InputGroup>
            <Form.Control type="email" placeholder="Enter your email" required />
            <Button variant="primary" type="submit">Submit</Button>
          </InputGroup>
        </Form>
      </Container>
    </div>
  );
};

const ContactBanner1 = () => {
  return (
    <div className='bg-red text-center p-5'>
      <div className="contact-div">
        <h1 className="Inter text-white">
          <span className='text-yellow'>Step Out of Your Comfort Zone </span>and<br />
          <span className='text-white'> Connect with Your Fellow Iskolars! </span>
        </h1>
        <p className='Inter-normal text-white'>To receive email notifications, simply submit your email below.</p>
      </div>
      <Container style={{ maxWidth: '36%' }} >
        <Form>
          <InputGroup>
            <Form.Control type="email" placeholder="Enter your email" required />
            <Button variant="secondary" type="submit">Submit</Button>
          </InputGroup>
        </Form>
      </Container>
    </div>
  );
}

export default ContactBanner;

export {ContactBanner1};