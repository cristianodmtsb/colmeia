import React from 'react';
import { bool, string } from 'prop-types';
import Icon from '../Icon';
import {
  base,
  baseText,
  danger as dangerStatus,
  success as succesStatus,
  warning as warningStatus,
} from './alert.scss';

const Alert = ({
  children,
  danger,
  success,
  warning,
  iconSize = 'medium',
  ...props
}) => {
  let iconComponent;
  let classes = base;

  classes += danger ? ` ${dangerStatus}` : '';
  classes += success ? ` ${succesStatus}` : '';
  classes += warning ? ` ${warningStatus}` : '';

  if (warning)
    iconComponent = <Icon icon='alert' color='warning' size={iconSize} />;

  if (danger)
    iconComponent = <Icon icon='failure' color='danger' size={iconSize} />;

  if (success)
    iconComponent = <Icon icon='success' color='success' size={iconSize} />;

  return (
    <div className={classes} {...props}>
      {iconComponent}
      <p className={baseText}>{children}</p>
    </div>
  );
};

Alert.propTypes = {
  children: string.isRequired,
  danger: bool,
  success: bool,
  warning: bool,
  iconSize: string,
};

export default Alert;
