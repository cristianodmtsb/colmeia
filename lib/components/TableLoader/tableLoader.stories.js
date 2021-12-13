import React from 'react';
import { withKnobs, number } from '@storybook/addon-knobs';
import TableLoader from './index';

export default {
  component: TableLoader,
  title: 'Colmeia/TableLoader',
  decorators: [withKnobs],
};

const containerStyles = {
  margin: '20px auto',
};

export const Simple = () => {
  const linesKnob = number('Lines', 6);
  const columnsKnob = number('Columns', 6);

  return (
    <div style={containerStyles}>
      <TableLoader lines={linesKnob} columns={columnsKnob} />
    </div>
  );
};
