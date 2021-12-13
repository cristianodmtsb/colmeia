import React from 'react';
import { string, func, any, shape, arrayOf } from 'prop-types';
import defaultClasses from './list.scss';
import Text from '../Text';
import Icon from '../Icon';

const List = ({ children, selectItem, useCheckIcon, selectedValue }) => {
  return (
    <ul className={defaultClasses.opened}>
      {children.map(item => (
        <li
          key={item.text}
          className={defaultClasses.item}
          onClick={() => {
            selectItem(item.value);
          }}
        >
          <Text className={defaultClasses.text}>
            {useCheckIcon && selectedValue && (
              <Icon
                icon={item.value === selectedValue ? 'success' : ''}
                size='small'
                color='tertiary'
                className={defaultClasses.icon}
              />
            )}
            {item.text}
          </Text>
        </li>
      ))}
    </ul>
  );
};

List.propTypes = {
  selectItem: func.isRequired,
  children: arrayOf(
    shape({
      text: string.isRequired,
      value: any.isRequired,
    }),
  ),
};

export default List;
