import React from 'react';
import Loader from './loader';
import { boolean, withKnobs } from '@storybook/addon-knobs';

export default {
  component: Loader,
  title: 'Colmeia/Loader',
  decorators: [withKnobs],
};

export const Simple = () => {
  const containerStyle = {
    display: 'block',
    width: '200px',
    height: '200px',
    position: 'relative',
    margin: '50px',
    backgroundColor: 'red',
  };
  const fullScreenKnob = boolean('FullScreen', false);
  const hide = boolean('Hide Loader', false);

  return (
    <div style={containerStyle}>
      {!hide && <Loader fullScreen={fullScreenKnob} />}
    </div>
  );
};
