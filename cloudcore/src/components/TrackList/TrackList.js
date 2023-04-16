import React, { useState } from 'react';
import './TrackList.scss';
import Track from '../Track/Track';

const TrackList = () => {
  const [tracks, setTracks] = useState([]);

  const addAudioTrack = () => {
    setTracks([...tracks, { id: Date.now(), type: 'audio' }]);
  };

  const addMidiTrack = () => {
    setTracks([...tracks, { id: Date.now(), type: 'midi' }]);
  };

  return (
    <div className="track-list">
      <div className="add-track-buttons"> {/* Add a container div */}
        <button onClick={addAudioTrack}>Add Audio Track</button>
        <button onClick={addMidiTrack}>Add MIDI Track</button>
      </div>
      {tracks.map((track) => (
        <Track key={track.id} type={track.type} />
      ))}
    </div>
  );
};

export default TrackList;
