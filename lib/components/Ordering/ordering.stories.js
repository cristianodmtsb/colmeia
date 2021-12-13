import React, { useState, useMemo } from 'react';
import { withKnobs, text, number } from '@storybook/addon-knobs';
import { useTranslation } from 'react-i18next';
import Ordering from './index';

export default {
  component: Ordering,
  title: 'Colmeia/Ordering',
  decorators: [withKnobs],
};

export const Simple = () => {
  const [value, setValue] = useState();

  const { t } = useTranslation();

  const orderingFields = useMemo(
    () => [
      {
        text: t('Relevance'),
        value: { attribute: 'relevance', sortDirection: 'ASC' },
      },
      {
        text: 'A-Z',
        value: { attribute: 'name', sortDirection: 'ASC' },
      },
      {
        text: 'Z-A',
        value: { attribute: 'name', sortDirection: 'DESC' },
      },
      {
        text: t('Lowest price'),
        value: { attribute: 'price', sortDirection: 'ASC' },
      },
      {
        text: t('Highest price'),
        value: { attribute: 'price', sortDirection: 'DESC' },
      },
      {
        text: t('Lowest discount'),
        value: { attribute: 'discount', sortDirection: 'ASC' },
      },
      {
        text: t('Highest discount'),
        value: { attribute: 'discount', sortDirection: 'DESC' },
      },
    ],
    [t],
  );

  return (
    <div>
      <Ordering
        onChange={setValue}
        value={value}
        placeholder={text('placeholder', t('Relevance'))}
        dropdownMinWidth={number('Dropdown min width', 125)}
      >
        {orderingFields}
      </Ordering>
    </div>
  );
};
