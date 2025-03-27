const express = require("express");
const http = require('http');
const socketIo = require('socket.io');
const app = express();

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "https://chat-room-sand-xi.vercel.app/",
        methods: ["GET", "POST"]
    }
});



app.use(express.static('public'));
const rooms = [];
io.on("connection", (socket) => {
    console.log('A user connected:', socket.id);

    // Handle joining a room
    socket.on("joinroom", (data) => {
        const { roomName, name,  } = data;
        if(!rooms.includes(roomName)){
            rooms.push(roomName)
        }
        // Join the specified room
        socket.join(roomName);
        console.log(`${name} joined room: ${roomName}`);

        socket.to(roomName).emit("newJoin", { message: `${name} has joined the room!` });
        io.emit("roomsList", rooms);
    });
    socket.emit("roomsList", rooms);
    // Handle sending a message
    socket.on("message", (data) => {
        // console.log("messages arrived");
        // console.log(data);
        
        const { roomName, sender, text,time } = data;

        // Broadcast the message to all clients in the room
        io.to(roomName).emit("newMessage", { sender, text ,time });
    });
    
  
    // Handle disconnect
    socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
    });

});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
