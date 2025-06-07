import mongoose from "mongoose";

const connectionSchema = new mongoose.Schema(
  {
    requestSender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    requestReceiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    canCommunicate: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Connection = mongoose.model("Connection", connectionSchema);

//6844070bff34bbe67138297e - 1
//6844071722616152f9aaf193 - 2
