import React, { useRef, useEffect } from 'react';
import { func } from 'prop-types';
import defaultClasses from './questionModal.scss';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { useTranslation } from 'react-i18next';
import Button from '../Button';
import useKeyPress from '../../hooks/useKeyPress';

const QuestionModal = ({
  active,
  children,
  confirmAction,
  cancelAction,
  confirmLabel,
  cancelLabel,
  focusConfirm,
  classes: propClasses,
}) => {
  const { t } = useTranslation();
  const confirmRef = useRef();
  const classes = mergeClasses(defaultClasses, propClasses);
  const rootClass = `${classes.modal}${active ? ` ${classes.active}` : ''}`;
  const escPressed = useKeyPress('Escape');

  const stopPropagation = e => {
    e.persist();
    e.stopPropagation();
  };

  useEffect(() => {
    if (confirmRef.current && focusConfirm && active) {
      confirmRef.current.focus();
    }
  }, [confirmRef, active]);

  useEffect(() => {
    if (escPressed && active) cancelAction();
  }, [escPressed, active]);

  return (
    <div className={rootClass} onClick={cancelAction}>
      <div className={classes.container} onClick={stopPropagation}>
        {children}
        <div className={classes.buttons}>
          <Button className={classes.button} onClick={cancelAction}>
            {cancelLabel || t('No')}
          </Button>
          <Button
            ref={confirmRef}
            className={classes.button}
            onClick={confirmAction}
          >
            {confirmLabel || t('Yes')}
          </Button>
        </div>
      </div>
    </div>
  );
};

QuestionModal.propTypes = {
  cancelAction: func.isRequired,
  confirmAction: func.isRequired,
};

export default QuestionModal;
