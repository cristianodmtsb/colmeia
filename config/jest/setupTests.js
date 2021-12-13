import '@testing-library/jest-dom';
import fetch from 'jest-fetch-mock';
import idObj from 'identity-obj-proxy';

const classify = require('@magento/venia-ui/lib/classify');
classify.mergeClasses = () => idObj;

global.UNION_AND_INTERFACE_TYPES = '';
global.fetch = fetch;

jest.mock('@magento/peregrine/lib/store/middleware/log.js', () => {
  return store => next => action => {
    return next(action);
  };
});

const messagesToAvoid = [
  'react-i18next:: You will need pass in an i18next instance by using initReactI18next',
  'A media backend URL should be defined in your config.',
];

const originalError = console.error;
console.error = (...args) => {
  if (
    /Warning.*not wrapped in act/.test(args[0]) ||
    messagesToAvoid.indexOf(args[0]) > -1
  ) {
    return;
  }
  originalError.call(console, ...args);
};

const originalWarn = console.warn;
console.warn = (...args) => {
  if (messagesToAvoid.indexOf(args[0]) > -1) {
    return;
  }
  originalWarn.call(console, ...args);
};

window.matchMedia =
  window.matchMedia ||
  function() {
    return {
      matches: false,
      addListener: function() {},
      removeListener: function() {},
    };
  };
