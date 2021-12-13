import React from 'react';
import { render, waitFor } from '@testing-library/react';
import Logo from '../../containers/Logo';
import ProviderComponent from 'ProviderComponent';
import { ApolloProvider } from 'react-apollo';
import { getGQLMockClient, logoMock } from '../../containers/Logo/__mock__';

const Component = ({ withoutLogo = false, fallback }) => {
  const mockClient = getGQLMockClient(withoutLogo);

  return (
    <ProviderComponent>
      <ApolloProvider client={mockClient}>
        <Logo fallback={fallback} />
      </ApolloProvider>
    </ProviderComponent>
  );
};

const expectedValue = `${logoMock.storeConfig.secure_base_media_url}logo/${logoMock.storeConfig.header_logo_src}`;

describe('Logo', () => {
  it('should show configured Logo', async () => {
    const { container } = render(<Component />);

    await waitFor(() => container.querySelector('.image + .image'));
    const logo = container.querySelector('.image + .image');
    expect(logo).toHaveAttribute('src', expectedValue);
  });

  it('should show fallback Logo', async () => {
    const { container } = render(
      <Component withoutLogo={true} fallback='fallback' />,
    );

    await waitFor(() => container.querySelector('.image + .image'));
    const logo = container.querySelector('.image + .image');
    expect(logo).toHaveAttribute('src', 'fallback');
  });
});
