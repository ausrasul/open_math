import React from "react";
import { Dialog, DialogContent } from "@mui/material";

import Numpad from "./Numpad"

export default function NumpadDialogSingle(props) {
  const handleChange = (number) => {
    props.onClose?.(number);
  };
  console.log(props.open)
  return (
    <Dialog
      onClose={() => {
        props.onClose?.();
      }}
      open={props.open}
    >
      <DialogContent>
        <Numpad onSubmit={handleChange} /> 
      </DialogContent>
    </Dialog>
  );
}
