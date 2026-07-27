import React, { useCallback,  useEffect,  useState, useRef } from 'react';
import './Organization_Profile.css';
import { HeroVariant } from '../../components/HeroVariant/Hero';
import { Container, Row, Col, Form, Button, InputGroup, Image } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa';


function OrgSettings() {

    const [org, setOrg] = useState({});
    const [user, setUser] = useState({});
    const [socials, setSocials] = useState({});
    const fileInputRef = useRef(null);

    const handleContainerClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

    
    useEffect(() => {
        try{
            axios.get(`${process.env.REACT_APP_BASE_URL}/org_portal/organization`)
            .then((response) => {
                setOrg(response.data.organization);
                setUser(response.data.user);
                console.log(response.data.user)
                if(response.data.socials){
                setSocials(response.data.socials);
                }
            });
        }catch(err){
            console.log(err);
        }
        }, []);

    const handleSubmit = () => {
      // try catch set headers to multipart/form-data
      try{
        let formData = {};
        formData.profile_picture = user.profile_picture;
        formData.mission = org.mission;
        formData.vision = org.vision;
        formData.membership_period = org.membership_period;
        formData.strict = org.strict;
        formData.currentPassword = user.currentPassword;
        formData.newPassword = user.newPassword;
        formData.facebook = socials.facebook;
        formData.twitter = socials.twitter;
        formData.linkedin = socials.linkedin;
        formData.instagram = socials.instagram;
        formData.description = user.description;
        console.log(formData)
        axios.post(`${process.env.REACT_APP_BASE_URL}/org_portal/organization/settings`,
            formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {
            if(response.data.err){
                alert(response.data.err);
            }else{
                alert(response.data.success)
            }
            //clear formData
            formData = {};
        });
        setHasUnsavedChanges(false);
      }catch(err){
        console.log(err);
      }
    }

    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);


    const handleInputChange = (e) => {
      const { name, value } = e.target;
    
      // Function to handle input changes and set unsaved changes flag
      // Example for handling changes in organization name input
      setOrg({ ...org, [name]: value });
      setHasUnsavedChanges(true);
    };
    
  
    useEffect(() => {
      // Add event listener for beforeunload
      const handleBeforeUnload = (event) => {
        if (hasUnsavedChanges) {
          event.preventDefault();
          event.returnValue = ''; // For older browsers
          return 'You have unsaved changes. Are you sure you want to leave?';
        }
      };
  
      window.addEventListener('beforeunload', handleBeforeUnload);
  
      return () => {
        // Cleanup: remove event listener when component unmounts
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }, [hasUnsavedChanges]);

    
  return (
    <div>
      <HeroVariant
        h1Text="Settings"
        pText="Update your profile credentials."
      />
      <Container className='my-5 text-lightblack'>
      <h2 className='Inter-b text-25px mb-0'>Organization Profile</h2>
      <p className='Inter-noraml text-14px text-gray2 mt-0'>Organization information is an uneditable section.</p>
      <hr className='mt-4 mb-3'/>
      <Form className='Inter-med text-14px'>
      <Row>
        <Form.Group>
          <Form.Label>
          Name of Organization (Abbreviation/Initialism)
          </Form.Label>
          <Form.Control
          type="text" 
          defaultValue={org.org_name} 
          placeholder={org.org_name}
          disabled
          readOnly
          className='Inter-normal text-16px'
          />
        </Form.Group>
      </Row>
      <Row className='mt-2'>
        <Form.Group>
          <Form.Label>
          Classification of Jurisdiction
          </Form.Label>
          <Form.Control
          type="text"
          defaultValue={org.jurisdiction} 
          placeholder={org.jurisdiction}
          disabled
          readOnly
          className='Inter-normal text-16px'
          />
        </Form.Group>
      </Row>          
        <Row className='mt-2'>
          <Col>
            <Form.Group>
              <Form.Label>
              Nature / Type of Student Organization
              </Form.Label>
              <Form.Control
              type="text"
              defaultValue={org.type} 
              placeholder={org.type}
              onChange={(e) => setOrg({ ...org, org_name: e.target.value })}
              disabled
              readOnly
              className='Inter-normal text-16px'
              />
            </Form.Group>
          </Col>
          <Col>
          <Form.Group>
              <Form.Label>
              Sub-classification of Jurisdiction
              </Form.Label>
              <Form.Control
              type="text"
              defaultValue={org.subjurisdiction} 
              placeholder={org.subjurisdiction}
              onChange={(e) => setOrg({ ...org, org_name: e.target.value })}
              disabled
              readOnly
              className='Inter-normal text-16px'
              />
            </Form.Group>
          </Col>
        </Row>
        {/*<Row className='mt-2'>
          <Form.Group>
            <Form.Label>
              Complete Name of Student Organization's Adviser(s)
            </Form.Label>
            <Form.Control
            type="text" 
            defaultValue={user.org_name} 
            placeholder={user.org_name}
            onChange={(e) => setOrg({ ...org, org_name: e.target.value })}
            disabled
            readOnly
            className='Inter-normal text-16px'
            />
          </Form.Group>
  </Row>*/}
        
        <Row className='mt-4'>
          <Col xs={1}>
          {user.profile_picture ? (
      <Image
        src={`${process.env.REACT_APP_BASE_URL}/org_images/${user.profile_picture}`}
        className="logo"
        style={{
          width: '100px',
          height: '100px',
          maxWidth: '100px',
          maxHeight: '100px',
          borderRadius: '50%',
          display: 'block',
        }}
        alt="Profile Picture"
      />
    ) : (
      <FaUserCircle size={100} className="logo" /> // Render a default icon or text when no profile picture is available
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
              onChange={(e) => {setUser({ ...user, profile_picture: e.target.files[0]});
              setHasUnsavedChanges(true);
              }}
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
          <Form.Group as={Row} md={12}>
            <Form.Label className="Inter-med text-14px text-lightblack mt-2 mb-0">Your Description</Form.Label>
            <Form.Control
            as="textarea"
            maxLength="600"
            value={user.description}
            onChange={(e) => {
              setUser({ ...user, description: e.target.value });
              setHasUnsavedChanges(true);
            }}
            placeholder="Hi! Tell us something about your organization..."
            className='mt-0 Inter-normal text-16px mb-0'
            style={{ width: '98%', margin: '10px' }}
            rows={8}
            />
            <Form.Text className='text-muted'>
             {`${user.description ? user.description.length : 0} / 600 characters left`}
            </Form.Text>
          </Form.Group>
        <div className='mt-4'>
          <h2 className='Inter-b mb-0 text-25px'>Password</h2>
          <p className='Inter-normal text-14px text-gray2 mt-0'>Change your Password.</p>
          <hr className='mt-4 mb-3'/>
        <Row>
          <Col md={6}>
            <Form.Group className="text-lightblack Inter-med text-14px">
            <Form.Label>Current Password</Form.Label>
            <Form.Control
              type="password"
               placeholder='Enter current password'
              value={user.currentPassword}
              onChange={(e) => {
              setUser({ ...user, currentPassword: e.target.value });
              setHasUnsavedChanges(true);
              }}
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
                value={user.newPassword}
                onChange={(e) => {
                setUser({ ...user, newPassword: e.target.value });
                setHasUnsavedChanges(true);
                }}
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
                <Form.Label>Social Link 1</Form.Label>
                <InputGroup>
                <InputGroup.Text><FaFacebookF /></InputGroup.Text>
                <Form.Control 
                  type="url" 
                  placeholder="Profile link/url..." 
                  value={socials.facebook}
                  onChange={(e) => setSocials({ ...socials, facebook: e.target.value })}
                  className='Inter-regular text-16px'
                />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Social Link 2</Form.Label>
                <InputGroup>
                <InputGroup.Text><FaTwitter /></InputGroup.Text>
                <Form.Control 
                  type="url" 
                  placeholder="Profile link/url..." 
                  value={socials.twitter}
                  onChange={(e) => setSocials({ ...socials, twitter: e.target.value })}
                  className='Inter-regular text-16px'
                />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={6} className='mb-4'>
              <Form.Group className="mb-3">
                <Form.Label>Social Link 3</Form.Label>
                <InputGroup>
                <InputGroup.Text><FaLinkedinIn /></InputGroup.Text>
                <Form.Control 
                type="url" 
                placeholder="Profile link/url..." 
                value={socials.linkedin}
                onChange={(e) => setSocials({...socials, linkedin: e.target.value})}
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
                value={socials.instagram}
                onChange={(e) => setSocials({ ...socials, instagram: e.target.value })}
                className='Inter-regular text-16px'
                />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
        <Row>
          <Col className="text-end mb-4 mt-2">
            <Button variant="secondary" onClick={handleSubmit} className='mx-3 px-4'>Save Changes</Button>
          </Col>
        </Row>
        </Form>

        </Container>

    </div>

  )
}


export default OrgSettings;