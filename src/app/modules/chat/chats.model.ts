import { Schema, model } from "mongoose";
import { IChat, IChatPhoto, IMemberUser } from "./chats.interface";


const chatPhotoSchema = new Schema<IChatPhoto>(
  {
    name: {
      type: String,
    },
    image: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const ChatSchema = new Schema<IChat>(
  {
    members: [{
      type: Schema.Types.ObjectId,
      ref: "User",
    }],
    groupId: {
      type: Schema.Types.ObjectId,
      ref: "Group",
    },
    photo: chatPhotoSchema,
  },
  {
    timestamps: true,
  }
);

const Chats = model<IChat>("Chat", ChatSchema);

export default Chats;
