import React from 'react';
import AddressList from './addressList';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { ApolloProvider } from 'react-apollo';
import { getGQLMockClient } from './__mock__';

export default {
  component: AddressList,
  title: 'Colmeia/AddressList',
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
        <AddressList />
      </div>
    </ApolloProvider>
  );
};
