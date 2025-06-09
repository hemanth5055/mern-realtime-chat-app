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
      senderId: user._id, // ID of user sending the message
      receiverId: receiverId, // ID of message recipient
      message: msg, // message content
    });

    // Save message to the database
    await newMessage.save();

    // Add sender's name to the returned message object
    const newMsg = newMessage.toObject(); // convert Mongoose doc to plain JS object
    newMsg.senderName = user.name;

    // Send the created message back in the response
    return res.status(201).json({
      success: true,
      message: newMsg,
    });
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

    // Fetch messages sorted oldest -> newest
    const messages = await Msg.find({
      $or: [
        { senderId: user._id, receiverId: receiverId },
        { senderId: receiverId, receiverId: user._id },
      ],
    })
      .sort({ timestamp: 1 })
      .limit(100);

    // Group messages by date string (YYYY-MM-DD)
    const grouped = {};
    messages.forEach((msg) => {
      const dateKey = msg.timestamp.toISOString().split("T")[0];
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(msg);
    });

    // Convert grouped object into array for easier frontend consumption
    const groupedMessages = Object.keys(grouped)
      .sort((a, b) => new Date(a) - new Date(b)) // sort dates ascending
      .map((date) => ({
        date,
        messages: grouped[date],
      }));

    return res.status(200).json({ success: true, groupedMessages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res
      .status(500)
      .json({ success: false, msg: "Failed to fetch messages" });
  }
}
