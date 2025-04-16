import { render, screen } from '@testing-library/react';
import App from './App';

test('renders group number', () => {
  render(<App />);
  const groupElement = screen.getByText(/Group 11/i);
  expect(groupElement).toBeInTheDocument();
});

test('renders team member name', () => {
  render(<App />);
  const memberElement = screen.getByText(/Nafiyad Adane Gudina/i);
  expect(memberElement).toBeInTheDocument();
});
