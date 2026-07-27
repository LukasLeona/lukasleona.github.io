import React, { useState, useEffect } from 'react';
import { HeroVariant3 } from '../../components/HeroVariant/Hero';
import { Container, Row, Col, Button, InputGroup, Form} from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import NotificationAlert from '../../components/Alerts/NotificationAlert';
import LoadingOverlay from '../../components/LoadingOverlay';

function O_Membership() {

  const [members, setMembers] = useState([]);
  const [membershipPeriod, setMembershipPeriod] = useState(false);
  const [strictMode, setStrictMode] = useState(false);
  const [org, setOrg] = useState({});
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [feature, setFeature] = useState('');
  const [item, setItem] = useState('');

  useEffect(() => {
    setLoading(true);
    try{
      
      axios.get(`${process.env.REACT_APP_BASE_URL}/org_portal/organization/membership`)
      .then((response) => {
        setMembers(response.data.members);
        setOrg(response.data.organization);
        setMembershipPeriod(response.data.organization.membership_period);
        setStrictMode(response.data.organization.strict);

      });
    }catch(err){
      console.log(err);
    }finally{
      setLoading(false);
    }
  }, []);

  const handleAccept = (studentId) => {
    setLoading(true);
    try{
      axios.post(`${process.env.REACT_APP_BASE_URL}/membership/membership`, {studentId: studentId, status: 'Accepted', orgId: org.id})
      .then((response) => {
        if(response.data.success){
          setFeature('Accepted');
          setItem('Membership Application');
          setShowAlert(true);
          window.location.reload(); 
        }else{
          alert("Error");
        }
      });
    }catch(err){
      console.log(err);
    }finally{
      setLoading(false);
    }
  }

  const handleDecline = (studentId) => {
    setLoading(true);
    try{
      
      axios.post(`${process.env.REACT_APP_BASE_URL}/membership/membership`, {studentId: studentId, status: 'Declined', orgId: org.id})
      .then((response) => {
        if(response.data.success){
          setLoading(false);
          setFeature('Declined');
          setItem('Membership Application');
          setShowAlert(true);
          window.location.reload();
        }else{
          alert(response.data.error);
        }
      });
    }catch(err){
      console.log(err);
    }finally{
      setLoading(false);
    }
  }

  const handleMembershipPeriodToggle = () => {
    setLoading(true);
    try{
      axios.post(`${process.env.REACT_APP_BASE_URL}/org_portal/membership/status`, {status: !membershipPeriod})
      .then((response) => {
        if(response.data.success){
          setMembershipPeriod(!membershipPeriod);
          setFeature('Updated');
          setItem('Membership Period');
          setShowAlert(true);
          setLoading(false);
        }else{
          alert(response.data.error);
          setLoading(false);
        }
      });
    }catch(err){
      console.log(err);
      setLoading(false);
    }
  }


  const handleStrictModeToggle = () => {
    setLoading(true);
    try{
      axios.post(`${process.env.REACT_APP_BASE_URL}/org_portal/organization/strict`, {strict: !strictMode})
      .then((response) => {
        if(response.data.success){
          setStrictMode(!strictMode);
          setFeature('Updated');
          setItem('Strict Mode');
          setShowAlert(true);
          setLoading(false);
        }else{
          alert(response.data.error);
          setLoading(false);
        }
      });
    }catch(err){
      console.log(err);
      setLoading(false);
    }
  }


  return (
    <div>
      <HeroVariant3
        h1Text="Membership"
        pText="Check your applicants."
      />
      <Container>
      <Row className='mt-4 mb-3'>
          <h1 className='text-red Inter-b text-45px'>Membership Application</h1>
      </Row>
      <Row>
        <Form>
          <Row className=' px-2'>
            <Row className="border pt-4">
            <Col>
              <Form.Label>
              {membershipPeriod ? <p className='Inter-b text-16px'>Membership<br/><span className='text-red Inter-normal text-14px'>Iskolars <span className="Inter-b text-14px">may now apply.</span></span></p> : 
              <p className="Inter-b text-16px">Membership<br/><span className='text-red Inter-normal text-14px'>Iskolars <span className="Inter-b text-14px">may not apply.</span></span></p>}
              </Form.Label>
            </Col>
            <Col className='text-end'>
              <Form.Check
              type="switch"
              id="membership-toggle"
              checked={membershipPeriod}
              onChange={handleMembershipPeriodToggle}
              style={{zoom: '1.5'}}
              on
              />
            </Col>
            </Row>
            <Row className="border pt-4 mt-2">
            <Col>
              <Form.Label>
              {strictMode ? <p className='Inter-b text-16px'>Strict Mode<br/><span className='text-red Inter-normal text-14px'>Restrict applications to <span className="Inter-b text-14px">only from your sub-jurisdiction.</span></span></p> : 
              <p className='Inter-b text-16px'>Strict Mode<br/><span className='text-red Inter-normal text-14px'>Accept applicants from <span className="Inter-b text-14px">any department</span></span></p>}
              </Form.Label>
            </Col>
            
            <Col className='text-end'>
              <Form.Check
              type="switch"
              id="strict-toggle"
              checked={strictMode}
              onChange={handleStrictModeToggle}
              style={{zoom: '1.5'}}
              />
            </Col>
            </Row>
          </Row>

        </Form>
      </Row>
      </Container>
      <Container>
      <Row className="text-center my-4">
        <h2 className='Inter-b mb-0 text-red text-25px mt-3 '>List of Current Iskolar Applicants</h2>
        <p className='Inter-normal text-16px text-subtitleblack'>Iskolar applicants may vary depending on your membership application preference.</p>
      </Row>
      <Row className='my-3'>
        <InputGroup as={Col}>
          <Button variant="outline-secondary" id="button-addon2">
            <i class="fa-solid fa-magnifying-glass"></i>
          </Button>
          <Form.Control
            placeholder="Search"
          />
        </InputGroup>
        <Col>
        </Col>
      </Row>
        <Table striped bordered hover className='text-center Inter-med text-12px mb-5' style={{verticalAlign:'middle'}}>
          <thead>
            <tr>
              <th><strong>Members</strong></th>
              <th><strong>Email</strong></th>
              <th><strong>Department</strong></th>
              <th style={{width: '20%'}}><strong>Action</strong></th>
            </tr>
          </thead>
          <tbody>
            {members.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center my-5 Inter" style={{padding: '5rem'}}>
                  There are no Iskolar Users to display.
                </td>
              </tr>
            ) : (
            members.map((member) => {
              return(
                <tr>
                  <td><Row>
                      <Col xs={2}>
                        {member.profile_picture ? <img src={`${process.env.REACT_APP_BASE_URL}/images/${member.profile_picture}`} alt="profile_picture" className="profile_picture" style={{width: '40px', height: '40px', borderRadius: '50%'}}/> : <FontAwesomeIcon icon={faUser} className="profile_picture" style={{width: '40px', height: '40px', borderRadius: '50%'}}/>}
                      </Col>
                      <Col>
                        <p>{member.details.student_Lname}, {member.details.student_Fname}</p>
                      </Col>
                    </Row></td>
                  <td>{member.email}</td>
                  <td>{member.details.department}</td>
                  <td>
                    <Button variant="outline-success" className="m-1" onClick={() => handleAccept(member.details.id)}>Accept</Button>
                    <Button variant="outline-danger" className="m-1" onClick={() => handleDecline(member.details.id)}>Decline</Button>
                  </td>
                </tr>
              );
              })
              )}
            
          </tbody>
        </Table>

        <Row className="my-5"></Row>
      </Container>
      {loading && <LoadingOverlay/>}
      {showAlert && <NotificationAlert feature={feature} item={item} setShowAlert={setShowAlert}/>}
    </div>
  );
}

export default O_Membership;
