import React from 'react';
import { func, shape, string } from 'prop-types';
import { Link } from '@magento/venia-drivers';
import { useSuggestedCategory } from '@magento/peregrine/lib/talons/SearchBar';
import { useTranslation } from 'react-i18next';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from './suggestedCategory.scss';

const SuggestedCategory = props => {
  const { t } = useTranslation();
  const { categoryId, label, onNavigate, value } = props;
  const talonProps = useSuggestedCategory({
    categoryId,
    label,
    onNavigate,
    searchValue: value,
  });
  const { destination, handleClick } = talonProps;
  const classes = mergeClasses(defaultClasses, props.classes);

  return (
    <Link className={classes.root} to={destination} onClick={handleClick}>
      <strong className={classes.value}>{value}</strong>
      <span className={classes.label}>{` ${t('in {{label}}', {
        label,
      })}`}</span>
    </Link>
  );
};

export default SuggestedCategory;

SuggestedCategory.propTypes = {
  categoryId: string,
  classes: shape({
    label: string,
    root: string,
    value: string,
  }),
  label: string.isRequired,
  onNavigate: func,
  value: string.isRequired,
};
