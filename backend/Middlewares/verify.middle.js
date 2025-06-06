import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export async function verifyToken(req, res, next) {
  const token = req.cookies.token;

  try {
    if (!token) {
      return res.status(401).json({ success: false, msg: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ success: false, msg: "Invalid token" });
    }
    req.user = decoded; // Add user info to request object
    next(); // Call next middleware or route handler
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, msg: "Invalid or expired token" });
  }
}
