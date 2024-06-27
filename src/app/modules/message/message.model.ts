import { Schema, model } from "mongoose";
import { IMessage } from "./message.interface";

const MessageSchema = new Schema<IMessage>(
  {
    chatId: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    messages: {
      type: String,
      required: true,
    },
    messageType: {
      type: String,
      default: "image" // text, image
    },
    isRead: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

const Message = model<IMessage>("Message", MessageSchema);

export default Message;
