import React, { useState } from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import Input from '../../containers/Input';

const mockValues = {
  BUTTON_TEXT: 'change value',
  INPUT_NEW_VALUE: 'new value',
  INPUT_LABEL: 'User',
  INPUT_ID: 'username',
};

beforeEach(() => jest.clearAllMocks());
describe('Input Component', () => {
  it('should update value', () => {
    const { INPUT_ID, INPUT_LABEL, INPUT_NEW_VALUE } = mockValues;
    const { getByLabelText } = render(
      <Input
        id={INPUT_ID}
        label={INPUT_LABEL}
        message='This field is required'
        required
      />,
    );
    const element = getByLabelText(INPUT_LABEL);

    fireEvent.change(element, {
      target: {
        value: INPUT_NEW_VALUE,
      },
    });

    expect(element).toHaveValue(INPUT_NEW_VALUE);
  });

  it('should call input events (onFocus, onBlur and onChange)', () => {
    const onChange = jest.fn();
    const onBlur = jest.fn();
    const onFocus = jest.fn();
    const { INPUT_ID, INPUT_LABEL, INPUT_NEW_VALUE } = mockValues;

    const { getByLabelText } = render(
      <Input
        id={INPUT_ID}
        label={INPUT_LABEL}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />,
    );

    const element = getByLabelText(INPUT_LABEL);

    element.focus();
    element.blur();
    fireEvent.change(element, {
      target: {
        value: INPUT_NEW_VALUE,
      },
    });

    expect(onChange).toHaveBeenCalled();
    expect(onFocus).toHaveBeenCalled();
    expect(onBlur).toHaveBeenCalled();

    expect(onBlur.mock.calls[0][0].target).toBe(element);
    expect(onFocus.mock.calls[0][0].target).toBe(element);
    expect(onChange.mock.calls[0][0].target).toHaveValue(INPUT_NEW_VALUE);
  });

  it('should accept changes from prop', () => {
    const { INPUT_LABEL, INPUT_NEW_VALUE, BUTTON_TEXT } = mockValues;

    const MockComponent = () => {
      const [value, setValue] = useState('');

      return (
        <>
          <Input
            id='username'
            label={INPUT_LABEL}
            onChange={e => setValue(e.target.value)}
            placeholderLabel={true}
            value={value}
          />
          <button onClick={() => setValue(INPUT_NEW_VALUE)}>
            {BUTTON_TEXT}
          </button>
        </>
      );
    };

    const { getByLabelText, getByText } = render(<MockComponent />);

    const element = getByLabelText(INPUT_LABEL);
    const button = getByText(BUTTON_TEXT);

    fireEvent.click(button);
    expect(element).toHaveValue(INPUT_NEW_VALUE);
  });

  it('Should not show eye if type is not password or text', () => {
    const MockComponent = () => {
      return (
        <Input placeholder='Insert email here' type='email' useEye={true} />
      );
    };

    render(<MockComponent />);

    const input = screen.getByPlaceholderText(/insert email here/i);

    expect(input.nextElementSibling).not.toBeInTheDocument();
  });

  it('Should change type to text on icon click', () => {
    const MockComponent = () => {
      return (
        <Input placeholder='Insert password' type='password' useEye={true} />
      );
    };

    render(<MockComponent />);

    const input = screen.getByPlaceholderText(/insert password/i);
    const eyeIcon = input.nextElementSibling;

    fireEvent.click(eyeIcon);
    expect(input).toHaveAttribute('type', 'text');
  });

  it('Should add mask when the param is passed', () => {
    render(<Input placeholder='mask test' mask='99/99/99' />);

    const input = screen.getByPlaceholderText(/mask test/i);

    fireEvent.change(input, {
      target: {
        value: mockValues.INPUT_NEW_VALUE,
      },
    });
    expect(input).toHaveValue('__/__/__');
  });

  it('Should not accept inputs other than numbers', () => {
    const min = 1;
    const { getByLabelText } = render(
      <Input id='quantity' label='Amount' type='number' min={min} />,
    );
    const element = getByLabelText('Amount');

    fireEvent.change(element, {
      target: {
        value: -1,
      },
    });

    expect(element).toHaveValue(min);
  });
});
