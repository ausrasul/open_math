import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

import Subtraction from "../../Lib/numbers";
import Number from "../../Lib/Number";
import Timer from "../../Lib/Timer";
import Numpad from "../../Lib/NumpadDialogSingle";

const Row = styled("div")`
  display: flex;
`;

export default function SubtractionGrid(props) {
  const subtraction = new Subtraction();

  const minuend_ = subtraction.generate_number_array(props.digits);
  const subtrahend_ = subtraction.generate_smaller_number_array(minuend_);
  const [startTime] = useState(new Date().getTime());
  const [minuend] = useState(minuend_);
  const [subtrahend] = useState(subtrahend_);
  const [openNumpadFor, setOpenNumpadFor] = useState(null);

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

  const onAnswer = (idx) => (num) => {
    const a = answer.slice();
    a[idx] = num;
    setAnswer(a);
    setOpenNumpadFor(null);
  };

  const checkAnswer = () => {
    const answerNum = subtraction.arr2num(answer);
    const minuendNum = subtraction.arr2num(minuend);
    const subtrahendNum = subtraction.arr2num(subtrahend);

    props.onAnswer({
      correct: minuendNum - subtrahendNum === answerNum,
      time: new Date().getTime() - startTime,
    });
  };
  return (
    <Box className="asdf" sx={{ display: "flex", justifyContent: "center" }}>
      <Box>
        <Box sx={{ height: 12, mb: 2 }}></Box>
        <Row>
          <Number empty />
        </Row>
        <Row>
          <Number empty />
        </Row>
        <Number
          sx={{ boxShadow: "unset", backgroundColor: "unset" }}
          value="-"
        />
      </Box>
      <Box>
        <Timer sx={{ height: 12, mb: 2 }} time={props.maxTimePerQuestion} />
        <Row>
          <Number empty />
          {borrows.map((borrow, i) => (
            <Number
              key={"borrows_" + i}
              tiny
              onClick={() => crossOffBorrow(i)}
              value={borrow > 0 ? borrow : ""}
              crossedOff={borrowCrossOff[i]}
            />
          ))}
        </Row>
        <Row>
          {minuend.map((m, i) => (
            <Number
              key={"m" + i}
              onClick={() => crossOff(i)}
              value={m}
              crossedOff={crossedOff[i]}
            />
          ))}
        </Row>
        <Row>
          {subtrahend.map((s, i) => (
            <Number key={"s" + i} value={s} />
          ))}
        </Row>
        <Row
          sx={{
            borderRadius: "5px",
            backgroundColor: "rgb(98, 98, 98)",
            height: "5px",
            m: 1,
          }}
        ></Row>
        <Row>
          {answer.map((a, i) => (
            <div key={"answer" + i}>
              <Number value={a} onClick={() => setOpenNumpadFor(i)} />
              <Numpad
                key={"numpad" + i}
                open={openNumpadFor === i}
                onClose={onAnswer(i)}
              />
            </div>
          ))}
        </Row>
        <Row>
          <Button
            sx={{ width: "100%", mt: 4, mb: 1 }}
            variant="contained"
            onClick={checkAnswer}
          >
            Klar
          </Button>
        </Row>
      </Box>
    </Box>
  );
}
