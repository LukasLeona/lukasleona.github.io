import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheck } from 'react-icons/fi';

const journeys = {
  student: {
    label: 'For students',
    title: 'Turn curiosity into community.',
    description: 'Explore verified organizations and find a place to learn, lead, create, and belong.',
    points: [
      'Browse accredited organizations in one directory',
      'Connect with groups that match your interests',
      'Keep your membership details within easy reach',
    ],
    cta: 'Find an organization',
    to: '/organizations',
    image: 'Media/13.png',
    imageAlt: 'PUP students exploring organization booths on campus',
    badge: 'Discover your next community',
  },
  organization: {
    label: 'For organizations',
    title: 'Spend more time leading, less time chasing paperwork.',
    description: 'Prepare applications, follow requirements, and keep your organization records organized.',
    points: [
      'Review current accreditation and revalidation forms',
      'Submit requirements through a guided process',
      'Manage organization and membership information',
    ],
    cta: 'Review application steps',
    to: '/appdocs',
    image: 'Media/18.png',
    imageAlt: 'Student organization members smiling together at a campus event',
    badge: 'Built for student leaders',
  },
};

const AudienceJourney = () => {
  const [audience, setAudience] = useState('student');
  const journey = journeys[audience];
  const publicUrl = process.env.PUBLIC_URL;

  return (
    <section className="home-section home-journey" aria-labelledby="home-journey-title">
      <div className="home-shell">
        <div className="home-journey__topline">
          <div>
            <span className="home-kicker">One platform, two journeys</span>
            <h2 id="home-journey-title">Choose your path</h2>
          </div>
          <div className="home-journey__switcher" aria-label="Choose your IskolarLink experience">
            {Object.entries(journeys).map(([key, item]) => (
              <button
                type="button"
                key={key}
                className={audience === key ? 'is-active' : ''}
                aria-pressed={audience === key}
                onClick={() => setAudience(key)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="home-journey__panel" key={audience}>
          <div className="home-journey__photo">
            <img src={`${publicUrl}/${journey.image}`} alt={journey.imageAlt} />
            <span>{journey.badge}</span>
          </div>

          <div className="home-journey__content">
            <span className="home-journey__audience">{journey.label}</span>
            <h3>{journey.title}</h3>
            <p>{journey.description}</p>
            <ul>
              {journey.points.map((point) => (
                <li key={point}><FiCheck aria-hidden="true" /> {point}</li>
              ))}
            </ul>
            <Link className="home-inline-link" to={journey.to}>
              {journey.cta} <FiArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AudienceJourney;
