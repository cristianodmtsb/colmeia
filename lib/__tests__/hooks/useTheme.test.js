import React from 'react';
import { render } from '@testing-library/react';
import useTheme from '../../hooks/useTheme';

describe('useTheme hook', () => {
  const MockComponent = ({ themeProp }) => {
    useTheme(...themeProp);
    return null;
  };

  it('should be called with provided theme as an array of objects', () => {
    const theme = [
      {
        'cma-primary-main': 'blue',
        'cma-tertiary-main': 'red',
      },
    ];

    const setProperty = jest.fn();
    document.documentElement.style.setProperty = setProperty;
    render(<MockComponent themeProp={theme} />);

    expect(setProperty).toHaveBeenNthCalledWith(
      1,
      '--cma-primary-main',
      'blue',
    );
    expect(setProperty).toHaveBeenNthCalledWith(
      2,
      '--cma-tertiary-main',
      'red',
    );
  });
});
