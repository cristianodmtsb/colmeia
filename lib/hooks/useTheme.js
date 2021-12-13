import React from 'react';

const useTheme = theme => {
  React.useLayoutEffect(() => {
    for (const key in theme) {
      document.documentElement.style.setProperty(`--${key}`, theme[key]);
    }
  }, [theme]);
};

export default useTheme;
