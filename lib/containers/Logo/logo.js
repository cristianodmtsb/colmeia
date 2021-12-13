import React from 'react';
import { shape, string, number } from 'prop-types';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from './logo.scss';
import Image from '@magento/venia-ui/lib/components/Image';
import { useLogo } from '../../talons/Logo/useLogo';
import GET_LOGO_DATA from '../../queries/getStoreConfigData.graphql';

/**
 * A component that renders a logo in the header.
 *
 * The Height and Width props are also configurable by admin, for access this configurations follow the path:
 * Admin > Content > Configuration, then select the store view you wish to edit
 *
 * @typedef Logo
 * @kind functional component
 *
 * @param height
 * @param width
 * @param fallback
 * @param {props} props React component props
 *
 * @returns {React.Element} A React component that displays a logo.
 */
const Logo = ({ height = 24, width = 48, fallback, ...props }) => {
  const classes = mergeClasses(defaultClasses, props.classes);

  const talonProps = useLogo({
    query: GET_LOGO_DATA,
    defaultWidth: width,
    defaultHeight: height,
    defaultAlt: 'Venia Logo',
    fallback: fallback,
  });
  const { src, logoWidth, logoHeight, alt } = talonProps;

  return src ? (
    <Image
      classes={{ image: classes.logo }}
      src={src}
      alt={alt}
      title={alt}
      height={logoHeight}
      width={logoWidth}
    />
  ) : (
    <div />
  );
};
/**
 * Props for {@link Logo}
 *
 * @typedef props
 *
 * @property {Object} classes An object containing the class names for the
 * Logo component.
 * @property {string} classes.logo classes for logo
 * @property {number} height the height of the logo.
 */
Logo.propTypes = {
  classes: shape({
    logo: string,
  }),
  height: number,
  width: number,
};
export default Logo;
