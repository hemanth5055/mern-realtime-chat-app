import bcrypt from "bcrypt";
import { User } from "../Models/user.model.js";
import { setTokenAsCookie } from "../Utils/setCookie.js";

export async function signup(req, res) {
  const { name, email, password, username } = req.body;

  try {
    // Check for required fields
    if (!name || !email || !password || !username) {
      return res
        .status(400)
        .json({ success: false, msg: "All fields are required." });
    }

    // Check if user already exists (optional but recommended)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, msg: "Email already in use." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      username,
    });
    const result = await user.save();

    if (!result) {
      return res
        .status(500)
        .json({ success: false, msg: "Database error while creating user." });
    }

    // Prepare safe user object for JWT
    const userObj = {
      _id: result._id,
      name: result.name,
      username: result.username,
    };

    // Set token cookie
    await setTokenAsCookie(res, userObj);

    return res
      .status(201)
      .json({ success: true, msg: "User created successfully", user: userObj });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
}

export async function login(req, res) {
  const { username, password } = req.body;

  try {
    // 1. Validate input
    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, msg: "Username and password are required." });
    }

    // 2. Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, msg: "Invalid username or password." });
    }

    // 3. Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, msg: "Invalid username or password." });
    }

    // 4. Prepare safe user object
    const userObj = {
      _id: user._id,
      name: user.name,
      username: user.username,
    };

    // 5. Set token in cookie
    await setTokenAsCookie(res, userObj);

    // 6. Respond with success
    return res.status(200).json({
      success: true,
      msg: "Login successful",
      user: userObj,
    });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
}

export async function logout(req, res) {
  // Clear the token cookie
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  // Respond with logout success
  return res.status(200).json({
    success: true,
    msg: "Logged out successfully",
  });
}

export async function check(req, res) {
  const user = req.user;
  console.log(user);
  return res
    .status(200)
    .json({ success: true, msg: "User Authorized", user: user });
}
