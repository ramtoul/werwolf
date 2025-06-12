
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.get("/", (req, res) => {
  res.send("Server läuft");
});

let games = {};

io.on("connection", (socket) => {
  console.log("Verbunden:", socket.id);
  socket.on("ping", () => socket.emit("pong"));
});

server.listen(4000, () => console.log("Server läuft auf Port 4000"));
