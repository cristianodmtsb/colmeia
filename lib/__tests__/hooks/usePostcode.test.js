import React from 'react';
import { act, render, waitFor } from '@testing-library/react';
import usePostcode from '../../hooks/usePostcode';
import fetchCep from 'cep-promise';

jest.mock('cep-promise');

const VALID_POSTCODE = '04543000';

const EXPECTED_ADDRESS = {
  cep: VALID_POSTCODE,
  state: 'STATE',
  city: 'CITY',
  neighborhood: 'NEIGHBORHOOD',
  street: 'STREET',
};

describe('usePostcode hook', () => {
  let address, error;

  beforeEach(() => {
    address = {};
    error = false;
  });

  const MockComponent = ({ postcode }) => {
    ({ address, error } = usePostcode(postcode));

    return null;
  };

  it('should return the correct address by the postcode', async () => {
    fetchCep.mockResolvedValue(EXPECTED_ADDRESS);

    await act(async () => {
      render(<MockComponent postcode={VALID_POSTCODE} />);
    });

    await waitFor(() => expect(address).toBe(EXPECTED_ADDRESS));
  });

  it('should return error when promise fails', async () => {
    fetchCep.mockRejectedValue();

    await act(async () => {
      render(<MockComponent postcode={VALID_POSTCODE} />);
    });

    await waitFor(() => expect(error).toBeTruthy());
  });
});
