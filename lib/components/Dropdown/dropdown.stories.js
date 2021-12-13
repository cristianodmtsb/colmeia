import React, { useState } from 'react';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import { useTranslation } from 'react-i18next';
import Dropdown from './index';

export default {
  component: Dropdown,
  title: 'Colmeia/Dropdown',
  decorators: [withKnobs],
};

export const Simple = () => {
  const [value, setValue] = useState();

  const { t } = useTranslation();

  const placeholder = text('PlaceHolder', t('Select'));
  const useCheckIconKnob = boolean('Use Check Icon', false);

  return (
    <div style={{ width: number('Container width', 300), margin: 10 }}>
      <Dropdown
        onChange={setValue}
        value={value}
        placeholder={placeholder}
        useCheckIcon={useCheckIconKnob}
        minWidth={number('Dropdown min width', undefined)}
      >
        {[
          {
            text: t('January'),
            value: 1,
          },
          {
            text: t('February'),
            value: 2,
          },
        ]}
      </Dropdown>
    </div>
  );
};
