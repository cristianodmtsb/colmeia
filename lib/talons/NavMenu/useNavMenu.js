import { useEffect, useMemo } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';

/**
 * Returns props necessary to render a CategoryList component.
 *
 * @param {object} props
 * @param {object} props.query - category data
 * @param {string} props.id - category id
 * @return {{childCategories: *}}
 */
export const useNavMenu = ({ query, id }) => {
  const [runQuery, { data }] = useLazyQuery(query);

  useEffect(() => {
    runQuery({ variables: { id } });
  }, [id, runQuery]);

  const children = (data && data.category && data.category.children) || null;

  const childCategories = useMemo(() => {
    const childCategories = [];

    for (const category of children || '') {
      const hasSubmenu = category.children_count > 0;
      const urlPath = category.url_path;
      const urlSuffix = category.url_suffix;
      const fullUrl = `/${urlPath}${urlSuffix}`;
      const includeInMenu = category.include_in_menu;
      const isRoot = category.level === 2;

      childCategories.push({
        category,
        hasSubmenu,
        urlPath,
        fullUrl,
        includeInMenu,
        isRoot,
      });
    }

    return childCategories;
  }, [children]);

  return { childCategories };
};
