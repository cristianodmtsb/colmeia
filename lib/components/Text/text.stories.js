import React from 'react';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import Text from './index';

export default {
  component: Text,
  title: 'Colmeia/Text',
  decorators: [withKnobs],
};

const textTypes = {
  'Paragraph (p)': 'p',
  'Heading 1 (h1)': 'h1',
  'Heading 2 (h2)': 'h2',
  'Heading 3 (h3)': 'h3',
};

const textSubTypesParagraph = {
  Default: 'default',
  Title: 'title',
  Subtitle: 'subtitle',
};

const textSubTypesHeading = {
  'Rule 01': 'primary',
  'Rule 02': 'secondary',
};

export const Simple = () => {
  const typeKnob = select('Type', textTypes, 'p');

  if (typeKnob === 'p') {
    const subTypeKnobParagraph = select(
      'Sub-type',
      textSubTypesParagraph,
      'default',
    );
    return (
      <Text
        type={typeKnob}
        subType={subTypeKnobParagraph}
        style={{ margin: '20px' }}
      >
        {text('Text', 'Text Sample')}
      </Text>
    );
  }

  if (typeKnob === 'h1') {
    const subTypeKnobHeading = select(
      'Sub-type ',
      textSubTypesHeading,
      'primary',
    );
    return (
      <Text
        type={typeKnob}
        subType={subTypeKnobHeading}
        style={{ margin: '20px' }}
      >
        {text('Text ', 'Text Sample')}
      </Text>
    );
  }

  return (
    <Text type={typeKnob} style={{ margin: '20px' }} subType=''>
      {text('Text', 'Text Sample')}
    </Text>
  );
};
