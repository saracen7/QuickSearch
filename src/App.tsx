import React from 'react';
import { Provider } from 'react-redux';
import store from './features/store';
import SearchBar from './components/SearchBar';
import ResultsOverlay from './components/ResultsOverlay';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <SearchBar />
        <ResultsOverlay />
      </div>
    </Provider>
  );
}

export default App;