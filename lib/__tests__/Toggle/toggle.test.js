import React, { useState } from 'react';
import { render, fireEvent, getByText } from '@testing-library/react';
import Toggle from '../../components/Toggle';

const Component = () => {
  const [status, setStatus] = useState(false);
  return (
    <Toggle
      status={status}
      onChange={setStatus}
      firstOption='Option 1'
      secondOption='Option 2'
    />
  );
};

describe('Toggle component', () => {
  it('Should change the status on click', () => {
    const { container } = render(<Component />);
    expect(container.querySelector('.toggle')).not.toHaveClass('active');
    fireEvent.click(getByText(container, /option 2/i));
    expect(container.querySelector('.toggle')).toHaveClass('active');
    fireEvent.click(getByText(container, /option 1/i));
    expect(container.querySelector('.toggle')).not.toHaveClass('active');
  });
});
