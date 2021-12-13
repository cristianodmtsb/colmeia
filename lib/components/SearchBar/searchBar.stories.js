import React from 'react';
import SearchBar from './searchBar';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { ApolloProvider } from 'react-apollo';
import { getGQLMockClient } from './__mock__';

export default {
  component: SearchBar,
  title: 'Colmeia/SearchBar',
  decorators: [withKnobs],
};

export const Simple = () => {
  const placeholder = 'Exemplo: Chopp Brahma 50 litros';
  const mockClient = getGQLMockClient();
  return (
    <ApolloProvider client={mockClient}>
      <div style={{ width: '50%', margin: '0 auto' }}>
        <SearchBar
          autocomplete={boolean('Autocomplete', true)}
          clearLabel={text('ClearLabel', 'FECHAR')}
          submitLabel={text('SubmitLabel', 'Buscar')}
          placeholder={text('placeholder', placeholder)}
        />
      </div>
    </ApolloProvider>
  );
};
