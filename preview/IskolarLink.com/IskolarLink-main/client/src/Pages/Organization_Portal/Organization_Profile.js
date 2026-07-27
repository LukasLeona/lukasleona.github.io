import React, { useState, useEffect } from 'react';
import './Organization_Profile.css';
import { HeroVariant2 } from '../../components/HeroVariant/Hero';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { AnnouncementVariant } from '../../components/AnnouncementVariant/AnnouncementCard';
import OfficerCard from '../../components/OfficerCard';
import ContactBanner from '../../components/ContactBanner';
import ContactBanner2 from '../../components/ContactBanner2';
import AddAnnouncement from '../../components/Org_Home/AddAnnouncement';
import axios from 'axios';
import { AnnouncementVariant2 } from '../../components/AnnouncementVariant/AnnouncementCard';



function Organization_Profile() {

  const [organization, setOrganization] = useState({});
const [user, setUser] = useState({});
const [refreshAnnouncement, setRefreshAnnouncement] = useState(false);
const [announcements, setAnnouncements] = useState([]);


useEffect(() => {
  axios.get(`${process.env.REACT_APP_BASE_URL}/org_portal/organization`).then((response) => {
    setOrganization(response.data.organization);
    setUser(response.data.user);
  });
}, []);

useEffect(() => {
  axios.get(`${process.env.REACT_APP_BASE_URL}/org_portal/get_announcements`).then((response) => {
    setAnnouncements(response.data);
    console.log(response.data);
    setRefreshAnnouncement(false);
  });
}, [refreshAnnouncement]);

  return (
    <div>
        <HeroVariant2 
        imgSrc={user.profile_picture ? `${process.env.REACT_APP_BASE_URL}/org_images/${user.profile_picture}` : null}
        name={organization.org_name}
        webmail={user.email}
        />
      <Container className='my-5'>
        <Row>
            <h2>Our Mission</h2>
            <p className='text-gray2'>{organization.mission}</p>
        </Row>
        <Row>
            <h2>Our Vision</h2>
            <p className='text-gray2'>{organization.vision}</p>
        </Row>
      </Container>

      <Container className='my-5'>
        <Row className='text-center'>
          <h1 className='text-red'>Latest Announcements</h1>
          <p className='text-gray2'>Discover the latest announcement that will shape the future of PUP COSOA and elevate your student experience!</p>
        </Row>
        {
          announcements.map((announcement, index) => {
            return(
              <AnnouncementVariant2 key={index} announcement={announcement}/>
            );
          })
        }
        <Row>
          <AddAnnouncement setRefreshAnnouncement={setRefreshAnnouncement}/>
        </Row>
      </Container>
    </div>
  );
}

export default Organization_Profile;
