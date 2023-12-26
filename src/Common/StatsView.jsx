import React from 'react';
import { Button, Box, Rating } from "@mui/material";
import Stats from '../Lib/Stats'

export default function View(props) {
  return (
    <Box
      sx={{
        display: "flex",
        pt: 5,
        flexDirection: "column",
      }}
    >
      <Stats stats={props.stats} />
      <Box sx={{ m: 5, display: "flex", justifyContent: "center" }}>
        <Rating value={props.stats.rating * 5} max={5} precision={0.25} readOnly size="large" />
      </Box>
      <Box sx={{ m: 5, display: "flex", justifyContent: "center" }}>
        <Button variant="contained" onClick={props.onClick}>
          Försök igen
        </Button>
      </Box>
    </Box>
  )
}