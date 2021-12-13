import React, { useState } from 'react';
import ClearCart from './clearCart';
import { withKnobs } from '@storybook/addon-knobs';
import { ApolloProvider } from 'react-apollo';
import { getGQLMockClient } from './__mock__';

export default {
  component: ClearCart,
  title: 'Colmeia/ClearCart',
  decorators: [withKnobs],
};

const containerStyles = {
  display: 'flex',
  padding: '20px',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
};

const textStyles = {
  display: 'block',
  textAlign: 'center',
  marginTop: '10px',
};

export const Simple = () => {
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const mockClient = getGQLMockClient(1000);

  return (
    <ApolloProvider client={mockClient}>
      <div style={containerStyles}>
        <ClearCart
          onComplete={() => setCompleted(true)}
          setLoading={setLoading}
        />
        {loading && <span style={textStyles}>removing...</span>}
        {!loading && completed && (
          <span style={textStyles}>Items removed successfully</span>
        )}
      </div>
    </ApolloProvider>
  );
};
