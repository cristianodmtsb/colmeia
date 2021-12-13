import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Checkbox from '../../components/Checkbox';

describe('Checkbox component', () => {
  it('Should check and uncheck this component', () => {
    render(<Checkbox id='checkbox'>checkbox label</Checkbox>);

    const input = screen.getByLabelText(/checkbox label/i);

    expect(input).not.toBeChecked();
    fireEvent.click(input);
    expect(input).toBeChecked();
  });
});
