import React from 'react';
import { Accordion } from 'react-bootstrap';
import './general.css';

const questions = [
  {
    question: 'Do we have to follow specific formats for application requirements?',
    answer: 'Yes. Use the official templates so reviewers can check every requirement consistently.',
    link: 'https://bit.ly/ANR-2023-Templates',
    linkLabel: 'View official templates',
  },
  {
    question: 'Do we need a Table of Amendments if our CBL has no revisions?',
    answer: 'No. You only need to accomplish the Table of Amendments when your Constitution and By-Laws includes changes.',
  },
  {
    question: 'Are all student organizations required to file for accreditation or revalidation?',
    answer: 'Yes. This is required under Title 7 of the 2019 Revised Student Handbook.',
    link: 'https://drive.google.com/file/d/0B1BuDAuN0r8SX1BWX2NSN3FURzg/view?resourcekey=0-oi8lUy9PCFysh0FDyL5ipw',
    linkLabel: 'Read the Student Handbook',
  },
  {
    question: 'What happens if an organization does not file?',
    answer: 'An organization that is not accredited or revalidated may not legally conduct activities for the current and succeeding academic years.',
  },
  {
    question: 'Do student publications follow the same requirements?',
    answer: 'No. Student publications are not required to conform to the COSOA accreditation and revalidation requirements.',
  },
  {
    question: 'What if the organization has no funds or assets to turn over?',
    answer: 'Submit a written letter to the Office of Student Services stating that the organization did not acquire or own funds or assets.',
  },
  {
    question: 'Is an acknowledgement of turnover still needed when the officers are unchanged?',
    answer: 'Yes. Submit the Turnover of Assets and Funds with the same signatories and include their terms of office.',
  },
  {
    question: 'Are at least 15 members required for accreditation?',
    answer: 'Yes. The minimum includes executive officers such as the president, vice president, secretary, and treasurer.',
  },
];

const FAQs_Accordion = ({ limit }) => {
  const visibleQuestions = Number.isInteger(limit) ? questions.slice(0, limit) : questions;

  return (
    <Accordion className="iskolar-accordion" defaultActiveKey="0">
      {visibleQuestions.map((item, index) => (
        <Accordion.Item eventKey={String(index)} key={item.question}>
          <Accordion.Header>{item.question}</Accordion.Header>
          <Accordion.Body>
            <p>{item.answer}</p>
            {item.link && (
              <a href={item.link} target="_blank" rel="noreferrer">
                {item.linkLabel}
              </a>
            )}
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default FAQs_Accordion;
