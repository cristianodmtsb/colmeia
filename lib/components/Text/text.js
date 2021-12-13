import React from 'react';
import { oneOf, node, string } from 'prop-types';
import defaultClasses from './text.scss';

/**
 * A component for texts.
 *
 * You can pass the `type` param to change the look and fell of the text
 *
 */

const Text = ({ type = 'p', subType = '', className, children, ...props }) => {
  if (type === 'p' && subType === '') {
    subType = 'default';
  }

  const Tag = type;

  let classes = '';
  classes += defaultClasses[type] ? `${defaultClasses[type]} ` : '';
  classes += defaultClasses[subType] ? `${defaultClasses[subType]} ` : '';
  classes += className ? `${className}` : '';

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  );
};

Text.propTypes = {
  type: oneOf(['p', 'h1', 'h2', 'h3']),
  subType: oneOf(['default', 'title', 'subtitle', 'primary', 'secondary']),
  className: string,
  children: node.isRequired,
};

export default Text;
