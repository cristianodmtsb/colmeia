import React, { useState } from 'react';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import Toggle from './index';
import Shape from '../Shape';

export default {
  component: Toggle,
  title: 'Colmeia/Toggle',
  decorators: [withKnobs],
};

export const Simple = () => {
  const [status, setStatus] = useState(false);

  return (
    <div style={{ margin: '20px', width: '220px' }}>
      <Toggle
        status={status}
        onChange={setStatus}
        firstOption='Unit'
        secondOption='Box'
      />
    </div>
  );
};
