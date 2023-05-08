import React, { useState, useRef, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";

const WaveformViewer = ({ audioURL, isPlaying, isLooping }) => {
  const waveFormRef = useRef(null);
  const [waveSurfer, setWaveSurfer] = useState(null);

  const initializeWaveform = (url) => {
    console.log("Initializing waveform with URL:", url);
    if (waveSurfer) {
      waveSurfer.destroy();
    }

    const newWaveSurfer = WaveSurfer.create({
      container: waveFormRef.current,
      waveColor: "violet",
      progressColor: "purple",
      cursorColor: "navy",
    });

    newWaveSurfer.on("ready", () => {
      console.log("WaveSurfer is ready.");
      newWaveSurfer.drawBuffer();
    });

    newWaveSurfer.on("error", (error) => {
      console.error("WaveSurfer error:", error);
    });

    newWaveSurfer.load(url);
    setWaveSurfer(newWaveSurfer);
  };

  useEffect(() => {
    if (audioURL) {
      initializeWaveform(audioURL);
    }
  }, [audioURL]);

  // Add this effect to handle the isPlaying prop change
  useEffect(() => {
    if (waveSurfer) {
      if (isPlaying) {
        waveSurfer.play();
      } else {
        waveSurfer.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div
      ref={waveFormRef}
      style={{
        width: "100%",
        height: "100px",
        backgroundColor: "grey",
        borderRadius: "5px",
      }}
    />
  );
};

export default WaveformViewer;
