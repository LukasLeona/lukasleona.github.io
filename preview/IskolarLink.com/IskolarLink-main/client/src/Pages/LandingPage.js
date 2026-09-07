import React from 'react';
import Hero from '../components/HeroVariant/Hero';
import QuickActions from '../components/Landing Page/QuickActions';
import Section1 from '../components/Landing Page/Section1';
import AudienceJourney from '../components/Landing Page/AudienceJourney';
import Section2 from '../components/Landing Page/Section2';
import Section4 from '../components/Landing Page/Section4';
import Section5 from '../components/Landing Page/Section5';
import './LandingPage.css';
function LandingPage() {
  return (
    <main className="home-page">
      <Hero />
      <QuickActions />
      <Section1 />
      <AudienceJourney />
      <Section2 />
      <Section4 />
      <Section5 />
    </main>
  );
}

export default LandingPage;
