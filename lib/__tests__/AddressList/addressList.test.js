import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import AddressList from '../../containers/AddressList';
import ProviderComponent from 'ProviderComponent';
import { ApolloProvider } from 'react-apollo';
import {
  getGQLMockClient,
  addressListMock,
} from '../../containers/AddressList/__mock__';

const firstAddressId = addressListMock.customer.addresses[0].id;
const Component = props => {
  const mockClient = getGQLMockClient();

  return (
    <ProviderComponent>
      <ApolloProvider client={mockClient}>
        <AddressList {...props} />
      </ApolloProvider>
    </ProviderComponent>
  );
};

describe('AddressList', () => {
  it('should list all addresses', async () => {
    const { container } = render(<Component />);

    await waitFor(() => container.querySelectorAll('.addressContainer'));
    const addresses = container.querySelectorAll('.addressContainer');
    expect(addresses).toHaveLength(addressListMock.customer.addresses.length);
  });

  it('should change pathname when address is clicked', async () => {
    const { container } = render(<Component />);

    await waitFor(() => container.querySelector('.addressContainer'));
    fireEvent.click(container.querySelector('.addressContainer'));
    expect(window.location.pathname).toBe(
      `/customer/address/${firstAddressId}`,
    );
  });
});
