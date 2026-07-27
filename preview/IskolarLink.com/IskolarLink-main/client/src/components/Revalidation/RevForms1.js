import React, {useState,useEffect} from 'react'
import { Form, Row, Col, Image, Container } from 'react-bootstrap'
import './RevFinish.css';
import ESig from '../ESig';

const RevForms1 = ({formData, setFormData, show, updateValidty, refresh, setRefresh}) => {

    useEffect(()=>{
        setRefresh(false)
        const valid = formData.RD001  && formData.RD002  && formData.RD003  && formData.RD004  && formData.RD005  && formData.RD006 && formData.RD007  && formData.RD008 && formData.RD009 && formData.RD010 && formData.RD011 && formData.RD012
        updateValidty(valid)
    },[refresh, formData.RD001, formData.RD002, formData.RD003, formData.RD004, formData.RD005, formData.RD006, formData.RD007, formData.RD008, formData.RD009, formData.RD010, formData.RD011, formData.RD012])

  return (
    <>
    <form style={{display:show}}>
    <Container>
    <Image src="/2nd.png" alt="IskolarLink Logo"  fluid style={{ marginBottom: '40px' }}/>  
    <ESig/>  
        <Row >
            <Row>
                <Col>  
                <Form.Group controlId='RD001' className="mb-3 form-group-spacing">
                    <Form.Label>Upload RD001 - Certificate of Recognition from Central/Local Student Council</Form.Label>
                    <Form.Control type="file" placeholder='e.g. RD001.pdf' onChange={(e) => setFormData({...formData, RD001: e.target.files[0]})}/>
                </Form.Group>
                 </Col>
                <Col>
                <Form.Group controlId='RD002' className="mb-3 form-group-spacing">
                <Form.Label>Upload RD002 - Scanned Copy of Latest Certificate of Accreditation/Revalidation</Form.Label>
                <Form.Control type="file" placeholder='e.g. RD002.pdf' onChange={(e) => setFormData({...formData, RD002: e.target.files[0]})}/>
                </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                <Form.Group controlId='RD003' className="mb-3 form-group-spacing">
                <Form.Label>Upload RD003 - Official List of Officers, Members, and Adviser(s)</Form.Label>
                <Form.Control type="file" placeholder='e.g. RD002.pdf' onChange={(e) => setFormData({...formData, RD003: e.target.files[0]})}/>
                </Form.Group>
                </Col>
                <Col>
                <Form.Group controlId='RD004' className="mb-3 form-group-spacing">
                <Form.Label>Upload RD004 - Officers' Profile with Proof of Enrollment</Form.Label>
                <Form.Control type="file" placeholder='e.g. RD003.pdf' onChange={(e) => setFormData({...formData, RD004: e.target.files[0]})}/>
                </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                <Form.Group controlId='RD005' className="mb-3 form-group-spacing">
                <Form.Label>Upload RD005 - Letter of Concurrence</Form.Label>
                <Form.Control type="file" placeholder='e.g. RD004.pdf' onChange={(e) => setFormData({...formData, RD005: e.target.files[0]})}/>
                </Form.Group>
                </Col>
                <Col>
                <Form.Group controlId='RD006' className="mb-3 form-group-spacing">
                <Form.Label>Upload RD006 - Constitution and Bylaws</Form.Label>
                <Form.Control type="file" placeholder='e.g. RD005.pdf' onChange={(e) => setFormData({...formData, RD006: e.target.files[0]})}/>
                 </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                <Form.Group controlId='RD007' className="mb-3 form-group-spacing">
                <Form.Label>Upload RD007 - General Plan of Action</Form.Label>
                <Form.Control type="file" placeholder='e.g. RD006.pdf' onChange={(e) => setFormData({...formData, RD007: e.target.files[0]})}/>
                </Form.Group>
                </Col>
                <Col>
                <Form.Group controlId='RD008' className="mb-3 form-group-spacing">
                <Form.Label>Upload RD008 - Advocacy Plan</Form.Label>
                <Form.Control type="file" placeholder='e.g. RD007.pdf' onChange={(e) => setFormData({...formData, RD008: e.target.files[0]})}/>
                </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                <Form.Group controlId='RD009' className="mb-3 form-group-spacing">
                <Form.Label>Upload RD009 - Accomplishment Report</Form.Label>
                <Form.Control type="file" placeholder='e.g. RD008.pdf' onChange={(e) => setFormData({...formData, RD009: e.target.files[0]})}/>
                </Form.Group>
                </Col>
                <Col>
                <Form.Group controlId='RD010' className="mb-3 form-group-spacing">
                <Form.Label>Upload RD010 - Financial Statements</Form.Label>
                <Form.Control type="file" placeholder='e.g. RD009.pdf' onChange={(e) => setFormData({...formData, RD010: e.target.files[0]})}/>
                </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                <Form.Group as={Row} controlId='RD011' className="mb-3 form-group-spacing">
                <Form.Label>Upload RD011 - Certificate of Clearance from PUP Student Council COA</Form.Label>
                <Form.Control type="file" placeholder='e.g. RD011.pdf' onChange={(e) => setFormData({...formData, RD011: e.target.files[0]})}/>
                </Form.Group>
                </Col>
                <Col>
                <Form.Group as={Row} controlId='RD012' className="mb-3 form-group-spacing">
                <Form.Label>Upload RD012 - Turnover of Assets and Funds</Form.Label>
                <Form.Control type="file" placeholder='e.g. RD010.pdf' onChange={(e) => setFormData({...formData, RD012: e.target.files[0]})}/>
            </Form.Group>
                </Col>
            </Row>

        <Col>
            
            
            
           
            
            
            
            
        </Col>
        <Col>
            
            
           
            
           
            
        </Col>
        </Row>
        </Container>
    </form>
    </>
  )
}

export default RevForms1
