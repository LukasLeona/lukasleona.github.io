import React,{useState,useEffect} from 'react';
import '../general.css'; 
import { Row, Container } from "react-bootstrap";
import AnnouncementCard from '../AnnouncementVariant/AnnouncementCard.js'
import axios from 'axios'

const Section3 = () => {

  const [announcements, setAnnouncements] = useState([])
  
  useEffect(()=> {
    axios.get(`${process.env.REACT_APP_BASE_URL}/cosoa_ann/`)
    .then((res)=>{
      setAnnouncements(res.data)
    })
  },[])

  return (
    <div>
      <Row className="text-center m-3">
        <h1 className="text-45px text-red Inter-b">Announcements</h1>
        <p className="text-16px text-gray2 Inter-normal">Discover the latest announcement that will shape the future of PUP COSOA and<br/>elevate your student experience!</p>
      </Row>
      <Container fluid className="d-flex justify-content-center pb-5"> 
        <Row>
            <AnnouncementCard
              imageSrc="studentorg.png"
              title="PUP COSOA wins the Lottery!"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              userName="John Doe"
              userType="Announcement"
              date="Oct 5"
              userImageSrc="s1-icon1.png"
            />
            <AnnouncementCard
              imageSrc="studentorg.png"
              title="Ang Kwento ng Mahabang Title - TBAAAAAAAAAAAAAA"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              userName="John Doe"
              userType="Announcement"
              date="Oct 5"
              userImageSrc="s1-icon1.png"
            />
            <AnnouncementCard
              imageSrc="studentorg.png"
              title="Sana Pumasa Tayong Lahat"
              description="BSIT 4-1 will be undergoing their tool defense on the 30th of November. 13 Groups facing the esteemed panel of judges."
              userName="John Doe"
              userType="Announcement"
              date="Nov 23"
              userImageSrc="s1-icon1.png"
            />
        </Row>
      </Container>
    </div>
  );
};

export default Section3;
