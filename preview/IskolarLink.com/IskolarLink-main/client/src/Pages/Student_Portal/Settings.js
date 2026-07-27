import React, { useCallback,  useEffect,  useState, useRef } from 'react';
import './AccreditationStatus.css';
import { HeroVariant } from '../../components/HeroVariant/Hero';
import { Container, Row, Col, Form, Image, Button, InputGroup, FormControl } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Verification, { Verified, VerifyFailed, Verifying } from '../../components/Student Verification/Verification';
import axios from 'axios';
import LoadingOverlay from '../../components/LoadingOverlay';


function StudSettings() {
    const [profileImage, setProfileImage] = useState('');
    const [showTempImage, setShowTempImage] = useState(false);
    const [profile, setProfile] = useState({
      profile_picture: '',
      description: '',
      currentPassword: '',
      newPassword: '',
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: '',
      is_verified: false
    });
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  axios.defaults.withCredentials = true;

  const handleContainerClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };



  // Function to handle saving changes
  const handleSaveChanges = () => {
    try{
      console.log(profile)
      axios.post(`${process.env.REACT_APP_BASE_URL}/student_portal/update_profile`, profile, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        if(response.data.success){
          alert(response.data.success);
        }else{
          alert(response.data.error);
        }
      });
    }catch(err){
      console.log(err);
    }
  };

  const handleFileChange = (e) => {
    setProfile({...profile, profile_picture: e.target.files[0]});
    if(e.target.files[0])
    {
    setShowTempImage(true);
    setProfileImage(URL.createObjectURL(e.target.files[0]));
    }else{
      setShowTempImage(false);
      setProfileImage(null);
    }
  };


  useEffect(() => {
    try{
      setLoading(true);
      axios.get(`${process.env.REACT_APP_BASE_URL}/student_portal`).then((response) => {
        setProfile(response.data);
        console.log(response.data)
      });
    }catch(err){
      console.log(err);
    } finally {
      setLoading(false);
    }
  },[]);


  return (
    <div>
      <HeroVariant
        h1Text="Settings"
        pText="Update your profile credentials."
      />

      <Container className='my-5 text-lightblack'>
      <h1 className='Inter-b text-25px mb-0'>Personal info</h1>
      <h4 className='Inter-normal text-14px text-gray2 mt-0'>Update your photo and personal details here.</h4>
      <hr className='mt-4 mb-3'/>
      <Form>
            <div>
            <Row>
        <Col xs={1}>
        {showTempImage ? (
  <Image
    src={profileImage}
    alt="Logo"
    rounded
    fluid
    className='logo'
    style={{
      maxWidth: '100px',
      maxHeight: '100px',
      width: '100%',
      height: 'auto',
      borderRadius: '50%',
      display: 'block'
    }}
  />
) : profile.profile_picture ? (
  <Image
    src={`${process.env.REACT_APP_BASE_URL}/images/${profile.profile_picture}`}
    alt="Logo"
    roundedCircle
    fluid
    className='logo'
    style={{
      maxWidth: '100px',
      maxHeight: '100px',
      width: '100%',
      height: 'auto',
      borderRadius: '50%',
      display: 'block'
    }}
  />
) : (
  <FontAwesomeIcon
    icon={faUserCircle}
    size="1x"
    className="text-black logo"
    style={{
      maxWidth: '100px',
      maxHeight: '100px',
      width: '100%',
      height: 'auto',
      display: 'block'
    }}
  />
)}

            </Col>
          <Col className=' d-flex justify-content-center align-items-center'>
            <Container
              className='border text-center my-2 rounded-4'
              fluid
              onClick={handleContainerClick}
              style={{ cursor: 'pointer' }}
            >
      
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
                disabled={!profile.is_verified}
              />
            <Row className='justify-content-center'>
              <Image
                src="/uploadicon.png"
                style={{
                  maxWidth: '80px',
                  maxHeight: '80px',
                  width: '100%',
                  height: 'auto',
                  borderRadius: '50%',
                  display: 'block'
                }}
                alt="Upload Icon"
              />
            </Row>
            <Row className='mb-0 pb-0'>
              <p className='text-gray2 Inter-normal text-14px'>
                <strong className='Inter text-red'>Click to upload</strong> or drag and drop
                <br />SVG, PNG, or JPG (max. 800x400 px)
              </p>
            </Row>
          </Container>
        </Col>
        </Row>
                <Form.Group as={Row}  md={12}  controlId="formBio">
            <Form.Label className='Inter-med text-14px text-lightblack mt-2 mb-0'>Bio</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Hi! Tell us something about yourself..."
                style={{ width: '98%', margin: '10px' }}
                value={profile.description || ''}
                onChange={(e) => setProfile({...profile, description: e.target.value})}
                maxLength={600}
                disabled={!profile.is_verified}
                rows={8}
                className='mt-0 Inter-normal text-16px mb-0'
              />
              <Form.Text className="text-gray2 Inter-normal text-14px mt-0">
              {`${profile.description ? profile.description.length : 0}/600 characters left`}
              </Form.Text>
          </Form.Group>
          

          <div className='mt-4'>
            <h2 className='Inter-b mb-0 text-25px'>Password</h2>
            <p className="Inter-normal text-14px text-gray2 mt-0">You may change your password here.</p>
            <hr className='mt-4 mb-3'/>

            <Row>
              <Col md={6}>
                <Form.Group className="text-lightblack Inter-med text-14px">
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter current password"
                    value={profile.currentPassword || ''}
                    onChange={(e) => setProfile({...profile, currentPassword: e.target.value})}
                    className="Inter-normal text-16px"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="text-lightblack Inter-med text-14px">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter new password"
                    value={profile.newPassword || ''}
                    onChange={(e) => setProfile({...profile, newPassword: e.target.value})}
                    className="Inter-normal text-16px"
                 />
                </Form.Group>
              </Col>
            </Row>
            </div>

            <div className='mt-5 mb-3'>
            <h2 className='Inter-b text-25px mb-0'>Social Media Profile</h2>
            <p className="Inter-normal text-14px text-gray2 mt-0">Update your Social Media Links</p>
            <hr className='mt-4 mb-0'/>
            </div>
            <Row className='mt-0 pt-0 Inter-med text-14px'>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Facebook</Form.Label>
                <InputGroup>
                  <InputGroup.Text><FaFacebookF /></InputGroup.Text>
                  <Form.Control 
                    type="url" 
                    placeholder="Profile link/url..." 
                    value={profile.facebook || ''}
                    onChange={(e) => setProfile({...profile, facebook: e.target.value})}
                    disabled={!profile.is_verified}
                    className='Inter-regular text-16px'
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Twitter</Form.Label>
                <InputGroup>
                  <InputGroup.Text><FaTwitter /></InputGroup.Text>
                  <Form.Control 
                    type="url" 
                    placeholder="Profile link/url..." 
                    value={profile.twitter || ''}
                    onChange={(e) => setProfile({...profile, twitter: e.target.value})}
                    disabled={!profile.is_verified}
                    className='Inter-regular text-16px'
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            <Col md={6} className="mb-4">
              <Form.Group className="mb-3">
                <Form.Label>LinkedIn</Form.Label>
                <InputGroup>
                  <InputGroup.Text><FaLinkedinIn /></InputGroup.Text>
                  <Form.Control 
                    type="url" 
                    placeholder="Profile link/url..." 
                    value={profile.linkedin || ''} 
                    onChange={(e) => setProfile({...profile, linkedin: e.target.value})}
                    disabled={!profile.is_verified}
                    className='Inter-regular text-16px'
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Social Link 4</Form.Label>
                <InputGroup>
                  <InputGroup.Text><FaInstagram /></InputGroup.Text>
                  <Form.Control 
                    type="url" 
                    placeholder="Profile link/url..." 
                    value={profile.instagram || ''} 
                    onChange={(e) => setProfile({...profile, instagram: e.target.value})}
                    disabled={!profile.is_verified}
                    className='Inter-regular text-16px'
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
      
          <Row>
          
          <Col className="text-end mb-4 mt-2">
            <Button variant="secondary" onClick={handleSaveChanges} className='mx-3 px-4'>Save Changes</Button>
          </Col>
          </Row>
        </div>

      </Form>
    </Container>

    {loading && <LoadingOverlay title={"Loading details..."}/>}
    
    </div>

  )
}


export default StudSettings;