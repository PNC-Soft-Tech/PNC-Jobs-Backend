import { Request, Response, query } from "express";
import { AnswerServices } from "./answer.service";
import catchAsync from "../../../shared/catchAsync";
import Answer from "./answer.model";
import { IAnswer } from "./answer.interface";

export const createAnswer = catchAsync(async (req: Request, res: Response) => {
  const result = await AnswerServices.createAnswer(req.body);
  res.json({
    success: true,
    message: "Successfully Created Answer",
    data: result,
  });
});

export const getAllAnswer = async (req: Request, res: Response) => {
  const categories: IAnswer[] = await AnswerServices.getAllAnswer(req); // Update variable name to 'categories'
  res.json({
    success: true,
    data: categories,
  });
};

export const getAnswerById = catchAsync(async (req: Request, res: Response) => {
  const answer = await AnswerServices.getAnswerById(req.params.id);
  if (!answer) {
    res.status(404).json({
      success: false,
      message: "Answer not found",
    });
  } else {
    res.json({
      success: true,
      data: answer,
    });
  }
});

export const updateAnswer = catchAsync(async (req: Request, res: Response) => {
  const result = await AnswerServices.updateAnswer(req.params.id, req.body);
  res.json({
    success: true,
    message: "Answer updated successfully",
    data: result,
  });
});

export const deleteAnswer = catchAsync(async (req: Request, res: Response) => {
  const result = await AnswerServices.deleteAnswer(req.params.id);
  res.json({
    success: true,
    message: "Answer deleted successfully",
    data: result,
  });
});

export const PhotoController = {
  createAnswer,
  getAllAnswer,
  getAnswerById,
  updateAnswer,
  deleteAnswer,
};
