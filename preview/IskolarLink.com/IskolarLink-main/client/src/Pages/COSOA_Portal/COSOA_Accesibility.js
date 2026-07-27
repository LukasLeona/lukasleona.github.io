import React, { useState,useEffect } from 'react';
import { HeroVariant3 } from '../../components/HeroVariant/Hero';
import { Container, Row, Button, Col } from 'react-bootstrap';
import './COSOA_Portal.css'
import Table from 'react-bootstrap/Table'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Add_COSOA from '../../components/COSOA_Dashboard/Add_COSOA';
import Edit_COSOA from '../../components/COSOA_Dashboard/Edit_COSOA';
import WarningAlert from '../../components/Alerts/WarningAlert';
import LoadingOverlay from '../../components/LoadingOverlay';

function COSOA_Accesibility() {

  const [members,setMembers] = useState([])
  const [userPosition, setUserPosition] = useState('');
  const [refresh,setRefresh] = useState(false)
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');

  useEffect(() =>{
  setLoading(true);
  axios.get(`${process.env.REACT_APP_BASE_URL}/cosoa_member/get_members`).then((response)=>
  {
    console.log(response.data)
    setMembers(response.data)
    axios.get(`${process.env.REACT_APP_BASE_URL}/cosoa_member/get_user_position`).then((response) => {
      setUserPosition(response.data.position);
      setTitle('Loading...');
      setLoading(false);
    });
  })
  setRefresh(false)
  },[refresh])

  // Make an API request to update the position of a COSOA member
const updatePosition = async (memberId, newPosition) => {
  try {
    const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/update_cosoa_member/${memberId}`, {
      position: newPosition,
    });
    console.log(response.data); // Success message
  } catch (error) {
    console.error(error);
    // Handle error
  }
};

// Make an API request to remove a COSOA member
const removeMember = async (memberId) => {
  setLoading(true);
  try {
    await axios.delete(`${process.env.REACT_APP_BASE_URL}/cosoa_member/remove_cosoa_member/${memberId}`)
    .then((response)=>{console.log(response.data); // Success message
    setRefresh(!refresh)
    alert(response.data.success)
    setLoading(false);
  });

  } catch (error) {
    console.error(error);
    setLoading(false);
    // Handle error
  }
};

  return (
    <>
        <HeroVariant3 
          h1Text="Page Accessibility"
          pText="Assign permissions to COSOA Staff."
        />
        <Row className='text-center mt-5 mb-2'>
          <h1 className='text-red Inter-b text-45px mb-0'>COSOA Members</h1>
          <p className='Inter-normal text-lightblack text-22px mt-0'>Manage or View COSOA Members</p>
        </Row>
        <Container>
          <Table striped bordered hover className='text-center Inter-med text-12px' style={{verticalAlign:'middle'}}>
            <thead>
              <tr>
                <th><strong>Name</strong></th>
                <th><strong>Position</strong></th>
                <th style={{width:'15%'}}><strong>Action</strong></th>
              </tr>
            </thead>
            <tbody>
            {members.map((member) => (
              <tr key={member.id}>
                <td>
                  <div >
                  {member.profile_picture ? (
                      <img src={`${process.env.REACT_APP_BASE_URL}/images/${member.profile_picture}`}alt="Profile" style={{ width: '40px', height: '40px', marginRight: '10px' }} />
                    ) : (
                      <FontAwesomeIcon icon={faUser} style={{ fontSize: '30px', marginRight: '10px' }} />
                    )}
                    {member.name}
                  </div>
                </td>
                <td>{member.position}</td>
                <td>
                {(  userPosition === 'Chairperson' ||
                  userPosition === 'Chairperson (Asst.)' ||
                    userPosition === 'Vice Chairperson' ||
                    userPosition === 'Vice Chairperson (Asst.)') ? (
                    <>
                      <Row >
                      <Col className='text-end '>
                      <FontAwesomeIcon 
                          icon="fa-solid fa-trash-can"
                          onClick={()=>removeMember(member.id)}
                          style={{
                            cursor: 'pointer',
                            transition: 'color 0.3s ease',
                            color: 'black',
                          }}
                          onMouseOver={(e) => { e.target.style.color = 'var(--red)'; }}
                          onMouseOut={(e) => { e.target.style.color = 'black'; }}
                      
                        />
                        
                      </Col>
                      <Col className="text-start ">
                      <Edit_COSOA 
                          setRefresh={setRefresh} 
                          imgSrc={member.profile_picture} 
                          fullName={member.name} 
                          position={member.position} 
                          id={member.id}
                        />
                      </Col>
                    </Row>
                    </>
                  ) : (
                    <Row classname="border">
                    <Col classname="text-end border"> 
                    <Button variant="warning"  disabled>
                        Edit
                      </Button>
                    </Col>
                     <Col>
                     <Button variant="danger"  disabled>
                        Delete
                      </Button>
                     </Col>
                      
                    </Row>
                  )}
                </td>
              </tr>
            ))}

            </tbody>
          </Table>
        </Container>
        <Container className='text-center my-5'>
        {/* Render the "Add New COSOA Officer" button based on user's position */}
        {userPosition === 'Chairperson' ||
        userPosition === 'Chairperson (Asst.)' ||
        userPosition === 'Vice Chairperson' ||
        userPosition === 'Vice Chairperson (Asst.)' ? (
          <Add_COSOA setRefresh={setRefresh}/>
        ) : (
          <Button 
          variant="primary" 
          disabled 
>
            + Add New COSOA Officer
          </Button>
        )}
    </Container>
        
    {loading && <LoadingOverlay title={title} />}

  </>
  );
};

export default COSOA_Accesibility;
