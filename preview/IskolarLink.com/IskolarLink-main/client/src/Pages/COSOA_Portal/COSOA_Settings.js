import React, {useState, useEffect } from 'react';
import './COSOA_Profile.css';
import { HeroVariant } from '../../components/HeroVariant/Hero';
import { Container, Row, Col, Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import axios from 'axios';


function COSOASettings(){

    const [cosoa, setCOSOA] = useState({
    });

  // Function to handle saving changes
  const handleSaveChanges = () => {
    // Logic to handle save changes
    try{
        axios.post(`${process.env.REACT_APP_BASE_URL}/cosoa_profile/update_cosoa_details`, cosoa, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((response) => {
            if(response.data === 'Successfully updated COSOA Profile'){
                alert(response.data);
            }else{
                alert(response.data.error);
            }
        });
        console.log(cosoa)
    }catch(err){
        console.log(err);
    }
  };

  const handleToggle = () => {
    // Logic to handle toggle
    try{
      axios.post(`${process.env.REACT_APP_BASE_URL}/cosoa/application_period`)
      .then((response) => {
        if(response.data.success){
          alert(response.data.success);
          setCOSOA({ ...cosoa, application_period: response.data.period });
        }else{
          alert(response.data.error);
        }
      });
    }catch(err){
      console.log(err);
    }
  };
  
  useEffect(() => {
    try{
        axios.get(`${process.env.REACT_APP_BASE_URL}/cosoa_profile/get_cosoa_details`)
        .then((response) => {
          console.log(response.data);
            setCOSOA(response.data);
        });

        
    }catch(err){
        console.log(err);
    }
    }, []);


  return (
    <div>
      <HeroVariant
        h1Text="Settings"
        pText="Update your profile credentials."
      />

      <Container className='my-5 text-lightblack'>
      <h1 className='Inter-b text-25px mb-0'>COSOA Profile</h1>
      <p className='Inter-normal text-14px text-gray2 mt-0'>Organization Information is an uneditable section.</p>
      <hr className='mt-4 mb-3'/>
      <Form className='Inter-med text-14px'>
        <Row>
          <Form.Group className='mb-2'>
            <Form.Label>
            Name of Organization (Abbreviation/Initialism)
            </Form.Label>
            <Form.Control 
            type="text" 
            defaultValue={cosoa.org_name} 
            value={cosoa.org_name}
            onChange={(e) => setCOSOA({ ...cosoa, org_name: e.target.value })}
            disabled
            readOnly
            className='Inter-normal text-16px'
            />
          </Form.Group>
        </Row>
        <Form.Group as={Row} md={12} className='mb-2'>
        <Form.Label className="Inter-med text-14px text-lightblack mt-2 mb-0">Your Description</Form.Label>
          <Form.Control 
          as="textarea" 
          maxLength="600"
          value={cosoa.mission}
          onChange={(e) => setCOSOA({ ...cosoa, mission: e.target.value })}
          placeholder="Hi! Tell us something about your organization..."
          style={{ width: '98%', margin: '10px' }}
          className='mt-0 Inter-normal text-16px mb-0'
          rows={8}
          />
          <Form.Text className='text-gray2 Inter-normal text-14px mt-0'>
          {`${cosoa.mission ? cosoa.mission.length : 0}/600 characters left`}
          </Form.Text>
        </Form.Group>
               {/*<Form.Group controlId="formFileLg" className="mb-3">
                    <Form.Label>Upload Profile or Logo</Form.Label>
                    <Form.Control 
                    type="file" 
                    size="lg"
                    onChange={(e) => {setCOSOA({ ...cosoa, org_picture: e.target.files[0]})}}
                    />
              </Form.Group>*/}
        <div>
          <Row>
                    <Form.Group>
                    <Form.Label>PUP Webmail</Form.Label>
                    <Form.Control
                        type="email"
                        value={cosoa.email}
                        onChange={(e) => setCOSOA({ ...cosoa, email: e.target.value })}
                        readOnly  
                        disabled
                    />
                    </Form.Group>
                </Row>
                </div>
          <div className='mt-5 mb-3'>
          <h2 className='Inter-b text-25px mb-0'>Social Media Profile</h2>
          <p className="Inter-normal text-14px text-gray2 mt-0">Update your Social Media Links</p>
          <hr className='mt-4 mb-0'/>
          </div>
          <Row className='mt-0 pt-0 Inter-med text-14px'>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Social Link 1</Form.Label>
                <InputGroup>
                  <InputGroup.Text><FaFacebookF /></InputGroup.Text>
                  <Form.Control 
                    type="url" 
                    placeholder="Profile link/url..." 
                    value={cosoa.social1}
                    onChange={(e) => setCOSOA({ ...cosoa, social1: e.target.value })}
                    className='Inter-regular text-16px'
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Social Link 2</Form.Label>
                <InputGroup>
                  <InputGroup.Text><FaTwitter /></InputGroup.Text>
                  <Form.Control 
                    type="url" 
                    placeholder="Profile link/url..." 
                    value={cosoa.social2}
                    onChange={(e) => setCOSOA({ ...cosoa, social2: e.target.value })}
                    className='Inter-regular text-16px'
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            <Col md={6} className="mb-4">
              <Form.Group className="mb-3">
                <Form.Label>Social Link 3</Form.Label>
                <InputGroup>
                  <InputGroup.Text><FaLinkedinIn /></InputGroup.Text>
                  <Form.Control 
                    type="url" 
                    placeholder="Profile link/url..." 
                    value={cosoa.social3}
                    onChange={(e) => setCOSOA({ ...cosoa, social3: e.target.value })}
                    className='Inter-regular text-16px'
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Social Link 4</Form.Label>
                <InputGroup>
                  <InputGroup.Text><FaInstagram /></InputGroup.Text>
                  <Form.Control 
                    type="url" 
                    placeholder="Profile link/url..." 
                    value={cosoa.social4}
                    onChange={(e) => setCOSOA({ ...cosoa, social4: e.target.value })}
                    className='Inter-regular text-16px'
                 />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row>
          <Col className="text-end mb-4 mt-2">
            <Button variant="secondary" onClick={handleSaveChanges} className='mx-3 px-4'>Save Changes</Button>
          </Col>
        </Row>
    
      </Form>

    </Container>
    </div>

  )
}

export default COSOASettings;