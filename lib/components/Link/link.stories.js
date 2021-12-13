import React from 'react';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import Link from './index';

export default {
  component: Link,
  title: 'Colmeia/Link',
  decorators: [withKnobs],
};

const linkRoles = {
  Primary: 'primary',
  Secondary: 'secondary',
  Tertiary: 'tertiary',
  Quaternary: 'quaternary',
  Buy: 'buy',
  Text: 'text',
};

export const Simple = () => {
  const roleKnob = select('Role', linkRoles, 'text');

  return (
    <Link
      role={roleKnob}
      disabled={boolean('Disabled', false)}
      style={{ margin: '20px' }}
      to={'link.html'}
    >
      {text('Text', 'Link')}
    </Link>
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

  const rolesValues = Object.values(linkRoles);

  return (
    <div style={containerStyle}>
      {rolesValues.map(role => (
        <div key={role} style={{ marginBottom: '20px' }}>
          <p style={{ marginBottom: '5px' }}>Role: {role}</p>
          <Link role={role} style={{ marginRight: '5px' }} to={'link.html'}>
            Link
          </Link>
          <Link role={role} disabled to={'link.html'}>
            Link
          </Link>
        </div>
      ))}
    </div>
  );
};
