import React from 'react';
import { render, waitFor } from '@testing-library/react';
import OrderList from '../../containers/OrderList';
import ProviderComponent from 'ProviderComponent';
import { ApolloProvider } from 'react-apollo';
import {
  customerOrdersMock,
  getGQLMockClient,
} from '../../containers/OrderList/__mock__';

const Component = ({ orders, infinity, ...props }) => {
  const mockClient = getGQLMockClient({ orders, infinity });

  return (
    <ProviderComponent>
      <ApolloProvider client={mockClient}>
        <OrderList {...props} />
      </ApolloProvider>
    </ProviderComponent>
  );
};

describe('OrderList', () => {
  it('should list all orders', async () => {
    const { container } = render(<Component />);
    await waitFor(() =>
      expect(
        container.querySelectorAll('.orderListRow:not(:first-child)'),
      ).toHaveLength(customerOrdersMock.customerOrders.items.length),
    );
  });

  it('should show a loader when is getting data', async () => {
    const { container } = render(<Component infinity={true} />);
    await waitFor(() =>
      expect(container.querySelector('.rowLoader')).toBeTruthy(),
    );
  });

  it('should show an empty message', async () => {
    const { getByText } = render(<Component orders={[]} />);
    await waitFor(() =>
      expect(getByText('There are no orders yet.')).toBeTruthy(),
    );
  });
});
