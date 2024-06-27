import { Request, Response, query } from "express";
import { UnFavoriteServices } from "./unfavorite.service";
import catchAsync from "../../../shared/catchAsync";
import UnFavorite from "./unfavorite.model";
import { IUnFavorite } from "./unfavorite.interface";
import AppError from "../../../error/AppError";

export const createUnFavorite = catchAsync(
  async (req: Request, res: Response) => {
    const checkCategoriesName = await UnFavorite.find({ name: req.body.name });
    if (checkCategoriesName.length == 0) {
      const result = await UnFavoriteServices.createUnFavorite(req.body);
      res.json({
        success: true,
        message: "Successfully Created UnFavorite",
        data: result,
      });
    } else {
      res.status(400).send({
        success: false,
        message: "UnFavorite name already exits !",
      });
    }
  }
);

export const getAllUnFavorite = async (req: Request, res: Response) => {
  if (!req?.user) {
    throw new AppError(403, "You are not authorized to update");
  }
  // console.log("req.user~", req.user);
  const categories: IUnFavorite[] = await UnFavoriteServices.getAllUnFavorite(
    req.user._id
  ); // Update variable name to 'categories'
  res.json({
    success: true,
    data: categories,
  });
};

export const getUnFavoriteById = catchAsync(
  async (req: Request, res: Response) => {
    const unfavorite = await UnFavoriteServices.getUnFavoriteById(
      req.params.id
    );
    if (!unfavorite) {
      res.status(404).json({
        success: false,
        message: "UnFavorite not found",
      });
    } else {
      res.json({
        success: true,
        data: unfavorite,
      });
    }
  }
);

export const updateUnFavorite = catchAsync(
  async (req: Request, res: Response) => {
    if (!req?.user) {
      throw new AppError(403, "You are not authorized to update");
    }
    // console.log("req.user~", req.user);
    const data = {
      user: req.user._id,
      photo: req.body.photo,
    };
    const result = await UnFavoriteServices.updateUnFavorite(data);
    res.json({
      success: true,
      message: "UnFavorite updated successfully",
      data: result,
    });
  }
);

export const deleteUnFavorite = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UnFavoriteServices.deleteUnFavorite(req.params.id);
    res.json({
      success: true,
      message: "UnFavorite deleted successfully",
      data: result,
    });
  }
);

export const PhotoController = {
  createUnFavorite,
  getAllUnFavorite,
  getUnFavoriteById,
  updateUnFavorite,
  deleteUnFavorite,
};
