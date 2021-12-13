import { createMockClient } from 'mock-apollo-client';
import { cartDetailsMock } from '../MiniCart/__mock__';
import GET_CART_DETAILS_QUERY from '../../queries/getCartDetails.graphql';
import CLEAR_CART_MUTATION from '../../queries/clearCartMutation.graphql';
import CREATE_CART_MUTATION from '@magento/venia-ui/lib/queries/createCart.graphql';

export const clearCartMock = {
  updateCartItems: {
    cart: {
      id: 'CART_ID',
    },
  },
};

export const getGQLMockClient = (timeout = 0) => {
  const mockClient = createMockClient();

  mockClient.setRequestHandler(CREATE_CART_MUTATION, () => {
    return Promise.resolve({ data: { cartId: 'CART_ID' } });
  });

  mockClient.setRequestHandler(GET_CART_DETAILS_QUERY, () => {
    return Promise.resolve({ data: cartDetailsMock });
  });

  mockClient.setRequestHandler(CLEAR_CART_MUTATION, () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ data: clearCartMock });
      }, timeout);
    });
  });

  return mockClient;
};
