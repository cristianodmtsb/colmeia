import React from 'react';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import Button from './index';

export default {
  component: Button,
  title: 'Colmeia/Button',
  decorators: [withKnobs],
};

const buttonRoles = {
  Primary: 'primary',
  Secondary: 'secondary',
  Tertiary: 'tertiary',
  Quaternary: 'quaternary',
  Buy: 'buy',
  Text: 'text',
};

export const Simple = () => {
  const roleKnob = select('Role', buttonRoles, 'primary');

  return (
    <Button
      role={roleKnob}
      disabled={boolean('Disabled', false)}
      style={{ margin: '20px' }}
    >
      {text('Text', 'Button')}
    </Button>
  );
};

export const roles = () => {
  const containerStyle = {
    width: '100%',
    margin: '20px',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  };

  const rolesValues = Object.values(buttonRoles);

  return (
    <div style={containerStyle}>
      {rolesValues.map(role => (
        <div key={role} style={{ marginBottom: '20px' }}>
          <p style={{ marginBottom: '5px' }}>Role: {role}</p>
          <Button role={role} style={{ marginRight: '5px' }}>
            Button
          </Button>
          <Button role={role} disabled>
            Button
          </Button>
        </div>
      ))}
    </div>
  );
};
