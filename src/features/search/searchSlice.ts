import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import { RootState, Book } from '../types';

interface SearchState {
  query: string;
  results: Book[];
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  query: '',
  results: [],
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchQueryUpdated: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    searchResultsUpdated: (state, action: PayloadAction<Book[]>) => {
      state.results = action.payload;
      state.loading = false;
      state.error = null;
    },
    searchLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    searchError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearSearchResults(state) {
      state.results = [];
    },
  },
});

export const {
  searchQueryUpdated,
  searchResultsUpdated,
  searchLoading,
  searchError,
  clearSearchResults
} = searchSlice.actions;

export const searchBooks = (query: string): AppThunk => async (dispatch) => {
  try {
    dispatch(searchLoading());
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${query}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch search results.');
    }
    const data = await response.json();
    const books = data.docs.map((book: any) => ({
      id: book.key,
      title: book.title,
      author_name: book.author_name || [],
      isbn: book.isbn,
      coverid: book.cover_i,
      amazonId: book.id_amazon
    }));
    dispatch(searchResultsUpdated(books));
  } catch (error) {
    dispatch(searchError((error as Error).message));
  }
};

export const selectSearchResults = (state: RootState) => state.search.results;
export const selectSearchLoading = (state: RootState) => state.search.loading;
export const selectSearchError = (state: RootState) => state.search.error;


export default searchSlice.reducer;
