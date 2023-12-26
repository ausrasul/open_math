import React, { useRef, useState, useEffect } from "react";

import { Box, Typography, styled } from "@mui/material";

import randPlacement from "./randPlacement";
import Number from "../../Lib/Number";
import Timer from "../../Lib/Timer";

const ImgStyled = styled("img")`
  height: 100px;
  width: 100px;
  color: white;
  position: absolute;
`;

const WideNumber = styled(Number)(
  ({ theme }) => `
  width: ${theme.spacing(6)};
`
);

export default function Counting(props) {
  const [objects, setObjects] = useState([]);
  const ref = useRef();
  const timer = useRef();
  const [startTime] = useState(new Date().getTime());
  const objNumber = useRef(Math.floor(Math.random() * 10) + 1);


  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = setTimeout(() => {
        const { height, width } = entries[0].contentRect;
        setObjects(randPlacement(width, height, objNumber.current, [50, 50]));
        console.log(entries[0].contentRect);
      }, 500);
    });

    observer.observe(ref.current);
    const currentRef = ref.current;
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      observer.unobserve(currentRef);
    };
  }, []);

  const checkAnswer = val => () => {
    props.onAnswer({
      correct: val === objNumber.current,
      time: new Date().getTime() - startTime,
    });
  };
  return (
    <Box sx={props.sx}>
      <Timer sx={{ height: "2%" }} time={props.maxTimePerQuestion} />
      <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", height: "10%" }}>
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          Hur många?
        </Typography>
      </Box>
      <Box
        sx={{ width: "350", m: "auto", height: "70%", position: "relative" }}
        ref={ref}
      >
        {objects.map(([x, y]) => (
          <ImgStyled
            key={"apple" + x + y}
            src="/img/apple.svg"
            sx={{
              top: y + "px",
              left: x + "px",
            }}
          />
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          height: "18%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <WideNumber value={1} onClick={checkAnswer(1)}/>
        <WideNumber value={3} onClick={checkAnswer(3)}/>
        <WideNumber value={5} onClick={checkAnswer(5)}/>
        <WideNumber value={7} onClick={checkAnswer(7)}/>
      </Box>
    </Box>
  );
}
