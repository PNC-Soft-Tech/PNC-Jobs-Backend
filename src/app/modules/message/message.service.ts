import { Request } from "express";
import { IMessage } from "./message.interface";
import Message from "./message.model";
import { Schema, Types } from "mongoose";
import AppError from "../../../error/AppError";

export const createMessage = async (message: IMessage) => {
  const saveMessage: IMessage = await Message.create(message);

  return saveMessage;
};
export const getAllMessage = async (req: Request) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  return messages;
};
export const getAllMessageByUser = async (sender: any, receiver: any) => {
  const messages = await Message.find({
    $or: [
      {
        sender: new Types.ObjectId(sender),
        receiver: new Types.ObjectId(receiver),
      },
      {
        sender: new Types.ObjectId(receiver),
        receiver: new Types.ObjectId(sender),
      },
    ],
  }).populate([
    {
      path: "sender",
      model: "User",
      select: "userName email",
    },
    {
      path: "receiver",
      model: "User",
      select: "userName email",
    },
  ]);
  return messages;
};

export const getMessageById = async (id: string) => {
  const message = await Message.findById(id);
  return message;
};

export const updateMessage = async (id: string, updatedMessage: IMessage) => {
  const updated = await Message.findByIdAndUpdate(id, updatedMessage, {
    new: true,
  });
  return updated;
};

export const deleteMessage = async (id: string) => {
  const deleteMessage = await Message.findByIdAndRemove(id);
  return deleteMessage;
};
export const getChatDetailsAndMessages = async (chatId: any, userId: any) => {
  try {
    // Retrieve messages by chatId and populate chat and sender information
    console.log('get messages req userId: ', userId)
    const messages: any[] = await Message
      .find({ chatId })
      .sort({ createdAt: -1 })
      // .populate({
      //   path: "chatId",
      //   model: "Chat"
      // })
      .populate({
        path: "sender",
        model: "User",
        select: "_id userName email profileImage"
      })
      .limit(10);

    // this action will be handled by socket
    // const unreadMessages = await Message.find({ chatId, isRead: false, sender: { $ne: userId } })
    // for (const message of unreadMessages) {
    //   message.isRead = true
    //   await message.save()
    // }

    return messages.sort((a, b) => a.createdAt > b.createdAt ? 1 : -1);
  } catch (error: any) {
    console.error(error);
    throw new Error(error);

  }
};


export const MessageServices = {
  createMessage,
  getAllMessage,
  getMessageById,
  updateMessage,
  deleteMessage,
  getAllMessageByUser,
  getChatDetailsAndMessages
};
