import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

import Subtraction from "./subtraction";

const Row = styled("div")`
  display: flex;
`;

const AnswerField = styled(TextField)(
  ({ theme }) => `
  width: ${theme.spacing(6)};
  height: ${theme.spacing(3)};
  text-align: center;
  margin: ${theme.spacing(0.5)};
`
);

const Empty = styled(Paper)(
  ({ theme }) => `
  visibility: hidden;
  height: ${theme.spacing(3)};
  width: ${theme.spacing(2)};
  padding: ${theme.spacing(2)};
  margin: ${theme.spacing(0.5)};
`
);

const NumberContainer = styled(Paper)(
  ({ theme }) => `
  width: ${theme.spacing(2)};
  height: ${theme.spacing(3)};
  text-align: center;
  padding: ${theme.spacing(2)};
  margin: ${theme.spacing(0.5)};
`
);

const Number = styled("div")`
  font-weight: bold;
  font-family: Courier New;
  font-size: xx-large;
  color: rgb(98, 98, 98);
`;

const TinyNumber = styled("div")`
  font-weight: bold;
  font-family: Courier New;
  font-size: large;
  color: rgb(98, 98, 98);
`;

const CrossedOff = styled("div")`
  position: relative;
  width: 200%;
  height: 2px;
  background-color: red;
  transform-origin: -40% 0;
  transform: rotate(-45deg);
`;

const CrossedOffBorrow = styled("div")`
  position: relative;
  width: 200%;
  height: 2px;
  background-color: red;
  transform-origin: 0 0;
  transform: rotate(-45deg);
`;

export default function SubtractionGrid(props) {
  const subtraction = new Subtraction();

  const minuend_ = subtraction.generate_number_array(props.digits);
  const subtrahend_ = subtraction.generate_smaller_number_array(minuend_);
  const [startTime] = useState(new Date().getTime());
  const [minuend] = useState(minuend_);
  const [subtrahend] = useState(subtrahend_);

  const [crossedOff, setCrossedOff] = useState(
    Array.from({ length: props.digits - 1 }, () => false)
  );
  const [borrows, setBorrows] = useState(
    Array.from({ length: props.digits - 1 }, () => 0)
  );
  const [borrowCrossOff, setBorrowCrossOff] = useState(
    Array.from({ length: props.digits - 1 }, () => false)
  );

  const [answer, setAnswer] = useState(
    Array.from({ length: props.digits }, () => "")
  );

  const crossOff = (minuendIdx) => {
    const m = minuend.slice();
    const b = borrows.slice();
    const c = crossedOff.slice();
    if (minuendIdx === m.length - 1) return;
    if (m[minuendIdx] === 0) return;
    if (!c[minuendIdx]) {
      b[minuendIdx] = 10;
      c[minuendIdx] = true;
    } else {
      b[minuendIdx] = 0;
      c[minuendIdx] = false;
    }
    setBorrows(b);
    setCrossedOff(c);
  };

  const crossOffBorrow = (borrowIdx) => {
    const b = borrows.slice();
    const bc = borrowCrossOff.slice();
    if (borrowIdx === b.length - 1) return;
    if (minuend[borrowIdx + 1] > 0) return;
    if (b[borrowIdx] === 0) return;
    if (!bc[borrowIdx]) {
      b[borrowIdx + 1] = 10;
      bc[borrowIdx] = true;
    } else {
      b[borrowIdx + 1] = 0;
      bc[borrowIdx] = false;
    }
    setBorrows(b);
    setBorrowCrossOff(bc);
  };

  const onAnswer = (idx) => (e) => {
    let value = parseInt(e.target.value, 10);
    if (isNaN(value)) value = "";
    if (value < 0 || value > 9) return;
    const a = answer.slice();
    a[idx] = value;
    setAnswer(a);
  };

  const checkAnswer = () => {
    const answerNum = subtraction.arr2num(answer);
    const minuendNum = subtraction.arr2num(minuend);
    const subtrahendNum = subtraction.arr2num(subtrahend);

    props.onAnswer({
      correct: minuendNum - subtrahendNum === answerNum,
      time: new Date().getTime() - startTime
    });
  };
  return (
    <div className={props.className}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Empty />
          <Empty />
          <NumberContainer
            sx={{ boxShadow: "unset", backgroundColor: "unset" }}
          >
            <Number>-</Number>
          </NumberContainer>
          <Empty />
        </Box>
        <Box>
          <Row>
            <Empty />
            {borrows.map((borrow, i) => (
              <NumberContainer key={"borrows" + i}>
                <TinyNumber onClick={() => crossOffBorrow(i)}>
                  {borrow > 0 ? borrow : ""}
                  {borrowCrossOff[i] && <CrossedOffBorrow />}
                </TinyNumber>
              </NumberContainer>
            ))}
          </Row>
          <Row>
            {minuend.map((m, i) => (
              <NumberContainer key={"m" + i}>
                <Number onClick={() => crossOff(i)}>{m}</Number>
                {crossedOff[i] && <CrossedOff />}
              </NumberContainer>
            ))}
          </Row>
          <Row>
            {subtrahend.map((s, i) => (
              <NumberContainer key={"s" + i}>
                <Number>{s}</Number>
              </NumberContainer>
            ))}
          </Row>
          <Row
            sx={{
              borderRadius: "5px",
              backgroundColor: "rgb(98, 98, 98)",
              height: "5px",
              m: 1
            }}
          ></Row>
          <Row>
            {answer.map((a, i) => (
              <AnswerField
                key={"answer" + i}
                variant="outlined"
                value={a}
                onChange={onAnswer(i)}
              />
            ))}
          </Row>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          sx={{ width: "50%", m: 5 }}
          variant="contained"
          onClick={checkAnswer}
        >
          Klar
        </Button>
      </Box>
    </div>
  );
}
