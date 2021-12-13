import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Counter from '../../containers/Counter';

describe('Count container', () => {
  it('Should increment and decrement counter', () => {
    render(<Counter minValue={1} />);

    const input = screen.getByTestId('counterInput');

    fireEvent.click(screen.getByTestId(`increaseButton`));
    fireEvent.click(screen.getByTestId(`increaseButton`));
    expect(input).toHaveValue('3');
    fireEvent.click(screen.getByTestId(`decreaseButton`));
    expect(input).toHaveValue('2');
  });

  it('Should disable + icon when counter maximum value is reached', () => {
    render(<Counter minValue={1} maxValue={2} />);

    const input = screen.getByTestId('counterInput');
    const increaseButton = screen.getByTestId('increaseButton');

    fireEvent.click(screen.getByTestId(`increaseButton`));
    fireEvent.click(screen.getByTestId(`increaseButton`));
    expect(input).toHaveValue('2');
    expect(increaseButton).toBeDisabled();
  });

  it('Should disable - icon when counter minimum value is reached', () => {
    render(<Counter minValue={1} />);

    const input = screen.getByTestId('counterInput');
    const decreaseButton = screen.getByTestId('decreaseButton');

    fireEvent.click(screen.getByTestId(`decreaseButton`));
    expect(input).toHaveValue('1');
    expect(decreaseButton).toBeDisabled();
  });

  it('Should use minValue as placeholder', () => {
    render(<Counter minValue={3} />);
    const input = screen.getByTestId('counterInput');
    expect(input).toHaveValue('3');
  });
});
