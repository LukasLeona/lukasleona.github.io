import React, { useState,useEffect } from 'react';
import { HeroVariant3 } from '../../components/HeroVariant/Hero';
import { Container, Row, Col, Button, InputGroup, Form} from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Stat_Card from '../../components/Stat_Card';

function Official_Members() {

  const [members, setMembers] = useState([]);

  useEffect(() => {
    try{
      axios.get(`${process.env.REACT_APP_BASE_URL}/org_portal/organization/members`)
      .then((response) => {
        setMembers(response.data);
      });
    }catch(err){
      console.log(err);
    }
  }, []);

  const handleRemove = (studentId) => {
    try{
      axios.post(`${process.env.REACT_APP_BASE_URL}/membership/remove_member`, {studentId: studentId})
      .then((response) => {
        if(response.data.success){
          alert(response.data.success);
          window.location.reload();
        }else{
          alert(response.data.error);
        }
      });
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div>
      <HeroVariant3
        h1Text="Official Members"
        pText="Keep track of your members."
      />
      <Container>
      <Row className='mt-4 mb-3'>
          <h1 className='text-red Inter-b text-45px mb-0'>Overview</h1>
          <h3 className='Inter-normal text-lightblack text-35px mt-0'>Academic Year 2023-2024</h3>
        </Row>
        <Row className="text-center mt-0">
        <h2 className='Inter-b mb-0 text-red text-25px mb-3'>List of Current Iskolar Members</h2>
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
      </Container>
      <Container>
        <Table striped bordered hover className="text-center Inter-med text-12px mb-5" style={{verticalAlign:'middle'}}>
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
                    <td>
                      <Row>
                        <Col xs={2}>
                          {member.profile_picture ? <img src={`${process.env.REACT_APP_BASE_URL}/images/${member.profile_picture}`} alt="profile_picture" className="profile_picture" style={{width: '40px', height: '40px', borderRadius: '50%'}}/> : <FontAwesomeIcon icon={faUser} className="profile_picture" style={{width: '40px', height: '40px', borderRadius: '50%'}}/>}
                        </Col>
                        <Col>
                          <p>{member.details.student_Lname}, {member.details.student_Fname}</p>
                        </Col>
                      </Row>
                    </td>
                    <td>{member.email}</td>
                    <td>{member.details.department}</td>
                    <td>
                      <Button variant="outline-secondary" className="m-1" onClick={() => handleRemove(member.details.id)}><i class="fa-solid fa-trash" ></i></Button>
                    </td>
                  </tr>
                );
              })
            )}

          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default Official_Members;
