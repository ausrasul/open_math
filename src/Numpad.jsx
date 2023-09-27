import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Dialog, DialogContent, Box } from "@mui/material";

import Number from "./Number";

const row = {
  display: "flex",
};

export default function Numpad(props) {
  const handleClick = (number) => () => {
    props.onClose?.(number);
  };
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
            <Number empty />
            <Number onClick={handleClick(0)} value="0" />
            <Number empty />
          </Box>
        </div>
      </DialogContent>
    </Dialog>
  );
}
