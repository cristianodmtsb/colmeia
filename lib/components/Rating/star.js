import React, { useCallback } from 'react';
import defaultClasses from './rating.css';
import Icon from '../Icon';

const Star = ({ value, starValue, onClick }) => {
  const onClickHandler = useCallback(() => onClick(starValue), [starValue]);
  const activeClass = value >= starValue ? defaultClasses.active : '';

  return (
    <span
      onClick={onClickHandler}
      className={`${defaultClasses.icon} ${activeClass}`}
      data-testid={`star-${starValue}`}
    >
      <Icon icon='star' />
    </span>
  );
};

export default Star;
