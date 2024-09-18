import { Request, Response, query } from "express";
import { ExamTypeServices } from "./examType.service";
import catchAsync from "../../../shared/catchAsync";
import ExamType from "./examType.model";
import { IExamType } from "./examType.interface";
import AppError from "../../../error/AppError";

export const createExamType = catchAsync(
  async (req: Request, res: Response) => {
    const checkExist: any = ExamTypeServices.checkTitleAndSlugExist(req.body);

    if (checkExist) {
      throw new AppError("Title Or slug already exists", 409);
    }

    const result = await ExamTypeServices.createExamType(req.body);

    res.json({
      success: true,
      message: "Successfully Created ExamType",
      data: result,
    });
  }
);

export const getAllExamType = async (req: Request, res: Response) => {
  const categories: IExamType[] = await ExamTypeServices.getAllExamType(req); // Update variable name to 'categories'
  res.json({
    success: true,
    data: categories,
  });
};

export const getExamTypeById = catchAsync(
  async (req: Request, res: Response) => {
    const examType = await ExamTypeServices.getExamTypeById(req.params.id);
    if (!examType) {
      res.status(404).json({
        success: false,
        message: "ExamType not found",
      });
    } else {
      res.json({
        success: true,
        data: examType,
      });
    }
  }
);

export const updateExamType = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ExamTypeServices.updateExamType(
      req.params.id,
      req.body
    );
    res.json({
      success: true,
      message: "ExamType updated successfully",
      data: result,
    });
  }
);

export const deleteExamType = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ExamTypeServices.deleteExamType(req.params.id);
    res.json({
      success: true,
      message: "ExamType deleted successfully",
      data: result,
    });
  }
);

export const PhotoController = {
  createExamType,
  getAllExamType,
  getExamTypeById,
  updateExamType,
  deleteExamType,
};
