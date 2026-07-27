import {React, useContext, useEffect, useState} from 'react'
import { } from 'react-bootstrap'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCog, faHome ,  faSignOutAlt, faExchangeAlt} from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../helpers/AuthContent'
import { useNavigate } from 'react-router-dom'
import {Offcanvas, Row, Col, Image, Nav, ListGroup, NavDropdown } from 'react-bootstrap';
import './general.css';

const CosoaMenu = ({imgSrc, username}) => {

    const {auth, menu} = useContext(AuthContext);
    const [showSidebar, setShowSidebar] = useState(false);
    const {authState, setAuthState} = auth;
    const {activeMenu, setActiveMenu} = menu;

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const changeMainMenu = () => {
        setActiveMenu('main');
        axios.post(`${process.env.REACT_APP_BASE_URL}/menu/`, {menu: 'main'})
      }
    
      const changeCosoaMenu = () => {
        setActiveMenu('cosoa');
        axios.post(`${process.env.REACT_APP_BASE_URL}/menu/`, {menu: 'cosoa'})
      }
    
      const changeWebAdminMenu = () => {
        setActiveMenu('webadmin');
        axios.post(`${process.env.REACT_APP_BASE_URL}/menu/`, {menu: 'webadmin'})
      }

      const switchStudent = (e) => {
        e.preventDefault();
        setActiveMenu('main');
        changeMainMenu();
        navigate('/');
    };

    useEffect(() => {
        changeCosoaMenu();
    },[]);

    return(
    <NavDropdown title={<>{imgSrc ? <img src={`${process.env.REACT_APP_BASE_URL}/images/${imgSrc}`} alt="Profile Picture" width="40" height="40" className="rounded-circle" /> : <FontAwesomeIcon icon={faUser}/>} <span className='text-dark'>Hi, {username}!</span></>} id="basic-nav-dropdown" className="text-dark" renderMenuOnMount={true}>
        <NavDropdown.Item onClick={()=>navigate('/cosoa/home')}>Home</NavDropdown.Item>
        <NavDropdown.Item onClick={()=>navigate('/cosoa/dashboard')}>Dashboard</NavDropdown.Item>
        <NavDropdown.Item onClick={()=>navigate('/cosoa/members')}>Members</NavDropdown.Item>
        <NavDropdown.Item onClick={switchStudent}>Switch to Student</NavDropdown.Item>
        <NavDropdown.Item onClick={()=>navigate('/cosoa/settings')}>Settings</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={() => {
            axios.post(`${process.env.REACT_APP_BASE_URL}/auth/logout`)
            .then((response) => {
                if(response.data.error){
                    alert(response.data.error);
                }
                else{
                    // set authState.status to false
                    setAuthState({...authState, status: false});
                    setActiveMenu('main');
                    navigate('/');
                }
            });
        }}>Log Out</NavDropdown.Item>
    </NavDropdown>
)}




const CosoaMenu1 = ({ imgSrc, username, webmail }) => {
    const [showSidebar, setShowSidebar] = useState(false);
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
  
    const { auth, menu } = useContext(AuthContext);
    const { authState, setAuthState } = auth;
    const {activeMenu, setActiveMenu} = menu;
  
    const changeCosoaMenu = () => {
        setActiveMenu('cosoa');
        axios.post(`${process.env.REACT_APP_BASE_URL}/menu/`, {menu: 'cosoa'})
      }

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

useEffect(() => {
    changeCosoaMenu();
},[]);
  
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
              <ListGroup variant="flush" >
                  <ListGroup.Item 
                style={isPathActive('/cosoa/home') ? activeItemStyle : navItemStyles}
                onClick={() => navigate('/cosoa/home')}>
                  <FontAwesomeIcon icon={faHome} size="lg" className="me-2" />
                      <p className='m-0'>Home</p>
                  </ListGroup.Item>
                  <ListGroup.Item 
                style={isPathActive('/cosoa/dashboard') ? activeItemStyle : navItemStyles}
                onClick={() => navigate('/cosoa/dashboard')}>
                      <FontAwesomeIcon icon="fa-solid fa-chart-line" size="lg" className="me-2"  />
                      Dashboard
                  </ListGroup.Item>
                  <ListGroup.Item 
                style={isPathActive('/cosoa/pageaccesibility') ? activeItemStyle : navItemStyles}
                onClick={() => navigate('/cosoa/pageaccesibility')}>
                      <FontAwesomeIcon icon="fa-solid fa-users"  size="lg" className="me-2"  />
                      Page Accessibility
                  </ListGroup.Item>
                  <ListGroup.Item 
                  style={{navItemStyles}}  
                  onClick={switchStudent}>
                      <FontAwesomeIcon icon={faExchangeAlt} size="lg" className="me-2"  />
                      Switch to Student
                  </ListGroup.Item>
  
                  <div style={bottomDivStyles} >
                  <ListGroup.Item className="no-border nav-item-hover" 
                style={isPathActive('/whoarewe') ? activeItemStyle : navItemStyles}
                onClick={() => navigate('/whoarewe')}>
                      <FontAwesomeIcon icon='"fas fa-user-secret' size="lg" className="me-2" />
                      Who are we
                  </ListGroup.Item>
                  <ListGroup.Item className="no-border" 
                style={isPathActive('/cosoa/settings') ? activeItemStyle : navItemStyles}
                onClick={() => navigate('/cosoa/settings')}>
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
 
export default CosoaMenu1;
export {CosoaMenu};
