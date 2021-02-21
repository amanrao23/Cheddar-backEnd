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

io.on("connection", (socket) => {
  // either with send()
  console.log(socket.id);

  socket.on("join", ({ username, conversations }) => {
    socketToken[username] = socket;
    console.log(username,conversations,'hey joinie')
    if (conversations.length) {
      conversations.map((conversation) => {
        socket.join(conversation._id);
        console.log(conversation._id,"In the loop of joining");
      });
    }
  });
  socket.on("newEvent", ({ text, chatRoomId }) => {
    console.log(text, "socket newEvent");
    socket.to(chatRoomId).emit("newMessage", { text });
  });
});

app.use(function (req, res, next) {
  req.io = io;
  next();
});
app.use("/api/auth", require("./routes/api/auth"));

app.use("/api/user", require("./routes/api/user"));

app.use("/api/event", require("./routes/api/event"));

server.listen(PORT, () => console.log(`SERVER STARTED ON 5000`));
