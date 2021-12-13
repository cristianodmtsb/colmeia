import React, { useState } from 'react';
import { withKnobs, number } from '@storybook/addon-knobs';
import Rating from './index';

export default {
  component: Rating,
  title: 'Colmeia/Rating',
  decorators: [withKnobs],
};

export const Simple = () => {
  const defaultValue = number('Value', 0);
  const [value, setValue] = useState(defaultValue);

  return (
    <Rating
      value={value}
      onChange={setValue}
      reviewCount={number('review count', 0)}
    />
  );
};
