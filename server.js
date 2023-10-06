const express = require("express");
const path = require("path");
const app = express();

const port = process.env.PORT || 3001;

app.use("/", express.static(path.join(__dirname, "dist")));

app.use(express.urlencoded({
    extended: true
  }));
app.use(express.json());

app.post("/save_stats", function requestHandler(req, res) {
  const data = req.body;
  let cookie = getcookie(req, 'player_id');
  if (!cookie) cookie = makeid(10);
  res.cookie("player_id", cookie, { overwrite: true, maxAge: 12 * 30 * 24 * 60 * 60 * 1000 });
  console.log(data.stats, cookie)
  res.send(JSON.stringify({status: "ok"}));
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
