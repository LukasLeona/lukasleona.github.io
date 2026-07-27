import React, { useState, useEffect, useContext } from 'react';
import './general.css';
import { HeroVariant } from '../components/HeroVariant/Hero';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import { AnnouncementVariant2 } from '../components/AnnouncementVariant/AnnouncementCard';
import OfficerCard from '../components/OfficerCard';
import ContactBanner from '../components/ContactBanner';
import ContactBanner2 from '../components/ContactBanner2';
import { FaCheckCircle } from 'react-icons/fa';
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContent';
import LoadingOverlay from './LoadingOverlay'
import MissingAnnouncement from './Errors/MissingAnnouncement';
function Org_Profile() {

  const {auth, menu, handleMenuChange} = useContext(AuthContext);
  const {authState, setAuthState} = auth;
  const {activeMenu, setActiveMenu} = menu;

  const [org, setOrg] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const { orgId} = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [applied,setApplied] = useState(false)
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    if(authState.status && authState.role === 'student'){
      axios.get(`${process.env.REACT_APP_BASE_URL}/accredited/org/has_joined/${orgId}`).then((res)=>{
        setApplied(res.data.applied)
        console.log(res.data.applied)
      })
    }
    
  },[authState.status])


  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/accredited/org/${orgId}`)
    .then((response) => {
      if(response.data.error){
        navigate('/404');
      }else{
      setOrg(response.data);
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(()=>{
      setLoading(false)
    })

  }, [location.pathname])

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/accredited/org/get_announcements/${orgId}`)
    .then((response) => {
      if(response.data.error){
        navigate('/404');
      }else{
      console.log(response.data)
      setAnnouncements(response.data);
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }, [location.pathname])

  

  const handleApply = () => {
    try{
      axios.post(`${process.env.REACT_APP_BASE_URL}/membership/apply`, { orgId:orgId, strict:org.organization.strict })
      .then((response) => {
        if(response.data.error){
          alert(response.data.error);
        }else{
          alert(response.data.success);
          setApplied(true)
        }
      })
    }catch(err){
      console.log(err);
    }
  }

  const handleCancel = async () => {
    if(window.confirm("Are you sure you want to cancel/remove your membership from this organization?")=== true){
      axios.post(`${process.env.REACT_APP_BASE_URL}/accredited/org/delete_membership/${orgId}`).then((res)=>{
        alert(res.data.success)
        window.location.reload()
    }) 
  }
  }

  const renderTagBadge = (tag) => {
    const academicOrgTags = [
      'Academic Organization',
      'Advocacy Organization',
      'Cultural/Arts/Dance Organization',
      'Fraternities and Sororities',
      'Political Organization',
      'Religious Organization',
      'Scholars Organization',
      'Socio-civic Organization',
      'Special Interest Organization',
      'Sports Organization',
    ];
  
    const specificTags = [
      "College of Accountancy and Finance | CAF",
        "College of Architecture, Design, and Built Environment | CADBE",
        "College of Arts and Letters | CAL",
        "College of Business Administration | CBA",
        "College of Communication | COC",
        "College of Computer and Information Sciences | CCIS",
        "College of Education | COED",
        "College of Engineering | CE",
        "College of Human Kinetics | CHK",
        "College of Law | CL",
        "College of Political Science and Public Administration | CPSPA",
        "College of Social Sciences and Development | CSSD",
        "College of Science | CS",
        "College of Tourism, Hospitality, and Transportation Management | CTHTM",
        "Institute of Technology | ITECH",
        "Open University System | OUS",
        "Graduate School | GS",
        "Senior High School | SHS",
        "University-Wide"
    ];
  
    const orgType = org?.organization?.type;
    const orgSubJurisdiction = org?.organization?.subjurisdiction;
  
    if (orgType && orgSubJurisdiction) {
      if (academicOrgTags.includes(tag)) {
        return (
          <Badge
            key={tag}
            pill
            className="me-2 mb-2"
            bg=""
            style={{ backgroundColor: 'var(--light-red)', color: 'var(--red)' }}
          >
            {tag}
          </Badge>
        );
      } else if (specificTags.includes(tag)) {
        return (
          <Badge
            key={tag}
            pill
            className="me-2 mb-2"
            style={{ backgroundColor: 'var(--light-yellow)', color: 'var(--dark-yellow)' }}
            bg=""
          >
            {tag}
          </Badge>
        );
      } else {
        return (
          <Badge key={tag} pill className="me-2 mb-2">
            {tag}
          </Badge>
        );
      }
    }
  };
  
  return (
    <div>
        <HeroVariant
        h1Text='Your Campus Journey Matters'
        />
      <Container className='my-5'>
        <Row>
        <Row className="mb-0 align-items-center">
          <Col xs={12} md={8} lg={9} className='mb-3'>
            <div className="d-flex align-items-center">
            <div className="ml-3">
            {org.organization?.org_name ? <h1 className='text-red mb-0'>{org.organization.org_name}</h1> : <h1 className='text-red mb-0'>Organization Name</h1>}
                {org.organization && (
  <p className='text-gray2 mb-0'>
    {org.organization.strict ? (
      <>
        {renderTagBadge(org.organization.type)}
        {renderTagBadge(org.organization.subjurisdiction)}
      </>
    ) : (
      <>
        {renderTagBadge(org.organization.type)}
        {renderTagBadge(org.organization.subjurisdiction)}
      </>
    )}
  </p>
)}
{org.organization?.strict ? `Organization is only available for ${org.organization.subjurisdiction} Students` : `Organization is available for all students`}
            
              </div>
              
            </div>
          </Col>
                
          {authState.status &&
          <Col xs={12} md={4} lg={3} className="text-md-right text-end mt-3 mt-md-0">
            {org.organization?.membership_period && !applied ?
                        <Button variant="primary" onClick={handleApply} disabled={!authState.is_verified}>Apply Now!</Button>

            : org.organization?.membership_period && applied ?
              <Button variant="primary" onClick={handleCancel} disabled={!authState.is_verified}>Cancel Membership</Button>
            :           
            <Button variant='disabled1'  className="apply-now-btn" disabled>Closed Membership</Button>

            }
          
          </Col>
          }
          
        </Row>

        </Row>
        <Row>
          <h2>Description</h2>
          <p className='text-gray2'>{org.user?.description}</p>
        </Row>
      </Container>
            
      <Container className='my-5'>
      <Row className='text-center'>
        <h1 className='text-red'>Latest Announcements</h1>
        <p className='text-gray2'>Discover the latest announcement that will shape the future of the organization and elevate your student experience!</p>
      </Row>
      {announcements.length > 0 ? (
        announcements.map((announcement, index) => (
          <AnnouncementVariant2
            key={index} // Ensure each mapped element has a unique key
            announcement={announcement}
          />
        ))
      ) : (
        <MissingAnnouncement />
      )}
    </Container>
      {loading &&
      <LoadingOverlay title={"Loading Organization Data"}/>
      }
    </div>
  );
}



export default Org_Profile;
