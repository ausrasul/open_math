//const express = require("express");
import express from "express"
//const path = require("path");
import path from "path"
import { fileURLToPath } from 'url';
//const storage = require("./storage")
//const storage = require("./flatfileStorage.js")
import storage from "./flatfileStorage.js"
//const Stats = require("./stats")
import Stats from "./stats.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const stats = new Stats(storage)

const app = express();
const port = process.env.PORT || 3001;

app.use("/", express.static(path.join(__dirname, "dist")));

app.use(express.urlencoded({
    extended: true
  }));
app.use(express.json());

app.post("/api/save_stats", function requestHandler(req, res) {
  const data = req.body;
  let playerId = getcookie(req, 'player_id');
  if (!playerId) playerId = makeid(10);
  res.cookie("player_id", playerId, { overwrite: true, maxAge: 12 * 30 * 24 * 60 * 60 * 1000 });
  
  stats.save(playerId, data.gameName, data.gameResult).catch(console.log)
  console.log(playerId, data)
  res.send(JSON.stringify({status: "ok"}));
});

app.post("/api/get_all_stats", function requestHandler(req, res) {
    let playerId = getcookie(req, 'player_id');
    if (!playerId) playerId = makeid(10);
    res.cookie("player_id", playerId, { overwrite: true, maxAge: 12 * 30 * 24 * 60 * 60 * 1000, sameSite: "strict", httpOnly: true });
    
    stats.get(playerId).then(playerStats => {
        res.send(JSON.stringify({stats: playerStats || {}}))
    })
    .catch(console.log)
  });
  
const server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

function getcookie(req, cookieName) {
  let cookie = null
  var cookies = req.headers.cookie;
  if (!cookies) return null
  cookies.split("; ").forEach(cookieStr => {
    let c = cookieStr.split("=")
    if (c[0] === cookieName) cookie = c[1]
  })
  return cookie
}

function makeid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
