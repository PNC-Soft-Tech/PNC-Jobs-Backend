import { Schema } from "mongoose";
import { IUser } from "../auth/auth.interface";
import { IChat } from "../chat/chats.interface";

export type IMessage = {
  chatId:Schema.Types.ObjectId | IChat
  sender: Schema.Types.ObjectId | IUser;
  messages: string
  messageType: string; // text, image
  isRead:boolean,
};
