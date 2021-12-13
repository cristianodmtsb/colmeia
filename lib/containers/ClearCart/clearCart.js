import React, { useEffect, useState } from 'react';
import { func } from 'prop-types';
import useClearCart from '../../talons/ClearCart/useClearCart';
import Icon from '../../components/Icon';
import Text from '../../components/Text';
import { useTranslation } from 'react-i18next';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from './clearCart.scss';
import QuestionModal from '../../components/QuestionModal';

const ClearCart = ({ onComplete, setLoading, classes: propClasses }) => {
  const [removeActive, setRemoveActive] = useState(false);
  const classes = mergeClasses(defaultClasses, propClasses);
  const { clearCart, data, disabled } = useClearCart();

  const { t } = useTranslation();

  const confirmAction = async () => {
    setRemoveActive(false);
    setLoading && setLoading(true);
    await clearCart();
    setLoading && setLoading(false);
  };

  useEffect(() => {
    !!data && onComplete && onComplete(data);
  }, [data]);

  return (
    <>
      <button
        className={classes.clearCart}
        onClick={() => setRemoveActive(true)}
        disabled={disabled}
      >
        <Icon icon='trash' />
        {t('Clear Cart')}
      </button>
      <QuestionModal
        active={removeActive}
        cancelAction={() => setRemoveActive(false)}
        confirmAction={confirmAction}
        confirmLabel={t('Yes')}
        cancelLabel={t('Back')}
        focusConfirm={true}
      >
        <Text type='h2'>{t('Are you sure you want to clean your cart?')}</Text>
      </QuestionModal>
    </>
  );
};

ClearCart.propTypes = {
  onComplete: func,
  setLoading: func,
};

export default ClearCart;
