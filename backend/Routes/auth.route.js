import express from "express";
import { verifyToken } from "../Middlewares/verify.middle.js";
import {
  check,
  login,
  logout,
  signup,
} from "../Controllers/auth.controller.js";
import upload from "../Middlewares/multer.middle.js";
export const authRouter = express.Router();

authRouter.post("/signup", upload.single("profileImage"), signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/check", verifyToken, check);
