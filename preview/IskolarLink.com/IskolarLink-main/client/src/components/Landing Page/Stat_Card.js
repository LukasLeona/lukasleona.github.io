// Stat_Card.jsx
import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import './Stat_Card.css'; // Adjust with your actual CSS file path

const Stat_Card = ({ imgSrc, subtitle, numcount }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const end = parseInt(numcount.replace(/,/g, ''), 10);
    if (count >= end) return;

    const timer = setTimeout(() => {
      setCount(prevCount => {
        const nextCount = prevCount + 1;
        if (nextCount < end) {
          return nextCount;
        } else {
          return end;
        }
      });
    }, 20); // Determines the speed of the count

    return () => clearTimeout(timer);
  }, [count, numcount]);

  return (
    <Card className="stat-card">
      <Card.Img variant="top" src={imgSrc} />
      <Card.Body>
        <Card.Title className="number-count">{count.toLocaleString()}</Card.Title>
        <Card.Text>{subtitle}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Stat_Card;
