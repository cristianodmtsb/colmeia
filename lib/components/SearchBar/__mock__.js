import { createMockClient } from 'mock-apollo-client';
import GET_AUTOCOMPLETE_RESULTS from '../../queries/getAutoCompleteResults.graphql';

const autoCompleteMock = {
  products: {
    aggregations: [
      {
        __typename: 'Aggregation',
        attribute_code: 'category_id',
        count: 2,
        label: 'Category',
        options: [
          {
            label: 'Chopp',
            value: 50,
          },
          {
            label: 'Cervejas Nacionais',
            value: 31,
          },
        ],
      },
    ],
    items: [
      {
        __typename: 'ConfigurableProduct',
        id: 41565,
        name: 'Cerveja Colorado Demoiselie Indian',
        small_image: {
          __typename: 'ProductImage',
          url:
            'https://www.cervejariacolorado.com.br/files/cerveja/demoiselle1.png',
        },
        url_key: 'colorado-demoiselie',
        price_range: {
          __typename: 'ProductPrices',
          minimum_price: {
            final_price: {
              value: 24.9,
              currency: 'BRL',
            },
          },
        },
      },
      {
        __typename: 'ConfigurableProduct',
        id: 42875,
        name: 'Cerveja Colorado Indica Indian Pale Ale',
        small_image: {
          __typename: 'ProductImage',
          url: 'https://www.cervejariacolorado.com.br/files/cerveja/indica.png',
        },
        url_key: 'colorado-indica',
        price_range: {
          __typename: 'ProductPrices',
          minimum_price: {
            final_price: {
              value: 10.9,
              currency: 'BRL',
            },
          },
        },
      },
      {
        __typename: 'ConfigurableProduct',
        id: 44155,
        name: 'Cerveja Colorado Appia',
        small_image: {
          __typename: 'ProductImage',
          url: 'https://www.cervejariacolorado.com.br/files/cerveja/appia1.png',
        },
        url_key: 'colorado-appia',
        price_range: {
          __typename: 'ProductPrices',
          minimum_price: {
            final_price: {
              value: 18.9,
              currency: 'BRL',
            },
          },
        },
      },
    ],
    page_info: {
      total_pages: 1,
    },
    total_count: 3,
  },
};

export const getGQLMockClient = () => {
  const mockClient = createMockClient();

  mockClient.setRequestHandler(GET_AUTOCOMPLETE_RESULTS, () => {
    return Promise.resolve({ data: autoCompleteMock });
  });

  return mockClient;
};
