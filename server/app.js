import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

import dotenv from "dotenv";

dotenv.config();

let users = [];

const app = express();
const server = http.createServer(app);
// const socketIo = io(http)
const socketIo = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.use(cors());

app.get("/api", async (req, res) => {
  try {
    res.json({
      message: "Hello",
    });
  } catch (err) {
    console.error(err);
  }
});

socketIo.on("connection", (socket) => {
  console.log(`User ${socket.id} connected...`);

  socket.on("message", (data) => {
    // console.log(data);
    socketIo.emit("response", data);
  });

  socket.on("newuser", (data) => {
    if (!users.find((user) => user.socketID === data.socketID))
      users.push(data);

    socketIo.emit("responseNewUser", users);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("responseTyping", data);
  });

  socket.on("leaveChat", (data) => {
    if (data.id) users = users.filter(({ socketID }) => socketID !== data.id);

    socketIo.emit("responseNewUser", users);
  });

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnect...`);

    users = users.filter(({ socketID }) => socketID !== socket.id);

    // Отправляем обновленный список пользователям
    socketIo.emit("responseNewUser", users);
  });
});

server.listen(process.env.PORT, (err) =>
  err ? console.error(err) : console.log("Server working...")
);
