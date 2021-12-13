import React, { useState } from 'react';
import { withKnobs, text, number } from '@storybook/addon-knobs';
import QuestionModal from './questionModal';
import Button from '../Button';

export default {
  component: QuestionModal,
  title: 'Colmeia/QuestionModal',
  decorators: [withKnobs],
};

export const Simple = () => {
  const [active, setActive] = useState(false);
  return (
    <div>
      <QuestionModal
        active={active}
        confirmAction={() => setActive(false)}
        cancelAction={() => setActive(false)}
        cancelLabel={text('Cancel Knob', 'No')}
        confirmLabel={text('Confirm Knob', 'Yes')}
      >
        <span>Are you sure?</span>
      </QuestionModal>
      <Button onClick={() => setActive(true)}>Open Modal</Button>
    </div>
  );
};
