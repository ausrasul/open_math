import React, { useState } from "react";
import { Stack, Box, Button, Typography, Toolbar, AppBar } from "@mui/material";

import { Calculate as LogoIcon } from "@mui/icons-material";

import SubtractionGame from "./Games/VerticalSubtraction/SubtractionGame";
import MultiplicationTableGame from "./Games/MultiplicationTable";
import CountingGame from "./Games/Counting"

import Progress from "./Progress";

export default function App(props) {
  const [game, setGame] = useState(null);
  return (
    <Box>
      <AppBar position="static">
        <Toolbar
          sx={{ color: "inherit", textDecoration: "none" }}
          href="/"
          component="a"
        >
          <LogoIcon sx={{ fontSize: 60, color: "rgb(255, 159, 0)" }} />
          <Box
            sx={{ display: "flex", alignItems: "center", ml: 2 }}
          >
            <Typography variant="h6" component="div" sx={{ mr: 2 }}>
              Matte
            </Typography>
            <Typography variant="h4" sx={{ fontStyle: "italic" }}>
              TT
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ height: "calc(100dvh - 64px)" }}>
        {!game && (
          <Box
            sx={{
              pt: 5,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h5">Matte Time Trial Åk 4-5</Typography>
            <Stack>
              <Button
                sx={{ p: 2, mt: 5 }}
                variant="contained"
                onClick={() => setGame("subtractionSpeedTest")}
              >
                <div>
                  <Typography variant="h5">Subtraction</Typography>
                  <Typography variant="caption">Uppställning</Typography>
                </div>
              </Button>
              <Button
                sx={{ p: 2, mt: 2 }}
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
                sx={{ p: 2, mt: 2 }}
                variant="contained"
                onClick={() => setGame("counting")}
              >
                <div>
                  <Typography variant="h5">Räkna</Typography>
                  <Typography variant="caption">
                    Räkna 1-10
                  </Typography>
                </div>
              </Button>
              <Button
                sx={{ p: 2, mt: 2 }}
                variant="contained"
                onClick={() => setGame("stats")}
              >
                <div>
                  <Typography variant="h5">Min utveckling</Typography>
                  <Typography variant="caption">Visa min utveckling</Typography>
                </div>
              </Button>
            </Stack>
          </Box>
        )}
        {game === "subtractionSpeedTest" && <SubtractionGame />}
        {game === "multiplicationTableSpeedTest" && <MultiplicationTableGame />}
        {game === "counting" && <CountingGame />}
        {game === "stats" && <Progress />}
      </Box>
    </Box>
  );
}
