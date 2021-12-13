import { createMockClient } from 'mock-apollo-client';
import GET_LOGO_DATA from '../../queries/getStoreConfigData.graphql';

export const logoMock = {
  storeConfig: {
    id: 1,
    header_logo_src: 'logo_webjump.png',
    logo_width: '129',
    logo_height: '36',
    logo_alt: 'Logo',
    secure_base_media_url: '/',
  },
};

export const fallbackMock = {
  storeConfig: {
    id: 1,
    header_logo_src: null,
    logo_width: '129',
    logo_height: '36',
    logo_alt: 'Logo',
    secure_base_media_url: '/',
  },
};

export const getGQLMockClient = withoutLogo => {
  const mockClient = createMockClient();

  mockClient.setRequestHandler(GET_LOGO_DATA, () => {
    return Promise.resolve({ data: withoutLogo ? fallbackMock : logoMock });
  });

  return mockClient;
};
