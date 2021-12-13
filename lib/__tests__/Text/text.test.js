import React from 'react';
import { render, screen } from '@testing-library/react';
import Text from '../../components/Text';

describe('Text component', () => {
  it('Should render as a H1', () => {
    render(<Text type='h1'>Heading one text test</Text>);
    const element = screen.getByText(/heading one text test/i);
    expect(element.nodeName).toBe('H1');
  });

  it('Should render as a default paragraph', () => {
    render(<Text>Default text test</Text>);
    const element = screen.getByText(/Default text test/i);
    expect(element.nodeName).toBe('P');
  });
});
