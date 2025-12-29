// app/__tests__/index.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { expect, test } from "vitest";
import Home from "../app/page";

test('renders homepage correctly', () => {
  render(<Home />);
  expect(screen.getByText(/welcome back, admin/i)).toBeInTheDocument();
  expect(screen.getByText(/go to dashboard/i)).toBeInTheDocument();
  expect(screen.getByText(/total users/i)).toBeInTheDocument;
  expect(screen.getByText(/revenue/i)).toBeInTheDocument;
});
