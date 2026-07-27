import React from 'react'
import { Container, Row, Image } from 'react-bootstrap';

function WhoWeAre() {
  return (
    <>
    <div className='d-flex justify-content-center bg-red'>
    <Image src="/WhoWeAre/hero-whoweare.png"/>
    </div>
    <div className='d-flex justify-content-center my-5'>
    <Image src="/WhoWeAre/Group125.png"/>
    </div>
    <div className='d-flex justify-content-center my-5' style={{backgroundColor:'#f2f2f2'}}>
    <Image src="/WhoWeAre/Table.png" />
    </div>
    <div className='d-flex justify-content-center my-5' style={{backgroundColor:'white'}}>
    <Image src="/WhoWeAre/Table2.png" />
    </div>
    </>
  )
}

export default WhoWeAre;
