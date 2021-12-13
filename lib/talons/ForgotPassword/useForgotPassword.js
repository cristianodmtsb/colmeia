import FORGOT_PASSWORD from '../../queries/forgotPasswordMutation.graphql';
import { useMutation } from '@apollo/react-hooks';

const useForgotPassword = () => {
  const [
    forgotPassword,
    { loading, error, data },
  ] = useMutation(FORGOT_PASSWORD, { errorPolicy: 'all' });

  const message =
    (data && data.forgetPassword && data.forgetPassword.message) || [];

  return {
    forgotPassword,
    loading,
    error,
    data: message,
  };
};

export default useForgotPassword;
