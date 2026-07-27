import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { Navbar, Container, Nav, Button, Row, Col, Modal, NavDropdown, Offcanvas, Image} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import COSOA from './Pages/COSOA';
import COSOA_Home from './Pages/COSOA_Portal/COSOA_Home';
import COSOA_Dashboard from './Pages/COSOA_Portal/COSOA_Dashboard';
import COSOA_Applicants from './Pages/COSOA_Portal/COSOA_Applicants';
import Applicant_Page from './components/COSOA_Dashboard/Applicant_Page';
import Organizations from './Pages/Organizations';
import AppDocs from './Pages/AppDocs';
import FAQs from './Pages/FAQs';
import LandingPage from './Pages/LandingPage';
import { useState, useEffect, useContext} from 'react';
import LoginPopup from './components/LoginPopup';
import RegisterPopup from './components/RegisterPopup';
import Organization_Profile from './Pages/Organization_Portal/Organization_Profile';
import Revalidation from './Pages/Organization_Portal/Revalidation';
import RevalidationStatus from './Pages/Organization_Portal/RevalidationStatus';
import OrgSettings from './Pages/Organization_Portal/Settings';
import OrgFeedback from './Pages/Organization_Portal/Feedback';
import StudentFeedback from './Pages/Student_Portal/Feedback';
import MainMenu1 from './components/mainMenu';
import MainMenu2 from './components/mainMenu';
import CosoaMenu from './components/cosoaMenu';
import WebAdminMenu from './components/webAdminMenu';
import { AuthContext } from './helpers/AuthContent';
import Accreditation from './Pages/Student_Portal/Accreditation';
import AccreditationStatus from './Pages/Student_Portal/AccreditationStatus';
import StudSettings from './Pages/Student_Portal/Settings';
import Org_Profile from './components/Org_Profile';
import Student_Profile from './Pages/Student_Portal/Student_Profile';
import OrgMenu from './components/orgMenu';
import { useNavigate } from 'react-router-dom';
import COSOASettings from './Pages/COSOA_Portal/COSOA_Settings';
import S_Membership from './Pages/Student_Portal/S_Membership';
import O_Membership from './Pages/Organization_Portal/O_Membership';
import Official_Members from './Pages/Organization_Portal/Official_Members';
import Admin_Dashboard from './Pages/Admin_Portal/Admin_Dashboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import COSOA_Accesibility from './Pages/COSOA_Portal/COSOA_Accesibility';
import User_Feedback from './Pages/Admin_Portal/User_Feedback';
import Terms from './Pages/Terms';
import { Link } from 'react-router-dom';
import { AccreditationStatusProvider } from './helpers/AccreditationStatusContext';
import WhoWeAre from './Pages/WhoWeAre';
import Verification from './Pages/Student_Portal/Verification_Page';
import ForgotPassword from './components/ForgotPassword';
import ResetPasswordPage from './components/ResetPasswordPage';

function App() {

  axios.defaults.withCredentials = true;

  const {auth, menu, handleMenuChange} = useContext(AuthContext);
  const {authState, setAuthState} = auth;
  const {activeMenu, setActiveMenu} = menu;


  useEffect(() => {
    document.title = 'Iskolar Link';
     axios.get(`${process.env.REACT_APP_BASE_URL}/auth/`)
    .then((response) => {
      if(response.data.error){
        setAuthState({...authState, status: false});
      }else if(response.data.role === 'student'){
        console.log(response.data)
        setAuthState({
          id: response.data.id,
          username: response.data.username,
          profile_picture: response.data.profile_picture,
          role: response.data.role,
          student_id: response.data.student_id,
          is_verified: response.data.is_verified,
          is_cosoa: response.data.is_cosoa,
          is_web_admin: response.data.is_web_admin,
          has_created: response.data.has_created,
          status: true
        });
      }else if(response.data.role === 'organization'){
        console.log(`You are logged in as ${response.data.role} ${response.data.username}`)
        setAuthState({
          id: response.data.id,
          username: response.data.username,
          profile_picture: response.data.profile_picture,
          role: response.data.role,
          show_application: response.data.show_application,
          status: true
        });
      }
    });
  }, [authState.status])


  useEffect(() => {
    if(authState.role === 'organization'){
      setActiveMenu('org');
      axios.post(`${process.env.REACT_APP_BASE_URL}`/menu, {menu: 'org'})}
      else{
        axios.get(`${process.env.REACT_APP_BASE_URL}/menu/`).then((response) => {
          if(response.data.error){
            console.log(response.data.error);
          }
          else{
            setActiveMenu(response.data.menu);
          }
        });
      }
    }, [authState.role])


    const [scrolling, setScrolling] = useState(false);
    const [initialScroll, setInitialScroll] = useState(true);
    const [scrollTimeout, setScrollTimeout] = useState(null);
    
    
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      setScrolling(scrolled);
  
      if (initialScroll && scrolled) {
        setInitialScroll(false);
      }
  
      /*
      if (scrolled) {
        setInitialScroll(false);
      } else {
        setInitialScroll(true);
      }
      */
  
      clearTimeout(scrollTimeout);
      const timeout = setTimeout(() => {
        setScrolling(false);
      }, 400);
  
      setScrollTimeout(timeout);
    };
  
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
        clearTimeout(scrollTimeout);
      };
    }, [initialScroll, scrollTimeout]);
  
   
    const navbarClass = initialScroll  ? 'fixed-top'  : scrolling  ? 'fixed-top glass-morphism transparent-navbar shadow'  : 'fixed-top glass-morphism transparent-navbar shadow';
  

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  return (
    <Router>
      
       
      <Navbar expand="lg" className={navbarClass}>
        <Container>
          <LinkContainer to="/">
          <Nav.Link>
          <Navbar.Brand className="Urbanist navbar-brand">
            <span className="text-white">Iskolar</span>
            <span className="text-white">Link</span>
          </Navbar.Brand>
          </Nav.Link>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto Inter p-3">
              <LinkContainer to="/cosoa">
              <Nav.Link href="#" className="text-white nav-link ms-4">
                PUP COSOA
              </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/organizations">
              <Nav.Link href="#" className="text-white nav-link ms-4">
                Accredited Organizations
              </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/appdocs">
              <Nav.Link href="#" className="text-white nav-link ms-4">
                Application Documents
              </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/faqs">
              <Nav.Link href="#" className="text-white nav-link ms-4">
                FAQs
              </Nav.Link>
              </LinkContainer>
            </Nav>

            <Nav className="ms-auto ">
            
            {authState.status ? (
              // menu depends on activeMenu which has three value (main, cosoa, webadmin)

              activeMenu === 'main' ? (
                <MainMenu2 imgSrc={authState.profile_picture} username={authState.username} />
              ) : activeMenu === 'cosoa' ? (
                <CosoaMenu imgSrc={authState.profile_picture} username={authState.username} />
              ) : activeMenu === 'webadmin' ? (
                <WebAdminMenu imgSrc={authState.profile_picture} username={authState.username} />
              ) : activeMenu === 'org' ? (
                <OrgMenu imgSrc={authState.profile_picture} username={authState.username} showApplication={authState.show_application} />
              ) : null
  
              ):(
                <>
                <RegisterPopup showRegister={showRegister} setShowRegister={setShowRegister} setShowLogin={setShowLogin}/>
                <LoginPopup showLogin={showLogin} setShowLogin={setShowLogin} setShowRegister={setShowRegister} setShowForgotPassword={setShowForgotPassword}/>

                <ForgotPassword showForgotPassword={showForgotPassword} setShowForgotPassword={setShowForgotPassword} setShowLogin={setShowLogin}/>
                </>
              )}
            
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/cosoa" exact element={<COSOA />} />
        <Route path="/cosoa/home" exact element={<COSOA_Home />} />
        <Route path="/cosoa/dashboard" exact element={<COSOA_Dashboard />} />
        <Route path="/cosoa/applicant" exact element={<COSOA_Applicants />} />
        <Route path="/cosoa/applicant/:id" exact element={<Applicant_Page />} />
        <Route path="/organizations" exact element={<Organizations />} />
        <Route path="/appdocs" exact element={<AppDocs />} />
        <Route path="/faqs" exact element={<FAQs />} />
        <Route path="/" exact element={<LandingPage />} />
        <Route path="/organization/profile" exact element ={<Organization_Profile />} />
        <Route path="/organization/revalidation" exact element ={<Revalidation />} />
        <Route path="/organization/revalidation/status" exact element ={<RevalidationStatus/>} />
        <Route path='/organization/settings' exact element ={<OrgSettings />} />
        <Route path='/organization/feedback' exact element ={<OrgFeedback />} />
        <Route path="/student/feedback" exact element={<StudentFeedback/>} />
        <Route path="/accreditation" exact element={<Accreditation />} />
        <Route path="/accreditation/status" exact element={<AccreditationStatus />} />
        <Route path="/student/settings" exact element={<StudSettings />} />
        <Route path="/org/profile/:orgId" exact element ={<Org_Profile />} />
        <Route path= '/student/profile' exact element ={<Student_Profile />} />
        <Route path="/cosoa/settings" exact element ={<COSOASettings />} />
        <Route path="/student/membership" exact element ={<S_Membership /> } />
        <Route path="/organization/membership" exact element={<O_Membership/>} />
        <Route path="/organization/members" exact element={<Official_Members/>}/>
        <Route path="/admin/dashboard" exact element={<Admin_Dashboard/>}/>
        <Route path="/cosoa/pageaccesibility" exact element={<COSOA_Accesibility/>}/>
        <Route path="/admin/feedback" exact element={<User_Feedback/>}/>
        <Route path="/terms" exact element={<Terms/>}/>
        <Route path="/whoarewe" exact element={<WhoWeAre/>}/>
        <Route path="/student/verification" exact element={<Verification/>}/>
        <Route path="/forgot_password/:email/:code" exact element={<ResetPasswordPage/>}/>
        
      </Routes>

      <footer className="footer bg-dark text-white py-4 border-bottom Inter">
        <Container>

          <Row className="text-center d-flex justify-content-center align-items-center flex-column flex-md-row">
            <Col xs={12} md={3} className="text-start">
              {/* Logo */}
              <Navbar.Brand className="footer-brand text-white Urbanist my-0" href="#">
                <Image src={require('./logo.svg').default} alt="Logo" width="40" height="40" />
                IskolarLink
              </Navbar.Brand>
            </Col>
            <Col xs={12} md={6} className="text-center mt-3 mt-md-0">
              {/* Footer Navigation Links (Vertical for small screens) */}
              <ul className="nav d-flex flex-column flex-md-row" style={{ listStyleType: 'none' }}>
                <li className="nav-item">
                  <a className="nav-link text-muted" href="/cosoa">
                    PUP COSOA
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-muted" href="/organizations">
                    Accredited Organizations
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-muted" href="/appdocs">
                    Application Documents
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-muted" href="/faqs">
                    FAQs
                  </a>
                </li>
              </ul>
            </Col>
            <Col xs={12} md={3} className="mt-3 mt-md-0 text-end">
              {/* Social Media Icons */}
              <div className="social-icons d-flex justify-content-center justify-content-md-end">
                <a href="https://www.facebook.com/iskolarlink" target='_blank' className="social-icon">
                  <i className="fab fa-facebook text-white"></i>
                </a>
                <a href="mailto:iskolarlink@gmail.com" target='_blank' className="social-icon">
                  <i className="fas fa-envelope text-white"></i>
                </a>
                <a href="https://twitter.com/IskolarLink" target='_blank' className="social-icon">
                  <i className="fab fa-twitter text-white"></i>
                </a>
                <a href="https://www.instagram.com/iskolarlink/" target='_blank' className="social-icon">
                  <i className="fab fa-instagram text-white"></i>
                </a>
              </div>
           
            </Col>
          </Row>
          
          <hr className="bg-muted flex-grow-1" />
          <Row>
            <Col className="text-start bg-dark text-muted">
              <p>&copy; 2023 IskolarLink All Rights Reserved.</p>
            </Col>
            <Col className="text-center text-md-right mt-3 mt-md-0">
              {/* Privacy Policy and Terms & Conditions Links */}
              <div className="data-footer d-flex justify-content-center justify-content-md-end">
                <Link to="/terms" target='_top' className="nav-link text-muted">
                  Privacy Policy
                </Link>
                <Link to="/terms#terms-and-conditions" target='_top' className="nav-link text-muted ms-2 me-1">
                  Terms & Conditions
                </Link>
                
              </div>
            </Col>
          </Row>
          <Row className='text-end'>
            <a href="https://www.ssltrust.com.au/security-report?domain=iskolarlink.com" rel="nofollow" target="new">
              <Image src="https://seals.ssltrust.com.au/report_medium.png" style={{border:"0px"}}/>
            </a>
          </Row>
        </Container>
      </footer>
    </Router>
  );
}

export default App;

 