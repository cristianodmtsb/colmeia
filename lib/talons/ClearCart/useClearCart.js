import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import CLEAR_CART_MUTATION from '../../queries/clearCartMutation.graphql';
import { useCartContext } from '@magento/peregrine/lib/context/cart';
import { useAwaitQuery } from '@magento/peregrine/lib/hooks/useAwaitQuery';
import CREATE_CART_MUTATION from '@magento/venia-ui/lib/queries/createCart.graphql';
import GET_CART_DETAILS_QUERY from '../../queries/getCartDetails.graphql';
import useCreateCart from '../../talons/useCreateCart';

const parseCartItem = items =>
  items.map(({ id }) => ({
    cart_item_id: +id,
    quantity: 0,
  }));

const useClearCart = () => {
  const [loading, setLoading] = useState(false);

  useCreateCart();
  const [
    {
      cartId,
      details: { items = [] },
    },
    { getCartDetails },
  ] = useCartContext();
  const cartItems = parseCartItem(items);

  const [clearCart, { data }] = useMutation(CLEAR_CART_MUTATION, {
    variables: {
      cartId,
      cartItems,
    },
  });

  const [fetchCartId] = useMutation(CREATE_CART_MUTATION);
  const fetchCartDetails = useAwaitQuery(GET_CART_DETAILS_QUERY);

  const handleClearCart = async () => {
    try {
      setLoading(true);
      await clearCart();
      getCartDetails({ fetchCartId, fetchCartDetails });
    } catch {}

    setLoading(false);
  };

  return {
    clearCart: handleClearCart,
    data,
    loading,
    disabled: cartItems.length <= 0,
  };
};

export default useClearCart;
