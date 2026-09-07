import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiEye, FiShield, FiUsers } from 'react-icons/fi';
import '../general.css';

const responsibilities = [
  {
    icon: FiShield,
    title: 'Set clear standards',
    text: 'Establish fair accreditation guidelines for student organizations.',
  },
  {
    icon: FiEye,
    title: 'Review with care',
    text: 'Evaluate applications and monitor continuing compliance.',
  },
  {
    icon: FiUsers,
    title: 'Connect the campus',
    text: 'Strengthen coordination among organizations, the Student Council, and OSS.',
  },
];

const Section2 = () => {
  const publicUrl = process.env.PUBLIC_URL;

  return (
    <section className="home-section home-cosoa" aria-labelledby="home-cosoa-title">
      <div className="home-shell home-cosoa__layout">
        <div className="home-cosoa__visual">
          <img src={`${publicUrl}/studentorg.png`} alt="PUP students and staff talking together on campus" loading="lazy" />
          <div className="home-cosoa__stamp" aria-hidden="true">
            <span>PUP</span>
            <strong>COSOA</strong>
          </div>
        </div>

        <div className="home-cosoa__content">
          <span className="home-kicker">The accrediting body</span>
          <h2 id="home-cosoa-title">Supporting student organizations with clarity and care.</h2>
          <p>
            PUP COSOA is the independent student body responsible for organization accreditation.
            It brings students, the Central Student Council, and the Office of Student Services
            together through a consistent and transparent process.
          </p>

          <div className="home-cosoa__responsibilities">
            {responsibilities.map(({ icon: Icon, title, text }) => (
              <article key={title}>
                <span aria-hidden="true"><Icon /></span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>

          <Link className="home-inline-link" to="/cosoa">
            Get to know PUP COSOA <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Section2;
