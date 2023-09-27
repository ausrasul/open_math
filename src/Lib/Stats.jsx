import React from "react";

import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

const Row = styled("div")`
  display: flex;
  justify-content: center;
`;

export default function Stats(props) {
  return (
    <div>
      <Row>
        <Typography variant="h1">Klart!</Typography>
      </Row>
      <Row>
        <Typography variant="h4">Ditt resultat: {props.stats.points}</Typography>
      </Row>
      <Row>
        <Typography variant="h4">Sekonder per övning: {formatAvgTime(props.stats.avgTime)}</Typography>
      </Row>
      <Row>
        <Typography variant="h4">Korrekt svar: {props.stats.correctAnswers} av {props.stats.numOfQuestions}
        </Typography>
      </Row>
    </div>
  );
}

const formatAvgTime = time_ms => {
    const time_s = time_ms / 1000
    return Math.floor(time_s * 100) / 100
}