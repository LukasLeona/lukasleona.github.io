import React from 'react';
import { Form, Button, InputGroup, Container } from 'react-bootstrap';
import './general.css';

const ContactBanner2 = () => {
  return (
    <div className='bg-red text-center p-5'>
      <div className="contact-div">
        <h1 className="Inter">
          <span className='text-white' style={{ fontSize: '14px' }}>PUP The Programmers’ Guild</span><br />
          <span className='text-white'> Connect with us and be part of our <br/> Iskolar family! </span>
        </h1>
        <p className='Inter-normal text-yellow'>Update Links</p>
      </div>
    </div>
  );
};

export default ContactBanner2;
