import React, { useState } from 'react';
import Input from '../../containers/Input';
import defaultClasses from './searchBar.scss';
import Button from '../Button';
import { string, node, oneOfType, bool } from 'prop-types';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { useSearchBar } from '@magento/peregrine/lib/talons/SearchBar';
import Autocomplete from './autocomplete';

const SearchBar = ({
  autocomplete = false,
  placeholder,
  submitLabel,
  clearIcon,
  clearLabel,
  classes: propClasses,
}) => {
  const classes = mergeClasses(defaultClasses, propClasses);
  const [searchString, setSearchString] = useState('');
  const [focused, setFocused] = useState(false);
  const talonProps = useSearchBar();

  const handleSearch = (e, search_query) => {
    e.preventDefault();
    handleSubmit({ search_query });
    setSearchString('');
  };

  const handleInputChange = e => {
    const { value } = e.target;
    setSearchString(value);
    handleChange(value);
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const {
    containerRef,
    setExpanded,
    expanded,
    handleChange,
    handleSubmit,
    valid,
  } = talonProps;

  return (
    <div ref={containerRef} className={classes.container}>
      <form
        className={classes.root}
        onSubmit={e => handleSearch(e, searchString)}
      >
        <Input
          onBlur={handleBlur}
          onFocus={handleFocus}
          className={classes.input}
          onChange={handleInputChange}
          value={searchString}
          id='search'
          placeholder={placeholder}
          useClear={true}
          clearIcon={clearIcon}
          clearLabel={clearLabel}
        />
        <Button className={classes.search} type='submit' role='primary'>
          {submitLabel}
        </Button>
      </form>
      {autocomplete && (
        <div className={classes.autocomplete}>
          <Autocomplete
            setVisible={setExpanded}
            visible={expanded || focused}
            value={searchString}
            valid={valid}
          />
        </div>
      )}
    </div>
  );
};

SearchBar.propTypes = {
  autocomplete: bool,
  clearIcon: node,
  clearLabel: string,
  placeholder: string,
  submitLabel: oneOfType([string, node]).isRequired,
};

export default SearchBar;
