import React from 'react';
import { number, func } from 'prop-types';
import Page from './page';
import Ellipse from './ellipse';
import defaultClasses from './pagination.scss';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import Icon from '../../components/Icon';

const Pagination = ({
  pages,
  onPageChange,
  currentPage,
  pageRange = 10,
  classes: propClasses,
}) => {
  if (pages <= 1) return null;

  let showPrevEllipsis = false;
  let showNextEllipsis = false;
  const prevDisabled = currentPage === 1;
  const nextDisabled = currentPage === pages;
  const classes = mergeClasses(defaultClasses, propClasses);

  let pageNumbers = new Array(pages).fill(null).map((item, index) => index + 1);

  if (pages > pageRange) {
    const difference = Math.floor(pageRange / 2);

    if (currentPage - difference > 1 && currentPage > Math.ceil(pageRange / 2))
      showPrevEllipsis = true;
    if (currentPage + difference < pages) showNextEllipsis = true;

    let initial = 1;
    if (showPrevEllipsis && showNextEllipsis) {
      initial = currentPage - difference;
    } else if (showPrevEllipsis) {
      initial = currentPage - (pageRange - (pages - currentPage + 1));
    }

    pageNumbers = new Array(pageRange)
      .fill(null)
      .map((item, index) => initial + index);
  }

  const ellipsisClick = type => {
    const newPage =
      type === 'next'
        ? pageNumbers[pageNumbers.length - 1] + 1
        : pageNumbers[0] - 1;
    onPageChange(newPage);
  };

  return (
    <div className={classes.pagination}>
      <button
        disabled={prevDisabled}
        onClick={() => onPageChange(currentPage - 1)}
        className={`${classes.arrow} ${classes.left}`}
      >
        <Icon icon='arrow-right' />
      </button>
      {showPrevEllipsis && <Ellipse onClick={() => ellipsisClick('prev')} />}
      {pageNumbers.map(item => (
        <Page
          key={item}
          onClick={() => onPageChange(item)}
          active={item === currentPage}
          classes={classes}
        >
          {item}
        </Page>
      ))}
      {showNextEllipsis && <Ellipse onClick={() => ellipsisClick('next')} />}
      <button
        disabled={nextDisabled}
        onClick={() => onPageChange(currentPage + 1)}
        className={`${classes.arrow} ${classes.right}`}
      >
        <Icon icon='arrow-right' />
      </button>
    </div>
  );
};

Pagination.propTypes = {
  pages: number,
  pageRange: number,
  onPageChange: func,
  currentPage: number,
};

export default Pagination;
