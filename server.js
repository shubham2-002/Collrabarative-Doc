import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

const userSocketMap = {};
const getAllConnectedlist = (roomid) => {
  const allclinetlist = Array.from(io.sockets.adapter.rooms.get(roomid)) || [];
  const clinetsInRomm = allclinetlist.map((sockerId) => {
    return {
      sockerId,
      username: userSocketMap.username,
    };
  });
  return clinetsInRomm;
};

app.get("/", (req, res) => {
  res.send("Hello world");
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("join", ({ roomid, username }) => {
    userSocketMap[socket.id] = username;
    socket.join(roomid);

    const clients = getAllConnectedlist(roomid);
    
    clients.forEach(({ sockerId }) => {
      io.to(sockerId).emit("joined", {
        clients,
        username,
        sockerId: socket.id,
      });
    });
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
