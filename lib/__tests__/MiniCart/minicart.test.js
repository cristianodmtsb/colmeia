import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import MiniCart, { CartTrigger } from '../../containers/MiniCart';
import ProviderComponent from 'ProviderComponent';
import { ApolloProvider } from 'react-apollo';
import {
  getGQLMockClient,
  cartDetailsMock,
} from '../../containers/MiniCart/__mock__';

const Component = props => {
  const mockClient = getGQLMockClient();

  return (
    <ProviderComponent>
      <ApolloProvider client={mockClient}>
        <CartTrigger />
        <MiniCart {...props} />
      </ApolloProvider>
    </ProviderComponent>
  );
};

describe('MiniCart', () => {
  it('should open and close minicart on click', () => {
    const { container } = render(<Component />);
    const minicartContainer = container.querySelector('.miniCartRoot');
    const closeBtn = container.querySelector('.closeIcon');

    expect(minicartContainer).not.toHaveClass('active');
    fireEvent.click(screen.getByText('See cart'));
    expect(minicartContainer).toHaveClass('active');

    fireEvent.click(closeBtn);
    expect(minicartContainer).not.toHaveClass('active');
  });

  it('should show the correct quantity of items', async () => {
    const { container } = render(<Component />);
    const triggerCount = container.querySelector('.triggerCount');

    await waitFor(() => expect(triggerCount).toHaveTextContent('18'));

    const items = container.querySelectorAll('.cartItem');
    expect(items).toHaveLength(4);
  });

  it('should go to url links', async () => {
    const { getByText, container } = render(<Component />);

    fireEvent.click(getByText('Place Order'));
    expect(window.location.pathname).toBe('/checkout');

    fireEvent.click(getByText('Go to Cart'));
    expect(window.location.pathname).toBe('/cart');

    await waitFor(() =>
      fireEvent.click(container.querySelector('.cartItemName')),
    );
    expect(window.location.pathname).toBe(
      `/${cartDetailsMock.cart.items[0].product.url_key}.html`,
    );
  });

  it('should show short description', async () => {
    const { container } = render(<Component showShortDescription />);

    await waitFor(() =>
      expect(container.querySelector('.cartItem')).toHaveClass(
        'shortDescriptionContainer',
      ),
    );

    const description = container.querySelector(
      '.cartItemImageContainer + .root',
    );
    expect(description).toContainHTML(
      cartDetailsMock.cart.items[0].product.short_description.html,
    );
  });

  it('should add shadow on items scroll', async () => {
    const { container } = render(<Component showShortDescription />);

    const cartItemsContainer = container.querySelector('.itemList');
    fireEvent.scroll(cartItemsContainer, { target: { scrollTop: 100 } });

    expect(cartItemsContainer).toHaveClass('scrolled');
  });

  it('should trigger on remove click', async () => {
    const { container } = render(<Component showShortDescription={false} />);

    await waitFor(() =>
      container.querySelector('.cartItem:nth-child(1) .cartItemRemove'),
    );
    fireEvent.click(
      container.querySelector('.cartItem:nth-child(1) .cartItemRemove'),
    );

    await waitFor(() => {
      expect(
        container.querySelector('.cartItem:nth-child(1) > .loader'),
      ).toBeTruthy();
    });
  });
});
