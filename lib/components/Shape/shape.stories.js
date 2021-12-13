import React from 'react';
import { withKnobs, boolean, number } from '@storybook/addon-knobs';
import Shape from './index';
import { Button } from '../..';

export default {
  component: Shape,
  title: 'Colmeia/Shape',
  decorators: [withKnobs],
};

const label = 'No. of children';
const options = {
  range: true,
  min: 0,
  max: 100,
  step: 1,
};
const defaultValue = 3;

const renderChildren = numberOfChildren => {
  const arr = [];
  for (let i = 0; i < numberOfChildren; i++) {
    arr.push(<Button key={i}>Button</Button>);
  }
  return arr;
};

export const Simple = () => {
  const value = number(label, defaultValue, options);

  return (
    <>
      <Shape
        style={{ margin: '20px' }}
        column={boolean('Column', false)}
        wrap={boolean('Wrap', false)}
      >
        {renderChildren(value)}
      </Shape>
    </>
  );
};
