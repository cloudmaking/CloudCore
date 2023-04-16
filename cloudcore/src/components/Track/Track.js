import React from 'react';
import './Track.scss';
import AudioTrack from './AudioTrack/AudioTrack';
import MidiTrack from './MidiTrack/MidiTrack';

const Track = ({ type }) => {
  return (
    <div className="track">
      {type === 'audio' ? <AudioTrack /> : <MidiTrack />}
    </div>
  );
};

export default Track;
