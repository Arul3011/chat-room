const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(express.static("public"));

const rooms = [];

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // JOIN ROOM
  socket.on("joinroom", ({ roomName, name }) => {
    if (!rooms.includes(roomName)) {
      rooms.push(roomName);
    }

    socket.join(roomName);
    console.log(`${name} joined room: ${roomName}`);

    socket.to(roomName).emit("newJoin", {
      message: `${name} has joined the room!`,
    });

    // Send updated rooms list to all clients
    io.emit("roomsList", rooms);
  });

  // LEAVE ROOM
  socket.on("leave-room", ({ roomId }) => {
    socket.leave(roomId);
    console.log(`Socket ${socket.id} left room: ${roomId}`);

    socket.to(roomId).emit("user-left", { socketId: socket.id });
  });

  // RECEIVE AND BROADCAST MESSAGE
  socket.on("message", ({ roomName, sender, text, time }) => {
    io.to(roomName).emit("newMessage", { sender, text, time });
  });

  // Send current rooms list on connection
  socket.emit("roomsList", rooms);

  // HANDLE DISCONNECT
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
