// src/PlayContext.js
import { createContext } from 'react';

const PlayContext = createContext({
  isPlaying: false,
  setIsPlaying: () => {},
});

export default PlayContext;
