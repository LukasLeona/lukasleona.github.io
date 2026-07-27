import React, { useState,useEffect } from 'react';
import Stat_Card from '../Stat_Card';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../general.css';
import axios from 'axios'

const Section1 = () => {
  const [section1, setSection1] = useState({});

  useEffect(()=> {
    axios.get(`${process.env.REACT_APP_BASE_URL}/landingpage/section2`)
    .then((res)=>{
      setSection1(res.data)
    })
  },[])
    
    return (
      <div className="m-5 d-flex align-items-center">
        <Container>
          <Row className="mb-4">
            <Col className="text-center">
              <h1 className="Poppins text-black text-36px">Be part of Iskolar ng Bayan Family.<br/>
              <span className="text-red">Join an organization.</span>
              <span className="text-yellow"> Get Accredited!</span></h1>
              <p className="text-16px text-subtitleblack Inter-normal">Explore your interests, make valuable connections, and elevate your campus life.</p>
            </Col>
          </Row>
          <Row className='d-flex justify-content-center'>
              <Stat_Card
                imgSrc="./s1-icon1.png"
                subtitle="Student Organizations"
                numcount={section1.orgs}
              />
              <Stat_Card
                imgSrc="./s1-icon2.png"
                subtitle="Users"
                numcount={section1.students}
              />
              <Stat_Card 
                imgSrc="./s1-icon3.png"
                subtitle="Academic Programs"
                numcount={section1.academics}
              />
          </Row>
        </Container>
      </div>
    );
  };
  
  export default Section1;