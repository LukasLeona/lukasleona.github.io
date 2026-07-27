import React, { useState, useEffect } from 'react';
import { HeroVariant3 } from '../../components/HeroVariant/Hero';
import Stat_Card from '../../components/Stat_Card';
import { Container, Row, Col, Button, InputGroup, Form, Pagination, Table, Badge } from 'react-bootstrap';
import './COSOA_Portal.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import GiveCredentials from '../../components/COSOA_Dashboard/GiveCredentials';
import GiveFeedback from '../../components/COSOA_Dashboard/GiveFeedback';
import LoadingOverlay from '../../components/LoadingOverlay';
import NotificationAlert from '../../components/Alerts/NotificationAlert';
import ConfirmationAlert from '../../components/Alerts/ConfirmationAlert';

function COSOA_Dashboard() {
  axios.defaults.withCredentials = true;

  const [orgs, setOrgs] = useState([]);
  const navigate = useNavigate();
  const [cosoa, setCOSOA] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Adjust this value as 
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [feature, setFeature] = useState('');
  const [item, setItem] = useState('');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [action, setAction] = useState('');
  const [action2, setAction2] = useState('');
  const [showConfirmationAlert, setShowConfirmationAlert] = useState(true);
  

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
 

  const handleToggle = async () => {
    setAction('update the application period');
    setAction2('update');
    setShowConfirmationAlert(true);
    setTitle('Updating Application Period');
    try {
      const userConfirmed = window.confirm('Are you sure you want to update the application period?');

      if (!userConfirmed) {
        console.log('User cancelled the update.')
        return;
      }else{
        setLoading(true);
        await
      axios.put(`${process.env.REACT_APP_BASE_URL}/cosoa/application_period`)
        .then((response) => {
          if (response.data.success) {
            setLoading(false);
            setFeature('updated');
            setItem('application period');
            setShowAlert(true);
            setCOSOA({ ...cosoa, application_period: response.data.period });
          } else {
            alert(response.data.error);
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  };



  useEffect(() => {
    setTitle('Getting COSOA Details')
    setLoading(true);
    try {
      axios.get(`${process.env.REACT_APP_BASE_URL}/cosoa_profile/get_cosoa_details`)
        .then((response) => {
          setCOSOA(response.data);
          setTitle('Loading Organizations');
          setSubtitle('Loading can take a while. Please wait...');
          setLoading(false)
          axios.get(`${process.env.REACT_APP_BASE_URL}/cosoa_dashboard/get_orgs`)
            .then((response) => {
              setOrgs(response.data);
              setLoading(false);
            });
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    try {
      if (cosoa.application_period) {
        document.getElementById("anr-period-initial-toggle").checked = true;
      } else {
        document.getElementById("anr-period-initial-toggle").checked = false;
      }
    } catch (err) {
      console.log(err);
    }
  }, [cosoa.application_period]);


  const [countApproved, setCountApproved] = useState(0);
  const [countPending, setCountPending] = useState(0);
  const [countSubmission, setCountSubmission] = useState(0);


  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/cosoa_dashboard/count_active_orgs`)
      .then((response) => {
        console.log(response.data);
        setCountApproved(response.data);
      });

    axios.get(`${process.env.REACT_APP_BASE_URL}/cosoa_dashboard/count_pending_orgs`)
      .then((response) => {
        console.log(response.data);
        setCountPending(response.data);
      });

    axios.get(`${process.env.REACT_APP_BASE_URL}/cosoa_dashboard/count_org_application`)
      .then((response) => {
        console.log(response.data);
        setCountSubmission(response.data);
      });
  }, []);


  const filteredItems = orgs.filter((org) => {
    const matchesSearch = search.toLowerCase() === "" || org.org_name.toLowerCase().includes(search.toLowerCase());

    let matchesStatus;
    if (statusFilter === "Accredited0") {
      matchesStatus = org.application.application_status === "Accredited" && org.role === "student";
    } else if (statusFilter === "Revalidated") {
      matchesStatus = org.application.application_status === "Revalidated" && org.application_status === "Revalidated";
    } else if(statusFilter === "Revalidation"){
      matchesStatus = org.application_status === "Revalidation";
    } else if(statusFilter === "Accreditation"){
      matchesStatus = org.application_status === "Accreditation";
    } else {
      matchesStatus = statusFilter === "" || org.application.application_status === statusFilter;
    }

    return matchesSearch && matchesStatus;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFilteredItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  let pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredItems.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  

  return (
    <>
      <HeroVariant3
        h1Text="COSOA Dashboard"
        pText="See your organization analytics"
      />
      <Container>
        <Row className="mt-4 mb-3">
          <h1 className="Inter-b text-45px text-red mb-0">Overview</h1>
          <h3 className="Inter-normal text-lightblack text-25px my-0">Academic Year 2023-2024</h3>
        </Row>
        <Row className="my-4 d-flex justify-content-center">
          <Stat_Card
            imgSrc="/Dashboard/complete.png"
            numcount={countApproved}
            subtitle="Approved"
          />
          <Stat_Card
            imgSrc="/Dashboard/pending.png"
            numcount={countPending}
            subtitle="Pending"
          />
          <Stat_Card
            imgSrc="/Dashboard/all.png"
            numcount={countSubmission}
            subtitle="Submission"
          />
        </Row>
        <Row className="mt-5">
          <h1 className="text-red Inter-b text-45px">Accreditation and Revalidation Period</h1>
        </Row>
        <Row className="border mx-1 py-3">
        <Form className="w-100">
  <Row className='mx-3 mt-1'>
    <Col xs={6}>
      <Form.Label className="text-16px Inter-b mb-0">AnR Period</Form.Label>
      <Form.Text className="text-red Inter-normal text-14px remove-bold mt-0">
        {cosoa.application_period ? (
          <p>
            Student organizations and Student Representatives{' '}
            <span className="Inter-b">may now submit their applications.</span>
          </p>
        ) : (
          <p>
            PUP COSOA will{' '}
            <span className="Inter-b">not be accepting any applications anymore.</span>
          </p>
        )}
      </Form.Text>
    </Col>
    <Col xs={6}>
      <Form.Group className="float-end text-end mb-0">
        <Form.Check
          type="switch"
          id="anr-period-initial-toggle"
          checked={cosoa.application_period}
          onChange={(e) =>
            {handleToggle()}
          }
          style={{ backgroundColor: 'var(--red) !important', zoom:'1.5'}} // Set the color using the variable
        />
      </Form.Group>
    </Col>
  </Row>
</Form>
</Row>
<Row className="text-center my-4">
        <h2 className='Inter-b mb-0 text-red text-35px mt-3 '>Applicant Table</h2>
      </Row>
        <Row className="my-4 ">
        <InputGroup as={Col} className='text-start'>
        <Form.Select 
          aria-label="Select Status" 
          onChange={(e) => setStatusFilter(e.target.value)}
          value={statusFilter} 
        >
          <option value="">All Statuses</option>
          <option value="Accreditation">Accreditation</option>
          <option value="Accredited0">Need Credentials</option>
          <option value="Revalidation">Revalidation</option>
          <option value="Accredited">Accredited</option>
          <option value="Revalidated">Revalidated</option>
          {/* Add more status options as needed */}
        </Form.Select>
        </InputGroup>
          <InputGroup as={Col} className="text-end">
            <Button variant="outline-secondary" id="button-addon2">
              <i class="fa-solid fa-magnifying-glass"></i>
            </Button>
            <Form.Control
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </Row>
      </Container>
      <Container>
        <Table striped bordered hover className='text-center Inter-med text-14px' style={{verticalAlign:'middle'}}>
          <thead>
            <tr>
              <th><strong>Student Organizations</strong></th>
              <th style={{width:'21%'}}><strong>Representative</strong></th>
              <th><strong>Status</strong></th>
              <th style={{width:'16%'}}><strong>Classification</strong></th>
              <th><strong>Action</strong></th>
              <th style={{width:'15%'}}><strong>Credentials</strong></th>
            </tr>
          </thead>
          <tbody>
          {currentFilteredItems.length > 0 ? (
              currentFilteredItems.map((org, index) => (
      <tr key={index}>
        <td>{org.org_name}</td>
        <td>{org.representative}</td>
        <td>
          {/*
          {org.application?.application_status === "Revalidated" &&
          org.application_status === "Revalidation"
            ? "Revalidation"
          : org.application.application_status}*/}
          {org.application?.application_status === "Revalidated" &&
          org.application_status === "Revalidation" ? (
            <Badge
              pill
              className="px-3 Inter text-14px"
              bg=""
              style={{
                backgroundColor: 'var(--light-yellow)',
                color: 'var(--dark-yellow)'
              }}
            >
              {org.application.application_status}
            </Badge>
          ) : org.application?.application_status === "Accredited" ? (
            <Badge
              pill
              className="px-3 Inter text-14px"
              bg=""
              style={{
                backgroundColor: 'var(--light-green)',
                color: 'var(--green)'
              }}
            >
              {org.application.application_status}
            </Badge>
          ) : (
            <Badge
              pill
              className="px-3 Inter text-14px"
              bg=""
              style={{
                backgroundColor: 'var(--light-blue)',
                color: 'var(--blue)'
              }}
            >
              {org.application.application_status}
            </Badge>
          )}

        </td>
        <td>
          <span className="cs-dashboard-jurisdiction">
            {org.subjurisdiction}
            <br />
            {org.type}
          </span>
        </td>
        <td>
          <FontAwesomeIcon
            icon={faArrowUpRightFromSquare}
            size="lg"
            onClick={() => {
              navigate(`/cosoa/applicant/${org.id}`);
            }}
            cursor="pointer"
          />
        </td>
        <td>
          <GiveCredentials
            role={org.role}
            applicationStatus={org.application.application_status}
            orgId={org.id}
          />
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="6" style={noResultsStyle}>No results found</td>
    </tr>
  )}
          </tbody>
        </Table>
        <Pagination className="justify-content-center pagination-red mb-5">
          {pageNumbers.map((number) => (
            <Pagination.Item
              key={number}
              active={number === currentPage}
              onClick={() => handlePageChange(number)}
            >
              {number}
            </Pagination.Item>
          ))}
        </Pagination>
        {loading && <LoadingOverlay title={title} subtitle={subtitle} />}
        {showAlert && <NotificationAlert feature={feature} item={item} setShowAlert={setShowAlert}/>}
      </Container>
    </>
  );
}

const noResultsStyle = {
  textAlign: 'center',
  padding: '20px',
  fontSize: '1.2rem',
  color: 'grey',
  fontStyle: 'italic'
};

export default COSOA_Dashboard;

