import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FiChevronLeft, FiChevronRight, FiMaximize2, FiX } from 'react-icons/fi';

const campusMoments = [
  {
    src: 'Media/11.png',
    alt: 'Aerial view of the PUP Manila campus',
    caption: 'A campus full of possibilities',
    size: 'wide',
  },
  {
    src: 'Media/14.png',
    alt: 'Students talking together beside a campus bench',
    caption: 'Connections beyond the classroom',
    size: 'tall',
  },
  {
    src: 'Media/15.png',
    alt: 'Students learning about a campus organization at a booth',
    caption: 'Discover new interests',
    size: 'standard',
  },
  {
    src: 'Media/16.png',
    alt: 'A student organization posing at a lively campus gathering',
    caption: 'Celebrate every shared win',
    size: 'standard',
  },
  {
    src: 'Media/17.png',
    alt: 'Students reading information together during an organization fair',
    caption: 'Ideas become action',
    size: 'standard',
  },
  {
    src: 'Media/10.png',
    alt: 'Students walking along a tree-lined PUP campus path',
    caption: 'Everyday life at PUP',
    size: 'standard',
  },
];

const CampusGallery = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const publicUrl = process.env.PUBLIC_URL;
  const activeMoment = activeIndex === null ? null : campusMoments[activeIndex];

  const move = (direction) => {
    setActiveIndex((current) => (current + direction + campusMoments.length) % campusMoments.length);
  };

  return (
    <section className="home-section home-gallery" aria-labelledby="home-gallery-title">
      <div className="home-shell">
        <div className="home-section-heading home-section-heading--split">
          <div>
            <span className="home-kicker">Campus moments</span>
            <h2 id="home-gallery-title">This is what belonging looks like.</h2>
          </div>
          <p>From organization fairs to everyday conversations, every connection adds to the PUP story.</p>
        </div>

        <div className="home-gallery__grid">
          {campusMoments.map((moment, index) => (
            <button
              type="button"
              key={moment.src}
              className={`home-gallery__item home-gallery__item--${moment.size}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`View larger: ${moment.caption}`}
              aria-haspopup="dialog"
            >
              <img src={`${publicUrl}/${moment.src}`} alt={moment.alt} loading="lazy" />
              <span className="home-gallery__overlay">
                <strong>{moment.caption}</strong>
                <FiMaximize2 aria-hidden="true" />
              </span>
            </button>
          ))}
        </div>
      </div>

      <Modal
        show={activeMoment !== null}
        onHide={() => setActiveIndex(null)}
        centered
        size="xl"
        className="home-gallery-modal"
        aria-labelledby="home-gallery-modal-title"
      >
        {activeMoment && (
          <div className="home-gallery-modal__content">
            <button
              type="button"
              className="home-gallery-modal__close"
              onClick={() => setActiveIndex(null)}
              aria-label="Close photo viewer"
            >
              <FiX aria-hidden="true" />
            </button>
            <img src={`${publicUrl}/${activeMoment.src}`} alt={activeMoment.alt} />
            <div className="home-gallery-modal__bar">
              <button type="button" onClick={() => move(-1)} aria-label="View previous photo">
                <FiChevronLeft aria-hidden="true" />
              </button>
              <div>
                <span>{activeIndex + 1} / {campusMoments.length}</span>
                <strong id="home-gallery-modal-title">{activeMoment.caption}</strong>
              </div>
              <button type="button" onClick={() => move(1)} aria-label="View next photo">
                <FiChevronRight aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default CampusGallery;
