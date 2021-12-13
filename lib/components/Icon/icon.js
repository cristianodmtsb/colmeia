import React from 'react';
import { string, oneOf } from 'prop-types';
import defaultClasses from './icon.scss';
import { mergeClasses } from '@magento/venia-ui/lib/classify';

const Icon = ({
  size = 'medium',
  color = 'black',
  icon,
  className,
  classes: propClasses,
  ...props
}) => {
  const classes = mergeClasses(defaultClasses, propClasses);

  return (
    <svg
      className={`${classes[size]} ${classes[color]} ${
        className ? className : ''
      }`}
      {...props}
    >
      <use xlinkHref={`/sprites.svg#sprite-${icon}`} />
    </svg>
  );
};

Icon.propTypes = {
  className: string,
  size: oneOf(['big', 'xx-medium', 'x-medium', 'medium', 'small', 'x-small']),
  color: oneOf([
    'black',
    'white',
    'primary',
    'secondary',
    'tertiary',
    'success',
    'warning',
    'danger',
  ]),
  icon: string.isRequired,
};

export default Icon;
