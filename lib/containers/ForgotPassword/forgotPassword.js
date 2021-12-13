import React from 'react';
import { useTranslation } from 'react-i18next';
import { string } from 'prop-types';
import Input from '../Input';
import useForgotPassword from '../../talons/ForgotPassword/useForgotPassword';
import defaultClasses from './forgotPassword.scss';
import { mergeClasses } from '@magento/venia-ui/lib/classify';

const ForgotPassword = ({
  children,
  loadingMessage,
  inputType = 'email',
  inputLabel,
  inputPlaceholder = 'sample@provider.com',
}) => {
  const { forgotPassword, data, loading, error } = useForgotPassword();
  const [inputValue, setInputValue] = React.useState('');
  const classes = mergeClasses(defaultClasses);
  const { t } = useTranslation();

  const translatedLabel = inputLabel || t('Email');
  const translatedLoadingMessage = loadingMessage || t('Sending email');

  const submitHandler = async e => {
    e.preventDefault();
    try {
      await forgotPassword({ variables: { email: inputValue } });
    } catch (err) {}
    setInputValue('');
  };

  const onChangeHandler = e => {
    setInputValue(e.target.value);
  };

  return (
    <form className={classes.root} onSubmit={submitHandler} method='post'>
      <Input
        id='email'
        type={inputType}
        label={translatedLabel}
        placeholder={inputPlaceholder}
        onChange={onChangeHandler}
        value={inputValue}
        disabled={loading}
        required
      />
      {children}
      {loading && (
        <span className={classes.loading}>{translatedLoadingMessage}</span>
      )}
      {error && (
        <span className={classes.error}>
          {error.graphQLErrors.map(({ message }) => t(message))}
        </span>
      )}
      {data && <span className={classes.success}>{t(data)}</span>}
    </form>
  );
};

ForgotPassword.propTypes = {
  loadingMessage: string,
};

export default ForgotPassword;
