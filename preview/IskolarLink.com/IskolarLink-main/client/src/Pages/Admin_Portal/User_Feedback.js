import React,{useEffect,useState} from 'react';
import { HeroVariant3 } from '../../components/HeroVariant/Hero';
import { Container, Row, Col, Button, InputGroup, Form, Image} from 'react-bootstrap';
import Table from 'react-bootstrap/Table'
import axios from 'axios';
import './Admin_Portal.css'
import Pagination from 'react-bootstrap/Pagination';
import FeedbackForm from '../../components/Admin_Dashboard/FeedbackForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function User_Feedback() {

  const [feedbacks, setFeedbacks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const feedbacksPerPage = 5;
  const totalPages = Math.ceil(feedbacks.length / feedbacksPerPage);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/feedback/get`)
      .then(res => {
        setFeedbacks(res.data);
      })
      .catch(err => {
        console.log(err);
      });

      setRefresh(false);
  },[refresh]);

  const currentFeedbacks = feedbacks.slice((currentPage - 1) * feedbacksPerPage, currentPage * feedbacksPerPage);

  let paginationItems = [];

  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
        {number}
      </Pagination.Item>,
    );
  }

  return (
    <>
      <HeroVariant3
        h1Text="User Feedback"
      />
      <Container>
        <Row className='mx-3 mt-5 mb-2'>
          <h1 className='text-red Inter-b text-45px mb-0'>Feedbacks</h1>
          <p className='Inter-normal text-lightblack text-22px mt-0'>Review and respond to comments, suggestions, and experiences shared by users and gain valuable information to make informed decisions, address concerns, and improve overall website functionality.</p>
        </Row>
        <Row className='m-4'>
        <Table striped bordered hover className='text-center Inter-med text-14px' style={{verticalAlign:'middle'}}>
          <thead>
            <tr>
              <th><strong>Name</strong></th>
              <th><strong>Email</strong></th>
              <th><strong>Subject</strong></th>
              <th><strong>Message</strong></th>
              <th><strong>Action</strong></th>
            </tr>
          </thead>
          <tbody>
            {currentFeedbacks.map((feedback, index) => (
              <tr key={index}>
                <td>{feedback.fullName}</td>
                <td>{feedback.email}</td>
                <td>{feedback.subject}</td>
                <td>{feedback.message.length > 50 ? feedback.message.substring(0, 50) + '...' : feedback.message}</td>
                <td>
                  <FeedbackForm id={feedback.id} fullName={feedback.fullName} email={feedback.email} date={feedback.createdAt} subject={feedback.subject} message={feedback.message} />
                  <FontAwesomeIcon 
                  icon="fa-solid fa-trash-can"
                  style={{
                    cursor: 'pointer',
                    transition: 'color 0.3s ease',
                    color: 'black',
                  }}
                  size='xl'
                  onMouseOver={(e) => { e.target.style.color = 'var(--red)'; }}
                  onMouseOut={(e) => { e.target.style.color = 'black'; }}
                  className="ms-2"
                   onClick={() => {
                  axios.delete(`${process.env.REACT_APP_BASE_URL}/feedback/delete/${feedback.id}`)
                    .then(res => {
                      alert(res.data.success);
                      setRefresh(true);
                    })
                    .catch(err => {
                      alert(err.response.data.error);
                    });
                }}/></td>
              </tr>
            ))}
          </tbody>
          </Table>
      </Row>
      <Pagination className='justify-content-center pagination-red'>
        {paginationItems}
      </Pagination>
      </Container>
    </>
  );
}

export default User_Feedback;
