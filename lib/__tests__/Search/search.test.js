import React from 'react';
import SearchBar from '../../components/SearchBar';
import { useHistory } from 'react-router-dom';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn(() => ({})),
  useLocation: jest.fn(() => ({})),
}));

const push = jest.fn();
useHistory.mockImplementation(() => ({ push }));
global.alert = jest.fn();

describe('SearchBar Component', () => {
  it("should hide clear button when there's no input", () => {
    render(<SearchBar clearLabel='Close' submitLabel='Search' />);
    const clearButton = screen.getByText(/close/i);
    expect(clearButton).toBeDisabled();
  });

  it('should show clear button when input has value', () => {
    render(
      <SearchBar
        clearLabel='Close'
        submitLabel='Search'
        placeholder='search'
      />,
    );
    const search = screen.getByPlaceholderText(/search/i);
    fireEvent.change(search, {
      target: {
        value: 'foo',
      },
    });
    const clearButton = screen.getByText(/close/i);
    expect(clearButton).toBeEnabled();
  });

  it('should clear input when clear button is clicked', () => {
    render(
      <SearchBar
        clearLabel='Close'
        submitLabel='Search'
        placeholder='search'
      />,
    );
    const search = screen.getByPlaceholderText(/search/i);
    fireEvent.change(search, {
      target: {
        value: 'foo',
      },
    });
    fireEvent.click(screen.getByText(/close/i));
    expect(search).toHaveValue('');
  });

  it('should submit correct string to handler function', async () => {
    render(
      <SearchBar
        clearLabel='Close'
        submitLabel='Search'
        placeholder='search'
      />,
    );

    const search = screen.getByPlaceholderText(/search/i);
    fireEvent.change(search, {
      target: {
        value: 'foo',
      },
    });

    fireEvent.click(screen.getByText(/search/i));
    await waitFor(() =>
      expect(push).toHaveBeenLastCalledWith('/search.html?query=foo'),
    );
  });
});
