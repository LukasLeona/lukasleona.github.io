import React from 'react';
import { Button, Row, Container } from 'react-bootstrap';
import '../general.css';
import DocumentCard from '../DocumentCard';
import {useNavigate} from 'react-router-dom'

const Section4 = () => {

  const navigate = useNavigate()
  const type1Data = {
    title: 'Accreditation Application',
    subtitle: 'To accredit an organization, you first need to be:',
    list_req: [
      'Registered Student',
      'Verified Student Account',
    ],
    userType: 'student',
    documents: [
      {
        imageSrc: `${process.env.REACT_APP_BASE_URL}/accreditation-image/AD001-CERTIFICATE OF RECOGNITION.jpg`,
        caption: 'AD001-CERTIFICATE OF RECOGNITION',
      },
      {
        imageSrc: `${process.env.REACT_APP_BASE_URL}/accreditation-image/AD002-OFFICIAL LIST.jpg`, 
        caption: 'AD002-OFFICIAL LIST',
      },
      {
        imageSrc: `${process.env.REACT_APP_BASE_URL}/accreditation-image/AD003-OFFICERS PROFILE.jpg`, 
        caption: 'AD003-OFFICERS PROFILE',
      },
      {
        imageSrc: `${process.env.REACT_APP_BASE_URL}/accreditation-image/AD004-LETTER OF CONCURRENCE.jpg`, 
        caption: 'AD004-LETTER OF CONCURRENCE',
      },
      {
        imageSrc: `${process.env.REACT_APP_BASE_URL}/accreditation-image/AD004X-LETTER OF CONCURRENCE-SUB.jpg`, 
        caption: 'AD004X-LETTER OF CONCURRENCE-SUB',
      },
      {
        imageSrc: `${process.env.REACT_APP_BASE_URL}/accreditation-image/AD005-CBL 101.jpg`, 
        caption: 'AD005-CBL 101',
      },
      {
        imageSrc: `${process.env.REACT_APP_BASE_URL}/accreditation-image/AD006-GPOA.jpg`, 
        caption: 'AD006-GPOA',
      },
      {
        imageSrc: `${process.env.REACT_APP_BASE_URL}/accreditation-image/AD007-ADVOCACY PLAN.jpg`, 
        caption: 'AD007-ADVOCACY PLAN',
      },
      {
        imageSrc: `${process.env.REACT_APP_BASE_URL}/accreditation-image/AD009-WAIVER OF RESPONSIBILITY.jpg`, 
        caption: 'AD009-WAIVER OF RESPONSIBILITY',
      },
      {
        imageSrc: `${process.env.REACT_APP_BASE_URL}/accreditation-image/AF001-TRACKER FORM.jpg`, 
        caption: 'AF001-TRACKER FORM',
      },
    ],
  };

  const type2Data = {
    title: 'Revalidation Application',
    subtitle: 'To revalidate an organization, you first need to be:',
    list_req: ['Accredited Organization'],
    userType: 'organization',
    documents: [
      {
        imageSrc: `${process.env.REACT_APP_BASE_URL}/revalidation-image/RD001-CERTIFICATE OF RECOGNITION.jpg`,
        caption: 'RD001-CERTIFICATE OF RECOGNITION',
      },
      {
        imageSrc: `${process.env.REACT_APP_BASE_URL}/revalidation-image/RD002-OFFICIAL LIST.jpg`,
        caption: 'RD002-OFFICIAL LIST',
      },
      {
        imageSrc: `${process.env.REACT_APP_BASE_URL}/revalidation-image/RD003-OFFICERS' PROFILE.jpg`,
        caption: 'RD003-OFFICERS\' PROFILE',
      },
      {
        imageSrc: `${process.env.REACT_APP_BASE_URL}/revalidation-image/RD004-LETTER OF CONCURRENCE.jpg`,
        caption: 'RD004-LETTER OF CONCURRENCE',
      },
      {
        imageSrc: `${process.env.REACT_APP_BASE_URL}/revalidation-image/RD004X-LETTER OF CONCURRENCE-SUB.jpg`,
        caption: 'RD004X-LETTER OF CONCURRENCE-SUB',
      },
      {
        imageSrc: `${process.env.REACT_APP_BASE_URL}/revalidation-image/RD005-CBL-TABLE-OF-AMENDMENTS.jpg`,
        caption: 'RD005-CBL-TABLE-OF-AMENDMENTS',
      },
      {
        imageSrc: `${process.env.REACT_APP_BASE_URL}/revalidation-image/RD006-GPOA.jpg`,
        caption: 'RD006-GPOA',
      },
      {
        imageSrc: `${process.env.REACT_APP_BASE_URL}/revalidation-image/RD007-ADVOCACY PLAN.jpg`,
        caption: 'RD007-ADVOCACY PLAN',
      },
      {
        imageSrc: `${process.env.REACT_APP_BASE_URL}/revalidation-image/RD008-ACCOMPLISHMENT-REPORT.jpg`,
        caption: 'RD008-ACCOMPLISHMENT-REPORT',
      },
      {
        imageSrc: `${process.env.REACT_APP_BASE_URL}/revalidation-image/RD008X-ACCOMPLISHMENT-REPORT-SUBSTITUTE.jpg`,
        caption: 'RD008X-ACCOMPLISHMENT-REPORT-SUBSTITUTE',
      },
      {
        imageSrc: `${process.env.REACT_APP_BASE_URL}/revalidation-image/RD010-TURNOVER-OF-ASSETS-AND-FUNDS.jpg`,
        caption: 'RD010-TURNOVER-OF-ASSETS-AND-FUNDS',
      },
      {
        imageSrc: `${process.env.REACT_APP_BASE_URL}/revalidation-image/RD011-WAIVER OF RESPONSIBILITY.jpg`,
        caption: 'RD011-WAIVER OF RESPONSIBILITY',
      },
      {
        imageSrc: `${process.env.REACT_APP_BASE_URL}/revalidation-image/RF001-TRACKER FORM.jpg`,
        caption: 'RF001-TRACKER FORM',
      },
    ],
  };

  return (
    <div className="bg-red text-white">
      <div className="p-4">
        <Row className="text-center mt-4">
          <h1 className="text-45px Inter-b ">Application Documents</h1>
          <p className="text-16px Inter-normal">Here is a brief overview of the Accreditation and Revalidation Requirements.</p>
        </Row>
      </div>

      <Container className="d-flex justify-content-around">
        <DocumentCard {...type1Data}/>
        <DocumentCard {...type2Data} />
      </Container>

      <Container className="text-center p-5">
      <Button variant="secondary" className="text-15px Inter" style={{ minWidth: '45vh', padding: '0.75rem 1.125rem', }} onClick={() => navigate('/appdocs')}>  Learn More</Button>    
      </Container>
    </div>
  );
};

export default Section4;
