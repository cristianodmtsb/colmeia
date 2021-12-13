import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Carousel from '../../components/Carousel';

jest.mock('@magento/venia-ui/lib/classify');

describe('Carousel Component', () => {
  it('should load all slides in Carousel', () => {
    const { container } = render(
      <Carousel showArrows={true} showDots={true}>
        <div>
          <h1>1</h1>
        </div>
        <div>
          <h1>2</h1>
        </div>
        <div>
          <h1>3</h1>
        </div>
        <div>
          <h1>4</h1>
        </div>
      </Carousel>,
    );
    const slides = container.querySelectorAll(
      '.slick-slide:not(.slick-cloned)',
    );
    expect(slides).toHaveLength(4);
    slides.forEach((slide, i) => {
      expect(slide).toContainHTML(`<h1>${i + 1}</h1>`);
    });
  });

  it('should go to next slide on arrow click', () => {
    const { container } = render(
      <Carousel showArrows={true} showDots={true}>
        <div>
          <h1>1</h1>
        </div>
        <div>
          <h1>2</h1>
        </div>
      </Carousel>,
    );

    fireEvent.click(container.querySelector('.slick-next'));
    const slide1 = container.querySelectorAll(
      '.slick-slide:not(.slick-cloned)',
    )[0];
    const slide2 = container.querySelectorAll(
      '.slick-slide:not(.slick-cloned)',
    )[1];
    expect(slide1).toHaveAttribute('aria-hidden', 'true');
    expect(slide2).toHaveAttribute('aria-hidden', 'false');
  });

  it('should show correct slides on dots click', () => {
    const { container } = render(
      <Carousel showArrows={true} showDots={true} autoplay={false}>
        <div>
          <h1>1</h1>
        </div>
        <div>
          <h1>2</h1>
        </div>
        <div>
          <h1>3</h1>
        </div>
      </Carousel>,
    );
    const buttons = container.querySelectorAll('.slick-dots button');
    fireEvent.click(buttons[1]);
    const slide2 = container.querySelectorAll(
      '.slick-slide:not(.slick-cloned)',
    )[1];
    expect(slide2).toHaveAttribute('aria-hidden', 'false');
  });

  it('should show dots', () => {
    const { container } = render(
      <Carousel showDots={true}>
        <div>
          <h1>1</h1>
        </div>
        <div>
          <h1>2</h1>
        </div>
      </Carousel>,
    );
    expect(container.querySelector('.slick-dots')).toBeInTheDocument();
  });

  it('should show arrows', () => {
    const { container } = render(
      <Carousel showArrows={true}>
        <div>
          <h1>1</h1>
        </div>
        <div>
          <h1>2</h1>
        </div>
      </Carousel>,
    );
    expect(container.querySelector('.slick-next')).toBeInTheDocument();
    expect(container.querySelector('.slick-prev')).toBeInTheDocument();
  });

  it('should render custom Arrows', () => {
    const NextArrow = ({ className, style, onClick }) => {
      return (
        <div
          className={className}
          style={{ ...style, display: 'block', background: 'red' }}
          onClick={onClick}
        />
      );
    };
    const PrevArrow = ({ className, style, onClick }) => {
      return (
        <div
          className={className}
          style={{ ...style, display: 'block', background: 'green' }}
          onClick={onClick}
        />
      );
    };

    const { container } = render(
      <Carousel
        prevArrow={<PrevArrow />}
        nextArrow={<NextArrow />}
        showArrows={true}
      >
        <div>
          <h1>1</h1>
        </div>
        <div>
          <h1>2</h1>
        </div>
      </Carousel>,
    );

    expect(container.querySelector('.slick-next')).toHaveStyle(
      'background: red',
    );
    expect(container.querySelector('.slick-prev')).toHaveStyle(
      'background: green',
    );
  });

  it('should change slides automatically on autoplay', async () => {
    const { container } = render(
      <Carousel autoplay={true} speed={200} autoplaySpeed={200}>
        <div>
          <h1>1</h1>
        </div>
        <div>
          <h1>2</h1>
        </div>
        <div>
          <h1>3</h1>
        </div>
      </Carousel>,
    );
    const slides = container.querySelectorAll(
      '.slick-slide:not(.slick-cloned)',
    );
    await waitFor(() => expect(slides[2]).toHaveClass('slick-current'), {
      timeout: 2000,
    });
  });
});
