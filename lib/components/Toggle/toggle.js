import React from 'react';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from './toggle.scss';

const Toggle = ({
  status,
  onChange,
  firstOption,
  secondOption,
  classes: propClasses,
}) => {
  const classes = mergeClasses(defaultClasses, propClasses);

  return (
    <div className={`${classes.toggle}${status ? ` ${classes.active}` : ''}`}>
      <button className={classes.option} onClick={() => onChange(false)}>
        {firstOption}
      </button>
      <button className={classes.option} onClick={() => onChange(true)}>
        {secondOption}
      </button>
    </div>
  );
};

export default Toggle;
