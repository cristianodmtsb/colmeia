import React from 'react';
import Rating from '../../components/Rating/rating.js';
import { render, fireEvent, screen } from '@testing-library/react';

describe('Rating component', () => {
  it('Should update the rating value when you click on the star', () => {
    let value;
    render(
      <Rating
        value={0}
        onChange={newValue => (value = newValue)}
        reviewCount={0}
      />,
    );

    fireEvent.click(screen.getByTestId(`star-5`));

    expect(value).toBe(5);

    fireEvent.click(screen.getByTestId(`star-4`));

    expect(value).toBe(4);

    fireEvent.click(screen.getByTestId(`star-3`));

    expect(value).toBe(3);

    fireEvent.click(screen.getByTestId(`star-2`));

    expect(value).toBe(2);

    fireEvent.click(screen.getByTestId(`star-1`));

    expect(value).toBe(1);
  });

  it('Should change the rating text according to the number of reviews', () => {
    const { rerender } = render(
      <Rating value={0} onChange={() => {}} reviewCount={0} />,
    );

    expect(screen.queryByText(/rating/i)).toHaveTextContent(/no rating/i);

    rerender(<Rating value={0} onChange={() => {}} reviewCount={1} />);

    expect(screen.queryByText(/rating/i)).toHaveTextContent(/1 rating/i);

    rerender(<Rating value={0} onChange={() => {}} reviewCount={2} />);

    expect(screen.queryByText(/rating/i)).toHaveTextContent(/2 ratings/i);
  });
});
