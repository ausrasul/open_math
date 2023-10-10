import React, { useState } from "react";

import Counting from "./Counting";
import QuestionResult from "../../Lib/QuestionResult";
import { Typography, Box } from "@mui/material";

export default function CountingRace(props) {
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (answer) => {
    const answers_ = answers.slice();
    answers_.push(answer);
    if (answers_.length >= props.NumOfQuestions) {
      props.onAnswers(answers_);
    }
    setAnswers(answers_);
    setShowResult(true);
  };
  return (
    <Box sx={{height: "100%"}}>
      <Typography sx={{ textAlign: "center", fontSize: "x-large", height: "5%", pt: "5%"}}>
        {answers.length + 1} av {props.NumOfQuestions}
      </Typography>
      {!showResult && (
        <Counting
          sx={{height: "90%"}}
          maxTimePerQuestion={props.maxTimePerQuestion}
          key={1}
          onAnswer={handleAnswer}
        />
      )}
      <QuestionResult
        open={showResult}
        correct={answers[answers.length - 1]?.correct}
        time={answers[answers.length - 1]?.time}
        maxTime={props.maxTimePerQuestion}
        maxPoints={props.maxPointsPerQuestion}
        onClose={() => setShowResult(false)}
      />
    </Box>
  );
}