import { Request, Response, query } from "express";
import { ModelReadActivityServices } from "./modelReadActivity.service";
import catchAsync from "../../../shared/catchAsync";
import ModelReadActivity from "./modelReadActivity.model";
import { IModelReadActivity } from "./modelReadActivity.interface";
import AppError from "../../../error/AppError";

export const createModelReadActivity = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ModelReadActivityServices.createModelReadActivity(
      req.body
    );

    res.json({
      success: true,
      message: "Successfully Created ModelReadActivity",
      data: result,
    });
  }
);

export const getAllModelReadActivity = async (req: Request, res: Response) => {
  const categories: IModelReadActivity[] =
    await ModelReadActivityServices.getAllModelReadActivity(req); // Update variable name to 'categories'
  res.json({
    success: true,
    data: categories,
  });
};

export const getModelReadActivityById = catchAsync(
  async (req: Request, res: Response) => {
    const examType = await ModelReadActivityServices.getModelReadActivityById(
      req.params.id
    );
    if (!examType) {
      res.status(404).json({
        success: false,
        message: "ModelReadActivity not found",
      });
    } else {
      res.json({
        success: true,
        data: examType,
      });
    }
  }
);

export const updateModelReadActivity = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ModelReadActivityServices.updateModelReadActivity(
      req.params.id,
      req.body
    );
    res.json({
      success: true,
      message: "ModelReadActivity updated successfully",
      data: result,
    });
  }
);

export const deleteModelReadActivity = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ModelReadActivityServices.deleteModelReadActivity(
      req.params.id
    );
    res.json({
      success: true,
      message: "ModelReadActivity deleted successfully",
      data: result,
    });
  }
);

export const PhotoController = {
  createModelReadActivity,
  getAllModelReadActivity,
  getModelReadActivityById,
  updateModelReadActivity,
  deleteModelReadActivity,
};
