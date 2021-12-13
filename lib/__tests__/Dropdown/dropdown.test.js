import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Dropdown from '../../components/Dropdown/dropdown.js';

describe('Dropdown component', () => {
  it('Should open dropdown when clicked', () => {
    render(
      <Dropdown placeholder='placeholder' onChange={jest.fn()}>
        {[
          { text: 'January', value: 1 },
          { text: 'February', value: 2 },
        ]}
      </Dropdown>,
    );

    expect(screen.queryAllByText('January')).toHaveLength(0);

    fireEvent.click(screen.queryByText('placeholder'));

    expect(screen.queryAllByText('January')).toHaveLength(1);
  });

  it('should call the onchange function with a new value when an item is clicked', () => {
    let value;
    render(
      <Dropdown
        placeholder='placeholder'
        onChange={newValue => (value = newValue)}
      >
        {[
          { text: 'January', value: 1 },
          { text: 'February', value: 2 },
        ]}
      </Dropdown>,
    );

    fireEvent.click(screen.getByText('placeholder'));
    fireEvent.click(screen.getByText('February'));

    expect(value).toBe(2);
  });

  it('should display the text of the passed value', () => {
    render(
      <Dropdown placeholder='placeholder' onChange={jest.fn()} value={1}>
        {[
          { text: 'January', value: 1 },
          { text: 'February', value: 2 },
        ]}
      </Dropdown>,
    );

    expect(screen.queryAllByText('January')).toHaveLength(1);
  });
});
