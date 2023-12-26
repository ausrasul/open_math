import React, { useEffect, useState } from "react";
import { Box} from "@mui/material";
import MultiplicationTableRace from "./MultiplicationTableRace";
import StatsView from "../../Common/StatsView";

export default function View(props) {
  const [stats, setStats] = useState(null);
  const [gameParams, setGameParams] = useState(null)
  const presenter = props.presenter
  useEffect(()=>{
    presenter.loadParams().then(setGameParams)
  },[]) // eslint-disable-line

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
      {stats && <StatsView stats={stats} onClick={() => setStats(null)}/>}
    </div>
  );
}
