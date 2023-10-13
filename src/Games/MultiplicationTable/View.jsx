import React, { useEffect, useState } from "react";
import { Button, Box, Rating } from "@mui/material";
import MultiplicationTableRace from "./MultiplicationTableRace";
import Stats from "../../Lib/Stats";

export default function View(props) {
  const [stats, setStats] = useState(null);
  const [gameParams, setGameParams] = useState(null)
  const presenter = props.presenter
  useEffect(()=>{
    presenter.loadParams().then(setGameParams)
  },[])

  const handleAnswers = (answers) => {
    presenter.generateAndSaveStats(answers).then(setStats)
  };

  return (
    <div>
      {!stats && gameParams && (
        <Box sx={{ pt: 5, display: "flex", justifyContent: "center" }}>
          <MultiplicationTableRace
            NumOfQuestions={gameParams.numOfQuestions}
            onAnswers={handleAnswers}
            maxTimePerQuestion={gameParams.maxTime}
            maxPointsPerQuestion={gameParams.maxPoints}
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
