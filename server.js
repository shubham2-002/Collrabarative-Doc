import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";


const app = express();
const server = createServer(app);
const io = new Server(server);

const userSocketMap = {};
const getAllConnectedlist = (roomid) => {
  return Array.from(io.sockets.adapter.rooms.get(roomid) || []).map(
    (sockerId) => {
      return {
        sockerId,
        username: userSocketMap[sockerId],
      };
    }
  );
};

app.get("/", (req, res) => {
  res.send("Hello world");
});

io.on("connection", (socket) => {
  // console.log("a user connected", socket.id);

  socket.on("join", ({ roomid, username }) => {
    userSocketMap[socket.id] = username;
    socket.join(roomid);

    const clients = getAllConnectedlist(roomid);
    console.log(clients);
    clients.forEach(({ sockerId }) => {
      io.to(sockerId).emit("joined", {
        clients,
        username,
        sockerId: socket.id,
      });
    });
  });

//leaving room
  socket.on('disconnecting',()=>{
    const rooms=[...socket.rooms]
    rooms.forEach((roomId)=>{
      socket.in(roomId).emit('disconnected',{
        socketId:socket.id,
        username:userSocketMap[socket.id]
      })
    })
    delete userSocketMap[socket.id]
    socket.leave()
  })

  socket.on('send-changes',({delta,roomid})=>{
    
    socket.in(roomid).emit('receive-changes',{delta})
    console.log(delta)
  })
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
