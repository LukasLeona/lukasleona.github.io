import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { FiFacebook, FiInstagram, FiMail, FiTwitter } from 'react-icons/fi';
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
import COSOASettings from './Pages/COSOA_Portal/COSOA_Settings';
import S_Membership from './Pages/Student_Portal/S_Membership';
import O_Membership from './Pages/Organization_Portal/O_Membership';
import Official_Members from './Pages/Organization_Portal/Official_Members';
import Admin_Dashboard from './Pages/Admin_Portal/Admin_Dashboard';
import COSOA_Accesibility from './Pages/COSOA_Portal/COSOA_Accesibility';
import User_Feedback from './Pages/Admin_Portal/User_Feedback';
import Terms from './Pages/Terms';
import WhoWeAre from './Pages/WhoWeAre';
import Verification from './Pages/Student_Portal/Verification_Page';
import ForgotPassword from './components/ForgotPassword';
import ResetPasswordPage from './components/ResetPasswordPage';

function App() {

  axios.defaults.withCredentials = true;

  const {auth, menu} = useContext(AuthContext);
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
     axios.post(
  `${process.env.REACT_APP_BASE_URL}/menu`,
  { menu: 'org' }
);
    }
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


  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  return (
    <Router>
      
       
      <Navbar
        expand="xl"
        collapseOnSelect
        className={`site-navbar fixed-top${hasScrolled ? ' is-scrolled' : ''}`}
        aria-label="Main navigation"
      >
        <Container className="site-navbar__inner">
          <Link className="site-navbar__brand" to="/" aria-label="IskolarLink home">
            <img src={require('./logo.svg').default} alt="" width="38" height="38" />
            <span>Iskolar<strong>Link</strong></span>
          </Link>
          <Navbar.Toggle aria-controls="site-navigation" aria-label="Toggle navigation" />
          <Navbar.Collapse id="site-navigation">
            <Nav className="site-navbar__links mx-auto Inter">
              <LinkContainer to="/cosoa">
              <Nav.Link className="site-navbar__link">
                PUP COSOA
              </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/organizations">
              <Nav.Link className="site-navbar__link">
                Organizations
              </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/appdocs">
              <Nav.Link className="site-navbar__link">
                Application guide
              </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/faqs">
              <Nav.Link className="site-navbar__link">
                FAQs
              </Nav.Link>
              </LinkContainer>
            </Nav>

            <Nav className="site-navbar__account ms-auto">
            
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

      <footer className="site-footer">
        <Container>
          <div className="site-footer__main">
            <div className="site-footer__about">
              <Link className="site-footer__brand" to="/">
                <img src={require('./logo.svg').default} alt="" width="42" height="42" />
                <span>Iskolar<strong>Link</strong></span>
              </Link>
              <p>A connected home for PUP students, organizations, and the communities they build together.</p>
            </div>

            <nav className="site-footer__nav" aria-label="Footer navigation">
              <strong>Explore</strong>
              <Link to="/cosoa">PUP COSOA</Link>
              <Link to="/organizations">Accredited organizations</Link>
              <Link to="/appdocs">Application documents</Link>
              <Link to="/faqs">Frequently asked questions</Link>
            </nav>

            <div className="site-footer__connect">
              <strong>Stay connected</strong>
              <p>Follow IskolarLink for organization updates and campus opportunities.</p>
              <div className="site-footer__socials">
                <a href="https://www.facebook.com/iskolarlink" target="_blank" rel="noreferrer" aria-label="IskolarLink on Facebook"><FiFacebook /></a>
                <a href="mailto:iskolarlink@gmail.com" aria-label="Email IskolarLink"><FiMail /></a>
                <a href="https://twitter.com/IskolarLink" target="_blank" rel="noreferrer" aria-label="IskolarLink on X"><FiTwitter /></a>
                <a href="https://www.instagram.com/iskolarlink/" target="_blank" rel="noreferrer" aria-label="IskolarLink on Instagram"><FiInstagram /></a>
              </div>
            </div>
          </div>

          <div className="site-footer__bottom">
            <p>&copy; 2026 IskolarLink. All rights reserved.</p>
            <div>
              <Link to="/terms">Privacy policy</Link>
              <Link to="/terms#terms-and-conditions">Terms &amp; conditions</Link>
            </div>
          </div>
        </Container>
      </footer>
    </Router>
  );
}

export default App;

 
