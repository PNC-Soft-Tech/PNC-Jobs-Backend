import { Request, Response, query } from "express";
import { ModelServices } from "./model.service";
import catchAsync from "../../../shared/catchAsync";
import { IModel } from "./model.interface";

export const createModel = catchAsync(async (req: Request, res: Response) => {
  const result = await ModelServices.createModel(req.body);
  res.json({
    success: true,
    message: "Successfully Created Model",
    data: result,
  });
});

export const getAllModel = async (req: Request, res: Response) => {
  const categories: IModel[] = await ModelServices.getAllModel(req); // Update variable name to 'categories'
  res.json({
    success: true,
    data: categories,
  });
};

export const getModelById = catchAsync(async (req: Request, res: Response) => {
  const model = await ModelServices.getModelById(req.params.id);
  if (!model) {
    res.status(404).json({
      success: false,
      message: "Model not found",
    });
  } else {
    res.json({
      success: true,
      data: model,
    });
  }
});

export const updateModel = catchAsync(async (req: Request, res: Response) => {
  const result = await ModelServices.updateModel(req.params.id, req.body);
  res.json({
    success: true,
    message: "Model updated successfully",
    data: result,
  });
});

export const deleteModel = catchAsync(async (req: Request, res: Response) => {
  const result = await ModelServices.deleteModel(req.params.id);
  res.json({
    success: true,
    message: "Model deleted successfully",
    data: result,
  });
});

export const PhotoController = {
  createModel,
  getAllModel,
  getModelById,
  updateModel,
  deleteModel,
};
