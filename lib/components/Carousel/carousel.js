import React from 'react';
import Slider from 'react-slick';
import { bool, number, node, object, arrayOf, func } from 'prop-types';
import defaultClasses from './slider.scss';
import { mergeClasses } from '@magento/venia-ui/lib/classify';

const Carousel = ({
  children,
  setRef,
  showDots = true,
  showArrows = true,
  autoplay = false,
  speed = 500,
  infinite = true,
  nextArrow,
  prevArrow,
  autoplaySpeed = 3000,
  slidesToShow = 1,
  slidesToScroll = 1,
  pauseOnFocus = false,
  responsive,
  classes: propClasses,
  ...props
}) => {
  const classes = mergeClasses(defaultClasses, propClasses);

  const settings = {
    dots: showDots,
    pauseOnFocus,
    autoplay,
    autoplaySpeed,
    arrows: showArrows,
    infinite,
    speed,
    adaptiveHeight: true,
    slidesToShow,
    slidesToScroll,
    responsive,
    ...props,
  };

  const renderWithCustomArrows = () => {
    return (
      <div className={classes.root}>
        <Slider
          ref={setRef}
          prevArrow={prevArrow}
          nextArrow={nextArrow}
          {...settings}
        >
          {children}
        </Slider>
      </div>
    );
  };

  const render = () => {
    return (
      <div className={classes.root}>
        <Slider ref={setRef} {...settings}>
          {children}
        </Slider>
      </div>
    );
  };
  return nextArrow && prevArrow ? renderWithCustomArrows() : render();
};

Carousel.propTypes = {
  setRef: func,
  responsive: arrayOf(object),
  infinite: bool,
  showDots: bool,
  showArrows: bool,
  autoplay: bool,
  pauseOnFocus: bool,
  autoplaySpeed: number,
  speed: number,
  prevArrow: node,
  nextArrow: node,
  slidesToScroll: number,
  slidesToShow: number,
};

export default Carousel;
