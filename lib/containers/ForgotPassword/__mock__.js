import { createMockClient } from 'mock-apollo-client';
import FORGOT_PASSWORD from '../../queries/forgotPasswordMutation.graphql';

const forgetPasswordMock = {
  forgetPassword: {
    message: 'The email was sent successfully!',
  },
};

const forgetPasswordErrorMock = {
  errors: [
    {
      message: 'Error when sending the email!',
      extensions: {
        category: 'graphql-no-such-entity',
      },
      locations: [
        {
          line: 2,
          column: 3,
        },
      ],
      path: ['forgetPassword'],
    },
  ],
  data: {
    forgetPassword: null,
  },
};

export const getGQLMockClient = () => {
  const mockClient = createMockClient();
  const mockClientError = createMockClient();

  mockClient.setRequestHandler(FORGOT_PASSWORD, () =>
    Promise.resolve({ data: forgetPasswordMock }),
  );

  mockClientError.setRequestHandler(FORGOT_PASSWORD, () =>
    Promise.resolve(forgetPasswordErrorMock),
  );

  return { mockClient, mockClientError };
};
