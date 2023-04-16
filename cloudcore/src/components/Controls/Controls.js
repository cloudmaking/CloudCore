import React, { useState } from 'react';
import './Controls.scss';

const Controls = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [bpm, setBpm] = useState(120);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRecord = () => {
    setIsRecording(!isRecording);
  };

  const handleBpmChange = (e) => {
    setBpm(e.target.value);
  };

  return (
    <div className="controls">
      <button className="play-btn" onClick={handlePlay}>
        {isPlaying ? 'Stop' : 'Play'}
      </button>
      <button className="record-btn" onClick={handleRecord}>
        {isRecording ? 'Stop Recording' : 'Record'}
      </button>
      <div className="bpm-container">
        <label htmlFor="bpm">BPM: </label>
        <input
          type="number"
          id="bpm"
          name="bpm"
          value={bpm}
          onChange={handleBpmChange}
          min="20"
          max="300"
        />
      </div>
    </div>
  );
};

export default Controls;
