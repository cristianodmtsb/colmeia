import React from 'react';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import ForgotPassword from './forgotPassword';
import Button from '../../components/Button';
import { ApolloProvider } from 'react-apollo';
import { getGQLMockClient } from './__mock__';

export default {
  component: ForgotPassword,
  title: 'Colmeia/Forgot Password',
  decorators: [withKnobs],
};

const inputTypes = {
  'E-mail': 'email',
  Text: 'text',
};

export const Simple = () => {
  const { mockClient } = getGQLMockClient();
  return (
    <ApolloProvider client={mockClient}>
      <ForgotPassword
        inputLabel={text('Input Label', 'E-mail')}
        inputType={select('Input Type', inputTypes, 'email')}
        inputPlaceholder={text('Input Placeholder', 'sample@provider.com')}
        loadingMessage={text('Loading Message', 'Sending email')}
      >
        <Button type='submit'>{text('Button Text', 'Submit')}</Button>
      </ForgotPassword>
    </ApolloProvider>
  );
};

export const Loading = () => {
  return (
    <ApolloProvider client={{}}>
      <ForgotPassword
        inputLabel={text('Input Label', 'E-mail')}
        inputType={select('Input Type', inputTypes, 'email')}
        inputPlaceholder={text('Input Placeholder', 'sample@provider.com')}
        loadingMessage={text('Loading Message', 'Sending email')}
      >
        <Button type='submit'>{text('Button Text', 'Submit')}</Button>
      </ForgotPassword>
    </ApolloProvider>
  );
};

export const Error = () => {
  const { mockClientError } = getGQLMockClient();
  return (
    <ApolloProvider client={mockClientError}>
      <ForgotPassword
        inputLabel={text('Input Label', 'E-mail')}
        inputType={select('Input Type', inputTypes, 'email')}
        inputPlaceholder={text('Input Placeholder', 'sample@provider.com')}
        loadingMessage={text('Loading Message', 'Sending email')}
      >
        <Button type='submit'>{text('Button Text', 'Submit')}</Button>
      </ForgotPassword>
    </ApolloProvider>
  );
};
