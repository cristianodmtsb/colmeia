import React from 'react';
import { withKnobs, boolean, number } from '@storybook/addon-knobs';
import Carousel from './index';
import myClasses from './index.scss';

export default {
  component: Carousel,
  title: 'Colmeia/Carousel',
  decorators: [withKnobs],
};

const speedOptions = {
  range: true,
  min: 0,
  max: 3000,
  step: 100,
};

const images = [
  'https://live.staticflickr.com/3749/9782511844_f26dd2702d_z.jpg',
  'https://live.staticflickr.com/3168/2692591208_792d2c6f86_z.jpg',
  'https://live.staticflickr.com/2872/9835678995_9e71727b6c_z.jpg',
  'https://live.staticflickr.com/3749/9782511844_f26dd2702d_z.jpg',
  'https://live.staticflickr.com/3749/9782511844_f26dd2702d_z.jpg',
];

export const Image = () => {
  return (
    <div className={myClasses.container}>
      <Carousel
        showDots={boolean('Dots', false)}
        showArrows={boolean('Arrows', true)}
        autoplay={boolean('Autoplay', true)}
        autoplaySpeed={number('AutoPlay Speed', 3000, speedOptions)}
        speed={number('Speed', 500, speedOptions)}
      >
        {images.map((image, i) => {
          return (
            <div key={i}>
              <img src={image} height='400' />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};
