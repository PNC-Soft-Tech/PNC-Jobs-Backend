import { Request } from "express";
import { IChat } from "./chats.interface";
import mongoose, { Schema, Types } from "mongoose";
import AppError from "../../../error/AppError";
import Chats from "./chats.model";
import Group from "../group/group.model";
import Message from "../message/message.model";
import { IMessage } from "../message/message.interface";

export const createChat = async (data: any) => {
  try {
    // const { chatName, owner, members, isGroup, photo } = data;
    // const newChat = new Chats({
    //   chatName,
    //   owner,
    //   members,
    //   isGroup,
    //   photo
    // });
    const newChat = new Chats(data);
    const savedChat = await newChat.save();
    return savedChat
  } catch (error: any) {
    throw new Error(error);

  }
};
export const getAllChats = async (userId: any) => {
  try {
    const groups: any[] = await Group.find({"members.user": userId});
    const groupIds: any[] = groups.map((_it: any) => _it._id.toString())//
    const chats = await Chats
      .find({
        $or: [
          { members: { $in: [userId] } },
          { groupId: { $in: groupIds } }
        ]
      })
      .sort([['updatedAt', -1]])
      .populate('members', 'userName email profileImage')
      .populate('photo.user', 'userName email profileImage')
      .populate('groupId', 'name owner members')
    
    const modified: any[] = []
    for (const chat of chats) {
      const unreadMessages: IMessage[] = await Message.find({ chatId: chat._id, isRead: false, sender: { $ne: userId } })
      // console.log('unreadMessage count: ', unreadMessages.length)
      const found = chat.members.find((_it2: any) => _it2._id.toString() != userId.toString())
      modified.push({
        ...chat.toJSON(),
        friend: found,
        unreadCount: unreadMessages.length
      })
    }

    // console.log('getAllChats modified.length: ', modified.length)
    const sorted = modified.sort((_a: any, _b: any) => _a.updatedAt > _b.updatedAt ? -1 : _a.updatedAt < _b.updatedAt ? 1 : 0)

    // sorted.map((_it) => console.log('chat updatedAt: ', _it.updatedAt))

    return sorted
  } catch (error: any) {
    throw new Error(error);

  }
};


export const addMemberToGroup = async (
  id: string,
  member: Schema.Types.ObjectId
) => {
  const group = await Group.findById(id);

  if (!group) {
    throw new AppError(404, "Group not found");
  }

  group.members.unshift({
    user: member,
  });

  await group.save();
  return group;
};

export const getGroupById = async (id: string) => {
  const group = await Group.findById(id);
  return group;
};

// export const updateGroup = async (id: string, updatedGroup: IGroup) => {
//   const updated = await Group.findByIdAndUpdate(id, updatedGroup, {
//     new: true,
//   });
//   return updated;
// };

export const deleteGroup = async (id: string) => {
  const deleteGroup = await Group.findByIdAndRemove(id);
  return deleteGroup;
};

export const ChatServices = {
  createChat,
  getAllChats,
  getGroupById,
  // updateGroup,
  deleteGroup,
  addMemberToGroup,
  // addPhotoToGroup,
};
