import React, { useState } from 'react';
import { HeroVariant5 } from '../components/HeroVariant/Hero';
import { Table, Container, Nav, Row, Tab } from 'react-bootstrap';
import './AppDocs.css';
import { ContactBanner1 } from '../components/ContactBanner';
import { saveAs } from 'file-saver';

function AppDocs() {
  const [activeKey, setActiveKey] = useState('reval');
  let backend_url = process.env.BACKEND_URL;
  const downloadAF001 = () => {
    saveAs(`${process.env.REACT_APP_BASE_URL}/accreditation/${'AF001-TRACKER FORM.docx'}`, 'AF001-TRACKER FORM.docx');
  }

  const downloadAD001 = () => {
    saveAs(`${process.env.REACT_APP_BASE_URL}/accreditation/${'AD001-CERTIFICATE OF RECOGNITION.docx'}`, 'AD001-CERTIFICATE OF RECOGNITION.docx');
  }

  const downloadAD002 = () => {
    saveAs(`${process.env.REACT_APP_BASE_URL}/accreditation/${'AD002-OFFICIAL LIST.docx'}`, 'AD002-OFFICIAL LIST OF OFFICERS AND ADVISERS.docx');
  }

  const downloadAD003 = () => {
    saveAs(`${process.env.REACT_APP_BASE_URL}/accreditation/${'AD003-OFFICERS\' PROFILE.docx'}`, 'AD003-OFFICERS PROFILE.docx');
  }

  const downloadAD004 = () => {
    saveAs(`${process.env.REACT_APP_BASE_URL}/accreditation/${'AD004-LETTER OF CONCURRENCE.docx'}`, 'AD004-ADVIER LETTER OF CONCURRENCE.docx');
  }

  const downloadAD005 = () => {
    saveAs(`${process.env.REACT_APP_BASE_URL}/accreditation/${'AD005-CBL 101.docx'}`, 'AD005-CONSTITUTION AND BYLAWS.docx');
  }

  const downloadAD006 = () => {
    saveAs(`${process.env.REACT_APP_BASE_URL}/accreditation/${'AD006-GPOA.docx'}`, 'AD006-GENERAL PLAN OF ACTIVITIES.docx');
  }

  const downloadAD007 = () => {
    saveAs(`${process.env.REACT_APP_BASE_URL}/accreditation/${'AD007-ADVOCACY PLAN.docx'}`, 'AD007-ADVOCACY PLAN.docx');
  }

  const downloadAD009 = () => {
    saveAs(`${process.env.REACT_APP_BASE_URL}/accreditation/${'AD009-WAIVER OF RESPONSIBILITY.docx'}`, 'AD009-WAIVER OF RESPONSIBILITY.docx');
  }

  const downloadRF001 = () => {
    saveAs(`${process.env.REACT_APP_BASE_URL}/revalidation/${'RF001-TRACKER FORM.docx'}`, 'RF001-TRACKER FORM.docx');
  }

  const downloadRD001 = () => {
    saveAs(`${process.env.REACT_APP_BASE_URL}/revalidation/${'RD001-CERTIFICATE OF RECOGNITION.docx'}`, 'RD001-CERTIFICATE OF RECOGNITION.docx');
  }

  const downloadRD002 = () => {
    saveAs(`${process.env.REACT_APP_BASE_URL}/revalidation/${'RD002-OFFICIAL LIST.docx'}`, 'RD002-OFFICIAL LIST OF OFFICERS AND ADVISERS.docx');
  }

  const downloadRD003 = () => {
    saveAs(`${process.env.REACT_APP_BASE_URL}/revalidation/${'RD003-OFFICERS\' PROFILE.docx'}`, 'RD003-OFFICERS PROFILE.docx');
  }

  const downloadRD004 = () => {
    saveAs(`${process.env.REACT_APP_BASE_URL}/revalidation/${'RD004-LETTER OF CONCURRENCE.docx'}`, 'RD004-ADVIER LETTER OF CONCURRENCE.docx');
  }

  const downloadRD005 = () => {
    saveAs(`${process.env.REACT_APP_BASE_URL}/revalidation/${'RD005-CBL-TABLE-OF-AMENDMENTS.docx'}`, 'RD005-CONSTITUTION AND BYLAWS.docx');
  }

  const downloadRD006 = () => {
    saveAs(`${process.env.REACT_APP_BASE_URL}/revalidation/${'RD006-GPOA.docx'}`, 'RD006-GENERAL PLAN OF ACTIVITIES.docx');
  }

  const downloadRD007 = () => {
    saveAs(`${process.env.REACT_APP_BASE_URL}/revalidation/${'RD007-ADVOCACY PLAN.docx'}`, 'RD007-ADVOCACY PLAN.docx');
  }

  const downloadRD008 = () => {
    saveAs(`${process.env.REACT_APP_BASE_URL}/revalidation/${'RD008-ACCOMPLISHMENT REPORT.docx'}`, 'RD009-ACCOMPLISHMENT REPORT.docx');
  }

  const downloadRD010 = () => {
    saveAs(`${process.env.REACT_APP_BASE_URL}/revalidation/${'RD010-TURNOVER-OF-ASSETS-AND-FUNDS.docx'}`, 'RD010-FINANCIAL STATEMENTS.docx');
  }

  const downloadRD011 = () => {
    saveAs(`${process.env.REACT_APP_BASE_URL}/revalidation/${'RD011-WAIVER OF RESPONSIBILITY.docx'}`, 'RD011-CERTIFICATE OF CLEARANCE.docx');
  }


  return (
    <div>
      <HeroVariant5 
        h1Text="Application Documents"
        pText="Find all the essential forms and resources you need to start your journey towards accreditation or other important processes."
      />
      <Container className="text-center">
        <Row className='m-5'>
          <h2>Requirements</h2>
          <p>Please ensure that you carefully follow the instructions provided with each document to streamline the application process. We look forward to having you as an integral part of our campus community and wish you every success in your endeavors.</p>
        </Row>
        <Row className="m-5 px-5">
          <Tab.Container defaultActiveKey="reval">
            <Nav variant="pills" fill className=' margin-left-20 px-5 rounded-3 align-items-center d-flex'>
              <Nav.Item className='border-top border-bottom border-start rounded-start-3 border-primary  p-1'>
                <Nav.Link
                  eventKey="accredit"
                  className={activeKey === 'accredit' ? 'bg-red' : 'text-gray2'}
                  onClick={() => setActiveKey('accredit')}
                >
                  <div className="hover-text">
                  Accreditation
                  </div>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className='border-top border-bottom border-end rounded-end-3 border-primary p-1'>
                <Nav.Link
                  eventKey="reval"
                  className={activeKey === 'reval' ? 'bg-red' : 'text-gray2'}
                  onClick={() => setActiveKey('reval')}
                >
                  <div className="hover-text">
                  Revalidation
                  </div>
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content className="my-5 align-items-center">
              <Tab.Pane eventKey="accredit">
                <Table responsive bordered >
                  <thead>
                    <tr>
                    <th className='text-red Inter-b'><strong>Requirement</strong></th>
                      <th className='text-red Inter-b'><strong>Code</strong></th>
                      <th className='text-red Inter-b'><strong>File Source</strong></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>Tracker Form</th>
                      <th>AF001</th>
                      <th><a href="#" onClick={downloadAF001}>Download</a></th>
                    </tr>
                    <tr>
                      <th>Certificate of Recognition from Central/Local Student Council</th>
                      <th>AD001</th>
                      <th><a href="#" onClick={downloadAD001}>Download</a></th>
                    </tr>
                    <tr>
                      <th>Official List of Officers and Adviser(s) with signatures over printed names, and list of members <i>(at least 15 members including the officers/executives)</i></th>
                      <th>AD002</th>
                      <th><a href="#" onClick={downloadAD002}>Download</a></th>
                    </tr>
                    <tr>
                      <th>Officers' Profile with 1st Semester Certificate of Registration <i>*alternatives, e.g., Confirmation Slip/Certificate of Enrollment</i></th>
                      <th>AD003</th>
                      <th><a href="#" onClick={downloadAD003}>Download</a></th>
                    </tr>
                    <tr>
                      <th>Adviser(s)'s Letter of Concurrence with scanned copy of their University-issued ID</th>
                      <th>AD004</th>
                      <th><a href="#" onClick={downloadAD004}>Download</a></th>
                    </tr>
                    <tr>
                      <th>Student Organization's Constitution and Bylaws (CBL)</th>
                      <th>AD005</th>
                      <th><a href="#" onClick={downloadAD005}>Download</a></th>
                    </tr>
                    <tr>
                      <th>General Plan of Activities with Budgetary Outlay</th>
                      <th>AD006</th>
                      <th><a href="#" onClick={downloadAD006}>Download</a></th>
                    </tr>
                    <tr>
                      <th>Advocacy Plan</th>
                      <th>AD007</th>
                      <th><a href="#" onClick={downloadAD007}>Download</a></th>
                    </tr>
                    <tr>
                      <th>Certificate of Clearance from PUP Student Council Commission on Audit (PUP SC COA)</th>
                      <th>AD008</th>
                      <th><a >No Template</a></th>
                    </tr>
                    <tr>
                      <th>Waiver of Responsibility</th>
                      <th>AD009</th>
                      <th><a href="#" onClick={downloadAD009}>Download</a></th>
                    </tr>
                  </tbody>
                </Table>  
              </Tab.Pane>
              <Tab.Pane eventKey="reval">
              <Table responsive bordered>
                  <thead>
                    <tr>
                      <th className='text-red Inter-b'><strong>Requirement</strong></th>
                      <th className='text-red Inter-b'><strong>Code</strong></th>
                      <th className='text-red Inter-b'><strong>File Source</strong></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>Tracker Form</th>
                      <th>RF001</th>
                      <th><a href="#" onClick={downloadRF001}>Download</a></th>
                    </tr>
                    <tr>
                      <th>Certificate of Recognition from Central/Local Student Council</th>
                      <th>RD001</th>
                      <th><a href="#" onClick={downloadRD001}>Download</a></th>
                    </tr>
                    <tr>
                      <th>Scanned Copy of the Latest Certificate of Accreditation/Revalidation</th>
                      <th>RD002</th>
                      <th><a>No Template</a></th>
                    </tr>
                    <tr>
                      <th>Official List of Officers and Adviser(s) with signatures over printed names, and list of members</th>
                      <th>RD003</th>
                      <th><a href="#" onClick={downloadRD002}>Download</a></th>
                    </tr>
                    <tr>
                      <th>Officers' Profile with 1st Semester Certificate of Registration <i>*alternatives, e.g., Confirmation Slip/Certificate of Enrollment</i></th>
                      <th>RD004</th>
                      <th><a href="#" onClick={downloadRD003}>Download</a></th>
                    </tr>
                    <tr>
                      <th>Adviser(s)'s Letter of Concurrence with scanned copy of their University-issued ID</th>
                      <th>RD005</th>
                      <th><a href="#" onClick={downloadRD004}>Download</a></th>
                    </tr>
                    <tr>
                      <th>Student Organization's Constitution and Bylaws (CBL)</th>
                      <th>RD006</th>
                      <th><a href="#" onClick={downloadRD005}>Download</a></th>
                    </tr>
                    <tr>
                      <th>General Plan of Activities with Budgetary Outlay</th>
                      <th>RD007</th>
                      <th><a href="#" onClick={downloadRD006}>Download</a></th>
                    </tr>
                    <tr>
                      <th>Advocacy Plan</th>
                      <th>RD008</th>
                      <th><a href="#" onClick={downloadRD007}>Download</a></th>
                    </tr>
                    <tr>
                      <th>Accomplishment Report</th>
                      <th>RD009</th>
                      <th><a href="#" onClick={downloadRD008}>Download</a></th>
                    </tr>
                    <tr>
                      <th>Financial Statements</th>
                      <th>RD010</th>
                      <th><a href="#">Download</a></th>
                    </tr>
                    <tr>
                      <th>Certificate of Clearance from PUP Student Council Commission on Audit (PUP SC COA)</th>
                      <th>RD011</th>
                      <th><a>No Template</a></th>
                    </tr>
                    <tr>
                      <th>Turnover of Assets and Funds</th>
                      <th>RD012</th>
                      <th><a href="#" onClick={downloadRD010}>Download</a></th>
                    </tr>
                    <tr>
                      <th>Waiver of Responsibility</th>
                      <th>RD013</th>
                      <th><a href="#" onClick={downloadRD011}>Download</a></th>
                    </tr>
                  </tbody>
                </Table> 
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Row>
      </Container>
    </div>
  )
}

export default AppDocs;