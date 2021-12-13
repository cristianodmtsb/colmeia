import { useCartContext } from '@magento/peregrine/lib/context/cart';
import CREATE_CART_MUTATION from '@magento/venia-ui/lib/queries/createCart.graphql';
import { useMutation } from '@apollo/react-hooks';

const useCreateCart = () => {
  const [{ cartId }, { createCart }] = useCartContext();
  const [fetchCartId] = useMutation(CREATE_CART_MUTATION);
  createCart({ fetchCartId });
  return cartId;
};

export default useCreateCart;
