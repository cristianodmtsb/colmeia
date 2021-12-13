import React from 'react';
import Input from './input';
import Icon from '../../components/Icon';
import { withKnobs, select, text, boolean } from '@storybook/addon-knobs';

export default {
  component: Input,
  title: 'Colmeia/Input',
  decorators: [withKnobs],
};

const inputState = {
  Success: 'success',
  Failure: 'failure',
  Neutral: 'neutral',
};

const icons = {
  Valid: 'success',
  Invalid: 'failure',
};

const type = {
  Text: 'text',
  Password: 'password',
  Email: 'email',
  Number: 'number',
  Search: 'search',
};

const min = {
  '0': 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
};

export const Simple = () => {
  return (
    <div style={{ margin: '20px' }}>
      <Input
        label='User'
        id='username'
        type={select('Type', type, 'Text')}
        min={select('Min', min, '0')}
        useEye={boolean('Use eye', false)}
        useClear={boolean('Use clear', false)}
        clearIcon={<Icon icon='close' size='medium' />}
        color='primary'
        placeholder='Username'
        mask={text('Mask', '')}
        placeholderLabel={boolean('Placeholder Label', false)}
        icon={select('Icon', icons, 'failure')}
        required
        state={select('State', inputState, 'neutral')}
        message={text('Message', '* This field is required')}
      />
    </div>
  );
};
