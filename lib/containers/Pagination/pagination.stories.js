import React, { useState } from 'react';
import Pagination from './pagination';
import { withKnobs, number, boolean, text } from '@storybook/addon-knobs';

export default {
  component: Pagination,
  title: 'Colmeia/Pagination',
  decorators: [withKnobs],
};

export const Simple = () => {
  const containerStyles = {
    display: 'flex',
    padding: '20px',
    position: 'relative',
    justifyContent: 'center',
  };

  const Component = () => {
    const [page, setPage] = useState(1);
    const pagesKnob = number('Pages', 100);
    const pageRangeKnob = number('Page Range', 10);

    return (
      <div style={containerStyles}>
        <Pagination
          pages={pagesKnob}
          onPageChange={setPage}
          currentPage={page}
          pageRange={pageRangeKnob}
        />
      </div>
    );
  };

  return <Component />;
};
