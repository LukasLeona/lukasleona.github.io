import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiBookOpen, FiLayers, FiUsers } from 'react-icons/fi';
import Stat_Card from '../Stat_Card';
import '../general.css';

const Section1 = () => {
  const [communityStats, setCommunityStats] = useState({});

  useEffect(() => {
    let isMounted = true;

    axios.get(`${process.env.REACT_APP_BASE_URL}/landingpage/section2`)
      .then((res) => {
        if (isMounted) setCommunityStats(res.data || {});
      })
      .catch(() => {
        if (isMounted) setCommunityStats({});
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const stats = [
    {
      icon: FiUsers,
      label: 'Student organizations',
      value: communityStats.orgs,
      note: 'Communities to explore',
    },
    {
      icon: FiLayers,
      label: 'Registered users',
      value: communityStats.students,
      note: 'Iskolars staying connected',
    },
    {
      icon: FiBookOpen,
      label: 'Academic programs',
      value: communityStats.academics,
      note: 'Disciplines represented',
    },
  ];

  return (
    <section className="home-section home-community" aria-labelledby="home-community-title">
      <div className="home-shell">
        <div className="home-community__intro">
          <span className="home-kicker">One campus, many communities</span>
          <h2 id="home-community-title">There is a place for every Iskolar.</h2>
          <p>
            Meet people beyond your classroom, turn shared interests into meaningful projects,
            and help shape a more connected PUP community.
          </p>
        </div>

        <div className="home-community__stats" aria-label="IskolarLink community statistics">
          {stats.map((stat) => <Stat_Card key={stat.label} {...stat} />)}
        </div>
      </div>
    </section>
  );
};

export default Section1;
