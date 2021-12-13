import React from 'react';
import OrderList from './orderList';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { ApolloProvider } from 'react-apollo';
import { getGQLMockClient } from './__mock__';

export default {
  component: OrderList,
  title: 'Colmeia/OrderList',
  decorators: [withKnobs],
};

export const Simple = () => {
  const emptyTableKnob = boolean('Empty Table', false);
  const loadingKnob = boolean('Loading', false);
  const mockClient = getGQLMockClient({
    orders: emptyTableKnob ? [] : false,
    infinity: loadingKnob,
  });

  const containerStyles = {
    display: 'flex',
    padding: '20px',
    position: 'relative',
    justifyContent: 'center',
  };

  return (
    <ApolloProvider client={mockClient}>
      <div style={containerStyles}>
        <OrderList orderUrl={text('Order Url', '/order/:id')} />
      </div>
    </ApolloProvider>
  );
};
