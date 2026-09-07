import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiAward, FiFileText, FiHelpCircle, FiUsers } from 'react-icons/fi';

const actions = [
  {
    title: 'Discover organizations',
    description: 'Browse recognized student groups and find a community that fits your interests.',
    to: '/organizations',
    icon: FiUsers,
    accent: 'maroon',
  },
  {
    title: 'Start an application',
    description: 'See the forms and requirements for accreditation or annual revalidation.',
    to: '/appdocs',
    icon: FiFileText,
    accent: 'gold',
  },
  {
    title: 'Meet PUP COSOA',
    description: 'Learn how COSOA supports and accredits student organizations across PUP.',
    to: '/cosoa',
    icon: FiAward,
    accent: 'navy',
  },
  {
    title: 'Get quick answers',
    description: 'Find clear guidance about accounts, applications, membership, and requirements.',
    to: '/faqs',
    icon: FiHelpCircle,
    accent: 'green',
  },
];

const QuickActions = () => (
  <section id="home-actions" className="home-section home-actions" aria-labelledby="home-actions-title">
    <div className="home-shell">
      <div className="home-section-heading home-section-heading--split">
        <div>
          <span className="home-kicker">Start here</span>
          <h2 id="home-actions-title">What would you like to do?</h2>
        </div>
        <p>Everything you need for campus organization life, gathered in one place.</p>
      </div>

      <div className="home-actions__grid">
        {actions.map(({ title, description, to, icon: Icon, accent }) => (
          <Link className={`home-action-card home-action-card--${accent}`} to={to} key={title}>
            <span className="home-action-card__icon" aria-hidden="true"><Icon /></span>
            <span className="home-action-card__content">
              <strong>{title}</strong>
              <span>{description}</span>
            </span>
            <FiArrowUpRight className="home-action-card__arrow" aria-hidden="true" />
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default QuickActions;
