import { useEffect } from 'react';

const usePreventWindowDrop = () => {
  useEffect(() => {
    const prevent = e => {
      e.preventDefault();
      return false;
    };

    window.addEventListener('dragover', prevent);
    window.addEventListener('drop', prevent);

    return () => {
      window.removeEventListener('dragover', prevent);
      window.removeEventListener('drop', prevent);
    };
  }, []);
};

export default usePreventWindowDrop;
