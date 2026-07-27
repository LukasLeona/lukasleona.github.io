import React, { useState, useEffect } from 'react';
import { Card, Col } from 'react-bootstrap';
import './general.css';

const Stat_Card = ({ imgSrc, subtitle, numcount }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (numcount) {
            const end = parseInt(numcount.toString().replace(/[^\d]/g, ''), 10);
            if (count >= end || isNaN(end)) return;

            // Calculate the increment value as a tenth of the difference
            // between the current count and the end value
            const increment = Math.max(Math.ceil((end - count) / 10), 1);

            // Use requestAnimationFrame for a smoother and more optimized animation
            const frame = () => {
                setCount(previousCount => {
                    // Determine the next count
                    const nextCount = previousCount + increment;
                    // If the next count is less than the end, continue counting, else stop at the end number
                    return nextCount < end ? nextCount : end;
                });
            };

            const animationFrameId = window.requestAnimationFrame(frame);
            return () => window.cancelAnimationFrame(animationFrameId);
        }
    }, [count, numcount]); // Depend on count and numcount to trigger the effect

    return (
        <Col fluid="true" className='text-center' style={{ width: '100%', maxWidth: '40vh', margin: '0 0' }}>
            {/* Adjusted styles to control width and center the column */}
            <Card className="align-items-center rounded-0 shadow py-4">
                {/* Reduced maxHeight and maxWidth values */}
                <Card.Img variant="top" src={imgSrc} style={{ width: '20%', maxWidth: '25%', margin: '0 auto' }} />
                {/* Updated styling for the image to be responsive */}
                <Card.Body className="pt-2">
                    <Card.Title style={{ fontSize: '2.5em', marginBottom: '0.5rem' }}>{count}</Card.Title>
                    {/* Adjusted fontSize and added margin */}
                    <Card.Subtitle style={{ fontSize: '1.2em' }}>{subtitle}</Card.Subtitle>
                    {/* Adjusted fontSize */}
                </Card.Body>
            </Card>
        </Col>
    );
};

export default Stat_Card;
