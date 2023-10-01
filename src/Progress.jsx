import React, { useEffect, useState } from "react";

import { Box, Button, Paper, Typography } from "@mui/material";
import Chart from "./Lib/Chart";
import storage from "./Lib/storage";

const text = {
    fontSize: "x-large"
}
export default function Progress(props) {
  const [games, setGames] = useState([]);
  useEffect(() => {
    setGames(storage.getAll());
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", mt: 2}}>
     {Object.keys(games).length === 0 && (
        <Box sx={{textAlign: "center"}}>
        <Typography sx={text}>Du har inte spelat något än.</Typography>
        <Typography sx={text}>Resultat visas efter att du har spelat och fått poäng.</Typography>
        </Box>
     )}
      {Object.keys(games).map((k, i) => (
        <Paper sx={{p: 2, mb: 2}} >
            <Chart id={i.toString()} data={games[k]} title={k} />
            </Paper>
      ))}
    </Box>
  );
}
