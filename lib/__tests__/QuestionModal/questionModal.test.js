import React, { useState } from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import QuestionModal from '../../components/QuestionModal';

describe('Question Modal', () => {
  it('should open only when the active prop is true', async () => {
    const MockComponent = () => {
      const [active, setActive] = useState(false);
      return (
        <>
          <QuestionModal
            active={active}
            cancelAction={() => {}}
            confirmAction={() => {}}
          >
            <span>children component</span>
          </QuestionModal>
          <button onClick={() => setActive(true)}>open modal</button>
        </>
      );
    };

    const { container } = render(<MockComponent />);

    expect(container.querySelector('.modal:not(.active)')).toBeInTheDocument();

    fireEvent.click(screen.getByText(/open modal/i));

    expect(container.querySelector('.modal.active')).toBeInTheDocument();
  });

  it('should show the children component', async () => {
    render(
      <QuestionModal cancelAction={() => {}} confirmAction={() => {}}>
        <span>children component</span>
      </QuestionModal>,
    );
    expect(screen.getByText(/children component/i)).toBeInTheDocument();
  });

  it('should call the actions in the right moment', async () => {
    const cancelAction = jest.fn();
    const confirmAction = jest.fn();

    const { container } = render(
      <QuestionModal cancelAction={cancelAction} confirmAction={confirmAction}>
        <span>children component</span>
      </QuestionModal>,
    );

    expect(cancelAction).not.toHaveBeenCalled();
    expect(confirmAction).not.toHaveBeenCalled();

    fireEvent.click(screen.getByText(/yes/i));
    fireEvent.click(screen.getByText(/no/i));
    fireEvent.click(container.querySelector('.modal'));

    expect(cancelAction).toHaveBeenCalledTimes(2);
    expect(confirmAction).toHaveBeenCalled();
  });

  it('should add the custom labels correctly', async () => {
    const cancelAction = jest.fn();
    const confirmAction = jest.fn();

    render(
      <QuestionModal
        cancelAction={cancelAction}
        confirmAction={confirmAction}
        cancelLabel='Cancel Label'
        confirmLabel='Confirm Label'
      >
        <span>children component</span>
      </QuestionModal>,
    );

    const cancelButton = screen.getByText(/cancel label/i);
    const confirmButton = screen.getByText(/confirm label/i);

    expect(cancelButton).toBeInTheDocument();
    expect(confirmButton).toBeInTheDocument();

    fireEvent.click(cancelButton);
    expect(cancelAction).toHaveBeenCalled();

    fireEvent.click(confirmButton);
    expect(confirmAction).toHaveBeenCalled();
  });

  it('should add focus on the confirm button', async () => {
    render(
      <QuestionModal
        active={true}
        cancelAction={() => {}}
        confirmAction={() => {}}
        focusConfirm={true}
      >
        <span>children component</span>
      </QuestionModal>,
    );

    await waitFor(() => expect(screen.getByText(/yes/i)).toHaveFocus());
  });

  it('should hide modal when esc is clicked', async () => {
    const MockComponent = () => {
      const [active, setActive] = useState(false);
      return (
        <>
          <QuestionModal
            active={active}
            cancelAction={() => setActive(false)}
            confirmAction={() => {}}
          >
            <span>children component</span>
          </QuestionModal>
          <button onClick={() => setActive(true)}>open modal</button>
        </>
      );
    };

    const { container } = render(<MockComponent />);

    fireEvent.click(screen.getByText(/open modal/i));
    fireEvent.keyDown(container, {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      charCode: 27,
    });

    expect(container.querySelector('.modal')).not.toHaveClass('active');
  });
});
