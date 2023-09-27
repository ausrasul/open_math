import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";

import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 20,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

export default function Timer({ time }) {
  const maxSteps = 100;
  const [progress, setProgress] = useState(maxSteps); // Initial progress value (100%)
  const interval = 1000; //ms
  const totalTime = time / interval; // Total time in seconds for the timer
  const step = time / 1000 / maxSteps;

  useEffect(() => {
    let timer = setInterval(() => {
      // Calculate the progress value as a percentage
      const newProgress = Math.max(progress - step, 0);
      setProgress(newProgress);

      if (newProgress <= 0) {
        clearInterval(timer);
        // Handle timer completion here
      }
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [progress]);

  return (
    <div>
      <BorderLinearProgress variant="determinate" value={progress} />
    </div>
  );
}
