import React, { useState, useRef } from "react";
import { Howl } from "howler";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const AudioTrack = ({ onDelete, onRef }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  React.useEffect(() => {
    if (onRef) {
      onRef(audioRef);
    }
  }, [onRef]);

  const playAudio = () => {
    if (!audioRef.current) return;

    setIsPlaying(true);
    audioRef.current.play();
  };

  const stopAudio = () => {
    if (!audioRef.current) return;

    setIsPlaying(false);
    audioRef.current.stop();
  };

  const handleFileUpload = (e) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const audio = new Howl({ src: [reader.result] });
      audioRef.current = audio;
    };
    reader.readAsDataURL(file);
  };

  return (
    <Box>
      <input
        accept="audio/*"
        id="import-audio"
        type="file"
        hidden
        onChange={handleFileUpload}
      />
      <label htmlFor="import-audio">
        <Button variant="contained" component="span">
          Import Audio
        </Button>
      </label>
      <Button variant="contained" onClick={playAudio} disabled={!audioRef.current}>
        Play
      </Button>
      <Button variant="contained" onClick={stopAudio} disabled={!audioRef.current}>
        Stop
      </Button>
      <Button variant="contained" color="error" onClick={onDelete}>
        X
      </Button>
    </Box>
  );
};

export default AudioTrack;
