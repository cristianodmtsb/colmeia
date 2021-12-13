import { createMockClient } from 'mock-apollo-client';
import GET_CUSTOMER_ADDRESSES from '../../queries/getCustomerAddresses.graphql';

export const addressListMock = {
  customer: {
    addresses: [
      {
        id: 1,
        city: 'São Paulo',
        company: 'Webjump',
        country_code: 'BR',
        default_billing: true,
        default_shipping: true,
        extension_attributes: null,
        fax: null,
        firstname: 'Webjump',
        lastname: 'Commerce',
        middlename: null,
        postcode: '04543-000',
        prefix: null,
        region: {
          region: 'São Paulo',
          region_code: 'SP',
        },
        street: [
          'Av. Pres. Juscelino Kubitschek, 50',
          '7º andar',
          'Vila Nova Conceição',
        ],
        suffix: null,
        telephone: '(11) 2338-6889',
        vat_id: null,
      },
      {
        id: 2,
        city: 'São Paulo',
        company: 'Webjump',
        country_code: 'BR',
        default_billing: false,
        default_shipping: false,
        extension_attributes: null,
        fax: null,
        firstname: 'Webjump',
        lastname: 'Commerce',
        middlename: null,
        postcode: '01454-011',
        prefix: null,
        region: {
          region: 'São Paulo',
          region_code: 'SP',
        },
        street: ['Rua professor artur ramos, 241 cj. 52'],
        suffix: null,
        telephone: '(11) 2338-6889',
        vat_id: null,
      },
      {
        id: 3,
        city: 'São Paulo',
        company: 'Webjump',
        country_code: 'BR',
        default_billing: true,
        default_shipping: true,
        extension_attributes: null,
        fax: null,
        firstname: 'Webjump',
        lastname: 'Commerce',
        middlename: null,
        postcode: '04543-000',
        prefix: null,
        region: {
          region: 'São Paulo',
          region_code: 'SP',
        },
        street: [
          'Av. Pres. Juscelino Kubitschek, 50',
          '7º andar',
          'Vila Nova Conceição',
        ],
        suffix: null,
        telephone: '(11) 2338-6889',
        vat_id: null,
      },
      {
        id: 4,
        city: 'São Paulo',
        company: 'Webjump',
        country_code: 'BR',
        default_billing: false,
        default_shipping: false,
        extension_attributes: null,
        fax: null,
        firstname: 'Webjump',
        lastname: 'Commerce',
        middlename: null,
        postcode: '01454-011',
        prefix: null,
        region: {
          region: 'São Paulo',
          region_code: 'SP',
        },
        street: ['Rua professor artur ramos, 241 cj. 52'],
        suffix: null,
        telephone: '(11) 2338-6889',
        vat_id: null,
      },
      {
        id: 5,
        city: 'São Paulo',
        company: 'Webjump',
        country_code: 'BR',
        default_billing: true,
        default_shipping: true,
        extension_attributes: null,
        fax: null,
        firstname: 'Webjump',
        lastname: 'Commerce',
        middlename: null,
        postcode: '04543-000',
        prefix: null,
        region: {
          region: 'São Paulo',
          region_code: 'SP',
        },
        street: [
          'Av. Pres. Juscelino Kubitschek, 50',
          '7º andar',
          'Vila Nova Conceição',
        ],
        suffix: null,
        telephone: '(11) 2338-6889',
        vat_id: null,
      },
      {
        id: 6,
        city: 'São Paulo',
        company: 'Webjump',
        country_code: 'BR',
        default_billing: false,
        default_shipping: false,
        extension_attributes: null,
        fax: null,
        firstname: 'Webjump',
        lastname: 'Commerce',
        middlename: null,
        postcode: '01454-011',
        prefix: null,
        region: {
          region: 'São Paulo',
          region_code: 'SP',
        },
        street: ['Rua professor artur ramos, 241 cj. 52'],
        suffix: null,
        telephone: '(11) 2338-6889',
        vat_id: null,
      },
    ],
  },
};

export const getGQLMockClient = () => {
  const mockClient = createMockClient();

  mockClient.setRequestHandler(GET_CUSTOMER_ADDRESSES, () => {
    return Promise.resolve({ data: addressListMock });
  });

  return mockClient;
};