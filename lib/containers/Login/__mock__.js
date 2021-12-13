import { createMockClient } from 'mock-apollo-client';
import GET_CART_DETAILS_QUERY from '../../queries/getCartDetails.graphql';
import CREATE_CART_MUTATION from '@magento/venia-ui/lib/queries/createCart.graphql';
import { cartDetailsMock } from '../MiniCart/__mock__';
import GET_CUSTOMER_QUERY from '@magento/venia-ui/lib/queries/getCustomer.graphql';
import SIGN_IN_MUTATION from '@magento/venia-ui/lib/queries/signIn.graphql';

export const getCustomerMock = {
  customer: {
    id: 2,
    email: 'test@test.com',
    firstname: 'Test',
    lastname: 'Last name',
  },
};

export const signInMock = {
  generateCustomerToken: {
    token: 'TOKEN_MOCK',
  },
};

export const getGQLMockClient = () => {
  const mockClient = createMockClient();

  mockClient.setRequestHandler(CREATE_CART_MUTATION, () => {
    return Promise.resolve({ data: { cartId: 'CART_ID' } });
  });

  mockClient.setRequestHandler(GET_CART_DETAILS_QUERY, () => {
    return Promise.resolve({ data: cartDetailsMock });
  });

  mockClient.setRequestHandler(GET_CUSTOMER_QUERY, () => {
    return Promise.resolve({ data: getCustomerMock });
  });

  mockClient.setRequestHandler(SIGN_IN_MUTATION, () => {
    return Promise.resolve({ data: signInMock });
  });

  return mockClient;
};
