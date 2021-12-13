import { useState, useEffect } from 'react';
import fetchCep from 'cep-promise';

const usePostcode = postcode => {
  const [address, setAddress] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchCep(postcode)
      .then(address => {
        setAddress(address);
        setError(false);
      })
      .catch(() => {
        setAddress({});
        setError(true);
      });
  }, [postcode]);

  return { address, error };
};

export default usePostcode;
