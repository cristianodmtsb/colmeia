import React from 'react';
import Checkbox from '../../../components/Checkbox';

/**
 *
 * This component is a fallback from @magento/venia-ui, that adapts its properties to the Colmeia's Checkbox props
 *
 */
const CheckboxAdapter = ({ field, label, fieldState, ...rest }) => {
  const props = { ...rest };
  if (fieldState) {
    props.checked = !!fieldState.value;
  }
  return (
    <Checkbox name={field} {...props}>
      {label}
    </Checkbox>
  );
};

export default CheckboxAdapter;
