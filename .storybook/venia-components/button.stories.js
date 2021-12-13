import React from 'react';
import VeniaButton from '@magento/venia-ui/lib/components/Button';
import { select, text, withKnobs } from '@storybook/addon-knobs';

export default {
  component: VeniaButton,
  title: 'Venia Components/Button',
  decorators: [withKnobs],
  parameters: {
    componentSubtitle: 'Button component',
  },
};

export const Button = () => {
  const textKnob = text('Text', 'Venia Button');

  const priorityKnob = select(
    'Priority',
    {
      Low: 'low',
      Normal: 'normal',
      High: 'high',
    },
    'normal',
  );

  const typeKnob = select(
    'Type',
    {
      Button: 'button',
      Reset: 'reset',
      Submit: 'submit',
    },
    'button',
  );

  return (
    <VeniaButton priority={priorityKnob} type={typeKnob}>
      {textKnob}
    </VeniaButton>
  );
};
