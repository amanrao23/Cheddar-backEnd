const express = require("express");
const connectDB = require("./config/db");
const app = express();
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");
connectDB();
const socketToken = require("./socketToken.json");
app.use(express.json());

app.use(cors());
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = socketio(server);
var golbalSocket;
io.on("connection", (socket) => {
  // either with send()

  console.log(socket.id,'Add socket');
  golbalSocket=socket;
  socket.on("join", ({ username, conversations }) => {

    socketToken[username] = socket;
    console.log(username)
    if (conversations.length) {
      conversations.map((conversation) => {
        socket.join(conversation._id);
      });
    }
  });
  socket.on("newEvent", ({ text, chatRoomId }) => {
    console.log(text,chatRoomId,'newEvent again')
    socket.to(chatRoomId).emit("newMessage", { text });
    // socket.manager.sockets.in(chatRoomId).emit("newMessage", { text })
  });
});

app.use(function (req, res, next) {
  req.socket = golbalSocket;
  next();
});
app.use("/api/auth", require("./routes/api/auth"));

app.use("/api/user", require("./routes/api/user"));

app.use("/api/event", require("./routes/api/event"));

server.listen(PORT, () => console.log(`SERVER STARTED ON 5000`));
