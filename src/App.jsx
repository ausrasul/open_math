import React, { useState } from "react";
import { Stack, Box, Button, Typography } from "@mui/material";

import SubtractionGame from "./Games/VerticalSubtraction/SubtractionGame";
import MultiplicationTableGame from "./Games/MultiplicationTable/MultiplicationTableGame";
import Progress from "./Progress"


export default function App(props) {
  const [game, setGame] = useState(null);
  return (
    <Box sx={{ m: 4 }}>
      {!game && (
        <Box
          sx={{
            pt: 5,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h5">Åk 4-5</Typography>
          <Stack>
            <Button
              sx={{ p: 5, mt: 10 }}
              variant="contained"
              onClick={() => setGame("subtractionSpeedTest")}
            >
              <div>
                <Typography variant="h5">Subtraction</Typography>
                <Typography variant="caption">Uppställning</Typography>
              </div>
            </Button>
            <Button
              sx={{ p: 5, mt: 2 }}
              variant="contained"
              onClick={() => setGame("multiplicationTableSpeedTest")}
            >
              <div>
                <Typography variant="h5">Multiplikation</Typography>
                <Typography variant="caption">
                  Multiplikationstabellen
                </Typography>
              </div>
            </Button>
            <Button
              sx={{ p: 5, mt: 2 }}
              variant="contained"
              onClick={() => setGame("stats")}
            >
              <div>
                <Typography variant="h5">Min utveckling</Typography>
                <Typography variant="caption">
                  Visa min utveckling
                </Typography>
              </div>
            </Button>
          </Stack>
        </Box>
      )}
      {game === "subtractionSpeedTest" && <SubtractionGame />}
      {game === "multiplicationTableSpeedTest" && <MultiplicationTableGame />}
      {game === "stats" && <Progress />}
    </Box>
  );
}
