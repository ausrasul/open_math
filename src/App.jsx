import React, { useState } from "react";
import SubtractionGame from "./Games/VerticalSubtraction/SubtractionGame";
import MultiplicationTableGame from "./Games/MultiplicationTable/MultiplicationTableGame";
import { Stack, Box, Button, Typography } from "@mui/material";

export default function App(props) {
  const [game, setGame] = useState(null);
  return (
    <Box sx={{ m: 4 }}>
      {!game && (
        <Box sx={{ pt: 5, display: "flex", justifyContent: "center" }}>
          <Stack>
            <Button
              sx={{ p: 5, mt: 10 }}
              variant="contained"
              onClick={() => setGame("subtractionSpeedTest")}
            >
              <Typography variant="h5">Subtraction Speed Test</Typography>
            </Button>
            <Button
              sx={{ p: 5, mt: 2 }}
              variant="contained"
              onClick={() => setGame("multiplicationTableSpeedTest")}
            >
              <Typography variant="h5">
                Multiplikationstabellen Speed Test
              </Typography>
            </Button>
          </Stack>
        </Box>
      )}
      {game === "subtractionSpeedTest" && <SubtractionGame />}
      {game === "multiplicationTableSpeedTest" && <MultiplicationTableGame />}
    </Box>
  );
}
