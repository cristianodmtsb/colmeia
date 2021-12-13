import React, { useState, useEffect } from 'react';
import defaultClasses from './login.css';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import Text from '../../components/Text';
import Input from '../Input';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import validators from '../../helpers/validators';
import { useTranslation } from 'react-i18next';
import { Link } from '@magento/venia-drivers';
import { useSignIn } from '@magento/peregrine/lib/talons/SignIn/useSignIn';
import CREATE_CART_MUTATION from '@magento/venia-ui/lib/queries/createCart.graphql';
import GET_CUSTOMER_QUERY from '@magento/venia-ui/lib/queries/getCustomer.graphql';
import GET_CART_DETAILS_QUERY from '@magento/venia-ui/lib/queries/getCartDetails.graphql';
import SIGN_IN_MUTATION from '@magento/venia-ui/lib/queries/signIn.graphql';

const getInputClasses = ({
  fieldsetContainer,
  placeholderLabel,
  inputContainer,
  input,
  failure,
  labelActive,
}) => ({
  fieldsetContainer,
  placeholderLabel,
  inputContainer,
  input,
  failure,
  labelActive,
});

const Login = ({ classes: propClasses, className }) => {
  const [user, setUser] = useState('');
  const [error, setError] = useState(false);
  const [password, setPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const classes = mergeClasses(defaultClasses, propClasses);
  const inputClasses = getInputClasses(classes);
  let errorTimeout;

  const { formRef, handleSubmit, errors } = useSignIn({
    createCartMutation: CREATE_CART_MUTATION,
    customerQuery: GET_CUSTOMER_QUERY,
    getCartDetailsQuery: GET_CART_DETAILS_QUERY,
    signInMutation: SIGN_IN_MUTATION,
  });

  console.log(errors);

  const errorMessage = errors.length
    ? errors
        .map(({ message }) => message)
        .reduce((acc, msg) => msg + '\n' + acc, '')
        .trim()
    : '';

  useEffect(() => {
    clearTimeout(errorTimeout);

    if (errorMessage.length > 0) {
      setError(true);
    }

    errorTimeout = setTimeout(() => {
      setError(false);
    }, 3000);
  }, [errorMessage]);

  const onSubmit = async e => {
    e.preventDefault();
    const formErrors = {};
    if (user.length === 0) {
      formErrors.user = t('Required field');
    }

    if (!!user && !validators.email(user)) {
      formErrors.user = t('Invalid E-mail');
    }

    if (password.length === 0) {
      formErrors.password = t('Required field');
    }

    setErrorMessages(formErrors);

    if (Object.keys(formErrors).length > 0) {
      return false;
    }

    setIsLoading(true);
    await handleSubmit({ email: user, password });
    setIsLoading(false);
  };

  return (
    <div className={`${classes.root} ${className ? className : ''}`}>
      <form ref={formRef} className={classes.formContainer} onSubmit={onSubmit}>
        <div
          className={`${classes.errorMessage} ${
            error ? classes.errorActive : ''
          }`}
        >
          {t(errorMessage)}
        </div>
        <Text type='h2' subType='subtitle' className={classes.title}>
          {t('Access your account')}
        </Text>
        <Input
          classes={inputClasses}
          type='text'
          label={t('E-mail')}
          value={user}
          onChange={e => setUser(e.target.value)}
          placeholderLabel={true}
          state={!!errorMessages.user ? 'failure' : 'neutral'}
          message={errorMessages.user}
        />
        <Input
          classes={inputClasses}
          type='password'
          label={t('Password')}
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholderLabel={true}
          state={!!errorMessages.password ? 'failure' : 'neutral'}
          message={errorMessages.password}
        />
        <div className={classes.actionContainer}>
          <Link className={classes.linkButton} to='forgot-password'>
            {t('Forgot your password?')}
          </Link>
          <Button type='submit' className={classes.login}>
            {t('Log-in')}
          </Button>
        </div>
        {isLoading && <Loader />}
      </form>
      <div className={classes.createAccountContainer}>
        <Text type='h3' subType='subtitle' className={classes.subtitle}>
          {t('Are you a new user?')}
        </Text>
        <Text type='p' className={classes.createAccountDescription}>
          {t(
            'Sign up and access the entire product catalog with exclusive prices',
          )}
        </Text>
        <Link to='create-account' className={classes.createAccount}>
          {t('Create an Account')}
        </Link>
      </div>
    </div>
  );
};

export default Login;
