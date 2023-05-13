import React, { useState, useEffect, useRef } from "react";
import { Button, Grid, Slider, Box } from "@mui/material";
import { Howl } from "howler";
import WaveformViewer from "./WaveformViewer";

const AudioControls = ({ isPlaying, play, stop, onDelete, isAudioUploaded }) => (
  <Grid item>
    <Button variant="contained" onClick={play}>
      {isPlaying ? "Pause" : "Play"}
    </Button>
    <Button variant="contained" onClick={stop}>
      Stop
    </Button>
    <Button variant="contained" onClick={onDelete}>
      X
    </Button>
  </Grid>
);

const AudioFileInput = ({ handleFileChange, isAudioUploaded, fileName }) => (
  <Grid item>
    <input
      accept="audio/*"
      hidden
      id="upload-audio"
      type="file"
      onChange={handleFileChange}
    />
    <label htmlFor="upload-audio">
      <Button
        variant="contained"
        color={isAudioUploaded ? "success" : "error"}
        component="span"
      >
        Import Audio
      </Button>
    </label>
    {isAudioUploaded && <p>{fileName}</p>}
  </Grid>
);

const AudioSettings = ({ isLooping, setIsLooping, volume, setVolume }) => (
  <Grid item>
    <label htmlFor="loop-toggle">Loop</label>
    <input
      id="loop-toggle"
      type="checkbox"
      checked={isLooping}
      onChange={(e) => setIsLooping(e.target.checked)}
    />
    <label htmlFor="volume-slider">Volume</label>
    <Slider
      id="volume-slider"
      value={volume}
      min={0}
      max={1}
      step={0.01}
      onChange={(event, newValue) => setVolume(newValue)}
    />
  </Grid>
);

const WaveformDisplay = ({
  audioURL,
  isPlaying,
  isLooping,
  onPlaybackEnd,
  onLoopPlayback,
}) => (
  <WaveformViewer
    audioURL={audioURL}
    isPlaying={isPlaying}
    isLooping={isLooping}
    onPlaybackEnd={onPlaybackEnd}
    onLoopPlayback={onLoopPlayback}
  />
);

const AudioTrack = ({ track, onDelete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isAudioUploaded, setIsAudioUploaded] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [fileName, setFileName] = useState('');

  const audioRef = useRef(null);

  useEffect(() => {
    if (track) {
      audioRef.current = track.audioRef;
    }
  }, [track]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = isLooping;
    }
  }, [isLooping]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume(volume);
    }
  }, [volume]);

  if (!track) return null;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioURL(url);
      setFileName(file.name);
      const fileFormat = file.name.split(".").pop();
      audioRef.current = new Howl({
        src: [url],
        format: [fileFormat],
        volume,
        loop: isLooping,
        onload: () => {
          setIsAudioUploaded(true);
        },
      });
    }
  };

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
          <p>ID: {track.id}</p>
        </Grid>
        <AudioControls
          isPlaying={isPlaying}
          play={play}
          stop={stop}
          onDelete={onDelete}
          isAudioUploaded={isAudioUploaded}
        />
        <AudioFileInput
          handleFileChange={handleFileChange}
          isAudioUploaded={isAudioUploaded}
          fileName={fileName}
        />
        <AudioSettings
          isLooping={isLooping}
          setIsLooping={setIsLooping}
          volume={volume}
          setVolume={setVolume}
        />
      </Grid>
      <WaveformDisplay
        audioURL={audioURL}
        isPlaying={isPlaying}
        isLooping={isLooping}
      />
    </Box>
  );
};

export default AudioTrack;
