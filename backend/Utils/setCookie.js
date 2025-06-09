import jwt from "jsonwebtoken";
export async function setTokenAsCookie(res, user) {
  try {
    const token = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Set cookie with token
    res.cookie("token", token, {
      httpOnly: true, // Not accessible via JS in browser
      sameSite: "none", // Allows cross-site cookie (required for cross-origin frontend)
      secure: true, // Requires HTTPS
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    });
  } catch (error) {
    // Respond with 500 status on error
    return res.status(500).json({ success: false, msg: error.message });
  }
}
