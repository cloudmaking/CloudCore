// components/Tracklist/Tracklist.js
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

  const handleDeleteTrack = (id) => {
    setTracks(tracks.filter((track) => track.id !== id));
  };

  return (
    <div className="track-list">
      <div className="add-track-buttons">
        <button onClick={addAudioTrack}>Add Audio Track</button>
        <button onClick={addMidiTrack}>Add MIDI Track</button>
      </div>
      {tracks.map((track) => (
        <Track key={track.id} type={track.type} onDelete={() => handleDeleteTrack(track.id)} />
      ))}
    </div>
  );
};

export default TrackList;
