import { Router } from "express";
import { getMessages, send } from "../Controllers/msg.controller.js";
import { verifyToken } from "../Middlewares/verify.middle.js";

export const msgRouter = Router();
msgRouter.post("/send", verifyToken, send);
msgRouter.post("/getMessages", verifyToken, getMessages);
