import React, { useState } from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Pagination from '../../containers/Pagination';

const Component = ({ pages = 10, pageRange = 5 }) => {
  const [page, setPage] = useState(1);
  return (
    <Pagination
      pages={pages}
      onPageChange={setPage}
      currentPage={page}
      pageRange={pageRange}
    />
  );
};

const getLeftEllipse = container =>
  container.querySelector('.arrow.left + .ellipse');
const getRightEllipse = container =>
  container.querySelector('.page + .ellipse');

describe('Pagination Component', () => {
  it('Pagination is printing the correct amount of pages', () => {
    const { container } = render(<Component />);
    expect(container.getElementsByClassName('page')).toHaveLength(5);
  });

  it('should change the page when the page is clicked', () => {
    render(<Component />);

    expect(screen.queryByText('1')).toHaveClass('active');
    fireEvent.click(screen.queryByText('3'));
    expect(screen.queryByText('3')).toHaveClass('active');
  });

  it('should change the page when the arrow is clicked', () => {
    const { container } = render(<Component />);

    expect(screen.queryByText('1')).toHaveClass('active');

    fireEvent.click(container.querySelector('.arrow.right'));
    expect(screen.queryByText('2')).toHaveClass('active');

    fireEvent.click(container.querySelector('.arrow.left'));
    expect(screen.queryByText('1')).toHaveClass('active');
  });

  it('should show the ellipse in the correct moment', () => {
    const { container } = render(<Component />);
    expect(getLeftEllipse(container)).not.toBeTruthy();
    expect(getRightEllipse(container)).toBeTruthy();

    fireEvent.click(screen.queryByText('5'));

    expect(getLeftEllipse(container)).toBeTruthy();
    expect(getRightEllipse(container)).toBeTruthy();

    fireEvent.click(screen.queryByText('7'));
    fireEvent.click(screen.queryByText('9'));

    expect(getLeftEllipse(container)).toBeTruthy();
    expect(getRightEllipse(container)).not.toBeTruthy();
  });

  it('should change to the correct pages when the ellipse is clicked', () => {
    const { container } = render(<Component />);

    fireEvent.click(getRightEllipse(container));
    expect(container.querySelector('.page.active')).toHaveTextContent('6');

    fireEvent.click(getLeftEllipse(container));
    expect(container.querySelector('.page.active')).toHaveTextContent('3');
  });
});
