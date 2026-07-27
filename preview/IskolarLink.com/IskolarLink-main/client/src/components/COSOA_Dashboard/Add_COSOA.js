import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, InputGroup, ListGroup } from 'react-bootstrap';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import LoadingOverlay from '../LoadingOverlay';


const Add_COSOA = ({setRefresh}) => {
    const [show, setShow] = useState(false);
    const [selectedPosition, setSelectedPosition] = useState(''); // State to manage selected position
    const [results, setResults] = useState([])
    const [email, setEmail] = useState('')
    const [student, setStudent] = useState({})
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');

    useEffect(() => {
        const fetchResults = async () => {
          try {
            if (email !== '') {
                axios.get(`${process.env.REACT_APP_BASE_URL}/cosoa_member/search_student/${email}`).then((response)=>{
                    console.log(response.data)
                    setResults(response.data)
                })
                
                
            }else{
                setResults([])
            }
          } catch (err) {
            console.log(err);
          }
        };
    
        // Debounce the search input
        const debounceTimeout = setTimeout(() => {
          fetchResults();
        }, 500); // Adjust the debounce timeout as needed (e.g., 500 milliseconds)
    
        // Clear timeout on unmount or when the search value changes
        return () => clearTimeout(debounceTimeout);
      }, [email]);


    const handleSearch = (e) => {
        setEmail(e.target.value)
        console.log(e.target.value)
    }

    const handleClose = () => {
        setShow(false);
        setEmail('');
        setStudent({});
        setResults([]);
        setSelectedPosition('')
    };

    const handleShow = () => setShow(true);

    const handlePositionChange = (positionId) => {
        setSelectedPosition(positionId);
        console.log(positionId)
    };

    const handleStudentClick = (selectedStudent) => {
        setStudent(selectedStudent)
        setEmail('')
    };

    const handleSubmit = async () => {
        if(window.confirm(`Please make sure that ${student.student?.student_Fname} ${student.student?.student_Lname} is a verified student before continuing. \n\nBy proceeding, you agree to add ${student.student?.student_Fname} ${student.student?.student_Lname} as a member of COSOA with the position of ${selectedPosition}. Continue?`) === true){
        setLoading(true);
        if (student && selectedPosition) {
            axios.post(`${process.env.REACT_APP_BASE_URL}/cosoa_member/create_cosoa_member`, {
                email: student.email,
                position: selectedPosition,
            })
            .then((res) => {
                if (res.status === 201) {
                    // Successful creation
                    setLoading(false);
                    alert('COSOA member created successfully.');
                    // Optionally, you can reset the student and selectedPosition states here
                    setStudent({});
                    setSelectedPosition('');
                    setEmail('')
                    setRefresh(true)
                    handleClose();
                } else {
                    // Handle other status codes here
                    setLoading(false);
                    if (res.status === 400) {
                        alert('Bad Request: ' + res.data.error);
                    } else if (res.status === 500) {
                        alert('Internal Server Error: ' + res.data.error);
                    } else {
                        alert('An error occurred while creating COSOA member.');
                    }
                }
            })
            .catch((error) => {
                // Handle network errors or other errors here
                alert('An error occurred while creating COSOA member.');
                console.error(error);
                setLoading(false);
            });
        } else {
            alert('Student/Position is missing!');
        }
    }
    };
    

    const positions = [
        'Chairperson (Asst.)',
        'Vice Chairperson',
        'Vice Chairperson (Asst.)',
        'Secretary-General',
        'Executive Director',
        'External Affairs',
        'Internal Affairs',
        'Document Management',
        'Internal Performance Evaluator',
        'Legal Affairs',
        'Social Media Management',
        'Application Evaluator'
    ];

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                + Add New COSOA Officer
            </Button>
            <Modal show={show} onHide={handleClose} centered backdrop="static" size='md'>
                <Modal.Header closeButton className="d-flex justify-content-center align-items-center mb-0 pb-0 mx-4">
                    <Modal.Title className="text-center mt-3" style={{ fontSize: '2em', width: '100%' }}>
                        Add New COSOA Officer
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='pt-4'>
                <Row>
                <Form.Label>PUP Webmail</Form.Label>
                
                <InputGroup className="text-end">
                <Button variant="outline-secondary" className="border-end-0 bg-white muted-border">
                <i className="fa-solid fa-magnifying-glass"></i>
                </Button>
                <Form.Control
                    placeholder="Search"
                    className="muted-border"
                    type="text"
                    onChange={handleSearch}
                    value={email}
                />
            </InputGroup>
            <ListGroup>
            {results.map((result, index) => (
                <ListGroup.Item key={index} className="d-flex align-items-center" onClick={() => handleStudentClick(result)}>
                    {result.profile_picture ? <img src={`${process.env.REACT_APP_BASE_URL}/images/${result.profile_picture}`} alt="Profile" className="mr-3" style={{ maxWidth: '50px', maxHeight: '50px', marginRight: '10px' }} /> :
                    <FontAwesomeIcon icon={faUser} style={{ fontSize: '40px', marginRight: '10px' }} />
                    }
                    <div className="d-flex flex-column">
                                        <div className="text-right mb-2">
                                            {result.email}
                                        </div>
                                        <div className="text-right">
                                            {result.student?.student_Fname} {result.student?.student_Lname}
                                        </div>
                    </div>
                </ListGroup.Item>
            ))}
                
            </ListGroup>

                </Row>
                <Row>
                    <div className="d-flex align-items-center my-3">
                    {student && student.email ? (
                        student.profile_picture ? (
                            <img
                                src={`${process.env.REACT_APP_BASE_URL}/images/${student.profile_picture}`}
                                alt="Profile"
                                className="mr-3"
                                style={{ maxWidth: '50px', maxHeight: '50px', marginRight: '10px' }}
                            />
                        ) : (
                            <FontAwesomeIcon icon={faUser} style={{ fontSize: '40px', marginRight: '10px' }} />
                        )
                        ) : null}
                        {student && student.email && (
                            <div className="d-flex flex-column">
                                <div className="text-right mb-2">{student.email}</div>
                                <div className="text-right">
                                    {student.student?.student_Fname} {student.student?.student_Lname}
                                </div>
                            </div>
                        )}
                        </div>
                    </Row>

                    <Form className='mt-3'>
                        <Form.Group>
                            <Form.Label>Choose position</Form.Label>
                            {positions.map((position, index) => (
                                <Form.Check className='mt-3' key={index}>
                                    <Row>
                                        <Col className='text-start'>
                                            <Form.Check.Label htmlFor={position.toLowerCase().replace(/\s/g, '-')}>
                                                {position}
                                            </Form.Check.Label>
                                        </Col>
                                        <Col className='text-end'>
                                            <Form.Check.Input
                                                type="radio"
                                                name="position"
                                                id={position}
                                                checked={selectedPosition === position}
                                                onChange={(e) => handlePositionChange(e.target.id)}
                                            />
                                        </Col>
                                    </Row>
                                </Form.Check>
                            ))}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className='border-0'>
                <Row className='w-100'>
                    <Col>
                    <Button variant='primary' className='w-100 mb-3' onClick={handleSubmit}>
                        Done
                    </Button>
                    <Button variant='light' className='w-100 border' onClick={handleClose}>
                        Cancel
                    </Button>
                    </Col>
                </Row>
                </Modal.Footer>
                {loading && <LoadingOverlay title={title} />}
            </Modal>
        </>
    );
};

export default Add_COSOA;
