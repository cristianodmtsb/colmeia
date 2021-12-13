import React from 'react';
import { bool, number, shape, string } from 'prop-types';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from './navMenu.css';
import { useNavMenu } from '../../talons/NavMenu/useNavMenu';
import categoryListQuery from '../../queries/getNavigationMenu.graphql';
import NavItem from './navItem';
import NavSubmenu from './navSubmenu';

const NavMenu = ({ style = 'root', categoryId = 2, depth = 2, ...props }) => {
  const classes = mergeClasses(defaultClasses, props.classes);
  const { childCategories } = useNavMenu({
    query: categoryListQuery,
    id: categoryId,
  });

  const branches = childCategories.map(
    ({ category, hasSubmenu, fullUrl, includeInMenu }) => {
      if (includeInMenu === 0) return false;

      return hasSubmenu ? (
        <NavSubmenu
          key={fullUrl}
          category={category}
          fullUrl={fullUrl}
          depth={depth}
          classes={classes.submenu}
        />
      ) : (
        <NavItem
          key={fullUrl}
          category={category}
          fullUrl={fullUrl}
          classes={classes.navItem}
        />
      );
    },
  );

  return (
    <div className={classes[style]}>
      <ul className={classes.tree}>{branches}</ul>
    </div>
  );
};

NavMenu.propTypes = {
  style: string,
  fullUrl: string,
  includeInMenu: number,
  categoryId: number,
  depth: number,
  id: number,
  hasSubmenu: bool,
  classes: shape({
    root: string,
    content: string,
  }),
};

export default NavMenu;
