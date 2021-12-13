import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Button from '../../components/Button';
import ForgotPassword from '../../containers/ForgotPassword';

import ProviderComponent from 'ProviderComponent';
import { ApolloProvider } from 'react-apollo';
import { getGQLMockClient } from '../../containers/ForgotPassword/__mock__';

const Component = ({ clientMock }) => {
  return (
    <ProviderComponent>
      <ApolloProvider client={clientMock}>
        <ForgotPassword>
          <Button type='submit'>Submit</Button>
        </ForgotPassword>
      </ApolloProvider>
    </ProviderComponent>
  );
};

describe('ForgotPassword Component', () => {
  it('should render without error', () => {
    const { mockClient } = getGQLMockClient();

    render(<Component clientMock={mockClient} />);
  });
  it('should render loading initially', async () => {
    const { mockClient } = getGQLMockClient();

    render(<Component clientMock={mockClient} />);

    const input = screen.getByLabelText(/email/i);
    fireEvent.change(input, {
      target: {
        value: 'test@webjump.com.br',
      },
    });

    const button = screen.getByText(/submit/i);
    fireEvent.click(button);

    await waitFor(() =>
      expect(screen.getByText(/sending email/i)).toBeInTheDocument(),
    );
  });
  it('should render success UI', async () => {
    const { mockClient } = getGQLMockClient();

    render(<Component clientMock={mockClient} />);

    const input = screen.getByLabelText(/email/i);
    fireEvent.change(input, {
      target: {
        value: 'test@webjump.com.br',
      },
    });

    const button = screen.getByText(/submit/i);
    fireEvent.click(button);

    await waitFor(() =>
      expect(
        screen.getByText(/the email was sent successfully!/i),
      ).toBeInTheDocument(),
    );
  });
  it('should render error UI', async () => {
    const { mockClientError } = getGQLMockClient();

    render(<Component clientMock={mockClientError} />);

    const input = screen.getByLabelText(/email/i);
    fireEvent.change(input, {
      target: {
        value: 'test@webjump.com.br',
      },
    });

    const button = screen.getByText(/submit/i);
    fireEvent.click(button);

    await waitFor(
      () =>
        expect(screen.getByText(/error when sending the email!/i))
          .toBeInTheDocument,
    );
  });
});
