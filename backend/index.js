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
const userMap = []; //userId-SocketId
const io = new Server(expressServer, {
  cors: corsOptions,
});
io.on("connection", (socket) => {
  console.log("new user", socket.id);
  //user-connected
  socket.on("userConnected", (a, b) => {
    userMap[a] = b;
  });
  //user-disconnected
  socket.on("disconnect", () => {
    for (const userId in userMap) {
      if (userMap[userId] === socket.id) {
        delete userMap[userId];
        break; // Optional: stop loop after first match
      }
    }
  });
  //send message to reciever if online
  socket.on("sendMessage", (messageObj) => {
    if (userMap[messageObj.receiverId]) {
      socket
        .to(userMap[messageObj.receiverId])
        .emit("messageRecieved", messageObj);
    }
  });
});

expressServer.listen(process.env.PORT, () => {
  console.log(`Server started at ${process.env.PORT} ✅`);
});
