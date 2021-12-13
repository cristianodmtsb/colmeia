import { createMockClient } from 'mock-apollo-client';
import GET_CART_DETAILS_QUERY from '../../queries/getCartDetails.graphql';
import CREATE_CART_MUTATION from '@magento/venia-ui/lib/queries/createCart.graphql';
import REMOVE_ITEM_MUTATION from '@magento/venia-ui/lib/queries/removeItem.graphql';
import { GET_ITEM_COUNT_QUERY } from '@magento/venia-ui/lib/components/Header/cartTrigger.gql';

export const cartDetailsMock = {
  cart: {
    items: [
      {
        id: 1,
        product: {
          name: 'GATORADE TANGERINA 500ML',
          short_description: {
            html:
              '<p>Suplemento hidroeletrolítico que recupera, reidrata e repõe os carboidratos e sais minerais que o seu corpo perde quando você pratica um esporte.</p>',
          },
          sku: 'GAT-TAN-500',
          url_key: 'gatorade-tangerina-500ml',
          small_image: {
            url:
              'https://live.staticflickr.com/65535/49807411803_1fcc9daeba_w.jpg',
            label: 'Gatorade Tangerina 500ml',
          },
          price: {
            regularPrice: {
              amount: {
                value: 6.5,
              },
            },
            minimalPrice: {
              amount: {
                value: 4.5,
              },
            },
          },
        },
        quantity: 3,
        ConfigurableCartItem: {
          configurable_options: {
            id: 3,
            option_label: 'Label',
            value_id: 'value-id-1',
            value_label: 'Value label',
          },
        },
      },
      {
        id: 2,
        product: {
          name: 'Pack de Cerveja Budweiser 343ML (6 UN.)',
          short_description: {
            html: '',
          },
          sku: 'PACK-DE-CERVEJA-BUDWEISER-343ML-6-UN',
          url_key: 'pack-de-cerveja-budweiser-343ml',
          small_image: {
            url:
              'https://live.staticflickr.com/65535/49807983961_20f007ca22_n.jpg',
            label: 'Pack de Cerveja Budweiser 343ML (6 UN.)',
          },
          price: {
            regularPrice: {
              amount: {
                value: 30.0,
              },
            },
            minimalPrice: {
              amount: {
                value: 30.0,
              },
            },
          },
        },
        quantity: 6,
        ConfigurableCartItem: {
          configurable_options: {
            id: 3,
            option_label: 'Label',
            value_id: 'value-id-1',
            value_label: 'Value label',
          },
        },
      },
      {
        id: 3,
        product: {
          name: 'Refrigerante Guaraná Antarctica 2L',
          short_description: {
            html: '',
          },
          sku: 'refrigerante-guarana-antarctica-2l',
          url_key: 'refrigerante-guarana-antarctica-2l',
          small_image: {
            url:
              'https://live.staticflickr.com/65535/49807983826_41dd1fb73f_n.jpg',
            label: 'Refrigerante Guaraná Antarctica 2L',
          },
          price: {
            regularPrice: {
              amount: {
                value: 7.0,
              },
            },
            minimalPrice: {
              amount: {
                value: 7.0,
              },
            },
          },
        },
        quantity: 6,
        ConfigurableCartItem: {
          configurable_options: {
            id: 3,
            option_label: 'Label',
            value_id: 'value-id-1',
            value_label: 'Value label',
          },
        },
      },
      {
        id: 4,
        product: {
          name: 'Água Tônica Antarctica 350ml',
          short_description: {
            html: '',
          },
          sku: 'agua-tonica-antarctica-350ml',
          url_key: 'agua-tonica-antarctica-350ml',
          small_image: {
            url: '',
            label: 'Água Tônica Antarctica 350ml',
          },
          price: {
            regularPrice: {
              amount: {
                value: 4.0,
              },
            },
            minimalPrice: {
              amount: {
                value: 3.0,
              },
            },
          },
        },
        quantity: 3,
        ConfigurableCartItem: {
          configurable_options: {
            id: 3,
            option_label: 'Label',
            value_id: 'value-id-1',
            value_label: 'Value label',
          },
        },
      },
    ],
    prices: {
      grand_total: {
        value: 244.5,
        currency: 'BRL',
      },
    },
  },
};

export const removeItemMock = {
  removeItemFromCart: {
    cart: {
      items: [
        {
          id: 1,
          product: {
            name: '',
          },
          quantity: 1,
        },
      ],
    },
  },
};

export const getItemCountMock = {
  cart: {
    id: 'CART_ID',
    total_quantity: cartDetailsMock.cart.items.reduce((memo, next) => {
      return memo + next.quantity;
    }, 0),
    __typename: 'Cart',
  },
};

export const getGQLMockClient = () => {
  const mockClient = createMockClient();

  mockClient.setRequestHandler(CREATE_CART_MUTATION, () => {
    return Promise.resolve({ data: { cartId: 'CART_ID' } });
  });

  mockClient.setRequestHandler(GET_CART_DETAILS_QUERY, () => {
    return Promise.resolve({ data: cartDetailsMock });
  });

  mockClient.setRequestHandler(REMOVE_ITEM_MUTATION, () => {
    return Promise.resolve({ data: removeItemMock });
  });

  mockClient.setRequestHandler(GET_ITEM_COUNT_QUERY, () => {
    return Promise.resolve({ data: getItemCountMock });
  });

  return mockClient;
};
