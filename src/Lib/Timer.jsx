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

export default function Timer({ time, sx}) {
  const maxSteps = 100;
  const [progress, setProgress] = useState(maxSteps); // Initial progress value (100%)
  const interval = 1000; //ms
  const step = maxSteps / (time / 1000);

  useEffect(() => {
    let timer = setInterval(() => {
      const newProgress = Math.max(progress - step, 0);
      setProgress(newProgress);

      if (newProgress <= 0) {
        clearInterval(timer);
      }
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [progress, step]); // eslint-ignore-line

  return (
      <BorderLinearProgress sx={sx} variant="determinate" value={progress} />
  );
}
