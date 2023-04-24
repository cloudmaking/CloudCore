import React, { useRef, useEffect, useContext } from 'react';
import './AudioTrack.scss';
import AudioContext from '../../AudioContext';

const AudioTrack = () => {
  const audioRef = useRef();
  const { isPlaying } = useContext(AudioContext);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const objectUrl = URL.createObjectURL(file);
    audioRef.current.src = objectUrl;
  };

  return (
    <div className="audio-track">
      <h3>Audio Track</h3>
      <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
      />
      <audio ref={audioRef} />
    </div>
  );
};

export default AudioTrack;
