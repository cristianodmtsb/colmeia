import React from 'react';
import Logo from './logo';
import { ApolloProvider } from 'react-apollo';
import { getGQLMockClient } from './__mock__';
import logo from './logo.svg';
import { boolean, withKnobs } from '@storybook/addon-knobs';

export default {
  component: Logo,
  title: 'Colmeia/Logo',
  decorators: [withKnobs],
};

export const Simple = () => {
  const withoutLogo = boolean('Without logo on admin (fallback)', false);

  const mockClient = getGQLMockClient(withoutLogo);

  return (
    <ApolloProvider client={mockClient}>
      <Logo fallback={logo} />
    </ApolloProvider>
  );
};
