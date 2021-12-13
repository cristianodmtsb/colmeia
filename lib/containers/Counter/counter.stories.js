import React from 'react';
import { withKnobs, number } from '@storybook/addon-knobs';
import Counter from './index';

export default {
  component: Counter,
  title: 'Colmeia/Counter',
  decorators: [withKnobs],
};

const options = {
  range: true,
  min: 1,
  max: 99,
  step: 1,
};

const widthRange = {
  range: true,
  min: 170,
  max: 400,
  step: 5,
};

export const Simple = () => {
  const minKnob = number('Min. value', '1', options);
  const maxKnob = number('Max. value', '10', options);
  const width = number('Width', '180', widthRange);
  return <Counter minValue={minKnob} maxValue={maxKnob} width={width + 'px'} />;
};
