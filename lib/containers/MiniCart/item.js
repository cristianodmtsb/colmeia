import React, { useMemo } from 'react';
import defaultClasses from './item.scss';
import Link from '../../components/Link';
import Loader from '../../components/Loader';
import Button from '../../components/Button';
import { useTranslation } from 'react-i18next';
import { resourceUrl } from '@magento/venia-drivers';
import Image from '@magento/venia-ui/lib/components/Image';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import CREATE_CART_MUTATION from '@magento/venia-ui/lib/queries/createCart.graphql';
import REMOVE_ITEM_MUTATION from '@magento/venia-ui/lib/queries/removeItem.graphql';
import GET_CART_DETAILS_QUERY from '@magento/venia-ui/lib/queries/getCartDetails.graphql';
import { Price } from '@magento/peregrine';
import { useProduct } from '@magento/peregrine/lib/talons/MiniCart/useProduct';
import { transparentPlaceholder } from '@magento/peregrine/lib/util/images';
import RichContent from '@magento/venia-ui/lib/components/RichContent';

// TODO: get productUrlSuffix from graphql when it is ready
const productUrlSuffix = '.html';

const Item = ({
  id,
  currencyCode,
  quantity,
  product,
  configurable_options,
  removeItemLabel,
  showShortDescription,
  classes: propClasses,
  productImageWidth = '75px',
}) => {
  const {
    short_description: { html: shortDescription },
    sku,
    url_key,
    small_image: { label },
    price: {
      minimalPrice: {
        amount: { value },
      },
    },
  } = product;
  const classes = mergeClasses(defaultClasses, propClasses);
  const productUrl = resourceUrl(`/${url_key}${productUrlSuffix}`);
  const { t } = useTranslation();
  const {
    handleRemoveItem,
    isLoading,
    productImage,
    productName,
    productQuantity,
  } = useProduct({
    beginEditItem: false,
    createCartMutation: CREATE_CART_MUTATION,
    getCartDetailsQuery: GET_CART_DETAILS_QUERY,
    item: { id, configurable_options, product, quantity },
    removeItemMutation: REMOVE_ITEM_MUTATION,
  });

  const productImageComponent = useMemo(() => {
    const imageProps = {
      alt: label,
      classes: { image: classes.image, root: classes.cartImage },
      width: productImageWidth,
    };

    if (!productImage) {
      imageProps.src = transparentPlaceholder;
    } else {
      imageProps.resource = productImage;
    }

    return <Image {...imageProps} />;
  }, [classes.image, classes.imageContainer, productImage, productName]);

  const cartItemClasses =
    classes.cartItem +
    (showShortDescription ? ` ${classes.shortDescriptionContainer}` : '');

  return (
    <div className={cartItemClasses} key={sku}>
      <div className={classes.cartItemImageContainer}>
        {productImageComponent}
        <div className={classes.cartItemDetails}>
          <Link
            className={classes.cartItemName}
            to={productUrl}
            role='text'
            title={productName}
          >
            {productName}
          </Link>
          <span className={classes.cartItemQty}>
            {t('Qty:')}
            <span>{productQuantity}</span>
          </span>
          <div className={classes.cartItemPriceContainer}>
            <span className={classes.cartItemPriceValue}>
              <Price value={value} currencyCode={currencyCode} />
            </span>
            <Button
              className={classes.cartItemRemove}
              role='text'
              onClick={handleRemoveItem}
            >
              {removeItemLabel || t('Remove this item')}
            </Button>
          </div>
        </div>
      </div>
      {showShortDescription && shortDescription && (
        <RichContent
          classes={{ root: classes.shortDescription }}
          html={shortDescription}
        />
      )}
      {isLoading && <Loader />}
    </div>
  );
};

export default Item;
