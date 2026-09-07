import React from 'react';
import { Container, Col, Row, Image } from 'react-bootstrap';
import './Hero.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../helpers/AuthContent'
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowDown, FiArrowRight, FiCheckCircle } from 'react-icons/fi';

const publicImage = (filename) =>
  `${process.env.PUBLIC_URL}/${filename}`;

const Hero = () => {
  const publicUrl = process.env.PUBLIC_URL;

  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <Container className="home-hero__inner">
        <div className="home-hero__copy">
          <div className="home-hero__eyebrow">
            <span className="home-hero__eyebrow-dot" aria-hidden="true" />
            The student organization hub of PUP
          </div>
          <h1 id="home-hero-title">
            Find your people.<br />
            <span>Build your campus story.</span>
          </h1>
          <p>
            Discover accredited organizations, manage applications, and stay connected
            to the communities shaping student life at the Polytechnic University of the Philippines.
          </p>

          <div className="home-hero__actions">
            <Link className="home-button home-button--gold" to="/organizations">
              Explore organizations <FiArrowRight aria-hidden="true" />
            </Link>
            <Link className="home-button home-button--ghost" to="/appdocs">
              View application guide
            </Link>
          </div>

          <ul className="home-hero__trust" aria-label="IskolarLink benefits">
            <li><FiCheckCircle aria-hidden="true" /> Verified organizations</li>
            <li><FiCheckCircle aria-hidden="true" /> One connected platform</li>
          </ul>
        </div>

        <div className="home-hero__visual" aria-label="PUP students connecting on campus">
          <figure className="home-hero__photo home-hero__photo--main">
            <img src={`${publicUrl}/Media/20.png`} alt="PUP students sharing organization materials" />
          </figure>
          <figure className="home-hero__photo home-hero__photo--top">
            <img src={`${publicUrl}/Media/12.png`} alt="Students at a campus service window" />
          </figure>
          <figure className="home-hero__photo home-hero__photo--bottom">
            <img src={`${publicUrl}/Media/21.png`} alt="A student organization celebrating together" />
          </figure>
          <div className="home-hero__badge">
            <span>Made for every</span>
            <strong>Iskolar ng Bayan</strong>
          </div>
        </div>
      </Container>

      <a className="home-hero__scroll" href="#home-actions" aria-label="Scroll to explore IskolarLink">
        <FiArrowDown aria-hidden="true" />
      </a>
    </section>
  );
};

const HeroVariant = ({ h1Text, pText }) => {
  return (
    <div
      className="herovariant-bg d-flex align-items-center"
      style={{ backgroundImage: `url("${publicImage('hero.png')}")` }}
    >
      <Container className="text-center">
        <h1 className="hero-h1 Inter-b text-white">{h1Text}</h1>
        <p className="hero-p Inter-normal text-white pt-2 pb-3">
          {pText}
        </p>
      </Container>
    </div>
  );
};

const HeroVariant1 = ({ h1Text, pText }) => {
  return (
      <div
        className="herovariant-bg2 d-flex align-items-center"
        style={{
          backgroundImage: `url("${publicImage('hero1.png')}")`
        }}      >
          <Container className="text-center">
              <h1 className="hero-h1 Inter-b text-white">{h1Text}</h1>
              <p className="hero-p Inter-normal text-white pt-2 pb-3">{pText}</p>
          </Container>
      </div>
  );
};


const HeroVariant2 = ({ imgSrc, name, webmail }) => {

  const {auth, menu} = useContext(AuthContext);
  const {authState, setAuthState} = auth;
  const {activeMenu, setActiveMenu} = menu;
  const navigate = useNavigate();

  const handleEditProfile = () => {
    if(activeMenu === 'main'){
      navigate('/student/settings');
    }else if(activeMenu === 'org'){
      navigate('/organization/settings');
    }else if(activeMenu === 'cosoa'){
      navigate('/cosoa/settings');
    }
  }
    

  return (
      <div
  className="herovariant-bg d-flex align-items-center"
  style={{
    backgroundImage: `url("${publicImage('hero.png')}")`
  }}
>
          <Container>
            <Row>
            <Col md={1} className="mb-3 pe-0 mx-4">
              {
                imgSrc ? <Image src={imgSrc} style={{
                  width: '100px',
                  height: '100px',
                  maxWidth: '100px',
                  maxHeight: '100px',
                  borderRadius: '50%',
                  display: 'block',
                }} /> : <FontAwesomeIcon icon={faUserCircle} size="6x" className="text-white" />
              }
            </Col>
            <Col md={6}>
              <h2 className="Inter-b text-white">{name}</h2>
              <p className="hero-p Inter-normal text-white pt-2 pb-3">{webmail}</p>
            </Col>
            <Col className="text-end">
              <Button variant="secondary" onClick={handleEditProfile} >Edit Profile</Button>
                </Col>

            </Row>
          </Container>
      </div>
  );
};

const HeroVariant3 = ({  h1Text, pText  }) => {
  return (
      <div
  className="herovariant-bg d-flex align-items-center"
  style={{
    backgroundImage: `url("${publicImage('hero.png')}")`
  }}
>
        <Container className="text-center">
          <h1 className="hero-h1 Inter-b text-white">{h1Text}</h1>
          <p className="hero-p Inter-normal text-white pt-2 pb-3">{pText}</p>
        </Container>
      </div>
  );
};

const HeroVariant4 = ({  h1Text  }) => {
  return (
     <div
  className="herovariant-bg d-flex align-items-center"
  style={{
    backgroundImage: `url("${publicImage('hero.png')}")`
  }}
>
        <Container className="text-start">
          <Col xs={6}>
          <h1 className="hero-h1 Inter-b text-white">{h1Text}</h1>
          </Col>
          <Col xs={9}>
          </Col>
        </Container>
      </div>
  );
};

const HeroVariant5 = ({ h1Text, pText }) => {
  return (
      <div
  className="herovariant-bg5 d-flex align-items-center"
  style={{
    backgroundImage: `url("${publicImage('hero5.png')}")`
  }}
>
          <Container className="text-center">
              <h1 className="hero-h1 Inter-b text-white">{h1Text}</h1>
              <p className="hero-p Inter-normal text-white pt-2 pb-3">{pText}</p>
          </Container>
      </div>
  );
};

const HeroVariant6 = ({ h1Text, pText }) => {
  return (
     <div
  className="herovariant-bg6 d-flex align-items-center"
  style={{
    backgroundImage: `url("${publicImage('hero6.png')}")`
  }}
>
          <Container className="text-center">
              <h1 className="hero-h1 Inter-b text-white">{h1Text}</h1>
              <p className="hero-p Inter-normal text-white pt-2 pb-3">{pText}</p>
          </Container>
      </div>
  );
};

const HeroVariant7 = ({ h1Text, pText }) => {
  return (
      <div
  className="herovariant-bg7 d-flex align-items-center"
  style={{
    backgroundImage: `url("${publicImage('hero7.png')}")`
  }}
>
          <Container className="text-center">
              <h1 className="hero-h1 Inter-b text-white">{h1Text}</h1>
              <p className="hero-p Inter-normal text-white pt-2 pb-3">{pText}</p>
          </Container>
      </div>
  );
};

const HeroVariant8 = ({ imgSrc, name, webmail }) => {

  const {auth, menu} = useContext(AuthContext);
  const {authState, setAuthState} = auth;
  const {activeMenu, setActiveMenu} = menu;

  return (
      <div
  className="herovariant-bg d-flex align-items-center"
  style={{
    backgroundImage: `url("${publicImage('hero.png')}")`
  }}
>
          <Container>
            <Row>
            <Col md={1} className="mb-3 pe-0 mx-4">
              {
                imgSrc ? <Image src={imgSrc} roundedCircle fluid /> : <FontAwesomeIcon icon={faUserCircle} size="6x" className="text-white" />
              }
            </Col>
            <Col md={6}>
              <h2 className="Inter-b text-white">{name}</h2>
              <p className="hero-p Inter-normal text-white pt-2 pb-3">{webmail}</p>
            </Col>
            </Row>
          </Container>
      </div>
  );
};
 
export default Hero;
export {HeroVariant, HeroVariant1, HeroVariant2, HeroVariant3, HeroVariant4, HeroVariant5, HeroVariant6, HeroVariant7, HeroVariant8};
