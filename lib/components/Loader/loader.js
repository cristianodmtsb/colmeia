import React from 'react';
import Lottie from 'react-lottie';
import { number, object, bool } from 'prop-types';
import loaderJson from './loader.json';
import defaultClasses from './loader.scss';
import { mergeClasses } from '@magento/venia-ui/lib/classify';

/**
 * A component for Loader.
 *
 * This component uses the [LottieFiles](https://lottiefiles.com/) to read a json (From AfterEffects or Illustrator) and generate an animated SVG
 *
 * You can [override](https://bitbucket.org/webjump/override-mapping-webpack-plugin) the loader.json by adding this in your override configs
 *
 */
const Loader = ({
  width = 50,
  height = 50,
  fullScreen = false,
  classes: propClasses,
  animationData = loaderJson,
}) => {
  const classes = mergeClasses(defaultClasses, propClasses);
  const options = {
    loop: true,
    animationData,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const rootClasses =
    classes.root + (fullScreen ? ` ${classes.fullScreen}` : '');

  return (
    <div className={rootClasses}>
      <Lottie options={options} height={height} width={width} />
    </div>
  );
};

Loader.propTypes = {
  width: number,
  height: number,
  classes: object,
  fullScreen: bool,
  animationData: object,
};

export default Loader;
