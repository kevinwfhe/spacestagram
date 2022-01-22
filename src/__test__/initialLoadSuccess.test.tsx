import React from 'react';
import './utils/matchMedia.mock';
import { render } from 'test-utils';
import '@testing-library/jest-dom';
import App from '../App';

jest.mock('../api', () => ({
  getImages: async () => [
    {
      date: '2007-09-09',
      explanation:
        "Some moons wouldn't survive the collision.  Tethys, one of Saturn's larger moons at about 1000 kilometers in diameter, survived the collision, but sports today the expansive impact crater Odysseus.  Sometimes called the Great Basin, Odysseus occurs on the leading hemisphere of Tethys and shows its great age by the relative amount of smaller craters that occur inside its towering walls.  Another large crater, Melanthius, is visible near the moon's terminator. The density of Tethys is similar to water-ice.  The above digitally enhanced image was captured in July by the robot Cassini spacecraft  in orbit around Saturn as it swooped past the giant ice ball.",
      media_type: 'image',
      title: "The Great Basin on Saturn's Tethys",
      url: 'https://apod.nasa.gov/apod/image/0709/tethys2_cassini.jpg',
    },
  ],
}));
test('initial loading images success', async () => {
  const { getAllByText, findAllByRole } = render(<App />);
  const skeletonCards = getAllByText(
    (content, element) => element?.className === 'skeletonCard__wrapper',
  );
  expect(skeletonCards.length).toBe(10);

  const mediaCards = await findAllByRole(
    (content, element) =>
      element?.className === 'Polaris-MediaCard Polaris-MediaCard--portrait',
    {},
    { timeout: 5000 },
  );
  expect(mediaCards.length).toBe(1);
});
