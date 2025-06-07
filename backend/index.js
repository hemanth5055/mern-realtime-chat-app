import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import { connectDB } from "./Utils/db.connect.js";
import { authRouter } from "./Routes/auth.route.js";
import { msgRouter } from "./Routes/msg.route.js";
import { connectionRouter } from "./Routes/connection.route.js";
config(); //load env variables

const app = express();

//cross origin resource sharing
app.use(
  cors({
    origin: process.env.FRONTEND_URI,
    methods: ["GET", "POST"],
    credentials: true,
  })
);

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

app.listen(process.env.PORT, () => {
  console.log(`Server started at ${process.env.PORT} ✅`);
});
