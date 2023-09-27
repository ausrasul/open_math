import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

import Numbers from "../../Lib/numbers";
import Number from "../../Lib/Number";
import Timer from "../../Lib/Timer";
import Numpad from "../../Lib/NumpadMulti"

const Row = styled("div")`
  display: flex;
`;

const WideNumber = styled(Number)(({theme}) => `
  width: ${theme.spacing(6)};
`)

const randNum = () => {
  return Math.ceil(Math.random() * 10)
}

export default function SubtractionGrid(props) {
  const numbers = new Numbers();
  const num1_ = randNum()
  const num2_ = randNum()
  const [startTime] = useState(new Date().getTime());
  const [num1] = useState(num1_);
  const [num2] = useState(num2_);
  const [openNumpad, setOpenNumpad] = useState(false)
  const answerDigits = numbers.num2arr(num1_ * num2_).length

  const [answer, setAnswer] = useState(
    Array.from({ length: answerDigits }, () => "")
  );

  const onAnswer = (arr) => {
    const ans = numbers.arr2num(arr)
    setOpenNumpad(false)
    setAnswer(ans);
    checkAnswer(ans)
  };

  const checkAnswer = (ans) => {
    console.log(ans, num1, num2)
    props.onAnswer({
      correct: num1 * num2 === ans,
      time: new Date().getTime() - startTime,
    });
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box>
        <Timer sx={{ height: 12, mb: 2 }} time={props.maxTimePerQuestion} />
        <Row>
          <WideNumber
              value={num1}
          />
          <Number
          value="X" />
          <WideNumber
              value={num2}
            />
          <Number
          value="=" />
          <WideNumber
              value={answer}
              onClick={()=> setOpenNumpad(true)}
            />
            <Numpad open={openNumpad} onClose={onAnswer} />
        </Row>
        <Row>
          <Button
            sx={{ width: "100%", mt: 4, mb: 1 }}
            variant="contained"
            onClick={()=>checkAnswer(answer)}
          >
            Klar
          </Button>
        </Row>
      </Box>
    </Box>
  );
}
