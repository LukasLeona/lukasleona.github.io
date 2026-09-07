import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import LandingPage from './LandingPage';

jest.mock('axios', () => ({
  get: jest.fn(),
}));

const axios = require('axios');

beforeAll(() => {
  window.matchMedia = window.matchMedia || (() => ({
    matches: true,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  }));
});

beforeEach(() => {
  axios.get.mockResolvedValue({ data: { orgs: 42, students: 1200, academics: 18 } });
});

const renderHomepage = () => render(
  <MemoryRouter>
    <LandingPage />
  </MemoryRouter>,
);

test('lets visitors switch between student and organization journeys', async () => {
  renderHomepage();
  await screen.findByText('1,200');

  expect(screen.getByRole('heading', { name: /turn curiosity into community/i })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'For organizations' }));

  expect(screen.getByRole('heading', { name: /spend more time leading/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /review application steps/i })).toHaveAttribute('href', '/appdocs');
});

test('opens campus moments in an accessible photo viewer', async () => {
  renderHomepage();
  await screen.findByText('1,200');

  fireEvent.click(screen.getByRole('button', { name: /view larger: a campus full of possibilities/i }));

  expect(screen.getByRole('dialog')).toBeInTheDocument();
  expect(screen.getByText('A campus full of possibilities')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /view next photo/i })).toBeInTheDocument();
});
