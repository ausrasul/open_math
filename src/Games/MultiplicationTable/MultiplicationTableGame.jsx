import React, { useState } from "react";
import { Button, Box, Rating } from "@mui/material";
import MultiplicationTableRace from "./MultiplicationTableRace";
import { calculate_points } from "../../Lib/results";
import Stats from "../../Lib/Stats";

export default function SubtractionGame(props) {
  const [stats, setStats] = useState(null);
  const numOfQuestions = 20;
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
    setStats({
      avgTime,
      points,
      correctAnswers,
      numOfQuestions,
      rating: (points / numOfQuestions) / maxPoints
    });
  };

  return (
    <div>
      {!stats && (
        <Box sx={{ pt: 5, display: "flex", justifyContent: "center" }}>
          <MultiplicationTableRace
            NumOfQuestions={numOfQuestions}
            onAnswers={handleAnswers}
            maxTimePerQuestion={maxTime}
          />
        </Box>
      )}
      {stats && (
        <Box
          sx={{
            display: "flex",
            pt: 5,
            flexDirection: "column",
          }}
        >
          <Stats stats={stats} />
          <Box sx={{ m: 5, display: "flex", justifyContent: "center" }}>
            <Rating value={stats.rating * 5} max={5} precision={0.25} readOnly size="large" />
          </Box>
          <Box sx={{ m: 5, display: "flex", justifyContent: "center" }}>
            <Button variant="contained" onClick={() => setStats(null)}>
              Försök igen
            </Button>
          </Box>
        </Box>
      )}
    </div>
  );
}
