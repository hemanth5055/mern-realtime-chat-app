import { Connection } from "../Models/connection.model.js";
import { User } from "../Models/user.model.js";

export async function acceptRequest(req, res) {
  const { requestId } = req.body;

  if (!requestId) {
    return res
      .status(400)
      .json({ success: false, msg: "Request ID is required" });
  }

  try {
    const result = await Connection.updateOne(
      { _id: requestId },
      { $set: { canCommunicate: true } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ success: false, msg: "Request not found" });
    }

    if (result.modifiedCount === 0) {
      return res
        .status(200)
        .json({ success: true, msg: "Request already accepted" });
    }

    return res
      .status(200)
      .json({ success: true, msg: "Friend request accepted" });
  } catch (error) {
    console.error("Accept request error:", error);
    return res
      .status(500)
      .json({ success: false, msg: "Failed to accept friend request" });
  }
}

export async function sendRequest(req, res) {
  const user = req.user;
  const { receiverId } = req.body;

  if (!receiverId) {
    return res
      .status(400)
      .json({ success: false, msg: "Receiver ID is required" });
  }

  try {
    // Optional: check if a request or connection already exists between these users
    const existing = await Connection.findOne({
      $or: [
        { requestSender: user._id, requestReceiver: receiverId },
        { requestSender: receiverId, requestReceiver: user._id },
      ],
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        msg: "Friend request already exists or you are already connected",
      });
    }

    const conn = new Connection({
      requestSender: user._id,
      requestReceiver: receiverId,
    });

    await conn.save();

    return res
      .status(201)
      .json({ success: true, msg: "Friend request sent", connection: conn });
  } catch (error) {
    console.error("Send request error:", error);
    return res
      .status(500)
      .json({ success: false, msg: "Failed to send friend request" });
  }
}

export async function allRequestsGot(req, res) {
  const user = req.user;

  try {
    const requests = await Connection.find({
      requestReceiver: user._id,
    })
      .populate("requestSender", "name username")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, requests });
  } catch (error) {
    console.error("Error fetching friend requests:", error);
    return res
      .status(500)
      .json({ success: false, msg: "Failed to fetch friend requests" });
  }
}

export async function allRequestsSent(req, res) {
  const user = req.user;

  try {
    const requests = await Connection.find({
      requestSender: user._id,
    })
      .populate("requestReceiver", "name username") // populate receiver's info
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, requests });
  } catch (error) {
    console.error("Error fetching sent requests:", error);
    return res
      .status(500)
      .json({ success: false, msg: "Failed to fetch sent friend requests" });
  }
}

export async function getFriends(req, res) {
  const user = req.user;

  try {
    // Find all connections where user is involved and canCommunicate is true
    const connections = await Connection.find({
      canCommunicate: true,
      $or: [{ requestSender: user._id }, { requestReceiver: user._id }],
    });

    // Extract friend user IDs
    const friendIds = connections.map((conn) => {
      return String(conn.requestSender) === String(user._id)
        ? conn.requestReceiver
        : conn.requestSender;
    });

    // Fetch friend user details
    const friends = await User.find({ _id: { $in: friendIds } }).select(
      "name username"
    );

    return res.status(200).json({ success: true, friends });
  } catch (error) {
    console.error("Error fetching friends:", error);
    return res
      .status(500)
      .json({ success: false, msg: "Failed to fetch friends" });
  }
}
