import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import NavMenu from './index';
import { ApolloProvider } from 'react-apollo';
import { createMockClient } from 'mock-apollo-client';
import GET_NAVIGATION_MENU from '../../queries/getNavigationMenu.graphql';

export default {
  component: NavMenu,
  title: 'Colmeia/NavMenu',
  decorators: [withKnobs],
};

const mockResponse = {
  id: 2,
  name: 'Root Category',
  children: [
    {
      children_count: 10,
      id: 3,
      include_in_menu: true,
      name: 'Category 1',
      position: 0,
      url_path: '/category-1',
      url_suffix: '.html',
      level: 1,
    },
    {
      children_count: 0,
      id: 4,
      include_in_menu: true,
      name: 'Category 2',
      position: 1,
      url_path: '/category-2',
      url_suffix: '.html',
      level: 1,
    },
    {
      children_count: 0,
      id: 5,
      include_in_menu: true,
      name: 'Category 3',
      position: 2,
      url_path: '/category-3',
      url_suffix: '.html',
      level: 1,
    },
  ],
};

export const Simples = () => {
  const mockClient = createMockClient();

  mockClient.setRequestHandler(GET_NAVIGATION_MENU, ({ id }) => {
    let category = mockResponse;
    if (mockResponse.id !== id) {
      category = mockResponse.find(child => child.id === id);
    }

    return Promise.resolve({ data: { category } });
  });

  return (
    <ApolloProvider client={mockClient}>
      <NavMenu />
    </ApolloProvider>
  );
};
