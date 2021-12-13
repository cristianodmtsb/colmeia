import React from 'react';
import {
  string,
  func,
  any,
  shape,
  arrayOf,
  oneOfType,
  bool,
  number,
} from 'prop-types';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { useTranslation } from 'react-i18next';
import Dropdown from '../Dropdown';
import Text from '../Text';
import defaultClasses from './ordering.scss';

const Ordering = ({
  onChange,
  value,
  placeholder,
  children,
  autoSize = true,
  classes: propClasses,
  className,
  dropdownClass,
  dropdownMinWidth,
}) => {
  const classes = mergeClasses(defaultClasses, propClasses);

  const { t } = useTranslation();

  const containerClass = `${classes.container} ${className || ''}`;
  const dropdownClassName = `${classes.dropdown} ${dropdownClass || ''}`;

  return (
    <div className={containerClass}>
      <Text className={classes.text}>{t('Order by')}: </Text>
      <Dropdown
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        autoSize={autoSize}
        className={dropdownClassName}
        minWidth={dropdownMinWidth}
        useCheckIcon
      >
        {children}
      </Dropdown>
    </div>
  );
};

Ordering.propTypes = {
  onChange: func.isRequired,
  placeholder: string,
  autoSize: bool,
  className: string,
  dropdownClass: string,
  dropdownMinWidth: number,
  value: oneOfType([number, string, bool]),
  children: arrayOf(
    shape({
      text: string.isRequired,
      value: any.isRequired,
    }),
  ),
};

export default Ordering;
