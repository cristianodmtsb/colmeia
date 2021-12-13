import React from 'react';
import { node, bool } from 'prop-types';
import defaultClasses from './shape.css';
import { mergeClasses } from '@magento/venia-ui/lib/classify';

/**
 *
 * The Shape component inteded use is to be a container around
 * other components.<br>
 *
 * <h2>Props</h2>
 *  These props are optional, if not specified the component will be
 * rendered using the default flexbox values `row` and `nowrap`.<br>
 * <ul>
 *  <li>**column**: renders the component using `flex-direction: column`</li>
 *  <li>**wrap**: renders the component using `flex-wrap: wrap`</li>
 * </ul>
 *
 *
 */
const Shape = ({
  children,
  column,
  wrap,
  classes: classesProp,
  className,
  ...props
}) => {
  const classes = mergeClasses(defaultClasses, classesProp);
  let rootClasses = classes.base;
  rootClasses += column ? ` ${classes.flexColumn}` : '';
  rootClasses += wrap ? ` ${classes.flexWrap}` : '';
  rootClasses += className ? ` ${className}` : '';

  return (
    <div className={rootClasses} {...props}>
      {children}
    </div>
  );
};

Shape.propTypes = {
  children: node,
  column: bool,
  wrap: bool,
};

export default Shape;
