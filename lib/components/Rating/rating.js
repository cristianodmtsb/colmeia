import React from 'react';
import { string, func, number } from 'prop-types';
import defaultClasses from './rating.css';
import Button from '../Button/button';
import Star from './star.js';
import { mergeClasses } from '@magento/venia-ui/lib/classify';

const reviewText = reviewCount => {
  if (reviewCount === 1) {
    return `${reviewCount} rating`;
  }

  if (reviewCount > 1) {
    return `${reviewCount} ratings`;
  }

  return 'No rating';
};

const Rating = ({
  value,
  className,
  onChange,
  reviewCount,
  onTextClick,
  classes: propClasses,
}) => {
  const classes = mergeClasses(defaultClasses, propClasses);
  const containerClass = `${classes.container} ${className || ''}`;

  return (
    <div className={containerClass}>
      <div className={classes.iconContainer}>
        <Star value={value} starValue={5} onClick={onChange} />
        <Star value={value} starValue={4} onClick={onChange} />
        <Star value={value} starValue={3} onClick={onChange} />
        <Star value={value} starValue={2} onClick={onChange} />
        <Star value={value} starValue={1} onClick={onChange} />
      </div>
      <Button role='text' onClick={onTextClick} className={classes.review}>
        {reviewText(reviewCount)}
      </Button>
    </div>
  );
};

Rating.propTypes = {
  reviewCount: number.isRequired,
  value: number.isRequired,
  onChange: func.isRequired,
  onTextClick: func,
  className: string,
};

export default Rating;
