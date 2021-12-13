import React from 'react';
import { string, shape } from 'prop-types';

import { Link } from '@magento/venia-drivers';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from './navMenu.css';

const NavItem = ({ category: { name }, fullUrl, classes: propClasses }) => {
  const classes = mergeClasses(defaultClasses, propClasses);

  return (
    <li className={classes.link}>
      <Link className={classes.target} to={fullUrl}>
        <span className={classes.text}>{name}</span>
      </Link>
    </li>
  );
};

NavItem.propTypes = {
  category: shape({
    name: string.isRequired,
  }).isRequired,
  classes: shape({
    item: string,
    image: string,
    imageContainer: string,
    name: string,
  }),
};
export default NavItem;
