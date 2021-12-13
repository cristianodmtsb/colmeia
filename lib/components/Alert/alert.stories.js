import React from 'react';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import Alert from './alert';

export default {
  component: Alert,
  title: 'Colmeia/Alert',
  decorators: [withKnobs],
};

const IconSizes = {
  Big: 'big',
  'XX-Medium': 'xx-medium',
  'X-Medium': 'x-medium',
  Medium: 'medium',
  Small: 'small',
  'X-Small': 'x-small',
};

export const Simple = () => {
  const containerStyle = {
    padding: '20px',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignContent: 'space-between',
    alignItems: 'baseline',
  };

  const sizeKnob = select('Icon Size', IconSizes, 'x-medium');

  return (
    <div style={containerStyle}>
      <Alert style={{ margin: '10px' }} danger>
        {text('Error Message', 'Error Message Sample')}
      </Alert>
      <Alert style={{ margin: '10px' }} success iconSize={sizeKnob}>
        {text('Success Message', 'Success Message Sample')}
      </Alert>
      <Alert style={{ margin: '10px' }} warning>
        {text('Warning Message', 'Warning Message Sample')}
      </Alert>
    </div>
  );
};
