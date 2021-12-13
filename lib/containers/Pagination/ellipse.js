import React from 'react';
import { func, object } from 'prop-types';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from './pagination.scss';

const Ellipse = ({ classes: propClasses, ...props }) => {
  const classes = mergeClasses(defaultClasses, propClasses);
  return (
    <button className={classes.ellipse} {...props}>
      ...
    </button>
  );
};

Ellipse.propTypes = {
  classes: object,
  onClick: func,
};

export default Ellipse;
