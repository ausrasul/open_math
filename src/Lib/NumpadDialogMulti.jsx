import React from "react";
import { Dialog, DialogContent } from "@mui/material";

import Numpad from "./Numpad";

export default function NumpadDialogMulti(props) {

  const handleSubmit = answer => {
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
        <Numpad multi onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}
