import React from 'react';
import './general.css';
import {Container, Row} from 'react-bootstrap';

const ESig = () => {
  return (
    <Container className=' text-center'>
        <Row className='Inter-normal text-20px' style={{letterSpacing:'-2%'}}>
        <p className='my-0'>Are you not familiar on how to add an e-signature to your document?</p>
        <p className='mt-0 mb-3'>No worries! <a href="https://www.youtube.com/watch?v=o47tZWzYy7k" target='_blank' className='Inter-normal text-20px text-red no-decoration'>Check out this friendly tutorial.</a></p>
        </Row>
    </Container>
  );
};

export default ESig;
