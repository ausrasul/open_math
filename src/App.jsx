import React, { useState } from "react";
import SubtractionGame  from "./SubtractionGame";
import { Box, Button, Typography } from "@mui/material";

export default function App(props) {
  const [game, setGame] = useState(null)
  return (
    <Box sx={{m: 4}}>
      {!game && (
        <Box sx={{ pt: 5, display: "flex", justifyContent: "center" }}>
        <Button
        sx={{p: 5, mt: 10}}
        variant="contained"
        onClick={()=>setGame("subtractionSpeedTest")}>
          <Typography variant="h5">Spela Subtraction Speed Test</Typography>
        </Button>
        </Box>
      )}
      {game === "subtractionSpeedTest" && (
        <SubtractionGame/>
      )}
    </Box>
  );
}
