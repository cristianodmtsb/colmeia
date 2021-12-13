import React, { useState } from 'react';
import { string, number } from 'prop-types';

import Icon from '../../components/Icon';
import Button from '../../components/Button';
import Input from '../Input';

import defaultClasses from './counter.scss';
import { mergeClasses } from '@magento/venia-ui/lib/classify';

const Counter = ({
  id,
  minValue = 1,
  maxValue = Number.MAX_VALUE,
  width = '180px',
  classes: propClasses,
}) => {
  const [count, setCount] = useState(minValue);
  const classes = mergeClasses(defaultClasses, propClasses);

  const decrementCounter = () => {
    count > minValue && setCount(count - 1);
  };
  const incrementCounter = () => {
    count < maxValue && setCount(+count + 1);
  };

  return (
    <div style={{ width: width }} className={classes.root}>
      <Button
        role='text'
        data-testid='decreaseButton'
        onClick={decrementCounter}
        disabled={+count === +minValue}
        className={classes.button}
      >
        <Icon icon='minus' color='tertiary' size='xx-medium' />
      </Button>
      <Input
        id={id}
        value={count}
        className={classes.inputContainer}
        data-testid='counterInput'
      />
      <Button
        role='text'
        data-testid='increaseButton'
        onClick={incrementCounter}
        disabled={+count === +maxValue}
        className={classes.button}
      >
        <Icon icon='plus' color='tertiary' size='xx-medium' />
      </Button>
    </div>
  );
};

Counter.propTypes = {
  id: string,
  minValue: number,
  maxValue: number,
  width: string,
};

export default Counter;
