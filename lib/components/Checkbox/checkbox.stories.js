import React from 'react';
import {
  withKnobs,
  number,
  text,
  select,
  boolean,
} from '@storybook/addon-knobs';
import Checkbox from './index';
import changeKnob from '../../../.storybook/changeKnob';

export default {
  component: Checkbox,
  title: 'Colmeia/Checkbox',
  decorators: [withKnobs],
};

const checkboxQty = {
  range: true,
  min: 1,
  max: 10,
  step: 1,
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

const isChecked = {
  Checked: true,
  Unchecked: false,
};

export const Simple = () => {
  const statusKnobLabel = 'Status';
  const statusKnob = boolean(statusKnobLabel, false);
  const iconColorKnob = select('Color', IconColors, 'white');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', margin: 5 + 'px' }}>
      <Checkbox
        id='1'
        children={text('Text', `Text Sample`)}
        iconColor={iconColorKnob}
        checked={statusKnob}
        onChange={() => changeKnob(statusKnobLabel, !statusKnob)}
      />
    </div>
  );
};

export const Multiple = () => {
  const checkboxQtyKnob = number('Number of checkboxes', 5, checkboxQty);
  const iconColorKnob = select('Color', IconColors, 'white');
  let checkboxes = [];

  for (let i = 1; i <= checkboxQtyKnob; i++) {
    checkboxes.push(
      <div style={{ margin: 5 + 'px' }}>
        <Checkbox
          id={i}
          children={text('Text', `Text Sample`)}
          iconColor={iconColorKnob}
        />
      </div>,
    );
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', margin: 0 }}>
      {checkboxes}
    </div>
  );
};
