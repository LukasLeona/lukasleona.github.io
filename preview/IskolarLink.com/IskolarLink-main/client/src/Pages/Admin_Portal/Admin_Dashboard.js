import React,{useState,useEffect} from 'react';
import { HeroVariant3 } from '../../components/HeroVariant/Hero';
import Stat_Card from '../../components/Stat_Card';
import { Container, Row, Col, Button, InputGroup, Form, Image} from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Table from 'react-bootstrap/Table'
import Dropdown from 'react-bootstrap/Dropdown'
import GiveFeedback from '../../components/Admin_Dashboard/GiveFeedback';
import './Admin_Portal.css'
import Add_Chairperson from '../../components/Admin_Dashboard/Add_Chairperson';
import Update_WebAdmin from '../../components/Admin_Dashboard/Update_WebAdmin';
import Pagination from 'react-bootstrap/Pagination';


function Admin_Dashboard() {

  const [studentCount, setStudentCount] = useState(0);
  const [toVerifyCount, setToVerifyCount] = useState(0);
  const [chairperson, setChairperson] = useState({});
  const [webAdmin,setWebAdmin] = useState({})
  const [students, setStudents] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/admin/count_students`).then((response) => {
      setStudentCount(response.data);
    });

    axios.get(`${process.env.REACT_APP_BASE_URL}/admin/count_students_to_verify`).then((response) => {
      setToVerifyCount(response.data);
    });

    axios.get(`${process.env.REACT_APP_BASE_URL}/admin/get_chairperson`).then((response) => {
      setChairperson(response.data);
    });

    axios.get(`${process.env.REACT_APP_BASE_URL}/admin/get_students`).then((response) => {
      setStudents(response.data);
    });

    axios.get(`${process.env.REACT_APP_BASE_URL}/admin/get_web_admin`).then((response)=> {
      setWebAdmin(response.data)
    })

    setRefresh(false);

  },[refresh])

  const filteredItems = students.filter((student)=>{
    let fullName = student.student_Fname.concat(" ", student.student_Lname)
    const matchesSearch = search.toLowerCase() === "" || fullName.toLowerCase().includes(search.toLowerCase());

    let matchesStatus;
    if(statusFilter==="Submitted COR"){
      matchesStatus = student.cor !== null && student.is_verified === false
    }else if(statusFilter === "Verified"){
      matchesStatus = student.is_verified === true
    }else if(statusFilter === "Not Verified"){
      matchesStatus = student.is_verified === false
    }
    else{
      matchesStatus = statusFilter === ""
    }

    return matchesSearch && matchesStatus;
  })

  const handleVerify = (studentId, cor) => {
    try{
      axios.post(`${process.env.REACT_APP_BASE_URL}/admin/verify_student`, {studentId: studentId, cor: cor})
      .then((response) => {
        if(response.data.success){
          alert(response.data.success);
          setRefresh(true);
        }else{
          alert(response.data.error);
        }
      });
    }catch(err){
      console.log(err);
    }
  };

  const handleNewSemester = async () => {
    const cont = window.confirm("Are you sure you want to start a new semester?")
    if(cont){
    await axios.post(`${process.env.REACT_APP_BASE_URL}/admin/start_semester`).then((res)=>{
      if(res.data.err){
        alert(res.data.err)
      }else{
        alert(res.data.success)
      }
    })
  }
  }

  const handleDrop = async (studentId) => {
    const cont = window.confirm("Are you sure you want to drop this student?")
    if(cont){
    await axios.post(`${process.env.REACT_APP_BASE_URL}/admin/drop_student`, {studentId: studentId}).then((res)=>{
      if(res.data.err){
        alert("Error dropping student. Please try again.")
      }else{
        alert("Student dropped successfully.")
      }
    })
  }
  }
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Adjust the number of items per page as needed
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFilteredItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredItems.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  
  }
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  return (
    <>
      <HeroVariant3
        h1Text="Admin Dashboard"
        pText="Check your users."
      />
      <Container>
      <Row className="mt-4 mb-3">
          <h1 className="Inter-b text-45px text-red mb-0">Overview</h1>
          <h3 className="Inter-normal text-lightblack text-25px my-0">Academic Year 2023-2024</h3>
        </Row>
        <Row className='my-5 d-flex justify-content-center'>
          <Stat_Card 
            imgSrc="/check_icon.png"
            numcount={studentCount}
            subtitle="Iskolars"
          />
          <Stat_Card
            imgSrc="/time_icon2.png"
            numcount={toVerifyCount}
            subtitle="To Verify"
          />
        </Row>
        <Row className='my-3'>
          <h1 className='text-red Inter-b text-35px mb-0'>Chairperson Management</h1>
        </Row>
        <Row className='mx-2 pt-3 px-3 border' style={{verticalAlign:'middle'}}>  
          <Col xs={1} className='text-end'>
            {chairperson.user?.profile_picture ? <Image src={`${process.env.REACT_APP_BASE_URL}/images/${chairperson.user.profile_picture}`} roundedCircle style={{width:"3rem"}}/> : <FontAwesomeIcon icon={faUserCircle} size="3x" className="text-red"/>}
          </Col>
          <Col className="ms-0">
            <p className=' mb-0'><strong>{chairperson.student?.student_Fname + " " + chairperson.student?.student_Lname}</strong></p>
            <p className='text-red'>{chairperson.user?.email}</p>
          </Col>
          <Col className='text-end mt-1'>
            <Add_Chairperson setRefresh={setRefresh}/>
          </Col>
        </Row>
        <Row className='my-3'>
          <h1 className='text-red Inter-b text-35px mb-0'>Admin Management</h1>
        </Row>
        <Row className='mx-2 pt-3 px-3 border' style={{verticalAlign:'middle'}}>  
          <Col xs={1} className='text-end'>
            {webAdmin.user?.profile_picture ? <Image src={`${process.env.REACT_APP_BASE_URL}/images/${webAdmin.user.profile_picture}`} roundedCircle style={{width:"3rem"}}/> : <FontAwesomeIcon icon={faUserCircle} size="3x" className="text-red"/>}
          </Col>
          <Col className="ms-0">
            <p className=' mb-0'><strong>{webAdmin.admin?.student_Fname + " " + webAdmin.admin?.student_Lname}</strong></p>
            <p className='text-red'>{webAdmin.user?.email}</p>
          </Col>
          <Col className='text-end mt-1'>
            <Update_WebAdmin setRefresh={setRefresh}/>
          </Col>
        </Row>
        <Row className='my-3'>
          <h1 className='text-red Inter-b text-35px mb-0'>Start a new semester</h1>
        </Row>
        <Row className='mx-2 py-4 px-3 border' style={{verticalAlign:'middle'}}>  
          <Col className='text-center Inter-med'>
            <Button variant='primary' onClick={handleNewSemester}>Start new semester</Button>
          </Col>
        </Row>
        
        <Row className='text-center mt-5'>
          <h1 className='text-red'>List of Iskolar Users</h1>
        </Row>
        <Row className='mx-3 mt-4'>
        <Col className='text-start'>
        <Form.Select 
          aria-label="Select Status" 
          onChange={(e) => setStatusFilter(e.target.value)}
          value={statusFilter} 
        >
          <option value="">All Students</option>
          <option value="Submitted COR">Submitted COR</option>
          <option value="Verified">Verified</option>
          <option value="Not Verified">Not Verified</option>
          {/* Add more status options as needed */}
        </Form.Select>
        </Col>
        <Col>
        </Col>
        <InputGroup as={Col} className="text-end">
          <Button variant="outline-secondary" id="button-addon2">
            <i className="fa-solid fa-magnifying-glass"></i>
          </Button>
          <Form.Control
            placeholder="Search"
            onChange={(e)=>setSearch(e.target.value)}
          />
        </InputGroup>
      </Row>
      <Row className='m-4'>
      <Table striped bordered hover className='text-center Inter-med text-14px' style={{verticalAlign:'middle'}}>
          <thead>
            <tr>
              <th><strong>Student Name</strong></th>
              <th><strong>Email</strong></th>
              <th><strong>COR</strong></th>
              <th><strong>Days</strong></th>
              <th><strong>Status</strong></th>
              <th><strong>Action</strong></th>
            </tr>
          </thead>
          <tbody>
            {currentFilteredItems.length > 0 ? (currentFilteredItems.map((student) => {
              return(
                <tr>
                  <td>{student.student_Fname + " " + student.student_Lname}</td>
                  <td>{student.user.email}</td>
                  <td>{student.cor ? (<span onClick={() => window.open(`${process.env.REACT_APP_BASE_URL}/${student.cor}`)} style={{color: "#007bff", cursor: "pointer"}}>View</span>) :(!student.cor && student.is_verified) ? "Already Verified": "N/A"}</td>
                  <td>{student.days}</td>
                  <td>{student.is_verified ? "Verified" : "Not Verified"}</td>
                  <td>{!student.is_verified && !student.cor_remarks ? <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                      Action
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => {handleVerify(student.id, student.cor)}}>Verify</Dropdown.Item>
                      <GiveFeedback studentId={student.id} cor={student.cor}/>
                      <Dropdown.Item onClick={() => {handleDrop(student.id, student.cor)}}>Drop</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown> : student.is_verified ? "Verified for this Semester": "Feedback Given"}</td>
                </tr>
              )
            })): (
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

      </Row>
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


export default Admin_Dashboard;
