import React, { useEffect } from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import ClearCart from '../../containers/ClearCart';
import { getGQLMockClient } from '../../containers/ClearCart/__mock__';
import { ApolloProvider } from 'react-apollo';
import ProviderComponent from 'ProviderComponent';
import { useAwaitQuery } from '@magento/peregrine/lib/hooks/useAwaitQuery';
import GET_CART_DETAILS_QUERY from '../../queries/getCartDetails.graphql';
import { useMutation } from '@apollo/react-hooks';
import CREATE_CART_MUTATION from '@magento/venia-ui/lib/queries/createCart.graphql';
import { useCartContext } from '@magento/peregrine/lib/context/cart';

const Component = props => {
  const mockClient = getGQLMockClient();
  const WrapperComponent = props => {
    const [, { getCartDetails }] = useCartContext();
    const [fetchCartId] = useMutation(CREATE_CART_MUTATION);
    const fetchCartDetails = useAwaitQuery(GET_CART_DETAILS_QUERY);

    useEffect(() => {
      getCartDetails({ fetchCartId, fetchCartDetails });
    }, [fetchCartId, fetchCartDetails]);

    return <ClearCart {...props} />;
  };

  return (
    <ProviderComponent>
      <ApolloProvider client={mockClient}>
        <WrapperComponent {...props} />
      </ApolloProvider>
    </ProviderComponent>
  );
};

const openModal = async () => {
  const button = screen.getByText(/clear cart/i);
  await waitFor(() => expect(button).not.toBeDisabled());
  fireEvent.click(button);
};

const confirmModal = async () => {
  fireEvent.click(screen.getByText(/yes/i));
};

describe('ClearCart component', () => {
  it('should open QuestionModal', async () => {
    const { container } = render(<Component />);
    await openModal();
    expect(container.querySelector('.modal')).toHaveClass('active');
    fireEvent.click(screen.getByText(/back/i));
    expect(container.querySelector('.modal')).not.toHaveClass('active');
  });

  it('should remove all items on cart', async () => {
    let completed = false;
    render(<Component onComplete={() => (completed = true)} />);
    await openModal();
    await confirmModal();

    await waitFor(() => expect(completed).toBe(true));
  });

  it('should call the setLoading function', async () => {
    const setLoading = jest.fn();
    render(<Component setLoading={setLoading} />);

    await openModal();
    await confirmModal();

    await waitFor(() => expect(setLoading).toHaveBeenCalledTimes(2));
  });
});
