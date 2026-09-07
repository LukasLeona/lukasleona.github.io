import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheck, FiClipboard, FiFileText, FiSend } from 'react-icons/fi';
import '../general.css';

const applicationPaths = {
  accreditation: {
    label: 'Accreditation',
    eyebrow: 'For new organizations',
    title: 'Build a strong first application.',
    description: 'Follow the required format from day one and submit a complete organization profile for review.',
    requirements: ['Registered student representative', 'Verified student account'],
    documentCount: 10,
    accent: 'gold',
  },
  revalidation: {
    label: 'Revalidation',
    eyebrow: 'For recognized organizations',
    title: 'Keep your organization in good standing.',
    description: 'Update your records, report the year’s work, and complete the annual revalidation process.',
    requirements: ['Currently accredited organization', 'Updated organization records'],
    documentCount: 13,
    accent: 'cream',
  },
};

const processSteps = [
  { icon: FiClipboard, number: '01', title: 'Check eligibility', text: 'Confirm your account and organization status.' },
  { icon: FiFileText, number: '02', title: 'Prepare documents', text: 'Use the official templates and naming guide.' },
  { icon: FiSend, number: '03', title: 'Submit and track', text: 'Send the complete set and follow its progress.' },
];

const Section4 = () => {
  const [activePath, setActivePath] = useState('accreditation');
  const path = applicationPaths[activePath];

  return (
    <section className="home-section home-application" aria-labelledby="home-application-title">
      <div className="home-shell">
        <div className="home-section-heading home-section-heading--split home-application__heading">
          <div>
            <span className="home-kicker">Application guide</span>
            <h2 id="home-application-title">A clearer route from forms to approval.</h2>
          </div>
          <p>Choose a path to see what you need before opening the complete document library.</p>
        </div>

        <div className="home-application__workspace">
          <div className="home-application__selector" aria-label="Choose an application type">
            {Object.entries(applicationPaths).map(([key, item]) => (
              <button
                type="button"
                key={key}
                className={activePath === key ? 'is-active' : ''}
                aria-pressed={activePath === key}
                onClick={() => setActivePath(key)}
              >
                <span>{item.eyebrow}</span>
                <strong>{item.label}</strong>
                <FiArrowRight aria-hidden="true" />
              </button>
            ))}
          </div>

          <div className={`home-application__detail home-application__detail--${path.accent}`} key={activePath}>
            <div className="home-application__summary">
              <span>{path.eyebrow}</span>
              <h3>{path.title}</h3>
              <p>{path.description}</p>
              <ul>
                {path.requirements.map((requirement) => (
                  <li key={requirement}><FiCheck aria-hidden="true" /> {requirement}</li>
                ))}
              </ul>
              <div className="home-application__count">
                <strong>{path.documentCount}</strong>
                <span>official documents<br />in the checklist</span>
              </div>
            </div>

            <ol className="home-application__steps">
              {processSteps.map(({ icon: Icon, number, title, text }) => (
                <li key={number}>
                  <span className="home-application__step-icon" aria-hidden="true"><Icon /></span>
                  <span className="home-application__step-number">{number}</span>
                  <div>
                    <strong>{title}</strong>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="home-application__footer">
          <p>Ready to prepare your application?</p>
          <Link className="home-button home-button--gold" to="/appdocs">
            Open the document library <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Section4;
