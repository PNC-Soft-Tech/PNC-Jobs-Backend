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

export const getAllModel = catchAsync(async (req: Request, res: Response) => {
  const { categories, total, page, limit } = await ModelServices.getAllModel(
    req
  );

  res.json({
    success: true,
    data: categories,
    total, // Total number of items
    page, // Current page
    limit, // Items per page
    totalPages: Math.ceil(total / limit), // Total number of pages
  });
});

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
export const getModelByName = catchAsync(
  async (req: Request, res: Response) => {
    const model = await ModelServices.getModelByName(req.params.name);
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
  }
);

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
