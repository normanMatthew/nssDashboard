// app/__tests__/index.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from "../app/page";

test('renders homepage correctly', () => {
  render(<Home />);
  expect(screen.getByText(/homepage/i)).toBeInTheDocument();
});
