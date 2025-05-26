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

const rooms = new Set();
const roomdetails = {};
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  socket.emit("roomsList", Array.from(rooms));
//create room
socket.on("createroom",(data,callback)=>{
  const {roomname,roompassword} = data;
  if(!rooms.has(roomname)){
    rooms.add(roomname);
   roomdetails[roomname] = {
  password: roompassword,
};
    console.log(roomdetails);
    
    callback({status:'ok'})
  }else{
    callback({status:"error",message:"room have exist"})
  }
})
  // JOIN ROOM
 socket.on("joinroom", (data, callback) => {
    const { roomName, name ,roompass} = data;
    // console.log(data);
    console.log(rooms.has(roomName));
    
    
    
    if (!roomName || !name || !roompass) {
        return callback({ status: 'error', message: 'Missing name or room name' });
    }

    // Check if the room exists
    if (!rooms.has(roomName)) {
        return callback({ status: 'error', message: 'Room does not exist' });
    }
   if (roomdetails[roomName]?.password === roompass) {
    socket.join(roomName);
    socket.emit("roomsList", Array.from(rooms));
    console.log(`${name} joined room: ${roomName}`);

    }

    // Join the room
   
    // rooms.add(roomName);
   
    // Acknowledge the client with a success message
    callback({ status: 'ok' });

    // Notify others in the room
    socket.to(roomName).emit("newJoin", {
        message: `${name} has joined the room!`,
    });
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

  // HANDLE DISCONNECT
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
