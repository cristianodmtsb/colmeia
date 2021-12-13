import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import { useAutocomplete } from '../../talons/SearchBar/useAutocomplete';

import defaultClasses from './autocomplete.scss';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import Suggestions from './suggestions';
import { useTranslation } from 'react-i18next';
import GET_AUTOCOMPLETE_RESULTS from '../../queries/getAutoCompleteResults.graphql';

const Autocomplete = props => {
  const { setVisible, valid, visible, value } = props;
  const { t } = useTranslation();

  const MESSAGES = new Map()
    .set('ERROR', t('An error occurred while fetching results.'))
    .set('LOADING', t('Fetching results...'))
    .set('PROMPT', t('Search for a product'))
    .set('EMPTY_RESULT', t('No results were found.'))
    .set('RESULT_SUMMARY', (_, resultCount) =>
      t('{{resultCount}} items', { resultCount }),
    );

  const talonProps = useAutocomplete({
    queries: {
      getAutocompleteResults: GET_AUTOCOMPLETE_RESULTS,
    },
    valid,
    visible,
    value,
  });
  const {
    displayResult,
    filters,
    messageType,
    products,
    resultCount,
  } = talonProps;

  const classes = mergeClasses(defaultClasses, props.classes);
  const rootClassName = visible ? classes.root_visible : classes.root_hidden;

  const messageTpl = MESSAGES.get(messageType);
  const message =
    typeof messageTpl === 'function' ? messageTpl`${resultCount}` : messageTpl;

  return (
    <div className={rootClassName}>
      <div className={classes.message}>{message}</div>
      <div className={classes.suggestions}>
        <Suggestions
          displayResult={displayResult}
          products={products || {}}
          filters={filters}
          searchValue={value}
          setVisible={setVisible}
          visible={visible}
        />
      </div>
    </div>
  );
};

export default Autocomplete;

Autocomplete.propTypes = {
  classes: shape({
    message: string,
    root_hidden: string,
    root_visible: string,
    suggestions: string,
  }),
  setVisible: func,
  visible: bool,
};
