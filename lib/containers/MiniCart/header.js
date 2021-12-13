import React from 'react';
import Icon from '../../components/Icon';
import Link from '../../components/Link';
import Button from '../../components/Button';
import defaultClasses from './header.scss';
import { Price } from '@magento/peregrine';
import { useTranslation } from 'react-i18next';
import { mergeClasses } from '@magento/venia-ui/lib/classify';

const Header = ({
  handleClose,
  itemsQty,
  subtotal,
  currencyCode,
  checkoutLink,
  classes: propClasses,
}) => {
  const classes = mergeClasses(defaultClasses, propClasses);
  const { t } = useTranslation();
  const itemsMessage =
    itemsQty === 1 ? 'item in your Cart' : 'items in your Cart';

  return (
    <div className={classes.cartHeader}>
      <Button className={classes.closeIcon} role='text' onClick={handleClose}>
        <Icon icon='close' />
      </Button>
      <div className={classes.subtotalContainer}>
        <span className={classes.itemsQty}>
          <span>{itemsQty}</span>
          {t(itemsMessage)}
        </span>
        <span className={classes.subtotal}>
          {t('Subtotal:')}
          <div className={classes.subtotalValue}>
            <Price value={subtotal} currencyCode={currencyCode} />
          </div>
        </span>
      </div>
      {checkoutLink && (
        <Link to='/checkout' className={classes.placeOrderLink} role='buy'>
          {t('Place Order')}
        </Link>
      )}
    </div>
  );
};

export default Header;
