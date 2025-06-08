import bcrypt from "bcrypt";
import { User } from "../Models/user.model.js";
import { setTokenAsCookie } from "../Utils/setCookie.js";
import { Connection } from "../Models/connection.model.js";

export async function signup(req, res) {
  const { name, email, password, username } = req.body;
  const image = req.file;

  try {
    // Check required fields
    if (!name || !email || !password || !username) {
      return res
        .status(400)
        .json({ success: false, msg: "All fields are required." });
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, msg: "Email already in use." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Get Cloudinary image URL (if uploaded)
    const profileImageUrl = image?.path || ""; // optional

    // Create and save user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      username,
      profileUrl: profileImageUrl, // assuming you have this field in your User schema
    });

    const result = await user.save();

    if (!result) {
      return res
        .status(500)
        .json({ success: false, msg: "Database error while creating user." });
    }

    // Prepare safe user object for token
    const userObj = {
      _id: result._id,
      name: result.name,
      username: result.username,
      profileUrl: result.profileUrl,
    };

    // Set token cookie
    await setTokenAsCookie(res, userObj);

    return res.status(201).json({
      success: true,
      msg: "User created successfully",
      user: userObj,
    });
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
      profileUrl: user.profileUrl,
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

export async function userbyUsername(req, res) {
  const { username } = req.query;
  const user = req.user;

  if (!username) {
    return res
      .status(400)
      .json({ success: false, msg: "Username is required." });
  }

  try {
    // Find users matching the username (partial & case-insensitive)
    const usersFromDB = await User.find({
      username: { $regex: `^${username}`, $options: "i" },
    }).select("_id name username profileUrl");

    if (!usersFromDB || usersFromDB.length === 0) {
      return res
        .status(404)
        .json({ success: false, msg: "User(s) not found." });
    }

    // Use Promise.all to run queries in parallel
    const usersWithConnectionStatus = await Promise.all(
      usersFromDB.map(async (foundUser) => {
        const connectionExists = await Connection.findOne({
          $or: [
            { requestSender: foundUser._id, requestReceiver: user._id },
            { requestSender: user._id, requestReceiver: foundUser._id },
          ],
        });
        return {
          _id: foundUser._id,
          name: foundUser.name,
          username: foundUser.username,
          profileUrl: foundUser.profileUrl,
          status: connectionExists?.status || null,
        };
      })
    );

    return res
      .status(200)
      .json({ success: true, users: usersWithConnectionStatus });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
}
