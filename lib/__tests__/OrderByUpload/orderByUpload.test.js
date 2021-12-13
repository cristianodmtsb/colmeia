import React from 'react';
import {
  render,
  fireEvent,
  createEvent,
  waitFor,
} from '@testing-library/react';
import OrderByUpload from '../../containers/OrderByUpload';
import { templateContent } from '../../containers/OrderByUpload/orderByUpload';

const file = new File([templateContent], 'template.csv', { type: 'text/csv' });

describe('OrderByUpload component', () => {
  it('should receive file on input change', async () => {
    let lines = [];
    const { container } = render(
      <OrderByUpload onChange={values => (lines = values)} />,
    );

    fireEvent.change(container.querySelector('.inputField'), {
      target: { files: [file] },
    });

    await waitFor(() => expect(lines).toHaveLength(5));
  });

  it('should receive file on drop', async () => {
    let lines = [];
    const { container } = render(
      <OrderByUpload onChange={values => (lines = values)} />,
    );

    const label = container.querySelector('.root');
    const mockDropEvent = createEvent.drop(label);
    Object.defineProperty(mockDropEvent, 'dataTransfer', {
      value: {
        files: [file],
      },
    });
    fireEvent(label, mockDropEvent);

    await waitFor(() => expect(lines).toHaveLength(5));
  });

  it('should react on drag&drop', async () => {
    const { container } = render(<OrderByUpload />);

    const label = container.querySelector('.root');

    fireEvent.dragEnter(label);
    await waitFor(() => expect(label).toHaveClass('dragging'));

    fireEvent.dragLeave(label);
    await waitFor(() => expect(label).not.toHaveClass('dragging'));
  });
});
