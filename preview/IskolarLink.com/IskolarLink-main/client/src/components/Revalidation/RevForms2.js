import {React, useState, useEffect} from 'react'
import './RevFinish.css';
import { Form, ToggleButton, Row, Image, Col, Button, Container} from 'react-bootstrap'
import ESig from '../ESig';
const RevForms2 = ({formData, setFormData,show,path,path2, updateValidty, refresh, setRefresh}) => {

    useEffect(()=>{
        setRefresh(false)
        const valid = formData.RF001 && formData.RD013 && formData.privacyPolicy === true;
        updateValidty(valid)
    },[formData.RF001, formData.RD013, formData.privacyPolicy, refresh])

    const [checked, setChecked] = useState(false);
  return (
    <>
    <form style={{display:show}}>
    <Container>
    <Image src="/3rd.png" alt="IskolarLink Logo"  fluid style={{ marginBottom: '20px' }}/>    
    <ESig/>
        <Row className="p-4">
        <Form.Group as={Row} controlId='RF001' className="mb-3">
            <Form.Label>Upload RF001 - Signed Tracker Form <span className='accreditation-download' onClick={() => window.open(`${process.env.REACT_APP_BASE_URL}/${path}`,'_blank','noopener')}  style={{ cursor: 'pointer', textDecoration:'underline', color:'blue' }}>(Download Generated File Here)</span></Form.Label>
            <Form.Control type="file" placeholder='e.g. RF001.pdf' onChange={(e) => setFormData({...formData, RF001: e.target.files[0]})}/>
        </Form.Group>
        <Form.Group as={Row} controlId='RD013' className="mb-3">
            <Form.Label>Upload RD013 - Signed Waver Form <span className='accreditation-download' onClick={() => window.open(`${process.env.REACT_APP_BASE_URL}/${path2}`,'_blank','noopener')} style={{ cursor: 'pointer', textDecoration:'underline', color:'blue' }}>(Download Generated File Here)</span></Form.Label>
            <Form.Control type="file" placeholder='e.g. RD011.pdf' onChange={(e) => setFormData({...formData, RD013: e.target.files[0]})}/>
        </Form.Group>
        <Form.Group>
        <Form.Check
            type="checkbox"
            id="privacy-policy-toggle"
            variant="outline-primary"
            className="custom-checkbox"
            value="1"
            label={
            <>
                I agree to the <span className='accreditation-download'>Privacy Policy</span>
            </>
            }
            checked={formData.privacyPolicy}
            onChange={(e) => setFormData({...formData, privacyPolicy: e.target.checked})}
        />
        </Form.Group>
        </Row>
    </Container>
    </form>
    </>
  )
}

export default RevForms2
