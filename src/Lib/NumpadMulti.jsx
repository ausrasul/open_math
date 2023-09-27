import React, {useState} from "react";
import { Dialog, DialogContent, Box, styled } from "@mui/material";

import Number_ from "./Number";

const Number = styled(Number_)(({theme}) => `
  width: ${theme.spacing(4)};
`)

const row = {
  display: "flex",
};

export default function Numpad(props) {
  const [answer, setAnswer] = useState([])

  const handleClick = (number) => () => {
    if (answer.length >= 3) return
    const a = answer.slice()
    a.push(number)
    setAnswer(a)
  };
  const handleSubmit = () => {
    props.onClose?.(answer)
  }
  return (
    <Dialog
      onClose={() => {
        props.onClose?.();
      }}
      open={props.open}
    >
      <DialogContent>
        <div>
          <Box sx={row}>
            {Array.from({ length: 3 - answer.length }, (_, i) => (
              <Number key={"a" + i} empty />
            ))}
            {answer.map((ans, i) => (
              <Number key={"ans" + i} value={ans} />
            ))}
          </Box>
          <Box sx={row}>
            <Number onClick={handleClick(1)} value="1" />
            <Number onClick={handleClick(2)} value="2" />
            <Number onClick={handleClick(3)} value="3" />
          </Box>
          <Box sx={row}>
            <Number onClick={handleClick(4)} value="4" />
            <Number onClick={handleClick(5)} value="5" />
            <Number onClick={handleClick(6)} value="6" />
          </Box>
          <Box sx={row}>
            <Number onClick={handleClick(7)} value="7" />
            <Number onClick={handleClick(8)} value="8" />
            <Number onClick={handleClick(9)} value="9" />
          </Box>
          <Box sx={row}>
            <Number onClick={()=> setAnswer([])} value="AC" />
            <Number onClick={handleClick(0)} value="0" />
            <Number onClick={handleSubmit} value="OK" />
          </Box>
        </div>
      </DialogContent>
    </Dialog>
  );
}
