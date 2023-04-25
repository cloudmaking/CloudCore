import React from 'react';
import './App.scss';
import Controls from '../Controls/Controls';
import TrackList from '../TrackList/TrackList';
import AudioContext from '../../AudioContext';

const App = () => {
  return (
    <div className="app">
      <div className="header-container">
        <button className="downbad-button" onClick={() => window.open('https://www.downbad.cloud', '_blank')}>DownBad</button>
        <h1>CloudCore</h1>
        <button className="downbad-button" onClick={() => window.open('https://github.com/cloudmaking/CloudCore', '_blank')}>Github</button>
      </div>
      <AudioContext.Provider value={useAudio()}>
        <Controls />
        <TrackList />
      </AudioContext.Provider>
    </div>
  );
};

export default App;
