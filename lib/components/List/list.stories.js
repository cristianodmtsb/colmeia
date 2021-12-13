import React from 'react';
import List from './list';

export default {
  component: List,
  title: 'Colmeia/List',
};

export const Table = () => {
  return (
    <div style={{ position: 'relative', width: 300, margin: 10 }}>
      <List>
        {[
          { text: 'January', value: 1 },
          { text: 'February', value: 2 },
          { text: 'March', value: 3 },
        ]}
      </List>
    </div>
  );
};
