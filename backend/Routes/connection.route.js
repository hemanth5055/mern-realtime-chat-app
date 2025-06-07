import { Router } from "express";
import { verifyToken } from "../Middlewares/verify.middle.js";
import {
  acceptRequest,
  allRequestsGot,
  allRequestsSent,
  getFriends,
  sendRequest,
} from "../Controllers/connection.controller.js";
export const connectionRouter = Router();
connectionRouter.post("/sendRequest", verifyToken, sendRequest);
connectionRouter.get("/getFriends", verifyToken, getFriends);
connectionRouter.post("/acceptRequest", verifyToken, acceptRequest);
connectionRouter.get("/allRequestsGot", verifyToken, allRequestsGot);
connectionRouter.get("/allRequestsSent", verifyToken, allRequestsSent);
