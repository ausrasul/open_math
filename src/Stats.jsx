import React from "react";

import { styled } from "@mui/material/styles";

import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

const Row = styled("div")`
  display: flex;
  justify-content: center;
`;

export default function Stats(props) {
  return (
    <div>
      <Row>
        <Typography variant="h1">Klar!</Typography>
      </Row>
      <Row>
        <Typography variant="h4">Din poäng är: {props.stats.points}</Typography>
      </Row>
      <Row>
        <Typography variant="h4">Snitt tid per övning: {formatAvgTime(props.stats.avgTime)} sekonder</Typography>
      </Row>
      <Row>
        <Typography variant="h4">
          {props.stats.correctAnswers} av {props.stats.numOfQuestions} är
          korrekta!
        </Typography>
      </Row>
    </div>
  );
}

const formatAvgTime = time_ms => {
    const time_s = time_ms / 1000
    return Math.floor(time_s * 100) / 100
}