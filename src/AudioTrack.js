import React, { useState, useEffect } from "react";
import { Button, Grid, Slider, Box } from "@mui/material";
import { Howl } from "howler";
import WaveformViewer from "./WaveformViewer";

const AudioTrack = ({ onDelete, audioRef }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isAudioUploaded, setIsAudioUploaded] = useState(false);
  const [audioURL, setAudioURL] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioURL(url);
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
        if (isLooping) {
          audioRef.current.loop(true);
        } else {
          audioRef.current.loop(false);
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop(isLooping);
    }
  }, [isLooping]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume(volume);
    }
  }, [volume]);

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.stop();
      audioRef.current.seek(0); // Reset the playback position to the start
      setIsPlaying(false);
      resetWaveform(); // Reset the waveform to the start
    }
  };

    // Add a new state to handle the waveform reset
    const [resetWaveformKey, setResetWaveformKey] = useState(0);
    const resetWaveform = () => {
      setResetWaveformKey((prevKey) => prevKey + 1);
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
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={onDelete}>
            X
          </Button>
        </Grid>
        <Grid item>
          <label htmlFor="loop-toggle">Loop</label>
          <input
            id="loop-toggle"
            type="checkbox"
            checked={isLooping}
            onChange={(e) => setIsLooping(e.target.checked)}
          />
        </Grid>
        <Grid item>
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
      </Grid>
      <WaveformViewer
        key={resetWaveformKey} // Use the key prop to reset the waveform
        audioURL={audioURL}
        isPlaying={isPlaying}
        isLooping={isLooping}
        onPlaybackEnd={() => setIsPlaying(false)}
        onLoopPlayback={() => setIsPlaying(true)}
      />
    </Box>
  );
};

export default AudioTrack;

