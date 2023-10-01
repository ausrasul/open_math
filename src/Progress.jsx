import React, { useEffect, useState } from "react";

import { Box, Button, Paper } from "@mui/material";
import Chart from "./Lib/Chart";
import storage from "./Lib/storage";

export default function Progress(props) {
  const [games, setGames] = useState([]);
  useEffect(() => {
    setGames(storage.getAll());
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {Object.keys(games).map((k, i) => (
        <Paper sx={{p: 2, mb: 2}} >
            <Chart id={i.toString()} data={games[k]} title={k} />
            </Paper>
      ))}
    </Box>
  );
}
