import { Msg } from "../Models/message.model.js";

export async function send(req, res) {
  const { msg, receiverId } = req.body;
  const user = req.user; // This should be set by verifyToken middleware

  try {
    // Basic validation
    if (!msg || !receiverId) {
      return res
        .status(400)
        .json({ success: false, msg: "Message and receiver ID are required" });
    }

    // Create and save the message
    const newMessage = new Msg({
      senderId: user._id,
      receiverId: receiverId,
      message: msg,
    });
    await newMessage.save();
    return res.status(201).json({ success: true, message: newMessage });
  } catch (error) {
    console.error("Message send error:", error);
    return res
      .status(500)
      .json({ success: false, msg: "Failed to send message" });
  }
}

export async function getMessages(req, res) {
  const { receiverId } = req.body;
  const user = req.user;

  try {
    if (!receiverId) {
      return res
        .status(400)
        .json({ success: false, msg: "Receiver ID is required" });
    }

    const messages = await Msg.find({
      $or: [
        { senderId: user._id, receiverId: receiverId },
        { senderId: receiverId, receiverId: user._id },
      ],
    })
      .sort({ timestamp: 1 })
      .limit(20);

    return res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res
      .status(500)
      .json({ success: false, msg: "Failed to fetch messages" });
  }
}
