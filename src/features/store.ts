import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import searchReducer from './search/searchSlice';
import { RootState } from './types';

const store = configureStore({
  reducer: {
    search: searchReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  null,
  Action<string>
>;

export default store;
