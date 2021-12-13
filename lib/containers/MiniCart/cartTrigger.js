import React from 'react';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { useCartTrigger } from '@magento/peregrine/lib/talons/Header/useCartTrigger';
import CREATE_CART_MUTATION from '@magento/venia-ui/lib/queries/createCart.graphql';
import Icon from '../../components/Icon';
import Button from '../../components/Button';
import defaultClasses from './cartTrigger.scss';
import { useTranslation } from 'react-i18next';
import GET_CART_DETAILS_QUERY from '../../queries/getCartDetails.graphql';
import { GET_ITEM_COUNT_QUERY } from '@magento/venia-ui/lib/components/Header/cartTrigger.gql';

const CartTrigger = ({ classes: propClasses }) => {
  const classes = mergeClasses(defaultClasses, propClasses);
  const { t } = useTranslation();
  const { handleClick, itemCount } = useCartTrigger({
    mutations: {
      createCartMutation: CREATE_CART_MUTATION,
    },
    queries: {
      getCartDetailsQuery: GET_CART_DETAILS_QUERY,
      getItemCountQuery: GET_ITEM_COUNT_QUERY,
    },
  });

  const itemsLabel = itemCount === 1 ? 'item' : 'items';

  return (
    <div className={classes.triggerContainer}>
      <Icon className={classes.cartIcon} icon='cart' />
      <div className={classes.triggerCountContainer}>
        <span className={classes.triggerCountLabel}>
          <span className={classes.triggerCount}>{itemCount}</span>
          {t(itemsLabel)}
        </span>
        <Button
          className={classes.triggerSeeCart}
          role='text'
          onClick={handleClick}
        >
          {t('See cart')}
        </Button>
      </div>
    </div>
  );
};

export default CartTrigger;
