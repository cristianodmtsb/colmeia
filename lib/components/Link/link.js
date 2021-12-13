import React from 'react';
import { oneOf, string, node } from 'prop-types';
import { Link as RootLink } from '@magento/venia-ui/lib/drivers';
import defaultClasses from '../Button/button.scss';

/**
 * A component for buttons.
 *
 * You can pass the `role` param to change the look and fell of the button
 *
 */
const Link = ({ role = 'primary', className, children, ...props }) => {
  let classes = defaultClasses[role];
  classes += className ? ` ${className}` : '';

  return (
    <RootLink className={classes} {...props}>
      {children}
    </RootLink>
  );
};

Link.propTypes = {
  role: oneOf([
    'primary',
    'secondary',
    'tertiary',
    'quaternary',
    'buy',
    'text',
  ]),
  className: string,
  children: node,
  to: string.isRequired,
};

export default Link;
