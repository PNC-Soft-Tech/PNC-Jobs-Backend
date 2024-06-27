import { Request, Response, query } from "express";
import { MessageServices } from "./message.service";
import catchAsync from "../../../shared/catchAsync";
import { IMessage } from "./message.interface";
import AppError from "../../../error/AppError";

export const createMessage = catchAsync(async (req: Request, res: Response) => {
  let data = req.body;
  if (!req?.user) {
    throw new AppError(400, "You are not authenticated");
  }

  const result = await MessageServices.createMessage({
    ...data,
    sender: req.user._id,
  });
  res.json({
    success: true,
    message: "Successfully Created Message",
    data: result,
  });
});
export const getMessagesByChats = catchAsync(
  async (req: Request, res: Response) => {
    const chatID = req.params?.id;
    const userId = req.user?._id
    const messages: IMessage[] = await MessageServices.getChatDetailsAndMessages(chatID, userId); // Update variable name to 'message'
    // console.log('getMessagesByChats res: ', JSON.stringify(messages))
    res.json({
      success: true,
      message: "Retrieve all messages and ChatDetails ",
      data: messages,
    });
  }
);

export const PhotoController = {
  getMessagesByChats,
  // createMessage,
  // getAllMessage,
  // getMessageById,
  // updateMessage,
  // deleteMessage,
  // getAllMessageByUser,
};
