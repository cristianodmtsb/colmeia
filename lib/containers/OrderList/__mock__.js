import { createMockClient } from 'mock-apollo-client';
import GET_CUSTOMER_ORDERS from '../../queries/getCustomerOrders.graphql';

export const customerOrdersMock = {
  storeConfig: {
    base_currency_code: 'USD',
  },
  customerOrders: {
    items: [
      {
        id: 1,
        grand_total: 205,
        created_at: '2020-04-26 00:11:54',
        order_number: '000000001',
        status: 'pending',
      },
      {
        id: 2,
        grand_total: 260,
        created_at: '2020-04-26 00:19:49',
        order_number: '000000002',
        status: 'pending',
      },
    ],
  },
};

export const getGQLMockClient = ({ orders, infinity }) => {
  const mockClient = createMockClient();

  mockClient.setRequestHandler(GET_CUSTOMER_ORDERS, () => {
    return new Promise(resolve => {
      if (infinity) return;

      return resolve({
        data: {
          ...customerOrdersMock,
          customerOrders: orders || customerOrdersMock.customerOrders,
        },
      });
    });
  });

  return mockClient;
};
