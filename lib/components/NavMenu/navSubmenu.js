import React, { useState } from 'react';
import { string, shape } from 'prop-types';

import { Link } from '@magento/venia-drivers';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from './navMenu.css';
import { useNavSubmenu } from '../../talons/NavMenu/useNavSubmenu';
import NavMenu from './navMenu';

const NavSubmenu = ({ category, depth, fullUrl, classes: propClasses }) => {
  const { name } = category;
  const classes = mergeClasses(defaultClasses, propClasses);
  const [hovered, setHovered] = useState(false);
  const toggleHover = () => setHovered(!hovered);

  const { continueLoop } = useNavSubmenu({
    item: category,
    levelDepth: depth,
  });

  const submenu = !!continueLoop && (
    <NavMenu categoryId={category.id} depth={depth} style={'content'} />
  );

  return (
    <li
      className={classes.link}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
    >
      <Link className={classes.target} to={fullUrl}>
        <span className={classes.text}>{name}</span>
      </Link>
      {hovered && submenu}
    </li>
  );
};

NavSubmenu.propTypes = {
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
export default NavSubmenu;
