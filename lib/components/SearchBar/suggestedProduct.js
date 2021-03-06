import React, { useCallback, useMemo } from 'react';
import { func, number, shape, string } from 'prop-types';
import { Price } from '@magento/peregrine';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { Link, resourceUrl } from '@magento/venia-drivers';

import Image from '@magento/venia-ui/lib/components/Image';
import defaultClasses from './suggestedProduct.scss';

const PRODUCT_URL_SUFFIX = '.html';
const IMAGE_WIDTH = 60;

const SuggestedProduct = props => {
  const classes = mergeClasses(defaultClasses, props.classes);
  const { url_key, small_image, name, onNavigate, price_range } = props;

  const handleClick = useCallback(() => {
    if (typeof onNavigate === 'function') {
      onNavigate();
    }
  }, [onNavigate]);

  const uri = useMemo(() => resourceUrl(`/${url_key}${PRODUCT_URL_SUFFIX}`), [
    url_key,
  ]);

  const { final_price } = price_range.minimum_price;

  return (
    <Link className={classes.root} to={uri} onClick={handleClick}>
      <Image
        alt={name}
        classes={{ image: classes.thumbnail, root: classes.image }}
        resource={small_image}
        width={IMAGE_WIDTH}
      />
      <span className={classes.name}>{name}</span>
      <span className={classes.price}>
        <Price currencyCode={final_price.currency} value={final_price.value} />
      </span>
    </Link>
  );
};

SuggestedProduct.propTypes = {
  url_key: string.isRequired,
  small_image: string.isRequired,
  name: string.isRequired,
  onNavigate: func,
  price: shape({
    regularPrice: shape({
      amount: shape({
        currency: string,
        value: number,
      }),
    }),
  }).isRequired,
  classes: shape({
    root: string,
    image: string,
    name: string,
    price: string,
    thumbnail: string,
  }),
};

export default SuggestedProduct;
