import React from 'react';

export interface Book {
  id: number;
  title: string;
  author_name: string[];
}

export interface SearchState {
  query: string;
  results: Book[];
  loading: boolean;
  error: string | null;
}

export interface RootState {
  search: SearchState;
}
