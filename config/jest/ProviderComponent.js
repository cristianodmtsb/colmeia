import React from 'react';
import { AppContextProvider } from '@magento/venia-ui/lib/components/App';
import store from '../../.storybook/store';
import { Adapter } from '@magento/venia-ui/lib/drivers';

const ProviderComponent = ({ children }) => {
  return (
    <Adapter apiBase='/graphql' store={store}>
      <AppContextProvider>{children}</AppContextProvider>
    </Adapter>
  );
};

export default ProviderComponent;
