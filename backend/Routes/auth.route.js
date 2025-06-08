import express from "express";
import { verifyToken } from "../Middlewares/verify.middle.js";
import {
  check,
  login,
  logout,
  signup,
  userbyUsername,
} from "../Controllers/auth.controller.js";
import upload from "../Middlewares/multer.middle.js";
export const authRouter = express.Router();

authRouter.post("/signup", upload.single("profileImage"), signup);
authRouter.post("/login", login);
authRouter.get("/logout", logout);
authRouter.get("/check", verifyToken, check);
authRouter.get("/userbyUsername", verifyToken, userbyUsername);
