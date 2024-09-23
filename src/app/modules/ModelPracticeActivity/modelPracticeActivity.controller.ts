import { Request, Response, query } from "express";
import { ModelPracticeActivityServices } from "./modelPracticeActivity.service";
import catchAsync from "../../../shared/catchAsync";
import ModelPracticeActivity from "./modelPracticeActivity.model";
import { IModelPracticeActivity } from "./modelPracticeActivity.interface";
import AppError from "../../../error/AppError";

export const createModelPracticeActivity = catchAsync(
  async (req: Request, res: Response) => {
    // console.log("req.body", req.body);
    const result =
      await ModelPracticeActivityServices.createModelPracticeActivity(req.body);

    res.json({
      success: true,
      message: "Successfully Created ModelPracticeActivity",
      data: result,
    });
  }
);

export const getAllModelPracticeActivity = async (
  req: Request,
  res: Response
) => {
  const categories: IModelPracticeActivity[] =
    await ModelPracticeActivityServices.getAllModelPracticeActivity(req); // Update variable name to 'categories'
  res.json({
    success: true,
    data: categories,
  });
};

export const getModelPracticeActivityById = catchAsync(
  async (req: Request, res: Response) => {
    const examType =
      await ModelPracticeActivityServices.getModelPracticeActivityById(
        req.params.id
      );
    if (!examType) {
      res.status(404).json({
        success: false,
        message: "ModelPracticeActivity not found",
      });
    } else {
      res.json({
        success: true,
        data: examType,
      });
    }
  }
);

export const updateModelPracticeActivity = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await ModelPracticeActivityServices.updateModelPracticeActivity(
        req.params.id,
        req.body
      );
    res.json({
      success: true,
      message: "ModelPracticeActivity updated successfully",
      data: result,
    });
  }
);

export const deleteModelPracticeActivity = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await ModelPracticeActivityServices.deleteModelPracticeActivity(
        req.params.id
      );
    res.json({
      success: true,
      message: "ModelPracticeActivity deleted successfully",
      data: result,
    });
  }
);

export const PhotoController = {
  createModelPracticeActivity,
  getAllModelPracticeActivity,
  getModelPracticeActivityById,
  updateModelPracticeActivity,
  deleteModelPracticeActivity,
};
