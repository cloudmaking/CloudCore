// TrackContainer.js
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AudioTrack from "./AudioTrack";

const TrackContainer = () => {
  const [tracks, setTracks] = useState([]);
  const [allTracksPlaying, setAllTracksPlaying] = useState(false);

  const addTrack = () => {
    setTracks((prevTracks) => [...prevTracks, { id: uuidv4(), audioRef: React.createRef() }]);
  };

  const deleteTrack = (id) => {
    const trackToDelete = tracks.find((track) => track.id === id);
    if (trackToDelete && trackToDelete.audioRef.current) {
      trackToDelete.audioRef.current.stop();
    }
    setTracks((prevTracks) => prevTracks.filter((track) => track.id !== id));
  };  

  const playAllTracks = () => {
    tracks.forEach((track) => track.audioRef.current?.play());
  };

  const stopAllTracks = () => {
    tracks.forEach((track) => track.audioRef.current?.stop());
  };

  const togglePlayAll = () => {
    if (allTracksPlaying) {
      stopAllTracks();
    } else {
      playAllTracks();
    }
    setAllTracksPlaying(!allTracksPlaying);
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
          <Button variant="contained" onClick={togglePlayAll}>
            {allTracksPlaying ? "Stop All" : "Play All"}
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={addTrack}>
            Add Track
          </Button>
        </Grid>
      </Grid>
      <Box>
        {tracks.map((track) => (
          <AudioTrack track={track} onDelete={() => deleteTrack(track.id)} />
        ))}
      </Box>
    </Box>
  );  
};

export default TrackContainer;
