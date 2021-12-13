import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Tooltip from '../../components/Tooltip';

describe('Tooltip component', () => {
  it('Should open tooltip when clicked', () => {
    render(
      <Tooltip content={<span>This is a Tooltip</span>}>Click here!</Tooltip>,
    );

    expect(screen.getByTestId('tooltip-text')).not.toBeVisible();

    fireEvent.click(screen.getByText(/Click here/));

    expect(screen.getByTestId('tooltip-text')).toBeVisible();
  });
});
