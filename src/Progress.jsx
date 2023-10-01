import React, { useEffect, useState } from "react";

import { Box, Button, Paper } from "@mui/material";
import Chart from "./Lib/Chart";
import storage from "./Lib/storage";

export default function Progress(props) {
  const [games, setGames] = useState([]);
  const [data, setData] = useState([]);
  const [gameName, setGameName] = useState("Select a game");
  useEffect(() => {
    setGames(storage.getAll());
  }, []);
  const showStats = (game) => () => {
    const stats = games[game];
    setGameName(game);
    setData(stats);
  };
  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
        {Object.keys(games).map((k, i) => (
          <Button
            variant={gameName === k ? "contained" : "outlined"}
            key={"b" + i}
            onClick={showStats(k)}
          >
            {k}
          </Button>
        ))}
      </Box>
      <Chart data={data} title={gameName} />
    </Paper>
  );
}
