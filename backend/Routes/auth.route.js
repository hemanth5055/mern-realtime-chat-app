import express from "express";
import { verifyToken } from "../Middlewares/verify.middle.js";
import { check, login, logout, signup } from "../Controllers/auth.controller.js";

export const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/check", verifyToken, check);
