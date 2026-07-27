import React, { useState, useEffect } from 'react';
import { HeroVariant } from '../../components/HeroVariant/Hero';
import Verification, {Verifying, VerifyFailed, Verified} from '../../components/Student Verification/Verification';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import LoadingOverlay from '../../components/LoadingOverlay';
import NotificationAlert from '../../components/Alerts/NotificationAlert';

function Verification_Page() {

  const [cor, setCOR] = useState(null);
  const [remarks, setRemarks] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    setLoading(true);
    try{
      axios.get(`${process.env.REACT_APP_BASE_URL}/student_portal/check_cor`).then(res => {
        console.log(res.data.process);
        if(res.data.process === 'pending'){
          setStatus('pending');
        }else if(res.data.process === 'returned'){
          setStatus('returned');
          setRemarks(res.data.remarks);
        }else if(res.data.process === 'verified'){
          setStatus('verified');
        }else if(res.data.process === 'not submitted'){
          setStatus('not submitted');
        }
      }).catch(err => {
        console.log(err);
      }).finally(() => {
        setLoading(false);
      });
    }catch(err){
      console.log(err);
    }finally{
      setLoading(false);
    }
  }, [cor, remarks]);
  return (
  <>
  <HeroVariant
  h1Text="Verification"
  pText="Verify your student status to access features! "
  />
  <Container className='my-5'>
    {status === 'not submitted' && <Verification/>}
    {status === 'pending' && <Verifying/>}
    {status === 'returned' && <VerifyFailed remarks={remarks}/>}
    {status === 'verified' && <Verified/>}
  </Container>
    {loading && <LoadingOverlay title={"Checking Verification..."}/>}
  </>
  )
}

export default Verification_Page;