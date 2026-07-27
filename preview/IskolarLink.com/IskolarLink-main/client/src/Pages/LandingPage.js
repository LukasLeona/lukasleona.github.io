import React,{useEffect,useState} from 'react';
import Hero from '../components/HeroVariant/Hero';
import Section1 from '../components/Landing Page/Section1';
import Section2 from '../components/Landing Page/Section2';
import Section3 from '../components/Landing Page/Section3';
import Section4 from '../components/Landing Page/Section4';
import Section5 from '../components/Landing Page/Section5';
import './LandingPage.css';
import axios from 'axios';
import WarningAlert from '../components/Alerts/WarningAlert'
function LandingPage() {
  axios.defaults.withCredentials = true;

  return (
    <main>
      <Hero />
      <Section1 />
      <Section2 />
      <Section4 />
      <Section5 />
    </main>
  );
}

export default LandingPage;
