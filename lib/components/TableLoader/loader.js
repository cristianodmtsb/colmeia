import React from 'react';
import defaultClasses from './loader.scss';
import { mergeClasses } from '@magento/venia-ui/lib/classify';

const Loader = ({ columns = 5, lines = 5, classes: propClasses }) => {
  const classes = mergeClasses(defaultClasses, propClasses);

  return (
    <div className={classes.loaderContainer}>
      {Array(lines)
        .fill('')
        .map((value, index) => (
          <div key={index} className={classes.row}>
            {Array(columns)
              .fill('')
              .map((value, index) => (
                <span key={index} className={classes.column} />
              ))}
          </div>
        ))}
    </div>
  );
};

export default Loader;
