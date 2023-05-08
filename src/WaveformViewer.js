import React, { useState, useRef, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";

const WaveformViewer = ({ url, audioInstance, isLooping }) => {
  const waveFormRef = useRef(null);
  const [waveSurfer, setWaveSurfer] = useState(null);

  const initializeWaveform = () => {
    if (waveSurfer) {
      waveSurfer.destroy();
    }

    const newWaveSurfer = WaveSurfer.create({
      container: waveFormRef.current,
      waveColor: "violet",
      progressColor: "purple",
      cursorColor: "navy",
    });

    newWaveSurfer.load(url);
    newWaveSurfer.on("ready", () => {
      newWaveSurfer.drawBuffer();
    });

    newWaveSurfer.on("finish", () => {
      if (isLooping) {
        newWaveSurfer.play();
      }
    });

    audioInstance.on("end", () => {
      if (isLooping) {
        newWaveSurfer.seekTo(0);
      }
    });

    setWaveSurfer(newWaveSurfer);
  };

  useEffect(() => {
    if (url) {
      initializeWaveform();
    }
  }, [url]);

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
