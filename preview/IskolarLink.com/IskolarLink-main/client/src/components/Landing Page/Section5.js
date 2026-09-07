import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiMessageCircle } from 'react-icons/fi';
import FAQs_Accordion from '../FAQs_Accordion';
import '../general.css';

const Section5 = () => (
  <section className="home-section home-faq" aria-labelledby="home-faq-title">
    <div className="home-shell">
      <div className="home-faq__layout">
        <div className="home-faq__intro">
          <span className="home-kicker">Good questions, clear answers</span>
          <h2 id="home-faq-title">Know before you apply.</h2>
          <p>
            Start with the questions student leaders ask most often. For the full guide,
            visit the FAQ page or review the official application documents.
          </p>
          <Link className="home-inline-link" to="/faqs">
            Browse all frequently asked questions <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="home-faq__questions">
          <FAQs_Accordion limit={5} />
        </div>
      </div>

      <div className="home-final-cta">
        <span className="home-final-cta__icon" aria-hidden="true"><FiMessageCircle /></span>
        <div>
          <span>Ready when you are</span>
          <h2>Find the community that makes campus feel like yours.</h2>
        </div>
        <Link className="home-button home-button--gold" to="/organizations">
          Explore organizations <FiArrowRight aria-hidden="true" />
        </Link>
      </div>
    </div>
  </section>
);

export default Section5;
