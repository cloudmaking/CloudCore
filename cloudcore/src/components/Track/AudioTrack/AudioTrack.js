// AudioTrack.js
import React, { useContext, useEffect, useState } from 'react';
import { Howl } from 'howler';
import PlayContext from '../../../PlayContext';

import './AudioTrack.scss';

const AudioTrack = () => {
  const [audioFileName, setAudioFileName] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [audioName, setAudioName] = useState('');
  const [sound, setSound] = useState(null);
  const { isPlaying } = useContext(PlayContext);

  useEffect(() => {
    if (sound) {
      if (isPlaying) {
        sound.play();
      } else {
        sound.pause();
      }
    }
  }, [isPlaying, sound]);

  const handleAudioImport = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.onload = (e) => {
      const audioDataUrl = e.target.result;
      const audioFileExtension = file.name.split('.').pop();
  
      const sound = new Howl({
        src: [audioDataUrl],
        format: [audioFileExtension], // Specify the file format
        onload: () => {
          setAudioFileName(file.name);
          setAudioFile(sound);
          setAudioName(file.name);
        },
      });
    };
  
    reader.readAsDataURL(file);
  };  

  return (
    <div className="audio-track">
      <h3>Audio Track</h3>
      <input
        type="file"
        accept="audio/*"
        onChange={handleAudioImport}
        style={{ display: 'none' }}
        id="importAudio"
      />
      <label htmlFor="importAudio" className="import-button">
        Import Audio
      </label>
      <span className="audio-name">{audioFileName}</span>
      {/* Add audio track controls here */}
    </div>
  );
};

export default AudioTrack;
