import { render, screen } from '@testing-library/react';
import App from './App';

test('renders LuxeMarket logo', () => {
  render(<App />);
  const linkElement = screen.getByText(/LuxeMarket/i);
  expect(linkElement).toBeInTheDocument();
});
