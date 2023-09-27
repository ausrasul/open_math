import React, { useState } from "react";
import { Button, Box, Rating } from "@mui/material";
import "./main.css";
import VerticalSubtractionRace from "./VerticalSubtractionRace";
import { calculate_points } from "./results";
import Stats from "./Stats";

export default function App(props) {
  const [done, setDone] = useState(false);
  const [stats, setStats] = useState(null);
  const [reset, setReset] = useState(false);
  const numOfQuestions = 5;
  const maxPoints = 10;
  const maxTime = 60000;
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
  /*const handleAnswers = (answers) => {
    console.log(answers);
  };*/
  return (
    <div>
      {!stats && (
        <Box sx={{ pt: 15, display: "flex", justifyContent: "center" }}>
          <VerticalSubtractionRace
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
            pt: 20,
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
