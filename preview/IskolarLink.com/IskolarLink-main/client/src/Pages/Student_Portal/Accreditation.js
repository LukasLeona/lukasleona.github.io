import React, {useState,useEffect} from 'react'
import GenInfo from '../../components/Accreditation/GenInfo'
import AccForms1 from '../../components/Accreditation/AccForms1'
import AccForms2 from '../../components/Accreditation/AccForms2'
import AccFinish from '../../components/Accreditation/AccFinish'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Student_Profile.css';
import { HeroVariant } from '../../components/HeroVariant/Hero';
import { Container, Row, Col, Button, Alert, Spinner } from 'react-bootstrap';
import {accreditationSchema} from '../../Validations/AccreditationValidation'
import ConfirmationDialog from '../../components/Accreditation/ConfirmationDialog'
import { useAccreditationStatus } from '../../helpers/AccreditationStatusContext'
import LoadingOverlay from '../../components/LoadingOverlay'
import WarningAlert from '../../components/Alerts/WarningAlert-Submit'

function Accreditation() {
    const [page, setPage] = useState(0);
    const [formData, setFormData] = useState({
        orgName: '',
        jurisdiction: '',
        subjurisdiction: '',
        orgType: '',
        advisers: '',
        AD001: '',
        AD002: '',
        AD003: '',
        AD004: '',
        AD005: '',
        AD006: '',
        AD007: '',
        AD008: '',
        AD009: '',
        AF001: '',
        privacyPolicy: false,
    });

    const FormTitles = [ ]
    const [show1, setShow1] = useState('none');
    const [show2, setShow2] = useState('none');
    const [show3, setShow3] = useState('none');
    const [show4, setShow4] = useState('none');
    const [trackerForm, setTrackerForm] = useState('');
    const [waiverForm, setWaiverForm] = useState('');
    const [confirmation, setConfirmation] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const { setAccreditationStatus } = useAccreditationStatus();
    const [loading, setLoading] = useState(false);
    const [isCurrentPartValid, setIsCurrentPartValid] = useState(false);
    const [refresh1,setRefresh1] = useState(false)
    const [refresh2,setRefresh2] = useState(false)
    const [refresh3,setRefresh3] = useState(false)

    const updateValidity = (isValid) => {
        setIsCurrentPartValid(isValid);
    };


    const generatePDF = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_BASE_URL}/appdocs/generate_AF001_temp`, formData).then((res) => {
                setTrackerForm(res.data.filename);});

            await axios.post(`${process.env.REACT_APP_BASE_URL}/appdocs/generate_AD009_temp`, formData).then((res) => {
                setWaiverForm(res.data.filename);});
                
        } catch (err) {
            console.log(err);
        }
    }

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/student/accreditation_status`).then((response) => {
            if(response.data.error){
                alert(response.data.error);
            }
            else{
                if(response.data.status === true){
                    alert("You have already submitted an application. You will be redirected to the Accreditation Status Page.");
                    navigate('/accreditation/status');
                }  
            }
        });
    },[]);


    useEffect(() => {
        if(page === 0){
            setShow1('block');
            setRefresh1(true)
            setShow2('none');
            setShow3('none');
            setShow4('none');
        } else if(page === 1){
            setShow1('none');
            setRefresh2(true)
            setShow2('block');
            setShow3('none');
            setShow4('none');
        } else if(page === 2){
            setShow1('none');
            setShow2('none');
            setRefresh3(true)
            setShow3('block');
            setShow4('none');
        } else if(page === 3){
            setShow1('none');
            setShow2('none');
            setShow3('none');
            setShow4('block');
        }
    }, [page])

    useEffect(() => {
        if(confirmation){
            submitData();
            setConfirmation(false);
        }else{
            return;
        }
    }, [confirmation])

    const submitData = async () => {
        setLoading(true)
        try {
            const isValid = await accreditationSchema.isValid(formData);
            console.log(isValid)
            if(isValid){
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/org/addorg`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            if(res.data.error){
                alert(res.data.error);
            }
            setAccreditationStatus(true)
            navigate(`/accreditation/status`);
        } else {
            console.log('invalid');
            setShowAlert(true);
        }
        
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false)
        }
    }

    const showAlertPopup = () => {
        if(showAlert){
            return(
                <Alert variant='danger' onClose={() => setShowAlert(false)} dismissible>
                    <Alert.Heading>You have incomplete fields!</Alert.Heading>
                    <p>Please click the "Prev" button and check what fields you haven't filled yet.</p>
                </Alert>
            );
        }
    }
    

  return (
    <>
    <div>
      <HeroVariant
        h1Text="Accreditation Form"
        pText="Fill up our Accreditation Form Page to kickstart your journey towards official recognition and support for your student organization.  "
      />
      <Container className='my-5'>
        <Row>
          <Col className="text-center">
            <h2>Complete the form below </h2>
            <p className='text-gray2'> Fill out the form to join our vibrant community and kick-start your journey to<br/> engagement and growth. Let's get you connected!</p>
          </Col>
        </Row>
      </Container>
    </div>

    <div className="form-container">
        <div className="form-header">
            <h1 className="form-title">{FormTitles[page]}</h1>
        </div>
        <div className="form-body">
        
        <GenInfo formData={formData} setFormData={setFormData} show={show1} updateValidty={updateValidity} refresh={refresh1} setRefresh={setRefresh1}/>
        <AccForms1 formData={formData} setFormData={setFormData} show={show2} refresh={refresh2} setRefresh={setRefresh2} updateValidty={updateValidity}/>
        <AccForms2 formData={formData} setFormData={setFormData} show={show3} path={trackerForm} path2={waiverForm} refresh={refresh3} setRefresh={setRefresh3} updateValidty={updateValidity}/>
        <AccFinish show={show4}/>
        {showAlert && showAlertPopup()}
        </div>
        <Container>
        <div className="d-flex justify-content-center form-footer">
            <button 
            hidden={page === 0}
            onClick={() => {
                setPage((currPage) => currPage - 1);}}
            className="custom-button2 margin-right"
            >
                {`< Prev`}
            </button>
            {page == 3? <WarningAlert feature="submit" item="application" confirmation={confirmation} setConfirmation={setConfirmation}/> :
            <button
            disabled={!isCurrentPartValid}
            onClick={() => {
                    if(page === 0){generatePDF()}
                    setPage((currPage) => currPage + 1);
                    updateValidity(false)
                }
            }
            className="custom-button margin-right"
            
            >
               Next &#8594;
            </button>
            }
        </div>
        </Container>
        

    </div>
    {loading && (
                <LoadingOverlay 
                    title="Submitting Application..." 
                    subtitle="You will be redirected to the Accreditation Status page if submission is a success." 
                />
            )}
    
    </>
  )
}




export default Accreditation
