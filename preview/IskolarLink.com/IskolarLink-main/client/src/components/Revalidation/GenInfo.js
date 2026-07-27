import React, {useState,useEffect} from 'react'
import {Col, Row, Form, Image, Container} from 'react-bootstrap';
import ESig
 from '../ESig';
const GenInfo = ({formData, setFormData, show,  updateValidty, refresh, setRefresh}) => {

    const [filteredDepartments, setFilteredDepartments] = useState([]);

    const orgTypes = [
        'Academic Organization',
        'Advocacy Organization',
        'Cultural/Arts/Dance Organization',
        'Fraternities and Sororities', 
        'Political Organization',
        'Religious Organization',
        'Scholars Organization' ,
        'Socio-civic Organization',
        'Special Interest Organization',
        'Sports Organization',
    ]

    const Departments = [
        `College of Accountancy and Finance | CAF`,
        `College of Architecture, Design, and Built Environment | CADBE`,
        `College of Arts and Letters | CAL`,
        `College of Business Administration | CBA`,
        `College of Communication | COC`,
        `College of Computer and Information Sciences | CCIS`,
        `College of Education | COED`,
        `College of Engineering | CE`,
        `College of Human Kinetics | CHK`,
        `College of Law | CL`,
        `College of Political Science and Public Administration | CPSPA`,
        `College of Social Sciences and Development | CSSD`,
        `College of Science | CS`,
        `College of Tourism, Hospitality, and Transportation Management | CTHTM`,
        `Institute of Technology | ITECH`,
        `Open University System | OUS`,
        `Graduate School | GS`,
        `Senior High School | SHS`,
        `University-Wide`
    ]

    useEffect(()=>{
        setRefresh(false)
        const valid = formData.socn !== '' && formData.orgName !== '' && formData.jurisdiction !== '' && formData.subjurisdiction !== '' && formData.orgType !== '' && formData.advisers !== ''
        updateValidty(valid)

        if (formData.jurisdiction === "University-Wide Student Organization") {
            setFilteredDepartments(["University-Wide"]);
        } else {
            setFilteredDepartments(Departments);
        }
    },[formData.socn, formData.orgName, formData.jurisdiction, formData.subjurisdiction, formData.orgType, formData.advisers, refresh])

  return (
    <>
        <form style={{display:show}} >
        <Container>
        <Image src="/1st.png" alt="IskolarLink Logo"  fluid style={{ marginBottom: '40px' }}/>
        <ESig/>
        <Row className='p-3'>
            <Form.Group as={Col} controlId="socn" className='mb-3'>
                <Form.Label>Previous SOCN</Form.Label>
                <Form.Control type="text" placeholder="e.g 2324-130-R-U-WIDE" onChange={(e) => setFormData({...formData, socn: e.target.value})} value={formData.socn} />
            </Form.Group>
            <Form.Group as={Col} controlId="orgName" className="mb-3">
                <Form.Label>Complete Name of Student Organization (Abbreviation/Initialisim)</Form.Label>
                <Form.Control type="text" placeholder="e.g. Association of Concerned Students (ACS)" onChange={(e) => setFormData({...formData, orgName: e.target.value})} value={formData.orgName}/>
            </Form.Group>
        </Row> 
        <Row className="p-3">
            
            
            <Form.Group as={Col} controlId="jurisdiction" className="mb-3">
                <Form.Label>Classification of Jurisdiction</Form.Label>
                <Form.Select aria-label='Jurisdiction' onChange={(e) => setFormData({...formData, jurisdiction: e.target.value})} value={formData.jurisdiction}>
                    <option>Choose...</option>
                    <option>Local Student Organization</option>
                    <option>University-Wide Student Organization</option>
                </Form.Select>
            </Form.Group>
             <Form.Group as={Col} controlId="subjurisdiction" className="mb-3">
                <Form.Label>Sub-Jurisdiction</Form.Label>
                <Form.Select aria-label='SubJurisdiction' onChange={(e) => setFormData({...formData, subjurisdiction: e.target.value})} value={formData.subjurisdiction}>
                    <option>Choose...</option>
                    {filteredDepartments.map((department) => (
                        <option key={department}>{department}</option>
                    ))}
                </Form.Select>
            </Form.Group>
        </Row>
        <Row className="p-3">
            <Form.Group as={Col} controlId="orgType" className="mb-3">
                <Form.Label>Nature/Type of Student Organization</Form.Label>
                <Form.Select aria-label='OrgType' onChange={(e) => setFormData({...formData, orgType: e.target.value})} value={formData.orgType}>
                    <option>Choose...</option>
                    {orgTypes.map((orgType) => (
                        <option>{orgType}</option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="advisers" className="mb-3">
                <Form.Label>Complete Name of Student Organization Adviser(s) (Separated by comma)</Form.Label>
                <Form.Control type="text" placeholder="e.g. Juan Dela Cruz, Pedro Penduko" onChange={(e) => setFormData({...formData, advisers: e.target.value})} value={formData.advisers}/>
            </Form.Group>
            
        </Row >
        </Container>
    </form>
    </>
  )
}
export default GenInfo
