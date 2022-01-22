import React from 'react';
import './utils/matchMedia.mock';
import { render, waitFor } from 'test-utils';
import '@testing-library/jest-dom';
import App from '../App';

jest.mock('../api', () => ({
  getImages: () => Promise.reject({ response: { status: 500 } }),
}));
test('initial loading images fails', async () => {
  const { getAllByText, getByText } = render(<App />);
  const skeletonCards = getAllByText(
    (content, element) => element?.className === 'skeletonCard__wrapper',
  );
  expect(skeletonCards.length).toBe(10);

  await waitFor(
    () => {
      expect(getByText('Oops, the space is too crowded~')).toBeInTheDocument();
    },
    { timeout: 10000 },
  );
});
