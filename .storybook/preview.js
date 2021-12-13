import './index.css';
import './fonts.css';
import '../lib/index.css';
import { addDecorator, addParameters } from '@storybook/react';
import store from './store';
import { Adapter } from '@magento/venia-ui/lib/drivers';
import React from 'react';
import configureI18n from '../lib/helpers/i18n';
import { AppContextProvider } from '@magento/venia-ui/lib/components/App';

configureI18n();

const viewports = {
  iPadPro: {
    name: 'iPad Pro',
    styles: {
      width: '1024px',
      height: '1366px',
    },
  },
  galaxyFiveS: {
    name: 'Galaxy 5S',
    styles: {
      width: '360px',
      height: '640px',
    },
  },
  iPad: {
    name: 'iPad',
    styles: {
      width: '768px',
      height: '1024px',
    },
  },
  iPoneSixToEight: {
    name: 'iPhone 6/7/8',
    styles: {
      width: '375px',
      height: '667px',
    },
  },
  iPoneSixEightPlus: {
    name: 'iPhone 6/7/8 Plus',
    styles: {
      width: '414px',
      height: '736px',
    },
  },
  iPhoneX: {
    name: 'iPhone X',
    styles: {
      width: '375px',
      height: '812px',
    },
  },
};

const cssReq = require.context('!!raw-loader!../lib', true, /.\.css$/);
const cssTokenFiles = cssReq
  .keys()
  .map(filename => ({ filename, content: cssReq(filename).default }));

addParameters({
  viewport: {
    viewports,
  },
  backgrounds: [
    { name: 'Dark', value: '#444' },
    { name: 'Light', value: '#eee' },
  ],
  designToken: {
    files: {
      css: cssTokenFiles,
    },
  },
});

addDecorator(storyFn => (
  <Adapter apiBase='/graphql' store={store}>
    <AppContextProvider>{storyFn()}</AppContextProvider>
  </Adapter>
));
