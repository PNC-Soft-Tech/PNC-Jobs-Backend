import { Request, Response, query } from "express";
import { QuestionServices } from "./question.service";
import catchAsync from "../../../shared/catchAsync";
import Question from "./question.model";
import { IQuestion } from "./question.interface";

export const createQuestion = catchAsync(
  async (req: Request, res: Response) => {
    const checkNameExist: any = await Question.findOne({
      title: req.body.title,
    });
    if (!checkNameExist) {
      const result = await QuestionServices.createQuestion(req.body);
      res.json({
        success: true,
        message: "Successfully Created Question",
        data: result,
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Question name already exits !",
      });
    }
  }
);

export const getAllQuestion = async (req: Request, res: Response) => {
  const categories: IQuestion[] = await QuestionServices.getAllQuestion(req); // Update variable name to 'categories'
  res.json({
    success: true,
    data: categories,
  });
};

export const getQuestionById = catchAsync(
  async (req: Request, res: Response) => {
    const question = await QuestionServices.getQuestionById(req.params.id);
    if (!question) {
      res.status(404).json({
        success: false,
        message: "Question not found",
      });
    } else {
      res.json({
        success: true,
        data: question,
      });
    }
  }
);

export const updateQuestion = catchAsync(
  async (req: Request, res: Response) => {
    const result = await QuestionServices.updateQuestion(
      req.params.id,
      req.body
    );
    res.json({
      success: true,
      message: "Question updated successfully",
      data: result,
    });
  }
);

export const deleteQuestion = catchAsync(
  async (req: Request, res: Response) => {
    const result = await QuestionServices.deleteQuestion(req.params.id);
    res.json({
      success: true,
      message: "Question deleted successfully",
      data: result,
    });
  }
);

export const PhotoController = {
  createQuestion,
  getAllQuestion,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
};
