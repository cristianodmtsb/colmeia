import React from 'react';
import { box, input, icon, label, text } from './checkbox.scss';
import { string, number, oneOfType } from 'prop-types';

import Icon from '../Icon';

const Checkbox = ({
  id,
  checkIcon = 'check',
  iconColor = 'white',
  iconSize = 'x-small',
  children,
  ...props
}) => {
  return (
    <div>
      <input type='checkbox' className={input} id={id} {...props} />
      <label htmlFor={id} className={label}>
        <div className={box}>
          <Icon
            icon={checkIcon}
            color={iconColor}
            size={iconSize}
            className={icon}
          />
        </div>
        {children && <span className={text}>{children}</span>}
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  id: oneOfType([string, number]).isRequired,
  checkIcon: string,
  iconColor: string,
  iconSize: string,
};

export default Checkbox;
