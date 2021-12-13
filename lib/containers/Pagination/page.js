import React from 'react';
import { bool, oneOfType, string, element, number } from 'prop-types';
import defaultClasses from './pagination.scss';
import { mergeClasses } from '@magento/venia-ui/lib/classify';

const Page = ({ active, children, classes: propClasses, ...props }) => {
  const classes = mergeClasses(defaultClasses, propClasses);
  const pageClasses = classes.page + (active ? ` ${classes.active}` : '');
  return (
    <button disabled={active} className={pageClasses} {...props}>
      {children}
    </button>
  );
};

Page.propTypes = {
  active: bool,
  children: oneOfType([string, element, number]),
};

export default Page;
