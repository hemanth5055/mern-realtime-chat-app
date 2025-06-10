import express from "express";
import cors from "cors";
import http from "http";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import { connectDB } from "./Utils/db.connect.js";
import { authRouter } from "./Routes/auth.route.js";
import { msgRouter } from "./Routes/msg.route.js";
import { connectionRouter } from "./Routes/connection.route.js";
import { Server } from "socket.io";

config(); //load env variables

const app = express();
const expressServer = http.createServer(app);
//cross origin resource sharing
const corsOptions = {
  origin: process.env.FRONTEND_URI,
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());
//connect to database
connectDB();

app.use("/auth", authRouter);
app.use("/msg", msgRouter);
app.use("/request", connectionRouter);
app.get("/", (req, res) => {
  res.send("Server working");
});
//socket-io
const userMap = new Map(); //userId-SocketId
const io = new Server(expressServer, {
  cors: corsOptions,
});
io.on("connection", (socket) => {
  console.log("new user", socket.id);
  //on initial login send an array of online users
  socket.emit("getAllConnectedUsers", [...userMap.keys()]);
  //when a new user connects send the particular user details
  socket.on("userConnected", (userId, socketId) => {
    userMap.set(userId, socketId);
    socket.broadcast.emit("singleUserConnected", userId);
  });

  socket.on("disconnect", () => {
    let disconnectedUserId = null;

    for (const [userId, id] of userMap.entries()) {
      if (id === socket.id) {
        disconnectedUserId = userId;
        userMap.delete(userId);
        break;
      }
    }

    if (disconnectedUserId) {
      io.emit("singleUserDisconnected", disconnectedUserId);
    }
  });

  socket.on("sendMessage", (messageObj) => {
    const receiverSocketId = userMap.get(messageObj.receiverId);
    if (receiverSocketId) {
      socket.to(receiverSocketId).emit("messageRecieved", messageObj);
    }
  });

  socket.on("startedTyping", (data) => {
    const receiverSocketId = userMap.get(data.receiverId);
    console.log(receiverSocketId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("someBodyTyping", {
        senderId: data.senderId,
        receiverId: data.receiverId,
      });
    }
  });
});

expressServer.listen(process.env.PORT, () => {
  console.log(`Server started at ${process.env.PORT} ✅`);
});
