import React, { useState, useRef, useEffect } from "react";
import { Howl } from "howler";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";


const AudioTrack = ({ onDelete, onRef }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioUploaded, setIsAudioUploaded] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);

  useEffect(() => {
    if (onRef) {
      onRef(audioRef);
    }
  }, [onRef]);

  const play = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.stop();
      setIsPlaying(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const objectURL = URL.createObjectURL(file);
      const fileExtension = file.name.split(".").pop().toLowerCase();
      audioRef.current = new Howl({
        src: [objectURL],
        format: [fileExtension],
        loop: isLooping,
        onend: () => setIsPlaying(false),
      });
      setIsAudioUploaded(true);
    }
  };

  const toggleLoop = () => {
    setIsLooping(!isLooping);
    if (audioRef.current) {
      audioRef.current.loop(!isLooping);
    }
  };

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume(newVolume);
    }
  };

  return (
    <Box
      sx={{
        border: 1,
        borderColor: "grey.500",
        borderRadius: 1,
        p: 1,
        m: 1,
      }}
    >
      <Grid container alignItems="center" justifyContent="center" spacing={2}>
        <Grid item>
          <Button variant="contained" onClick={play}>
            {isPlaying ? "Pause" : "Play"}
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={stop}>
            Stop
          </Button>
        </Grid>
        <Grid item>
          <Button
            component="label"
            variant="contained"
            style={{
              backgroundColor: isAudioUploaded ? "green" : "red",
              color: "white",
            }}
          >
            Import Audio
            <input
              type="file"
              accept="audio/*"
              hidden
              onChange={handleFileChange}
            />
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={onDelete}>
            X
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={toggleLoop}>
            {isLooping ? "Disable Loop" : "Enable Loop"}
          </Button>
        </Grid>
        <Grid item>
          <Box component="label" display="flex" flexDirection="column">
            <span>Volume</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AudioTrack;
