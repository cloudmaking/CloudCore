// components/Track/Track.js
import React from 'react';
import './Track.scss';
import AudioTrack from './AudioTrack/AudioTrack';
import MidiTrack from './MidiTrack/MidiTrack';
import TrackControls from './TrackControls';

const Track = ({ type, onDelete }) => {
  // Implement handlers for the controls
  const handleSolo = () => {
    console.log('Solo track');
  };

  const handleMute = () => {
    console.log('Mute track');
  };

  const handleVolumeChange = (e) => {
    console.log('Volume change:', e.target.value);
  };

  const handleBalanceChange = (e) => {
    console.log('Balance change:', e.target.value);
  };

  const handleInputSourceChange = (e) => {
    console.log('Input source change:', e.target.value);
  };

  return (
    <div className="track">
      {type === 'audio' ? <AudioTrack /> : <MidiTrack />}
      <TrackControls
        onDelete={onDelete}
        onSolo={handleSolo}
        onMute={handleMute}
        onVolumeChange={handleVolumeChange}
        onBalanceChange={handleBalanceChange}
        onInputSourceChange={handleInputSourceChange}
      />
    </div>
  );
};

export default Track;
