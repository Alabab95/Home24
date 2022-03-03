import React from 'react';
import { render } from '@testing-library/react';
import ArticleList from '.';

test('renders the ProductList', () => {
  const { getByText } = render(<ArticleList categoryName="test"/>);
  const linkElement = getByText(/home24/i);
  expect(linkElement).toBeInTheDocument();
});
