import React, { useEffect, useState } from 'react';
import { string, oneOf, node, bool } from 'prop-types';
import defaultClasses from './input.scss';
import Icon from '../../components/Icon';
import Button from '../../components/Button';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import InputMask from 'react-input-mask';

const Input = ({
  id,
  label,
  state = 'neutral',
  type = 'text',
  min = 0,
  message,
  style,
  placeholder,
  placeholderLabel = false,
  classes: propClasses,
  className: customClasses,
  icon: propIcon,
  onFocus: onFocusProp,
  onBlur: onBlurProp,
  onChange: onChangeProp,
  value: valueProp = '',
  useEye = false,
  color,
  useClear = false,
  clearIcon,
  clearLabel,
  ...props
}) => {
  const [value, setValue] = useState('');
  const [active, setActive] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const classes = mergeClasses(defaultClasses, propClasses);
  const stateClass = state ? ` ${classes[state]}` : '';
  const icon = propIcon || (state === 'success' ? 'success' : 'failure');
  const className = !!customClasses ? ` ${customClasses}` : '';
  let labelClass = classes.label;

  if (placeholderLabel) labelClass += ` ${classes.placeholderLabel}`;
  if (active) labelClass += ` ${classes.labelActive}`;

  const onFocus = e => {
    e.persist();
    if (placeholderLabel) setActive(true);
    onFocusProp && onFocusProp(e);
  };

  const onBlur = e => {
    e.persist();
    if (placeholderLabel && value.length === 0) setActive(false);
    onBlurProp && onBlurProp(e);
  };

  const handleClear = () => {
    setValue('');
  };

  const onChange = e => {
    e.persist();
    const amount = e.target.value;

    if (type !== 'number') {
      setValue(amount);
      onChangeProp && onChangeProp(e);
      return;
    }

    /-[0-9]/.test(+amount) ? setValue(min) : setValue(+amount);
    onChangeProp && onChangeProp(e);
  };

  useEffect(() => {
    setValue(valueProp);
  }, [valueProp]);

  useEffect(() => {
    if (placeholderLabel) {
      setActive(value.length > 0);
    }
  }, [value]);

  const InputComponent = props.mask ? InputMask : 'input';

  return (
    <div className={`${classes.fieldsetContainer}${stateClass}${className}`}>
      {label && (
        <label className={labelClass} htmlFor={id}>
          {label}
        </label>
      )}
      <div className={classes.inputContainer}>
        <InputComponent
          className={classes.input}
          id={id}
          type={showPassword ? 'text' : type}
          min={type === 'number' ? min : ''}
          value={value}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          placeholder={placeholderLabel ? '' : placeholder}
          {...props}
        />
        {state === 'neutral' && useEye && type === 'password' && (
          <Icon
            icon={showPassword ? 'eye-open' : 'eye-closed'}
            size='x-medium'
            color={color ? color : 'white'}
            onClick={() => setShowPassword(!showPassword)}
          />
        )}
        {useClear && value.length > 0 && (
          <Button
            className={classes.clear}
            type='button'
            onClick={handleClear}
            role='text'
          >
            {clearLabel ? clearLabel : clearIcon}
          </Button>
        )}
        {state !== 'neutral' && (
          <Icon
            icon={icon}
            size='x-medium'
            color={state === 'success' ? 'success' : 'danger'}
          />
        )}
      </div>
      {state === 'failure' && message && (
        <div className={classes.message}>{message}</div>
      )}
    </div>
  );
};

Input.propTypes = {
  id: string,
  label: string,
  type: string,
  color: string,
  state: oneOf(['neutral', 'success', 'failure']),
  clearIcon: node,
  clearLable: string,
  useClear: bool,
};

export default Input;
