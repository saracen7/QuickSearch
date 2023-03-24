
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from './features/store';
import App from './App';

describe('App', () => {
  test('renders search results as user types after typing at least 3 characters', async () => {
    const { getByTestId, queryByTestId } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const searchInput = getByTestId('search-input');

    // type at least 3 characters into the search input
    fireEvent.change(searchInput, { target: { value: 'the' } });

    // wait for debounce to complete
    await waitFor(() => expect(queryByTestId('results-overlay')).toBeInTheDocument());

    const searchResults = queryByTestId('search-results');

    // ensure search results are displayed
    waitFor(() => expect(searchResults).toBeInTheDocument());

    // ensure search results are for "the"
    waitFor(() =>expect(searchResults?.textContent).toContain('the'));
  });
});
