import { Request, Response, query } from "express";
import { Types } from "mongoose";
import { ChatServices } from "./chats.service";
import catchAsync from "../../../shared/catchAsync";
import Chats from "./chats.model";
import { IChat } from "./chats.interface";
import AppError from "../../../error/AppError";
import Group from "../group/group.model";
import { IGroup } from "../group/group.interface";

export const createOrGetChat = catchAsync(async (req: Request, res: Response) => {
  const {
    friendId,
    groupId,
  } = req.body;


  console.log("createOrGetChat req.body: ", req.body)

  if (!req.user) {
    throw new AppError(403, "You are not authenticated");
  }
  const userId = req.user._id

  if (groupId) {
    const chat: IChat | null = await Chats.findOne({ groupId });
  console.log('chat with groupId not found')
    if (chat) {
      return res.json({
        success: true,
        data: chat,
      });
    }
    
    const createBody = {
      groupId,
      members: []
    }

    console.log('group chat create body: ', createBody)
    const result = await ChatServices.createChat(createBody);
    return res.json({
      success: true,
      message: "Chat created Successfully!",
      data: result,//{}
    });
  }

  const fResult: any[] = await Chats.aggregate([
    {
      $match: {
        groupId: { $exists: false },
        $expr: {
          $or: [
            {
              $and: [
                { $eq: [{ $size: "$members" }, 2] },
                { $eq: [{ $arrayElemAt: ["$members", 0] }, new Types.ObjectId(userId)] },
                { $eq: [{ $arrayElemAt: ["$members", 1] }, new Types.ObjectId(friendId)] }
              ]
            },
            {
              $and: [
                { $eq: [{ $size: "$members" }, 2] },
                { $eq: [{ $arrayElemAt: ["$members", 0] }, new Types.ObjectId(friendId)] },
                { $eq: [{ $arrayElemAt: ["$members", 1] }, new Types.ObjectId(userId)] }
              ]
            }
          ]
        }
      }
    }
  ])

  // console.log('chat found all: ', fResult)

  if (fResult.length) {
    // console.log('chat found: ', fResult[0]);
    return res.json({
      success: true,
      data: fResult[0],
    });
  }

  const createBody = {
    members: [req.user._id, friendId]
  }
  console.log('single chat create body: ', createBody)
  const result = await ChatServices.createChat(createBody);
  // console.log('chat created: ', result);
  res.json({
    success: true,
    message: "Chat created Successfully!",
    data: result,//{}
  });

});

export const getAllChats = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?._id;
  console.log("getAllChats userId: ", userId)
  const chatLists = await ChatServices.getAllChats(userId)
  res.status(200).json({
    success: true,
    data: chatLists,
  });
});

export const PhotoController = {
  createOrGetChat,
  getAllChats,
  // getGroupById,
  // updateGroup,
  // deleteGroup,
  // addMemberToGroup,
  // addPhotoToGroup,
};
