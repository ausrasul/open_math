import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, Typography, styled } from "@mui/material";
import CorrectIcon from "@mui/icons-material/CheckCircleOutline";
import WrongIcon from "@mui/icons-material/HighlightOff";
import { calculate_points } from "./results";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function NumpadDialogSingle(props) {
  const [timer, setTimer] = useState(null)
  
  const open = props.open;
  useEffect(() => {
    if (open) {
        setTimer(setTimeout(() => props.onClose?.(), 1500));
    } else {
        clearTimeout(timer)
    }

  }, [open]); // eslint-disable-line

  return (
    <Dialog
      onClose={() => {
        props.onClose?.();
      }}
      open={props.open}
    >
      <DialogContent>
        {props.correct && (
          <Container>
            <CorrectIcon sx={{ fontSize: "50px", color: "green", mb: 2 }} />
            <Typography variant="h5">
              Poäng:{" "}
              {calculate_points(props.time, props.maxTime, props.maxPoints)}
            </Typography>
          </Container>
        )}
        {!props.correct && (
          <Container>
            <WrongIcon sx={{ fontSize: "50px", color: "red", mb: 2 }} />
            <Typography variant="h5">Poäng: 0</Typography>
          </Container>
        )}
      </DialogContent>
    </Dialog>
  );
}
