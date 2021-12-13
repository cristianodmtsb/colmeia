import React, { useRef, useState, useEffect } from 'react';
import Item from './item';
import CartHeader from './header';
import { oneOfType, bool, string, element } from 'prop-types';
import defaultClasses from './minicart.scss';
import itemClasses from './item.scss';
import Link from '../../components/Link';
import Shape from '../../components/Shape';
import Loader from '../../components/Loader';
import useClickOutside from '../../hooks/useClickOutside';
import { useTranslation } from 'react-i18next';
import { useHistory } from '@magento/venia-drivers';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { useMiniCart } from '@magento/peregrine/lib/talons/MiniCart/useMiniCart';

const MiniCart = ({
  customScroll = true,
  checkoutLink = true,
  addShadow = true,
  removeItemLabel,
  showShortDescription = false,
  classes: propClasses,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const {
    cartItems = [],
    handleClose,
    isLoading,
    isOpen,
    subtotal,
    currencyCode,
  } = useMiniCart();
  const itemsQty = cartItems ? cartItems.length : 0;
  const containerRef = useRef();
  const classes = mergeClasses(defaultClasses, itemClasses, propClasses);
  const { t } = useTranslation();
  const history = useHistory();
  const rootClasses =
    classes.miniCartRoot +
    (isOpen ? ` ${classes.active}` : '') +
    (customScroll ? ` ${classes.customScroll}` : '');
  const onScroll = !addShadow
    ? () => {}
    : e => {
        e.persist();
        setScrolled(e.target.scrollTop > 0);
      };

  let itemsListClasses = classes.itemList;
  itemsListClasses += addShadow && scrolled ? ` ${classes.scrolled}` : '';

  useClickOutside(containerRef, handleClose);

  useEffect(() => {
    handleClose();
  }, [history.location.pathname]);

  return (
    <div className={rootClasses} ref={containerRef}>
      <Shape className={classes.cartContainer}>
        <CartHeader
          handleClose={handleClose}
          itemsQty={itemsQty}
          subtotal={subtotal}
          currencyCode={currencyCode}
          checkoutLink={checkoutLink}
        />
        <div className={itemsListClasses} onScroll={onScroll}>
          {cartItems.map(({ product, ...item }) => (
            <Item
              {...item}
              key={product.sku}
              product={product}
              currencyCode={currencyCode}
              classes={classes.itemClasses}
              removeItemLabel={removeItemLabel}
              showShortDescription={showShortDescription}
            />
          ))}
        </div>
        <div className={classes.cartFooter}>
          <Link to='/cart' className={classes.cartLink} role='text'>
            {t('Go to Cart')}
          </Link>
        </div>
        {isLoading && <Loader />}
      </Shape>
    </div>
  );
};

MiniCart.propTypes = {
  customScroll: bool,
  checkoutLink: bool,
  addShadow: bool,
  showShortDescription: bool,
  removeItemLabel: oneOfType([string, element]),
};

export default MiniCart;
