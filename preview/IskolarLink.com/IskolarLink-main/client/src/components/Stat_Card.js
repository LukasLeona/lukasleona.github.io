import React, { useEffect, useState } from 'react';
import './general.css';

const Stat_Card = ({ icon: Icon, label, value, note }) => {
    const [count, setCount] = useState(null);

    useEffect(() => {
        const target = Number.parseInt(String(value).replace(/[^\d]/g, ''), 10);

        if (!Number.isFinite(target)) {
            setCount(null);
            return undefined;
        }

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setCount(target);
            return undefined;
        }

        let frameId;
        const startedAt = performance.now();
        const duration = 900;

        const updateCount = (now) => {
            const progress = Math.min((now - startedAt) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(target * eased));
            if (progress < 1) frameId = window.requestAnimationFrame(updateCount);
        };

        frameId = window.requestAnimationFrame(updateCount);
        return () => window.cancelAnimationFrame(frameId);
    }, [value]);

    return (
        <article className="home-stat-card">
            <span className="home-stat-card__icon" aria-hidden="true"><Icon /></span>
            <div className="home-stat-card__value" aria-label={count === null ? 'Live count unavailable' : `${count} ${label}`}>
                {count === null ? '—' : count.toLocaleString()}
            </div>
            <h3>{label}</h3>
            <p>{note}</p>
        </article>
    );
};

export default Stat_Card;
