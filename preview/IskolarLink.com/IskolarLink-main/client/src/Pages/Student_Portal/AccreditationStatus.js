import React, {useEffect, useState, useRef } from 'react'
import axios from 'axios';
import './AccreditationStatus.css';
import { Container, Row, Col, Table, Button, Image, Form, Dropdown} from 'react-bootstrap';
import { HeroVariant } from '../../components/HeroVariant/Hero';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import LoadingOverlay from '../../components/LoadingOverlay';
 
function AccreditationStatus() {

    const [org, setOrg] = useState([]);
    const [org_app, setOrgApp] = useState([]);
    const [advisers, setAdvisers] = useState([]);
    const [requirements, setRequirements] = useState([]);
    const [selectedFile, setSelectedFile] = useState('');
    const [selectedRequirementId, setSelectedRequirementId] = useState('');
    const [adviserString, setAdviserString] = useState('')
    const [loading, setLoading] = useState(false)

    const hiddenFileInput = useRef(null);
    const handleClick = (event, requirement_name, requirement_id) => {
        setSelectedFile(requirement_name);
        setSelectedRequirementId(requirement_id);
        hiddenFileInput.current.click();
      };

    const handleChange = async event => {
    try{
        await axios.post(`${process.env.REACT_APP_BASE_URL}/student/update_form/${org.id}/${selectedRequirementId}`, {file: event.target.files[0], requirement_name: selectedFile}, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
        }).then((res) => {
        if(res.data.error){
            alert(res.data.error);
        }else{
            alert('Successfully updated form');
            window.location.reload('false');
        }
        });
    }
    catch(err){
    console.log(err);
    }
    };

    const Forms = [ 'Certificate of Recognition', 'Official List', 'Officer\'s Profile', 'Letter of Concurrence', 'Letter of Concurrence-Sub', 'CBL 101', 'GPOA', 'Advocacy Plan', 'Waiver of Responsibility', 'Tracker Form']

    useEffect(() => {
        setLoading(true)
        try{
        axios.get(`${process.env.REACT_APP_BASE_URL}/student/org_application_status`).then((response) => {
            console.log(response.data);
            setOrg(response.data.org);
            setOrgApp(response.data.org_app);
            setRequirements(response.data.requirements);
            setAdvisers(response.data.advisers);
        })
    } catch (err){
            console.log(err)
        } finally {
            setLoading(false)
        }
    }, []);

    useEffect(()=>{
        const string = advisers.map(adviser => adviser.adviser_name).join(', ');
        setAdviserString(string)
    },[advisers])

    const DateConverter = (date) => {
        const newDate = new Date(date);
        return newDate.toDateString();
    }

    // A function that will push the Form names to the Requirements array
    useEffect(() => {
        pushNames();
    }, [requirements]);
    const pushNames = () => {
        for(let i = 0; i < requirements.length; i++){
            requirements[i].form_name = Forms[i];
        }
        console.log(requirements)
    }
  return (
    <>
    <HeroVariant
        h1Text="Accreditation Status"
        pText="Check your application."
      />
    <Container className='mt-4'>
      <Row>
            <Col>
                <Row>
                    {org.org_name?.length > 30 ? 
                    <h2 className='text-red mb-0 text-wrap'>{org.org_name}</h2> : <h2 className='text-red mb-0'>{org.org_name}</h2>}
                </Row>
            </Col>
            <Col className='d-flex align-items-center justify-content-end'>
                <Button variant='secondary' className='px-5'>
                    Pending
                </Button> {/* Change pendin to statuses */}
            </Col>
      </Row>
    </Container>
    <Container className="mt-3">
        <Row>
            <Form.Group>
                <Form.Label>Classification of Jurisdiction</Form.Label>
                <Form.Control type="text" value={org.jurisdiction} 
                readOnly></Form.Control>
            </Form.Group>
        </Row>
        <Row className='mt-2'>
            <Col>
            <Form.Group >
                <Form.Label>Nature / Type of Student Organization</Form.Label>
                <Form.Control type="text" value={org.type} 
                readOnly></Form.Control>
            </Form.Group>
            </Col>
            <Col>
            <Form.Group>
                <Form.Label>Sub-classification of  Jurisdiction</Form.Label>
                <Form.Control type="text" value={org.subjurisdiction} 
                readOnly></Form.Control>
            </Form.Group>
            </Col>
        </Row>
        <Row className='mt-2'>
            <Col>
            <Form.Group>
                <Form.Label>Complete Name of Student Organization’s Adviser(s)</Form.Label>
                <Form.Control type="text" value={adviserString} 
                readOnly></Form.Control>
            </Form.Group>
            </Col>
            <Col>
            <Form.Group>
                <Form.Label>PUP Webmail</Form.Label>
                <Form.Control type="email" value={org.email} 
                readOnly></Form.Control>
            </Form.Group>
            </Col>
        </Row>
    </Container>
    <Container className='text-center mt-4'>
        <Row>
        <Col></Col>
        <Col xs={5}>
        <h1 className='text-red mt-3 '>Application Status</h1>
        <p className='mb-4'>Check out your application status and remarks (if there are any)!</p>
        </Col>
        <Col></Col>
        </Row>
    </Container>
    <Container>
    <div className='ac-bottom-container mb-5'> 
            <Table striped bordered hover className='text-center Inter-med text-14px'>
                <thead className='text-center'>
                    <tr>
                        <th className='add-bold'>Form Code</th>
                        <th className='add-bold'>Form Name</th>
                        <th className='add-bold'>Resubmission</th>
                        <th className='add-bold'>Remarks</th>
                    </tr>
                </thead>
                <tbody>
                    {requirements.map((requirement) => {
                        return (
                            <tr >
                                <td>{requirement.requirement_name}</td>
                                <td>{requirement.form_name}</td>
                                <td>{requirement.remarks}</td>
                                <td>{requirement.status === 'Approved' ? <Button variant='primary' disabled>Approved</Button>
                                : requirement.status === 'Revision' ? <><Button variant="secondary" onClick={event => handleClick(event, requirement.requirement_name, requirement.id)}>Resubmit</Button> <input type="file" style={{display:'none'}} onChange={handleChange} ref={hiddenFileInput}/> </>
                                : <Button variant='primary' disabled style={{ backgroundColor: 'var(--disabled-gray)', color: 'white', borderColor: 'var(--disabled-gray)' }} className='m-2'>None</Button>}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        {/* {</Container> */}
        </div>
        {loading && (
                <LoadingOverlay 
                    title="Loading Organization Data..." 
                    subtitle=""
                />
            )}
    </Container>
 
    </>
  )
}

export default AccreditationStatus
