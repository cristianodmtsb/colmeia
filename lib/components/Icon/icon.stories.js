import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import Icon from './index';

export default {
  component: Icon,
  title: 'Colmeia/Icon',
  decorators: [withKnobs],
};

const IconColors = {
  Black: 'black',
  White: 'white',
  Primary: 'primary',
  Secondary: 'secondary',
  Tertiary: 'tertiary',
  Success: 'success',
  Warning: 'warning',
  Danger: 'danger',
};

const IconIds = {
  Alert: 'alert',
  Failure: 'failure',
  Success: 'success',
  Check: 'check',
  Search: 'search',
  Heart: 'heart',
  Avatar: 'avatar',
  Bottle: 'bottle',
  Can: 'can',
  Close: 'close',
  Pin: 'pin',
  Phone: 'phone',
  Barrel: 'barrel',
  ArrowRight: 'arrow-right',
  Dropdown: 'dropdown',
  Star: 'star',
  Minus: 'minus',
  Plus: 'plus',
  Tooltip: 'tooltip',
  Trash: 'trash',
  EyeOpen: 'eye-open',
  EyeClosed: 'eye-closed',
};

const IconSizes = {
  Big: 'big',
  'XX-Medium': 'xx-medium',
  'X-Medium': 'x-medium',
  Medium: 'medium',
  Small: 'small',
  'X-Small': 'x-small',
};

export const IconExample = () => {
  const colorKnob = select('Color', IconColors, 'black');
  const sizeKnob = select('Size', IconSizes, 'medium');

  const ids = Object.values(IconIds);

  return (
    <div
      style={{
        width: '50%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      {ids.map(id => {
        return (
          <div key={id}>
            <div
              style={{
                borderRadius: '10px',
                padding: '10px',
                border: '2px solid black',
                margin: '20px',
                textAlign: 'center',
              }}
            >
              <Icon icon={id} color={colorKnob} size={sizeKnob} />
            </div>
            <h2 style={{ textAlign: 'center' }}>{id}</h2>
          </div>
        );
      })}
    </div>
  );
};
