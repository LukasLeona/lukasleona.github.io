import {React, useContext, useEffect, useState} from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCog, faSignOutAlt, faUserCircle} from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../helpers/AuthContent'
import { useNavigate } from 'react-router-dom'
import { Offcanvas, Row, Col, Image, Nav, ListGroup, NavDropdown } from 'react-bootstrap';
import { useAccreditationStatus } from '../helpers/AccreditationStatusContext'
import { useApplicationPeriod } from '../helpers/ApplicationPeriodContext'
import './general.css';

function OrgMenu({imgSrc, username, showApplication}) {

    const {auth, menu} = useContext(AuthContext);
    const {authState, setAuthState} = auth;
    const {activeMenu, setActiveMenu} = menu;

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    //use useEffect to set the ActiveMenu to org and the cookie to org
    useEffect(() => {
        if(authState.role === 'student'){
            setActiveMenu('main')
        }else{
        setActiveMenu('org');
        axios.post(`${process.env.REACT_APP_BASE_URL}/menu/`, {menu: 'org'})
        }
    }, [])


  return (
    <NavDropdown title={<>{imgSrc ? <img src={`${process.env.REACT_APP_BASE_URL}/org_images/${imgSrc}`} alt="Profile Picture" width="40" height="40" className="rounded-circle" /> : <FontAwesomeIcon icon={faUser}/>} <span className='text-dark'>Hi, {username}!</span></>} id="basic-nav-dropdown" className="text-dark" renderMenuOnMount={true}>
        <NavDropdown.Item onClick={()=>navigate('/organization/profile')}>Profile</NavDropdown.Item>
        <NavDropdown.Item onClick={() => navigate('/organization/members')}>Official Members</NavDropdown.Item>
        <NavDropdown.Item onClick={() => navigate('/organization/membership')}>Memberships</NavDropdown.Item>
        {showApplication === 0 ? null : showApplication === 1 ? <NavDropdown.Item onClick={() => navigate('/organization/revalidation')}>Revalidation</NavDropdown.Item> : <NavDropdown.Item onClick={() => navigate('/organization/revalidation/status')}>Revalidation Status</NavDropdown.Item>}
        <NavDropdown.Item onClick={() => navigate('/organization/settings')}>Settings</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={() => navigate('/organization/feedback')}>Feedback</NavDropdown.Item>
        <NavDropdown.Item onClick={() => {
            axios.post(`${process.env.REACT_APP_BASE_URL}/auth/logout`)
            .then((response) => {
                if(response.data.error){
                    alert(response.data.error);
                }
                else{
                    // set authState.status to false
                    setAuthState({...authState, status: false, role: ''});
                    //setAuthState({...authState, role: ''});
                    setActiveMenu('main');
                    navigate('/');
                }
            });
        }}>Log Out</NavDropdown.Item>
    </NavDropdown>
  )
}

const OrgMenu1 = ({ imgSrc, username, webmail, showApplication }) => {
    const [showSidebar, setShowSidebar] = useState(false);
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
  
    const { auth, menu } = useContext(AuthContext);
    const { authState, setAuthState } = auth;
    const {activeMenu, setActiveMenu} = menu;
  
    const { accreditationStatus } = useAccreditationStatus();
    const { period } = useApplicationPeriod();
  
    const changeMainMenu = () => {
      setActiveMenu('main');
      axios.post(`${process.env.REACT_APP_BASE_URL}/menu/`, {menu: 'main'})
    }

  const switchStudent = (e) => {
    e.preventDefault();
    setActiveMenu('main');
    changeMainMenu();
    navigate('/');
};
  
    const handleToggleSidebar = () => setShowSidebar(!showSidebar);
  
    const logoutUser = () => {
        axios.post(`${process.env.REACT_APP_BASE_URL}/auth/logout`)
            .then((response) => {
                if (response.data.error) {
                    alert(response.data.error);
                } else {
                    setAuthState({ ...authState, status: false });
                    navigate('/');
                }
            });
    };

    const renderRevalidationItem = () => {
        switch (showApplication) {
          case 1:
            return (
              <ListGroup.Item style={navItemStyles} onClick={() => navigate('/organization/revalidation')}>
                <FontAwesomeIcon icon="far fa-calendar-check" size="lg" className="me-2" />
                <p className='m-0'>Revalidation</p>
              </ListGroup.Item>
            );
          case 2: // I'm assuming 2 is your 'other' number here
            return (
              <ListGroup.Item style={navItemStyles} onClick={() => navigate('/organization/revalidation/status')}>
                <FontAwesomeIcon icon="fas fa-info-circle" size="lg" className="me-2" />
                <p className='m-0'>Revalidation Status</p>
              </ListGroup.Item>
            );
          default:
            return null;
        }
      };

      

      const sidebarStyles = {
        width: '360px',
        paddingTop: '10px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflowX: 'auto'
      };
    
      const navItemStyles = {
        color: 'black',
        padding: '10px 15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        border: 'none !important',
        cursor: 'pointer',
        
      };
    
      const bottomItemStyles = {
        ...navItemStyles,
        marginTop: 'auto', // pushes the logout to the bottom
      };
    
      const profileSummaryStyles = {
        ...navItemStyles,
        justifyContent: 'space-between', // aligns the arrow to the right
      };
    
      const bottomDivStyles = {
        marginTop: 'auto', // Remove marginTop to prevent additional space
        width: '100%', // Ensures the div takes the full width of the sidebar
        position: 'absolute', // Position the element absolutely within the sidebar
        bottom: '0', // Align the element to the bottom of the sidebar
        left: '0', // Position the element from the left edge
        right: '0', // Position the element from the right edge
        paddingLeft: '15px',
        outline: 'none !important',
        boxShadow: 'none !important',
        border: 'none !important',
      };
  
      
    const isPathActive = (path) => {
      return window.location.pathname === path;
    };
  
    const activeItemStyle = {
      backgroundColor: 'var(--light-red)',
      color: 'var(--red)',
      cursor: 'pointer',
      padding: '10px 15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      border: 'none !important',
    };
  

    return (
      <>
      <Nav.Item onClick={handleToggleSidebar} style={{ cursor: 'pointer' }}>
          {imgSrc ? (
              <img src={`${process.env.REACT_APP_BASE_URL}/images/${imgSrc}`} alt="Profile" width="40" height="40" className="rounded-circle" />
          ) : (
              <FontAwesomeIcon icon={faUser} size="lg" />
          )}
          <span className='text-white Inter-b ms-2'> Hi, {username}!</span>
      </Nav.Item>
  
      <Offcanvas show={showSidebar} onHide={handleToggleSidebar} placement='end' style={sidebarStyles}>
          <Offcanvas.Header closeButton>
   
          <Offcanvas.Title>    
          <Row className="align-items-center">
            <Col xs="auto"> {/* Auto width for the column based on content size */}
              <Image src='/favicon.ico' roundedCircle style={{ width: '35px', height: '35px' }} /> {/* Explicitly set size */}
            </Col>
            <Col> {/* Remaining space for the username */}
              <h5 className='mb-0'> {username}</h5>
            </Col>
          </Row>
        </Offcanvas.Title>
  
          </Offcanvas.Header>
          <Offcanvas.Body>
              <ListGroup variant="flush">
  
                  <ListGroup.Item 
                  style={isPathActive('/organization/profile') ? activeItemStyle : navItemStyles}
                  onClick={() => navigate('/organization/profile')}>
                  <FontAwesomeIcon icon={faUserCircle} size="lg" className="me-2" />
                      <p className='m-0'>Profile</p>
                  </ListGroup.Item>
                  <ListGroup.Item 
                  style={isPathActive('/organization/members') ? activeItemStyle : navItemStyles}
                  onClick={() => navigate('/organization/members')}>
                      <FontAwesomeIcon icon="fas fa-user-check" size="lg" className="me-2"  />
                      Official Members
                  </ListGroup.Item>
                  <ListGroup.Item 
                  style={isPathActive('/organization/membership') ? activeItemStyle : navItemStyles}
                  onClick={() => navigate('/organization/membership')}>
                      <FontAwesomeIcon icon="fa-solid fa-user-plus"  size="lg" className="me-2"  />
                      Memberships
                  </ListGroup.Item>
                  
                  {renderRevalidationItem()}
                
  
                  <div style={bottomDivStyles} >
                  <ListGroup.Item className="no-border nav-item-hover" 
                  style={isPathActive('/whoarewe') ? activeItemStyle : navItemStyles}
                  onClick={() => navigate('/whoarewe')}>
                      <FontAwesomeIcon icon='"fas fa-user-secret' size="lg" className="me-2" />
                      Who are we
                  </ListGroup.Item>
                  <ListGroup.Item className="no-border me-3" 
                  style={isPathActive('/organization/feedback') ? activeItemStyle : navItemStyles}
                  onClick={() => navigate('/organization/feedback')}>
                    <FontAwesomeIcon icon="fa-solid fa-comment" size="lg" className="me-2"  />
                    Feedback
                </ListGroup.Item>
                  <ListGroup.Item className="no-border" 
                  style={isPathActive('/organization/settings') ? activeItemStyle : navItemStyles}
                  onClick={() => navigate('/organization/settings')}>
                      <FontAwesomeIcon icon={faCog} size="lg" className="me-2" />
                      Settings
                  </ListGroup.Item>
                  <ListGroup.Item className="no-border me-3 mb-2" style={bottomItemStyles} onClick={logoutUser}>
                <FontAwesomeIcon icon={faSignOutAlt} className=" icon-no-background me-2" />
                Log Out
                </ListGroup.Item>
                 

              </div>
              </ListGroup>
          </Offcanvas.Body>
      </Offcanvas>
  </>
    );
  };
  
  
  

export default OrgMenu1
export {OrgMenu};
