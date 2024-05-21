import { Server } from "socket.io";
const io = new Server(3003, {
  cors: {
    origin: ["http://127.0.0.1:5500"],
  },
});

io.on("connection", (socket) => {
  console.log("socket connected");
  socket.on("send-message-to-room", ({ room, message }) => {
    console.log(room, message);
    //   This will send message to all sockets
    // io.emit("reply-message", "reply");

    //   This will send message only to the socket sending message to server
    io.to(room).emit("reply-message", `reply: ${message}`);

    //   This will send message to the all sockets except the one sending message to server
    // socket.broadcast.emit("reply-message", "reply");
  });

  socket.on("send-message", (message) => {
    socket.emit("reply-message", `reply: ${message}`);
  });

  socket.on("join-room", (room) => {
    socket.join(room);
    console.log("room joined: " + room);
  });
});
