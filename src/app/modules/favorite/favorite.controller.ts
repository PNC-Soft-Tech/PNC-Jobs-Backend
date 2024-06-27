import { Request, Response, query } from "express";
import { FavoriteServices } from "./favorite.service";
import catchAsync from "../../../shared/catchAsync";
import Favorite from "./favorite.model";
import { IFavorite } from "./favorite.interface";
import AppError from "../../../error/AppError";

export const createFavorite = catchAsync(
  async (req: Request, res: Response) => {
    const checkCategoriesName = await Favorite.find({ name: req.body.name });
    if (checkCategoriesName.length == 0) {
      const result = await FavoriteServices.createFavorite(req.body);
      res.json({
        success: true,
        message: "Successfully Created Favorite",
        data: result,
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Favorite name already exits !",
      });
    }
  }
);

export const getAllFavorite = async (req: Request, res: Response) => {
  if (!req?.user) {
    throw new AppError(403, "You are not authorized to update");
  }
  // console.log("req.user~", req.user);
  const categories: IFavorite[] = await FavoriteServices.getAllFavorite(
    req,
    req.user._id
  ); // Update variable name to 'categories'
  res.json({
    success: true,
    data: categories,
  });
};

export const getFavoriteById = catchAsync(
  async (req: Request, res: Response) => {
    const favorite = await FavoriteServices.getFavoriteById(req.params.id);
    if (!favorite) {
      res.status(404).json({
        success: false,
        message: "Favorite not found",
      });
    } else {
      res.json({
        success: true,
        data: favorite,
      });
    }
  }
);

export const updateFavorite = catchAsync(
  async (req: Request, res: Response) => {
    if (!req?.user) {
      throw new AppError(403, "You are not authorized to update");
    }
    console.log("req.user~", req.user);
    const data = {
      user: req.user._id,
      photo: req.body.photo,
    };
    const result = await FavoriteServices.updateFavorite(data);
    res.json({
      success: true,
      message: "Favorite updated successfully",
      data: result,
    });
  }
);

export const deleteFavorite = catchAsync(
  async (req: Request, res: Response) => {
    const result = await FavoriteServices.deleteFavorite(req.params.id);
    res.json({
      success: true,
      message: "Favorite deleted successfully",
      data: result,
    });
  }
);

export const PhotoController = {
  createFavorite,
  getAllFavorite,
  getFavoriteById,
  updateFavorite,
  deleteFavorite,
};
