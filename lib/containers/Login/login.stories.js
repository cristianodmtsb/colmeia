import React from 'react';
import Login from './login';
import { withKnobs } from '@storybook/addon-knobs';
import { ApolloProvider } from 'react-apollo';
import { getGQLMockClient } from './__mock__';

export default {
  component: Login,
  title: 'Colmeia/Login',
  decorators: [withKnobs],
};

export const Simple = () => {
  const mockClient = getGQLMockClient();

  return (
    <ApolloProvider client={mockClient}>
      <div style={{ margin: '20px', width: '500px' }}>
        <Login />
      </div>
    </ApolloProvider>
  );
};
