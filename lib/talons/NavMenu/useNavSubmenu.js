import React from 'react';

/**
 * Returns props necessary to render a CategoryList component.
 *
 * @param {object} props
 * @param {object} props.query - category data
 * @param {string} props.id - category id
 * @return {{childCategories: *}}
 */
export const useNavSubmenu = ({ item: { level }, levelDepth }) => ({
  continueLoop: level <= levelDepth,
});
