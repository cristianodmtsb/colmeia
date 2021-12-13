import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import Tooltip from './index';

export default {
  component: Tooltip,
  title: 'Colmeia/Tooltip',
  decorators: [withKnobs],
};

export const Simple = () => {
  return (
    <div style={{ marginTop: 100, marginLeft: 50 }}>
      <Tooltip content={<span>{text('Content', 'This is a Tooltip')} </span>}>
        {text('Children', 'Click here!')}
      </Tooltip>
    </div>
  );
};
