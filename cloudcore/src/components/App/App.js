import React from 'react';
import './App.scss';
import Controls from '../Controls/Controls';
import TrackList from '../TrackList/TrackList';

const App = () => {
  return (
    <div className="app">
      <h1>CloudCore</h1>
      <Controls />
      <TrackList />
    </div>
  );
};

export default App;
