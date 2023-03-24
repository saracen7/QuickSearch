import React, { useState, useEffect  } from 'react';
import { useDispatch } from 'react-redux';
import { searchQueryUpdated, searchBooks,clearSearchResults } from '../features/search/searchSlice';
import { AppDispatch } from '../features/store';
import styled from "styled-components";

interface SearchBarProps {}

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  margin-bottom: 20px;
  background: #f2f2f2;
  padding: 10px
`;

const SearchInput = styled.input`
  font-size: 12px;
  padding: 10px;
  border: none;
 height: 10px;
  margin-right: 10px;

  &:focus {
    outline: none;
    border-bottom-color: blue;
  }
`;




export const SearchBar: React.FC<SearchBarProps> = () => {
  const [query, setQuery] = useState('');
  const dispatch: AppDispatch = useDispatch();

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

    useEffect(() => {
    if (query.length >= 3) {
      dispatch(searchQueryUpdated(query));
      dispatch(searchBooks(query) as any);
    }else{
    dispatch(clearSearchResults())
    }
  }, [query, dispatch]);

  return (
    <SearchBarContainer>
      <SearchInput  type="text" value={query} onChange={handleQueryChange} placeholder="Search for books" data-testid="search-input"/>
    </SearchBarContainer>
  );
};

export default SearchBar;