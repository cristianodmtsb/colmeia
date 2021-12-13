import React, { useState, useRef } from 'react';
import { string, node } from 'prop-types';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from './tooltip.scss';
import Icon from '../Icon';
import Shape from '../Shape';
import useClickOutside from '../../hooks/useClickOutside';

const Tooltip = ({ children, className, content, classes: propClasses }) => {
  const [isOpen, setIsOpen] = useState();

  const tooltipRef = useRef();
  useClickOutside(tooltipRef, () => setIsOpen(false));

  const iconClick = () => setIsOpen(!isOpen);

  const classes = mergeClasses(defaultClasses, propClasses);
  const containerClass = `${classes.tooltip} ${className || ''}`;
  const tooltipClass = isOpen
    ? `${classes.tooltiptext} ${classes.show}`
    : classes.tooltiptext;

  const tooltipStyle = isOpen
    ? { opacity: 1, visibility: 'visible' }
    : { opacity: 0, visibility: 'hidden' };

  return (
    <div className={containerClass} ref={tooltipRef}>
      <span onClick={iconClick} className={classes.tooltipClick}>
        {children}
      </span>
      <Shape
        className={tooltipClass}
        style={tooltipStyle}
        data-testid='tooltip-text'
      >
        <Icon
          icon='tooltip'
          size='small'
          color='tertiary'
          className={classes.arrow}
        />
        {content}
      </Shape>
    </div>
  );
};

Tooltip.propTypes = {
  children: node.isRequired,
  content: node.isRequired,
  className: string,
};

export default Tooltip;
