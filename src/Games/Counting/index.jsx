import React, {useState } from "react";

import { Box } from "@mui/material";
import CountingRace from "./CountingRace";
import { calculate_points } from "../../Lib/results";
import storage from "../../Lib/storage"
import StatsView from "../../Common/StatsView";

export default function Counting() {
  const [stats, setStats] = useState(null);
  const numOfQuestions = 5;
  const maxPoints = 10;
  const maxTime = 10000;
  const handleAnswers = (answers) => {
    let correctAnswers = 0;
    let points = 0;
    let totalTime = 0;
    answers.forEach(({ correct, time }) => {
      if (correct) {
        correctAnswers += 1;
        points += calculate_points(time, maxTime, maxPoints);
      }
      totalTime += time;
    });
    const avgTime = Math.floor(totalTime / numOfQuestions);
    const stats = {
      avgTime,
      points,
      correctAnswers,
      numOfQuestions,
      rating: (points / numOfQuestions) / maxPoints,
      ts: new Date().getTime()
    }
    storage.save("Räkna 1-10", stats)
    setStats(stats);
  };

  return (
    <Box sx={{height: "100%"}}>
      {!stats && (
        <Box sx={{ height: "100%", display: "flex", justifyContent: "center" }}>
          <CountingRace
            NumOfQuestions={numOfQuestions}
            onAnswers={handleAnswers}
            maxTimePerQuestion={maxTime}
            maxPointsPerQuestion={maxPoints}
          />
        </Box>
      )}
      {stats && <StatsView stats={stats} onClick={() => setStats(null)}/>}
    </Box>
  )
}