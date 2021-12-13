import React, { forwardRef } from 'react';
import { oneOf, string, node } from 'prop-types';
import defaultClasses from './button.scss';

/**
 * A component for buttons.
 *
 * You can pass the `role` param to change the look and fell of the button
 *
 */
const Button = forwardRef(
  (
    { role = 'primary', type = 'button', className, children, ...props },
    ref,
  ) => {
    let classes = defaultClasses[role];
    classes += className ? ` ${className}` : '';

    return (
      <button className={classes} type={type} ref={ref} {...props}>
        {children}
      </button>
    );
  },
);

Button.propTypes = {
  role: oneOf([
    'primary',
    'secondary',
    'tertiary',
    'quaternary',
    'buy',
    'text',
  ]),
  type: oneOf(['button', 'submit']),
  className: string,
  children: node,
};

export default Button;
