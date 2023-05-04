import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AudioTrack from "./AudioTrack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const TrackContainer = () => {
  const [tracks, setTracks] = useState([]);

  const addTrack = () => {
    setTracks((prevTracks) => [...prevTracks, { id: uuidv4() }]);
  };

  const deleteTrack = (id) => {
    setTracks((prevTracks) => prevTracks.filter((track) => track.id !== id));
  };

  const playAllTracks = () => {
    tracks.forEach((track) => track.audioRef.current?.play());
  };

  const stopAllTracks = () => {
    tracks.forEach((track) => track.audioRef.current?.stop());
  };

  return (
    <Box>
      <Box>
        <Button variant="contained" onClick={playAllTracks}>
          Master Play
        </Button>
        <Button variant="contained" onClick={stopAllTracks}>
          Master Stop
        </Button>
        <Button variant="contained" onClick={addTrack}>
          Add Track
        </Button>
      </Box>
      <Box>
        {tracks.map((track) => (
          <AudioTrack
            key={track.id}
            onDelete={() => deleteTrack(track.id)}
            onRef={(ref) => {
              track.audioRef = ref;
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default TrackContainer;
