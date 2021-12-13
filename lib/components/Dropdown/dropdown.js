import React, { useState } from 'react';
import {
  string,
  func,
  any,
  shape,
  arrayOf,
  oneOfType,
  bool,
  number,
  node,
} from 'prop-types';
import defaultClasses from './dropdown.scss';
import Icon from '../Icon';
import Text from '../Text';
import List from '../List';

const Dropdown = ({
  children,
  onChange,
  placeholder,
  value,
  className,
  useCheckIcon = false,
  minWidth,
}) => {
  const [isOpen, setIsOpen] = useState();

  const selectedItem = children.find(item => item.value === value);
  const text = selectedItem ? selectedItem.text : placeholder;

  const iconClass = isOpen ? defaultClasses.openedIcon : defaultClasses.icon;

  return (
    <div
      className={`${defaultClasses.box} ${className ? className : ''}`}
      onClick={() => setIsOpen(!isOpen)}
      style={{ minWidth }}
    >
      <Text className={defaultClasses.text}>{text}</Text>
      <input type='hidden' value={value || ''} />
      <Icon
        icon='dropdown'
        size='small'
        color='tertiary'
        className={iconClass}
      />
      {isOpen && (
        <List
          selectItem={onChange}
          useCheckIcon={useCheckIcon}
          selectedValue={selectedItem && selectedItem.value}
        >
          {children}
        </List>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  className: string,
  onChange: func.isRequired,
  placeholder: string,
  value: oneOfType([number, string, bool]),
  renderItem: func,
  minWidth: number,
  children: arrayOf(
    shape({
      text: oneOfType([string, node]).isRequired,
      value: any.isRequired,
    }),
  ),
};

export default Dropdown;
