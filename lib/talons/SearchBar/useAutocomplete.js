import { useEffect, useMemo } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import debounce from 'lodash.debounce';

/**
 * @typedef { import("graphql").DocumentNode } DocumentNode
 */

/**
 * Returns props necessary to render an Autocomplete component.
 * @param {Object} props
 * @param {DocumentNode} props.query - GraphQL query
 * @param {Boolean} props.valid - whether to run the query
 * @param {Boolean} props.visible - whether to show the element
 */
export const useAutocomplete = props => {
  const {
    queries: { getAutocompleteResults },
    valid,
    visible,
    value,
  } = props;

  // Prepare to run the queries.
  const [runSearch, productResult] = useLazyQuery(getAutocompleteResults);

  // Create a debounced function so we only search some delay after the last
  // keypress.
  const debouncedRunQuery = useMemo(
    () =>
      debounce(inputText => {
        runSearch({ variables: { inputText } });
      }, 500),
    [runSearch],
  );

  // run the query once on mount, and again whenever state changes
  useEffect(() => {
    if (valid && visible) {
      debouncedRunQuery(value);
    }
  }, [debouncedRunQuery, valid, value, visible]);

  const { data, error, loading } = productResult;

  // Handle results.
  const products = data && data.products;
  const filters = data && data.products.aggregations;
  const hasResult = products && products.items;
  const resultCount = products && products.total_count;
  const displayResult = valid && hasResult;
  let messageType = '';

  if (error) {
    messageType = 'ERROR';
  } else if (loading) {
    messageType = 'LOADING';
  } else if (!displayResult) {
    messageType = 'PROMPT';
  } else if (!resultCount) {
    messageType = 'EMPTY_RESULT';
  } else {
    messageType = 'RESULT_SUMMARY';
  }

  return {
    displayResult,
    filters,
    messageType,
    products,
    resultCount,
  };
};
