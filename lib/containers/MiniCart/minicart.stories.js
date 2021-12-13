import React from 'react';
import MiniCart from './minicart';
import CartTrigger from './cartTrigger';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { ApolloProvider } from 'react-apollo';
import { getGQLMockClient } from './__mock__';

export default {
  component: MiniCart,
  title: 'Colmeia/MiniCart',
  decorators: [withKnobs],
};

export const Simple = () => {
  const mockClient = getGQLMockClient();

  const containerStyles = {
    display: 'flex',
    padding: '20px',
    position: 'relative',
    justifyContent: 'center',
  };

  return (
    <ApolloProvider client={mockClient}>
      <div style={containerStyles}>
        <CartTrigger />
        <MiniCart
          customScroll={boolean('Custom Scroll', true)}
          checkoutLink={boolean('Show Checkout Link', true)}
          addShadow={boolean('Add Shadow to the Items List', true)}
          showShortDescription={boolean('Show short description', false)}
          removeItemLabel={text('Remove Item Label', 'Remove Item')}
        />
      </div>
    </ApolloProvider>
  );
};
